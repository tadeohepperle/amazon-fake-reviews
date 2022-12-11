import axios from "axios";
import fss, { promises as fs } from "fs";
async function makeRequestForId(id) {
  const url = `https://www.amazon.com/dp/${id}`;
  let res = await axios.get(url, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,de;q=0.8,fr;q=0.7",
      Dnt: "1",
      "Sec-Ch-Ua":
        '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      "X-Amzn-Trace-Id": "Root=1-63904c7a-298486775e9464e36ce33254",
    },
  });
  //   console.log(res);
  if (res.status === 200) {
    if (res.data.indexOf("Type the characters you") != -1) {
      console.error("BLOCKED BY AMAZON");
      throw new Error("failed");
    }
    let html = res.data;
    return html;
  }
  if (res.status == 404) {
    throw "404";
  }
  throw new Error("failed");
}

function alreadyCached(id) {
  const filename = `data/html/${id}.html`;
  return fss.existsSync(filename);
}

function alreadyNotFound(id) {
  const filename = `data/notfound/${id}.txt`;
  return fss.existsSync(filename);
}

async function handleId(id) {
  try {
    if (alreadyCached(id)) {
      console.log(`skipping id: ${id} (prev success)`);
    } else if (alreadyNotFound(id)) {
      console.log(`skipping: id: ${id} (prev not found)`);
    } else {
      let html = await makeRequestForId(id);
      await wait(Math.random() * 400 + 100);
      await fs.writeFile(`data/html/${id}.html`, html, "utf-8");
      console.log(`scraped successfully: id: ${id}`);
    }
  } catch (ex) {
    if (ex == "404" || ex?.response?.status == 404) {
      console.log(`not found: id: ${id}`);
    } else {
      console.error(ex);
      console.log(`exception on id: ${id}`);
      await wait(5000);
    }
    await fs.writeFile(
      `data/notfound/${id}.txt`,
      ex?.response?.status.toString(),
      "utf-8"
    );
  }
}

function* batched(arr, batch_size) {
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push(arr[i]);
    if ((i + 1) % batch_size == 0) {
      yield temp;
      temp = [];
    }
  }
  yield temp;
}

async function main() {
  const allIds = (await fs.readFile("data/ids.txt", "utf-8")).split("\r\n");
  let gen = batched(allIds, 8);

  for (const batch of gen) {
    let all_promises = [];
    for (const id of batch) {
      all_promises.push(handleId(id));
    }
    await Promise.allSettled(all_promises);
  }
}

main();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
