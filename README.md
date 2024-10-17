# TSX ESM Import error

This is a minimal reproduction of an issue I'm having with tsx and esm imports.

## Environment

- OS: Windows 10 or 11
- Node version: 22.8.0 or 20.x.x
- NPM version: 10.8.2
- TSX version: 4.19.1
- TypeScript version: 5.5.3

This issue is only happening on windows, where drives have a letter (like `C:` or `D:`) and not on linux.

## Steps to reproduce

1. Clone this repo
2. Run `npm install`
3. Run `npm run start` or `npm run start:watch` for tsx watch mode
4. See an error in the console

## Expected behavior

No errors, the file should be imported correctly and the console should log `Hello from the imported file!`

## Actual behavior

```
Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
    at throwIfUnsupportedURLScheme (node:internal/modules/esm/load:228:11)
    at defaultLoad (node:internal/modules/esm/load:110:3)
    at nextLoad (node:internal/modules/esm/hooks:748:28)
    at load (file:///D:/Utilisateurs/Adam/Documents/dev/TypeScript/tsx-issue-import/node_modules/tsx/dist/esm/index.mjs?1729177001677:2:1768)
    at nextLoad (node:internal/modules/esm/hooks:748:28)
    at Hooks.load (node:internal/modules/esm/hooks:385:26)
    at handleMessage (node:internal/modules/esm/worker:199:24)
    at Immediate.checkForMessages (node:internal/modules/esm/worker:141:28)
    at process.processImmediate (node:internal/timers:491:21) {
  code: 'ERR_UNSUPPORTED_ESM_URL_SCHEME'
}
```

## Additional context

This issue seems to be related to the `tsx` package, as the error is thrown only when I'm using tsx, and not when I compile the code with `tsc` and run it with node. I'm not sure if this is a bug in the `tsx` package or if I'm doing something wrong.

I've found a workaround on this error:

```ts
async function importModule(path: string): Promise<any> {
    if (process.platform === 'win32') {
        path = `file://${path}`;
    }
    return await import(path);
}

// and then simply use importModule instead of import
```

But I'd like to know if there's a better way to fix this issue.

Thanks for your help!