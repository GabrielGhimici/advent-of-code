const fs = require("fs");
const readline = require("readline");

function createReadInterface(path) {
  return readline.createInterface({
    input: fs.createReadStream(path),
  });
}

module.exports.createReadInterface = createReadInterface;
