// note: jest dev server is used
// for booting up `ui5 serve`

const url = "http://localhost:8080"
jest.setTimeout(10000)

describe("<%= controlNamespace %>.Control", () => {
    test("should find the <%= controlNamespace %>.Control in index.html", async () => {
        await page.goto(`${url}/index.html`)
        await expect(page).toBeTruthy()
    })
})
