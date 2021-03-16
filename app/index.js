const Generator = require("yeoman-generator")
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)

        this.argument("namespace", { type: String, required: false })
        this.argument("builddir", { type: String, required: false })
    }

    _writing() {
        const namespace = this.options.namespace || this.answers.namespace
        const builddir = this.options.builddir || this.answers.builddir

        // this.fs.copyTpl(
        //     this.templatePath("wdio-wdi5.conf.js"),
        //     this.destinationPath(this.answers.wdi5ConfPath, "wdio-wdi5.conf.js"),
        //     this.answers
        // )
    }

    async prompting() {
        const prompts = []
        prompts.push({
            type: "input",
            name: "namespace",
            message: "What's the name space your custom control(s) should live in?",
            default: "my.ui5.cc",
            store: true
        })
        prompts.push({
            type: "input",
            name: "builddir",
            message: "In what directory should the custom control be stored?",
            default: "./my/ui5/cc",
            store: true
        })
        this.answers = await this.prompt(prompts)
    }

    async writing() {}
}
