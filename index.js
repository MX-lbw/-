const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { generateUrl, fileWrite } = require("./utils/generateUrl");
const start = require("./utils/reptile");

async function writeFile(url) {
  //创建文件夹
  fileWrite();
  let imgUrl = await start(url);
  console.log(imgUrl);
  imgUrl.forEach(async (item) => {
    let flieSavePath = path.join(
      __dirname,
      `images/${path.basename(item.imgUrl)}`
    );
    let { data: result } = await axios({
      url: item.imgUrl,
      method: "get",
      responseType: "stream",
    });
    let stream = fs.createWriteStream(flieSavePath, { autoClose: true });
    result.pipe(stream);
  });
}
writeFile();
