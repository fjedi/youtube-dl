"use strict";

const dargs = require("dargs");
const execa = require("execa");

const { YOUTUBE_DL_PATH } = require("./constants");

const args = (url, flags = {}) => [].concat(url, dargs(flags)).filter(Boolean);

const isJSON = (str) => str.startsWith("{");

module.exports = async (url, flags, opts) => {
  const { stdout } = await execa(YOUTUBE_DL_PATH, args(url, flags), opts);
  //
  if (opts && opts.debugMode) {
    console.log(stdout);
  }
  if (isJSON(stdout)) {
    return JSON.parse(
      opts && opts.isPlaylist ? `[${stdout.replace(/[\r\n]+/g, ",")}]` : stdout
    );
  }
  //
  return stdout;
};

module.exports.args = args;
