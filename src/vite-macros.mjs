import fs from 'fs';
import path from 'path';

// Resolve paths relative to the project root (__dirname in vite.config.js context)
// Since macros run in a Node.js context during the build, __dirname here will be vite.config.js's directory.
// However, unplugin-macros might alter the execution context or how paths are resolved.
// For robustness, let's assume the filePath passed to the macro is relative to the project root.

export function GET_FILE_MTIME(filePath) {
// mtime.toISOString() of ../public/data/taskDetails.json
  try {
    // filePath is assumed to be relative to the project root.
    // path.resolve will correctly turn it into an absolute path
    // based on the current working directory (process.cwd()),
    // which in a Vite/build context is typically the project root.
    const absolutePath = path.resolve(filePath);
    const stats = fs.statSync(absolutePath);
    return stats.mtime.toISOString();
  } catch (error) {
    // Provide feedback if the file isn't found or another error occurs.
    console.error(`[GET_FILE_MTIME] Error processing file '${filePath}': ${error.message}`);
    // Return null or re-throw error depending on desired behavior for macros.
    // Throwing an error might be better to halt the build on missing files.
    // For now, returning null to match un-implemented behavior.
    return null;
  }
}
