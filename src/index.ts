import fs from "node:fs";
import { join, relative } from "node:path";

/**
 * TSX URL Scheme error example
 * import() does not support the file URL scheme while using a path "path.join()/file"
 * The error only happens on win32 systems
 */
const main = async () => {
    const path = join(__dirname, 'files');
    const files = fs.readdirSync(path);

    console.log("Using relative import");
    for (const file of files) {
        const absolutePath = `${path}/${file}`;
        const relativePath = "./" + relative(__dirname, absolutePath).replace(/\\/g, "/");
        const string = await import(relativePath);
        console.log(string.default);
    }
    console.log();

    console.log("Using absolute import with file-protocol");
    for (const file of files) {
        const absolutePath = `file://${path}/${file}`;
        const string = await import(absolutePath);
        console.log(string.default);
    }
};

main().catch((error) => {
    console.error(error);
});
