import { CAC } from 'cac';
import install from './install';

export default function init(cli: CAC) {
  cli.command('env', '配置开发环境')
    .option('-i, --init', '初始化开发环境')
    .action((options) => {
      if (options.init) {
        install();
      }
    });
}
