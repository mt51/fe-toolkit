import { execFile } from 'child_process';
import chalk from 'chalk';

function execShell(path: string) {
  return new Promise((resolve, reject) => {
    if (!path) {
      return reject(new Error('脚本文件地址不能为空'));
    }
    execFile(path, (error, stdout, stderr) => {
      if (!error) {
        resolve({ stdout, stderr });
        return;
      }
      reject(error);
    });
  });
}

export default function execInstallShell() {
  execShell('./install.sh').then(() => {
    console.log(chalk.green('环境安装脚本执行成功'));
  }).catch(error => {
    console.error(error);
  });
}
