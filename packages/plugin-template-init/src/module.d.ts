declare module 'download-git-repo' {
  interface IOptions {
    clone: boolean;
  }
  export default function download(repository: string, dir: string, options: IOptions, callback: (error: Error) => void) {}
}
