import fs from "fs";

let ids = fs.readFileSync("data/ids.txt", "utf-8").split("\r\n");
for (let id of ids) {
  let f = `data/html/${id}.html`;
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, "utf-8");
    console.log("read", id);
    if (html.indexOf("Type the characters you") != -1) {
      fs.unlinkSync(f);

      console.log("deleted", id);
    }
  }
}
