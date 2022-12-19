import fs from "fs";

let json = JSON.parse(fs.readFileSync("public/data.json", "utf-8"));

let j = 0;
let i = 0;
for (let js of json) {
  console.log(j);
  if (js.prediction == js.label) {
    i++;
  }
  j++;
}

console.log(i, j);
