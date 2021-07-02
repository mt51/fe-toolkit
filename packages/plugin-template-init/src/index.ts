import fs from 'fs';
import path from 'path';
import { CAC } from 'cac';
import prompts from 'prompts';
import chalk from 'chalk';

const templateList = ['cli', 'node'];

const defaultProjectName = 'fe-template-project';

const cwd = process.cwd();

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  );
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function templateInit(type: string) {
  let result: Record<string, unknown> = {};
  let targetDir = 'fe-template-project';

  try {
    result = await prompts([{
      type: 'text',
      name: 'projectName',
      message: 'Project Name',
      initial: defaultProjectName,
      onState(state) {
        targetDir = state.value.trim();
      }
    }, {
      type: !fs.existsSync(targetDir) ? null : 'confirm',
      name: 'overwrite',
      message() {
        return (targetDir === '.'
          ? 'Current directory'
          : `Target directory "${targetDir}"`) +
      ' is not empty. Remove existing files and continue?';
      },
      initial: 'fe-template-project'
    }, {
      type: (_, { overwrite }) => {
        if (overwrite === false) {
          throw new Error(chalk.red('✖') + ' Operation cancelled');
        }
        return null;
      },
      name: 'overwriteChecker'
    }, {
      type: () => (isValidPackageName(targetDir) ? null : 'text'),
      name: 'packageName',
      message: 'Package name:',
      initial: 'defaultProjectName',
      validate: (dir) =>
        isValidPackageName(dir) || 'Invalid package.json name'
    }], {
      onCancel: () => {
        throw new Error(chalk.red('✖') + ' Operation cancelled');
      }
    });
  } catch (cancelled) {
    console.log(cancelled.message);
  }

  const { overwrite, packageName } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  const templateDir = path.join(__dirname, `./template/${type}`);

  const files = fs.readdirSync(templateDir);

  const write = (file: string, content?: string | Buffer) => {
    const filePath = path.join(root, file);

    if (content) {
      fs.writeFileSync(filePath, content);
    } else {
      copy(path.join(templateDir, file), filePath);
    }
  };

  for (const file of files.filter(f => f !== 'package.json')) {
    write(file);
  }

  const pkg = require(path.join(templateDir, 'package.json'));

  pkg.name = packageName;

  write('package.json', JSON.stringify(pkg, null, 2));

  console.log(`${type} 模版生成成功`);
}

function registryCommand(cli: CAC) {
  cli.command('tpl-init <type>', '模版初始化')
    .action((type) => {
      if (!templateList.includes(type)) {
        throw new Error(chalk.red('✖') + '暂不支持该类型模版');
      }
      templateInit(type).catch(e => {
        console.error(e);
      });
    });
}

export function init(cli: CAC) {
  registryCommand(cli);
}
