import { pseudoRandomDate, pseudoRandomName } from "./faker";
import { shuffle } from "./utils";

async function fetchData(): Promise<GuessingElement[]> {
  let res = await fetch("data.json");
  let json = await res.json();

  return shuffle(
    json.map((e: any) => {
      return {
        productName: e.product_title,
        category: e.category,
        review: {
          title: e.review_title,
          text: e.review_text,
          username: pseudoRandomName(e.product_name + e.review_title),
          verified: e.verified == 1.0,
          date: pseudoRandomDate(e.product_name + e.review_title),
          rating: e.rating,
        },
        otherReviews: e.other_reviews.map((a: any) => ({
          title: a.review_title,
          text: a.review_text,
          username: pseudoRandomName(e.product_name + a.review_title),
          helpful: a.helpful,
          verified: a.verified,
          rating: a.rating,
          date: pseudoRandomDate(e.product_name + a.review_title),
        })),
        ratings: {
          rating1: e.rating1,
          rating2: e.rating2,
          rating3: e.rating3,
          rating4: e.rating4,
          rating5: e.rating5,
          rating_avg: e.rating_avg,
          rating_count: e.rating_count,
        },
        label: e.label, // true == fake
        prediction: e.prediction, // true == fake
      };
    })
  );
}

let data: GuessingElement[] | undefined = undefined;

let elementCounter = 0;
export async function getNextGuessingElement(): Promise<GuessingElement> {
  if (data === undefined) {
    data = await fetchData();
  }

  let element = data[elementCounter % data.length];
  elementCounter++;
  return element;
}

export type GuessingElement = {
  productName: string;
  ratings: ProductRatings;
  label: boolean;
  prediction: boolean;
  otherReviews: Review[];
  review: Review;
  category: string;
};

export type Review = {
  rating: number;
  title: string;
  text: string;
  username: string;
  verified: boolean;
  helpful?: boolean;
  date: Date;
};

export type ProductRatings = {
  rating_count: number;
  rating_avg: number;
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
};
