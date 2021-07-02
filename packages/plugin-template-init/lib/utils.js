"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const constants_1 = require("./constants");
async function download(type) {
    if (!type) {
        return;
    }
    const tmpDir = path_1.default.join(os_1.default.tmpdir(), 'fe-toolkit');
    await new Promise((resolve, reject) => {
        download_git_repo_1.default(`${constants_1.repositoryPath}/${type}`, tmpDir, { clone: true }, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
exports.download = download;
