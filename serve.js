const express = require("express");
// const https = require("https");
const app = express();
// 本地模拟https
// const fs = require("fs");
// const options = {
//   key: fs.readFileSync("C:\\Run the Program\\liveserver_https\\certkey.pem"),
//   cert: fs.readFileSync("C:\\Run the Program\\liveserver_https\\fullchain.pem"),
// };
// https
//   .createServer(options, app)
//   .listen(3645, () => console.log(`App listening on port ${3645}!`));

// 处理history
const history = require("connect-history-api-fallback");
// 反向代理
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(history());
app.use(express.static(__dirname + "/dist"));

// 反代
app.use(
  "/api",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://gmall-h5-api.atguigu.cn/api",
  })
);
// 图片资源反代
app.use(
  "/portalImg",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://39.98.123.211",
  })
);

app.use(
  "/portalImg_9000",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://139.198.127.41:9000",
  })
);
// 监听3645端口
app.listen("3645", (err) => {
  if (err) console.warn(err);
  console.log("前台系统运行成功……");
});
