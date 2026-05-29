import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  }
}

fs.rmSync(dist, { recursive: true, force: true });
copyFile(path.join(root, "index.html"), path.join(dist, "index.html"));
copyDir(path.join(root, "src"), path.join(dist, "src"));
copyFile(path.join(root, "public", "diary.json"), path.join(dist, "public", "diary.json"));

console.log(`Built static site in ${dist}`);
