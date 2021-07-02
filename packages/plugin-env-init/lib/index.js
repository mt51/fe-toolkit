"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const install_1 = __importDefault(require("./install"));
function init(cli) {
    cli.command('env', '配置开发环境')
        .option('-i, --init', '初始化开发环境')
        .action((options) => {
        if (options.init) {
            install_1.default();
        }
    });
}
exports.default = init;
