const helpers = require("yeoman-test")
const path = require("path")
describe("generic subgen call", () => {
    test.only("walk through prompt", async () => {
        const result = await helpers.run(path.join(__dirname, "../app")).withPrompts({
            namespace: "diff.name.space",
            builddir: "diff/build/dir"
        })
        expect(result).not.toBeUndefined()
    })
})
