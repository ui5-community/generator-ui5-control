const Generator = require("yeoman-generator")
const chalk = require("chalk")
const path = require("path")
const yosay = require("yosay")

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)

        // provide runtime option capabilities
        this.option("controlNamespace", { type: String, required: false })
        this.option("buildDir", { type: String, required: false })
    }

    async prompting() {
        this.log(yosay(`Welcome to the amazing ${chalk.red("UI5 custom control")} generator!`))

        const prompts = []

        // only prompt for these if not supplied at call-time
        // via --controlNamespace=... --buildDir=...
        if (!this.options.controlNamespace) {
            prompts.push({
                type: "input",
                name: "controlNamespace",
                message: "What's the namespace your custom control(s) should live in?",
                default: "my.ui5.cc",
                store: true
            })
        }
        if (!this.options.buildDir) {
            prompts.push({
                type: "input",
                name: "buildDir",
                message: "In what directory should the custom control be stored?",
                default: "./",
                store: true
            })
        }
        this.answers = await this.prompt(prompts)
    }

    async writing() {
        // we need both vars for later programmatic use
        ;(this._controlNamespace = this.options.controlNamespace || this.answers.controlNamespace),
            (this._buildDir = this.options.buildDir || this.answers.buildDir)

        // mangle all ./templates/**/* through ejs in the build dir folder
        this.fs.copyTpl(this.templatePath("./**/*"), this.destinationPath(this._buildDir), {
            controlNamespace: this._controlNamespace,
            buildDir: this._buildDir
        })
    }

    install() {
        const runtimeDir = path.resolve(this.destinationPath(), this._buildDir)
        const testDir = path.resolve(this.destinationPath(), this._buildDir, "test", "ui5-app")

        this.log(chalk.yellow("=>==="))
        this.log(`${chalk.yellow(`prepping development environment`)} for ${this._controlNamespace}.Control.js...`)
        if (!this.options["skip-install"]) {
            this._installDeps(runtimeDir)
        }

        this.log(chalk.yellow("===>="))
        this.log(`${chalk.yellow(`prepping test environment`)} for ${this._controlNamespace}.Control.js...`)
        if (!this.options["skip-install"]) {
            this._installDeps(testDir)
        }
    }

    /**
     * satisfy package.json dependencies by doing a `npm i`
     *
     * @param {string} dir directory to cd into for the process
     */
    _installDeps(dir) {
        process.chdir(dir)

        // npm 7 (node 15) has a stricter peer dep handling...
        if (parseInt(process.versions.node.split(".")[0]) >= 15) {
            this.spawnCommandSync("npm", ["i", "--legacy-peer-deps"])
        } else {
            this.spawnCommandSync("npm", ["i"])
        }
    }

    end() {
        this.log(chalk.yellow("====>>>"))
        this.log(yosay(`Et voilà! ${chalk.green(this._controlNamespace + ".Control.js")} is ready!`))

        this.log(`${chalk.green("all set!")} - happy hacking your new UI5 custom control:`)

        this.log(`  $> cd ${path.resolve(this.destinationPath(), this._buildDir)}`)
        this.log(`  $> npm run test:manual ${chalk.gray("#> http://localhost:8081/index.html")}`)
        const testDir = path.resolve(this.destinationPath(), this._buildDir, "test", "*.test.js!")
        this.log(`  $> npm run test ${chalk.gray("#> headless Chrome executing " + testDir)}`)
    }
}
