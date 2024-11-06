// a script that solves the following error:
// > 'test did not finish before its parent and was cancelled'
//
// because the native node test runner sucks
// https://stackoverflow.com/questions/77023979/problems-using-nodejs-test-runner-in-a-nestjs-project
import { join } from "node:path"
import * as glob from "glob"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) // get the name of the directory

const testFiles: string[] = glob.sync(join(__dirname, "../..") + "/**/*.test.ts")
if (testFiles.length === 0) {
  console.error("No test files found")
  process.exit(0)
}

async function runTests() {
  try {
    const promises: Promise<unknown>[] = []
    testFiles.forEach(function doStuff(file) {
      promises.push(import(join(file)))
    })

    await Promise.all(promises)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Unable to scan directory: " + err)
  }
}
runTests()
