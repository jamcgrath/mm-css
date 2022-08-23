const postcss = require('postcss')
const postcssJs = require('postcss-js')
const fs = require('fs')

const folderPath = './dist/css'
const files = fs.readdirSync(folderPath)

files.forEach((file) => {
  if (file === 'normalize.css') {
    return
  }

  try {
    const css = fs.readFileSync(`${folderPath}/${file}`, 'utf8')
    const root = postcss.parse(css)
    const postCSSObj = postcssJs.objectify(root)
    fs.writeFileSync(
      `./dist/json/${file}.json`,
      JSON.stringify(postCSSObj, null, 2)
    )
  } catch (err) {
    console.error(err)
  }
})
