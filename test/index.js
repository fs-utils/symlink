
var fs = require('mz/fs')
var path = require('path')
var assert = require('assert')

var link = require('..')

var build = path.join(__dirname, '..', 'build')

require('rimraf').sync(build)
require('mkdirp').sync(build)

describe('fs-symlink', function () {
  it('should symlink', function () {
    var file = path.join(build, 'test.js')
    return link(__filename, file).then(function () {
      return fs.realpath(file)
    }).then(function (resolved) {
      assert.equal(__filename, resolved)
    })
  })

  it('should symlink again', function () {
    var file = path.join(build, 'test.js')
    return link(__filename, file).then(function () {
      return fs.realpath(file) // shit breaks here with native promises!!!
    }).then(function (resolved) {
      assert.equal(__filename, resolved)
    })
  })

  it('should symlink again', function () {
    var file = path.join(build, 'test.js')
    return link(__filename, file).then(function () {
      return fs.realpath(file)
    }).then(function (resolved) {
      assert.equal(__filename, resolved)
    })
  })

  it('should re-symlink with a different source', function () {
    var file = path.join(build, 'test.js')
    var src = path.join(__dirname, '..', 'index.js')
    return link(src, file).then(function () {
      return fs.realpath(file)
    }).then(function (resolved) {
      assert.equal(src, resolved)
    })
  })

  it('should re-symlink of dest is not a symlink', function () {
    var file = path.join(build, 'test.js')
    fs.unlinkSync(file)
    fs.writeFileSync(file, '')
    return link(__filename, file).then(function () {
      return fs.realpath(file)
    }).then(function (resolved) {
      assert.equal(__filename, resolved)
    })
  })
})
