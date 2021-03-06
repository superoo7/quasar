const
  fs = require('fs'),
  logger = require('../helpers/logger'),
  log = logger('app:extension-manager'),
  chalk = require('chalk'),
  appPaths = require('../app-paths')

const extensionPath = appPaths.resolve.app('quasar.extensions.json')

class ExtensionJson {
  constructor () {
    try {
      this.extensions = require(extensionPath)
    }
    catch (e) {
      this.extensions = {}
    }
  }

  list () {
    if (Object.keys(this.extensions).length === 0) {
      log(' No App Extensions are installed')
      log(' You can look for "quasar-app-extension-*" in npm registry.')
      return
    }

    log('Listing installed App Extensions')
    log()

    for (let ext in this.extensions) {
      console.log(' Extension name: ' + chalk.green(ext))
      console.log(' Extension prompts: ' + JSON.stringify(this.extensions[ext], null, 2))
      console.log()
    }
  }

  getList () {
    return this.extensions
  }

  add (extId, opts) {
    log(`Adding "${extId}" extension prompts to /quasar.extensions.json ...`)
    this.extensions[extId] = opts
    this.__save()
  }

  remove (extId) {
    if (this.has(extId)) {
      log(`Removing "${extId}" extension prompts from /quasar.extensions.json ...`)
      delete this.extensions[extId]
      this.__save()
    }
  }

  get (extId) {
    return this.extensions[extId] || {}
  }

  has (extId) {
    return this.extensions[extId] !== void 0
  }

  __save () {
    fs.writeFileSync(
      extensionPath,
      JSON.stringify(this.extensions, null, 2),
      'utf-8'
    )
  }
}

module.exports = new ExtensionJson()
