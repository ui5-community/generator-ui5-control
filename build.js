const globby = require("globby")
const fs = require("fs-extra")
const path = require("path")
const { renderFile } = require("ejs")

// make sure we're having a namespace
const args = process.argv.slice(2)
if (!args[0]) {
    console.error(`[ui5-cc-builder] please provide a namespace:
    node build.js my.name.space`)
    process.exit(1)
}

const namespace = args[0].trim()
const buildFolder = path.resolve("./build")

console.info(`[ui5-cc-builder] 🚀 building custom control for ns ${namespace}!`)
;(async () => {
    // special handling for package.json
    const pkgJson = require("./package.json")
    pkgJson.name = pkgJson.name.replace("name.space", namespace)
    await fs.writeFile(path.resolve(`${buildFolder}/package.json`), JSON.stringify(pkgJson))

    // clean up build folder
    await fs.mkdirp(buildFolder)
    await fs.remove(`${buildFolder}/*`)
    console.info(`[ui5-cc-builder] cleaned ${buildFolder}...`)

    // ejs: build target files
    const files = await globby(["**/*", "!build", "!node_modules", "!*.lock"])
    for (const file of files) {
        const output = await renderFile(file, { name: { space: namespace } })
        const targetFile = path.resolve(`${buildFolder}/${file}`)
        await fs.outputFile(targetFile, output)
        console.info(`[ui5-cc-builder] built ${file}!`)
    }

    console.info(`[ui5-cc-builder] 🤩 done > 
        go to ${buildFolder} 
        and start hacking 👾!`)
})()
