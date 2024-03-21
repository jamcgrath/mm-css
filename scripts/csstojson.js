const fs = require('fs');
const path = require('path');
const postcss = require('postcss')
const postcssJs = require('postcss-js')

function readFilesRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);
  
        if (fileStat.isDirectory()) {
            readFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath.split('css/')[1]);
        }
    });

    return fileList;
}

const folderPath = './dist/css'
const files = readFilesRecursively(folderPath);
const targetPath = './dist/json'

if (files) {
  const filenames = { ...files }

  fs.writeFile(
    `${targetPath}/filenames.json`,
    JSON.stringify(filenames),
    (err) => {
      console.log(err)
    }
  )
  files.forEach((file) => {
    if (file === 'normalize.css') {
      return
    }
    try {
      const css = fs.readFileSync(`${folderPath}/${file}`, 'utf8')
      const root = postcss.parse(css)
      const postCSSObj = postcssJs.objectify(root)
      const filename = file.split('/')[1].split('.')[0]
      fs.writeFileSync(
        `${targetPath}/${filename}.json`,
        JSON.stringify(postCSSObj, null, 2)
      )
    } catch (err) {
      console.error(err)
    }
  })
}
