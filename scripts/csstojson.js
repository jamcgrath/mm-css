const postcss = require('postcss')
const postcssJs = require('postcss-js')
const fs = require('fs')

const folderPath = './dist/css'
const targetPath = './dist/json'
const files = fs.readdirSync(folderPath)

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
      const filename = file.split('.')[0]
      fs.writeFileSync(
        `${targetPath}/${filename}.json`,
        JSON.stringify(postCSSObj, null, 2)
      )
    } catch (err) {
      console.error(err)
    }
  })
}
