import fs from "fs";
let html = fs.readFileSync("dist/index.html", "utf-8");
html = html.replaceAll(`="/`, `="./`);
fs.writeFileSync("dist/index.html", html, "utf-8");
