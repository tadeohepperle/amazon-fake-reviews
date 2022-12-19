import { useState } from "react";
import { getNextGuessingElement, GuessingElement } from "../functions/data";
import AmazonReviewsSummary from "./AmazonReviewsSummary";
import CustomerReview from "./CustomerReview";

const arrow = {
  viewBox: "0 0 384 512",
  d: "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z",
};

type Props = {
  initialGuessingElement: GuessingElement;
};

type GuessingState =
  | { type: "loading" }
  | { type: "done"; chosen_fake: boolean }
  | { type: "guessing" };

let nextButtonLock = false;

const Game = (props: Props) => {
  let [scores, setScores] = useState<[number, number]>([0, 0]);
  let [guessingState, setGuessingState] = useState<GuessingState>({
    type: "guessing",
    // type: "done",
    // chosen_fake: false,
  });
  let [guessingElement, setGuessingElement] = useState<GuessingElement>(
    props.initialGuessingElement
  );

  let belowReviewBoard: JSX.Element = <div></div>;
  switch (guessingState.type) {
    case "loading": {
      belowReviewBoard = <div className="animation-pulse">loading</div>;
      break;
    }
    case "done": {
      belowReviewBoard = (
        <div className="flex flex-wrap py-4 px-1 items-center">
          <div className="block">
            <div className="appear-1 flex items-center ">
              <span className="text-3xl font-mono">You think:</span>
              <div
                className={`bg-white ${
                  guessingState.chosen_fake ? "text-red-400" : "text-green-400"
                } text-3xl font-bold ml-3 p-2 px-3 rounded-lg shadow`}
              >
                {guessingState.chosen_fake ? "FAKE" : "REAL"}
              </div>
              <span className="text-xl font-bold text-gray-400 ml-3">
                {guessingState.chosen_fake == guessingElement.label
                  ? "+1"
                  : "+0"}
              </span>
            </div>
            <div className="appear-2 flex items-center mt-4">
              <span className="text-3xl font-mono">AI thinks:</span>
              <div
                className={`bg-white ${
                  guessingElement.prediction ? "text-red-400" : "text-green-400"
                } text-3xl font-bold ml-3 p-2 px-3 rounded-lg shadow`}
              >
                {guessingElement.prediction ? "FAKE" : "REAL"}
              </div>
              <span className="text-xl font-bold text-gray-400 ml-3">
                {guessingElement.prediction == guessingElement.label
                  ? "+1"
                  : "+0"}
              </span>
            </div>
          </div>
          <div className="block flex-grow">
            <div className="appear-3 mt-5 md:mt-0 flex items-center justify-center md:justify-end ">
              <button
                onClick={async () => {
                  if (nextButtonLock) return;
                  nextButtonLock = true;
                  let nextElement = await getNextGuessingElement();
                  setGuessingElement(nextElement);
                  setGuessingState({ type: "guessing" });
                  nextButtonLock = false;
                }}
                className="flex items-center hover:scale-110 hover:[color_#ffa41c] text-gray-700 text-3xl font-bold py-2 px-4 rounded-xl button"
              >
                NEXT REVIEW
                <svg
                  height="24px"
                  width="24px"
                  className="rotate-90 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={arrow.viewBox}
                >
                  <path className={"fill-gray-700"} d={arrow.d} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      );
      break;
    }
    case "guessing": {
      belowReviewBoard = (
        <div className="flex align-middle justify-center md:py-6">
          <button
            onClick={() => {
              let newScores: [number, number] = [scores[0], scores[1]];
              if (guessingElement.label == guessingElement.prediction)
                newScores[1]++;
              if (!guessingElement.label) newScores[0]++;
              setScores(newScores);
              setGuessingState({ type: "done", chosen_fake: false });
            }}
            className="appear-0 bg-green-400 hover:scale-110 hover:bg-green-500 text-white text-4xl font-bold py-2 px-4 rounded-xl button mx-3"
          >
            REAL
          </button>
          <button
            onClick={() => {
              let newScores: [number, number] = [scores[0], scores[1]];
              if (guessingElement.label == guessingElement.prediction)
                newScores[1]++;
              if (guessingElement.label) newScores[0]++;
              setScores(newScores);
              setGuessingState({ type: "done", chosen_fake: true });
            }}
            className="appear-0 bg-red-400 hover:scale-110 hover:bg-red-500 text-white text-4xl font-bold py-2 px-4 rounded-xl button mx-3"
          >
            FAKE
          </button>
        </div>
      );
      break;
    }
  }

  return (
    <div
      className="container mx-auto text-gray-700 mt-2 md:mt-4 p-4"
      style={{ maxWidth: 800 }}
    >
      <div className="mt-4 flex text-lg md:text-2xl font-bold ">
        <div className="flex-grow  flex justify-center items-center">
          <div>Your score: </div>
          <div className="ml-4 bg-gray-700 text-white rounded-xl py-2 px-4 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]">
            {scores[0]}
          </div>
        </div>
        <div className="flex-grow flex justify-center items-center">
          <div>AI score: </div>
          <div className="ml-4 bg-gray-700 text-white rounded-xl py-2 px-4 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]">
            {scores[1]}
          </div>
        </div>
      </div>
      <div className=" text-center text-5xl font-bold p-4 md:mt-4 rounded-xl mb-4">
        Is this review real or fake?
      </div>
      <div className="surface relative">
        <CustomerReview {...guessingElement.review}></CustomerReview>
        {guessingState.type == "done" && (
          <div
            className="absolute top-0 right-0  -translate-x-8
            translate-y-8
            rotate-12"
          >
            <div
              className={`bg-white ${
                guessingElement.label
                  ? "text-red-400 border-red-400 bg-red-100"
                  : "text-green-400 border-green-400 bg-green-100"
              } 
            appear-smash
            border-4 bg-opacity-80 text-5xl font-bold ml-3 p-2 px-3 rounded-lg shadow`}
            >
              {guessingElement.label ? "FAKE" : "REAL"}
            </div>
          </div>
        )}
      </div>

      <div className="my-5">{belowReviewBoard}</div>

      <div className="surface mb-4 font-bold text-xl">
        {guessingElement.productName} <br></br>
        <span className="text-gray-400 font-normal text-lg">
          Category: {guessingElement.category}
        </span>
      </div>
      <div className="flex justify-center items-start flex-wrap md:flex-nowrap">
        <div className="surface">
          <AmazonReviewsSummary
            {...guessingElement.ratings}
          ></AmazonReviewsSummary>
        </div>
        <div className="surface flex-grow ml-0 md:ml-4 md:mt-0 mt-4">
          {guessingElement.otherReviews.map((r, i) => (
            <div className="mb-4" key={i}>
              <CustomerReview {...r}></CustomerReview>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
