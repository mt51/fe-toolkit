"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const chalk_1 = __importDefault(require("chalk"));
const templateList = ['cli', 'node'];
const defaultProjectName = 'fe-template-project';
const cwd = process.cwd();
function isValidPackageName(projectName) {
    return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}
function emptyDir(dir) {
    if (!fs_1.default.existsSync(dir)) {
        return;
    }
    for (const file of fs_1.default.readdirSync(dir)) {
        const abs = path_1.default.resolve(dir, file);
        // baseline is Node 12 so can't use rmSync :(
        if (fs_1.default.lstatSync(abs).isDirectory()) {
            emptyDir(abs);
            fs_1.default.rmdirSync(abs);
        }
        else {
            fs_1.default.unlinkSync(abs);
        }
    }
}
function copyDir(srcDir, destDir) {
    fs_1.default.mkdirSync(destDir, { recursive: true });
    for (const file of fs_1.default.readdirSync(srcDir)) {
        const srcFile = path_1.default.resolve(srcDir, file);
        const destFile = path_1.default.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}
function copy(src, dest) {
    const stat = fs_1.default.statSync(src);
    if (stat.isDirectory()) {
        copyDir(src, dest);
    }
    else {
        fs_1.default.copyFileSync(src, dest);
    }
}
async function templateInit(type) {
    let result = {};
    let targetDir = 'fe-template-project';
    try {
        result = await prompts_1.default([{
                type: 'text',
                name: 'projectName',
                message: 'Project Name',
                initial: defaultProjectName,
                onState(state) {
                    targetDir = state.value.trim();
                }
            }, {
                type: !fs_1.default.existsSync(targetDir) ? null : 'confirm',
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
                        throw new Error(chalk_1.default.red('✖') + ' Operation cancelled');
                    }
                    return null;
                },
                name: 'overwriteChecker'
            }, {
                type: () => (isValidPackageName(targetDir) ? null : 'text'),
                name: 'packageName',
                message: 'Package name:',
                initial: 'defaultProjectName',
                validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
            }], {
            onCancel: () => {
                throw new Error(chalk_1.default.red('✖') + ' Operation cancelled');
            }
        });
    }
    catch (cancelled) {
        console.log(cancelled.message);
    }
    const { overwrite, packageName } = result;
    const root = path_1.default.join(cwd, targetDir);
    if (overwrite) {
        emptyDir(root);
    }
    else if (!fs_1.default.existsSync(root)) {
        fs_1.default.mkdirSync(root);
    }
    const templateDir = path_1.default.join(__dirname, `./template/${type}`);
    const files = fs_1.default.readdirSync(templateDir);
    const write = (file, content) => {
        const filePath = path_1.default.join(root, file);
        if (content) {
            fs_1.default.writeFileSync(filePath, content);
        }
        else {
            copy(path_1.default.join(templateDir, file), filePath);
        }
    };
    for (const file of files.filter(f => f !== 'package.json')) {
        write(file);
    }
    const pkg = require(path_1.default.join(templateDir, 'package.json'));
    pkg.name = packageName;
    write('package.json', JSON.stringify(pkg, null, 2));
    console.log(`${type} 模版生成成功`);
}
function registryCommand(cli) {
    cli.command('tpl-init <type>', '模版初始化')
        .action((type) => {
        if (!templateList.includes(type)) {
            throw new Error(chalk_1.default.red('✖') + '暂不支持该类型模版');
        }
        templateInit(type).catch(e => {
            console.error(e);
        });
    });
}
function init(cli) {
    registryCommand(cli);
}
exports.init = init;
