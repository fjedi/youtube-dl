'use strict'

const dargs = require('dargs')
const execa = require('execa')

const { YOUTUBE_DL_PATH } = require('./constants')

const args = (url, flags = {}) => [].concat(url, dargs(flags)).filter(Boolean)

const isJSON = str => str.startsWith('{')

const parse = async ({ stdout }, opts) => {
  //
  if (opts && opts.debugMode) {
    console.log(stdout)
  }
  if (isJSON(stdout)) {
    return JSON.parse(
      opts && opts.isPlaylist ? `[${stdout.replace(/[\r\n]+/g, ',')}]` : stdout
    )
  }
  //
  return stdout
}

const raw = (url, flags, opts) => execa(YOUTUBE_DL_PATH, args(url, flags), opts)

module.exports = (url, flags, opts) => raw(url, flags, opts).then(parse, opts)

module.exports.raw = raw

module.exports.args = args
