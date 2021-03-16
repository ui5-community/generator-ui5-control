const assert = require("yeoman-assert")
const helpers = require("yeoman-test")
const path = require("path")

function _assert(result, { ns, dir }) {
    const ui5 = { yaml: path.resolve(result.cwd, dir, "ui5.yaml") }
    const control = { js: path.resolve(result.cwd, dir, "Control.js") }
    assert.file([ui5.yaml, control.js])

    assert.fileContent(ui5.yaml, `name: ui5-cc-${ns}`)
    assert.fileContent(ui5.yaml, `/resources/${ns.replace(/\./g, "/")}/`)

    assert.fileContent(control.js, `${ns}.Control`)
}

describe("generator call", () => {
    test("act on prompted values", async () => {
        const ns = "diff.name.space"
        const dir = "my/build/dir"
        const result = await helpers
            .create(path.join(__dirname, "../app"), { "skip-install": true })
            .withPrompts({
                controlNamespace: ns,
                buildDir: dir
            })
            .run()
        _assert(result, { ns, dir })
    })

    test("allow runtime options", async () => {
        const ns = "an.other.ns"
        const dir = "diff/dir"
        const result = await helpers
            .create(path.join(__dirname, "../app"), { "skip-install": true })
            .withOptions({
                controlNamespace: ns,
                buildDir: dir
            })
            .run()
        _assert(result, { ns, dir })
    })
})

describe("allow both config runtime switch + prompt", () => {
    test("ns option, dir prompt", async () => {
        const ns = "ns.option"
        const dir = "dir/prompt"
        const result = await helpers
            .create(path.join(__dirname, "../app"), { "skip-install": true })
            .withOptions({
                controlNamespace: ns
            })
            .withPrompts({
                buildDir: dir
            })
            .run()
        _assert(result, { ns, dir })
    })

    test("dir option, ns prompt", async () => {
        const ns = "ns.prompt"
        const dir = "dir/option"
        const result = await helpers
            .create(path.join(__dirname, "../app"), { "skip-install": true })
            .withOptions({
                buildDir: dir
            })
            .withPrompts({
                controlNamespace: ns
            })
            .run()
        _assert(result, { ns, dir })
    })
})
