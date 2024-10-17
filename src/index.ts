import fs from "node:fs";
import { join } from "node:path";

/**
 * TSX URL Scheme error example
 * import() does not support the file URL scheme while using a path "path.join()/file"
 * The error only happens on win32 systems
 */
const main = async () => {
    const path = join(__dirname, 'files');
    const files = fs.readdirSync(path);
    for (const file of files) {
        // will throw the error: Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
        const string = await import(`${path}/${file}`);
        console.log(string.default);
    }
};

main().catch((error) => {
    console.error(error);
});