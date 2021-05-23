import 'reflect-metadata'
import execa from 'execa'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import fs from 'fs'
import sourceMapSupport from 'source-map-support'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function runMigration() {
  if (!fs.existsSync(`${__dirname}/tmp`)) {
    fs.mkdirSync(`${__dirname}/tmp`)
  }
  await execa.node('ace', ['migration:run'], {
    stdio: 'pipe',
  })
}

async function rollbackMigrations() {
  await execa.node('ace', ['migration:rollback'], {
    stdio: 'pipe',
  })
  fs.rmSync(`${__dirname}/tmp/db.sqlite3`)
}

// Add this method to the file
function getTestFiles() {
  let userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'test/**/*.spec.ts'
  }

  return `test/${userDefined.replace(/\.ts$|\.js$/, '')}.ts`
}

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

/**
 * Configure test runner
 */
configure({
  files: getTestFiles(),
  before: [runMigration, startHttpServer],
  after: [rollbackMigrations],
})
