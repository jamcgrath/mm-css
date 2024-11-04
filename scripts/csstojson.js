const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const postcssJs = require("postcss-js");

function readFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      readFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath.split("css/")[1]);
    }
  });

  return fileList;
}

const folderPath = "./src/css";
const targetPath = "./dist/json";

// Check if the source directory exists
if (!fs.existsSync(folderPath)) {
  console.error(`Source folder "${folderPath}" does not exist.`);
  process.exit(1);
}

const files = readFilesRecursively(folderPath);

// Check if the target directory exists, if not, create it
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath, { recursive: true });
}

if (files) {
  const filenames = { ...files };

  fs.writeFile(
    `${targetPath}/filenames.json`,
    JSON.stringify(filenames),
    (err) => {
      return console.log("File names saved");
      console.log(err);
    }
  );
  files.forEach((file) => {
    if (file === "normalize.css") {
      return;
    }
    try {
      const css = fs.readFileSync(`${folderPath}/${file}`, "utf8");
      const root = postcss.parse(css);
      let postCSSObj = postcssJs.objectify(root);

      // Remove `.` from the keys
      postCSSObj = Object.fromEntries(
        Object.entries(postCSSObj).map(([key, value]) => [
          key.replace(/\./g, ""),
          value,
        ])
      );

      const filename = file.split("/")[1].split(".")[0];
      fs.writeFileSync(
        `${targetPath}/${filename}.json`,
        JSON.stringify(postCSSObj, null, 2)
      );
    } catch (err) {
      console.error(err);
    }
  });
}
