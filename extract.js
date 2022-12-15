// extract useful data from amazon html:
import fss, { promises as fs, readFileSync } from "fs";
import { parse } from "json2csv";

function extract(html) {
  let data = {
    rating_avg: undefined,
    reviews: [],
  };
  // title:
  {
    let regex = /(?<=<span id="productTitle")((.|\n|\r)*?)(?=<\/span>)/;
    let found = html.match(regex);
    let title = found?.[1];
    data.title = title.split(">")[1].trim();
  }
  // // price:
  // {
  //   let regex = /(?<=<span id="priceblock)((.|\n|\r)*?)(?=<\/span>)/;
  //   let found = html.match(regex);
  //   let price = found?.[1];
  //   if (price) {
  //     price = price.split(">")[1].trim().substring(1);
  //     data.price = parseFloat(price);
  //   }
  // }
  // avg rating:
  {
    let regex =
      /<span data-hook="rating-out-of-text" class="a-size-medium a-color-base"\s*>(.+) out of 5/;
    let found = html.match(regex);
    let ratingStr = found?.[1];
    if (ratingStr) {
      let rating = parseFloat(ratingStr);
      if (!isNaN(rating)) {
        data.rating_avg = rating;
      }
    }
  }
  // ratings for each bracket:
  {
    for (let i of [1, 2, 3, 4, 5]) {
      let regex = new RegExp(`${i} stars represent (\\d+)% of rating`);
      let found = html.match(regex);
      let ratingStr = found?.[1];
      if (ratingStr) {
        let rating = parseFloat(ratingStr);
        if (!isNaN(rating)) {
          data[`rating${i}`] = rating / 100;
        }
      } else {
        data[`rating${i}`] = 0.0;
      }
    }
  }

  // total rating count
  {
    let regex = /([\d|,]+) global ratings/;
    let found = html.match(regex);
    let countStr = found?.[1];
    if (countStr) {
      let c = parseInt(countStr.replaceAll(",", ""));
      if (!isNaN(c)) {
        data[`rating_count`] = c;
      }
    }
  }

  // reviews:
  {
    let regex = /(?<=data-hook="review")((.|\n|\r)*?)(?=Helpful<\/div)/g; //
    let matches = html.matchAll(regex);
    for (var m of matches) {
      let text = m[1];
      // find other things in here...
      let verified_purchase = text.indexOf("Verified Purchase") != -1;
      let regextitle =
        /(?<=data-hook="review-title")((.|\n|\r)*?)<span>((.|\n|\r)*?)(?=<\/span>)/;
      let title = text.match(regextitle)?.[3];

      let regexcontent =
        /(?<=data-hook="review-collapsed")((.|\n|\r)*?)<span>((.|\n|\r)*?)(?=<\/span>)/;
      let content = text.match(regexcontent)?.[3]?.replaceAll("<br />", "");

      let helpfulregex = />(\d+) people found this helpful/;

      let helpful = text.match(helpfulregex)?.[1];
      if (helpful) {
        helpful = parseInt(helpful);
      }

      let rating = null;
      if (text.indexOf("a-star-5") != -1) {
        rating = 5.0;
      } else if (text.indexOf("a-star-4") != -1) {
        rating = 4.0;
      } else if (text.indexOf("a-star-3") != -1) {
        rating = 3.0;
      } else if (text.indexOf("a-star-2") != -1) {
        rating = 2.0;
      } else if (text.indexOf("a-star-1") != -1) {
        rating = 1.0;
      }

      data.reviews.push({
        title,
        verified_purchase,
        content,
        rating,
        helpful: helpful || 0,
      });
    }
  }
  return data;
}

async function main() {
  let files = await fs.readdir("data/html/");
  const PRODUCTCOLUMNS = [
    "id",
    "title",
    "rating_count",
    "rating_avg",
    "rating1",
    "rating2",
    "rating3",
    "rating4",
    "rating5",
  ];
  const REVIEWCOLUMNS = [
    "id",
    "title",
    "rating_count",
    "rating_avg",
    "rating1",
    "rating2",
    "rating3",
    "rating4",
    "rating5",
    "helpful",
    "verified_purchase",
    "content",
    "rating",
  ];
  const productsFilename = "data/products_scraped.csv";
  const productReviewsFilename = "data/product_reviews_scraped.csv";
  await fs.writeFile(
    productsFilename,
    parse({}, { fields: PRODUCTCOLUMNS }),
    "utf-8"
  );
  await fs.writeFile(
    productReviewsFilename,
    parse({}, { fields: REVIEWCOLUMNS }),
    "utf-8"
  );
  let counter = 0;
  for (const f of files) {
    let id = f.split(".")[0];
    let html = readFileSync(`data/html/${f}`, "utf-8");
    let data = extract(html);
    data.id = id;

    // console.log(data.title, data.helpful);
    let reviews_batch = [];
    for (const r of data.reviews) {
      reviews_batch.push({
        ...r,
        id: data.id,
        rating_count: data.rating_count,
        rating_avg: data.rating_avg,
        rating1: data.rating1,
        rating2: data.rating2,
        rating3: data.rating3,
        rating4: data.rating4,
        rating5: data.rating5,
      });
    }
    await fs.appendFile(
      productReviewsFilename,
      "\n" + parse(reviews_batch, { fields: REVIEWCOLUMNS, header: false }),
      "utf-8"
    );

    await fs.appendFile(
      productsFilename,
      "\n" + parse(data, { fields: PRODUCTCOLUMNS, header: false }),
      "utf-8"
    );

    counter++;
    if (counter % 100 == 0) {
      console.log(`${counter}/${files.length} files processed...`);
    }
  }

  // console.log(files);

  // let s = fss.readFileSync("test.html", "utf-8");
  // let e = extract(s);
  // console.log(e);

  // let c = parse(
  //   { cool: 2, s: `'I "am" liking this` },
  //   { fields: ["s", "cool", "aaa"], header: false }
  // );
  // console.log(c);
}

main();
