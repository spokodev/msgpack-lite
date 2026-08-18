#!/usr/bin/env mocha -R spec

var assert = require("assert");
var childProcess = require("child_process");
var path = require("path");
var TITLE = __filename.replace(/^.*\//, "");

var it_BufferAlloc = Buffer.alloc ? it : it.skip;

describe(TITLE, function() {
  it_BufferAlloc("does not call the deprecated Buffer constructor", function() {
    var result = childProcess.spawnSync(process.execPath, [
      "--pending-deprecation",
      "--trace-deprecation",
      "-e",
      'require("./lib/bufferish-buffer")'
    ], {
      cwd: path.resolve(__dirname, ".."),
      encoding: "utf8"
    });

    assert.equal(result.status, 0, result.stderr);
    assert.equal(/\[DEP0005\]/.test(result.stderr), false, result.stderr);
  });
});
