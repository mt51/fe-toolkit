"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
function execShell(path) {
    return new Promise((resolve, reject) => {
        if (!path) {
            return reject(new Error('脚本文件地址不能为空'));
        }
        child_process_1.execFile(path, (error, stdout, stderr) => {
            if (!error) {
                resolve({ stdout, stderr });
                return;
            }
            reject(error);
        });
    });
}
function execInstallShell() {
    execShell('./install.sh').then(() => {
        console.log(chalk_1.default.green('环境安装脚本执行成功'));
    }).catch(error => {
        console.error(error);
    });
}
exports.default = execInstallShell;
