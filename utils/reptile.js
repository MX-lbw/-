const pt = require("puppeteer");
async function start(url) {
  //1.打开浏览器
  const browser = await pt.launch({
    headless: false, //开启无头报错
    slowMo: 500,
    // devtools: true,
    ignoreDefaultArgs: ["--enable-automation"], //关闭提示 受到自动测试软件控制
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const imgUrlData = [];
  for (let j = 0; j < url.length; j++) {
    const pages = await browser.newPage();

    await pages.goto(url[j], {
      timeout: 30 * 1000,
      waitUntil: "networkidle2",
    });

    //await pages.waitForNavigation();
    const result = await pages.evaluate(() => {
      let urlData = [];
      //处理反爬;
      Object.defineProperty(navigator, "webdriver", {
        get: () => false,
      });
      let elements = $(".element-list-container .element-item");
      elements.each((index, item) => {
        const el = $(item).find("a");
        const info = $(item).find(".element-box").find(".element-title");
        const itemData = {
          title: info
            .find("a")
            .text()
            .match(/[\u4e00-\u9fa5]/g)
            .join(""),
          imgUrl: el.find("img").prop("src"),
        };
        urlData.push(itemData);
      });
      return urlData;
    });
    imgUrlData.push(result);
  }
  console.log(imgUrlData);
  const mergedResults = [].concat.apply([], imgUrlData);
  await browser.close();
  return mergedResults;
}

module.exports = start;
