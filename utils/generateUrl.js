const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
//创建爬虫url

function fileWrite() {
  //创建在/目录
  let fliename = path.join(__dirname, "images");
  fs.mkdir(fliename, (err) => {
    if (!err || err.code == "EEXIST") {
      log(chalk.blue("folder Create sussess"));
    } else {
      throw "Flie create failed";
    }
  });
}

module.exports = { generateUrl, fileWrite };
