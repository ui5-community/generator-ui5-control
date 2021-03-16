const Generator = require("yeoman-generator")
const chalk = require("chalk")
const yosay = require("yosay")

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)

        this.option("controlNamespace", { type: String, required: false })
        this.option("buildDir", { type: String, required: false })
    }

    _writing() {
        const controlNamespace = this.options.controlNamespace || this.answers.controlNamespace
        const buildDir = this.options.buildDir || this.answers.buildDir

        // this.fs.copyTpl(
        //     this.templatePath("wdio-wdi5.conf.js"),
        //     this.destinationPath(this.answers.wdi5ConfPath, "wdio-wdi5.conf.js"),
        //     this.answers
        // )
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
        this._writing()
    }
}
