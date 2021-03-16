const Generator = require("yeoman-generator")
const chalk = require("chalk")
const path = require("path")
const yosay = require("yosay")

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)

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
                default: "./my/ui5/cc",
                store: true
            })
        }
        this.answers = await this.prompt(prompts)
    }

    async writing() {
        const options = {
            controlNamespace: this.options.controlNamespace || this.answers.controlNamespace,
            buildDir: this.options.buildDir || this.answers.buildDir
        }

        // mangle all ./templates/**/* through ejs in the build dir folder
        this.fs.copyTpl(this.templatePath("./**/*"), this.destinationPath(path.resolve(options.buildDir)), options)
    }
}
