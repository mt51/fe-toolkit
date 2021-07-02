import os from 'os';
import path from 'path';
import downloadGitRepo from 'download-git-repo';
import { TemplateType, repositoryPath } from './constants';

export async function download(type: TemplateType) {
  if (!type) {
    return;
  }

  const tmpDir = path.join(os.tmpdir(), 'fe-toolkit');

  await new Promise<void>((resolve, reject) => {
    downloadGitRepo(`${repositoryPath}/${type}`, tmpDir, { clone: true }, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
