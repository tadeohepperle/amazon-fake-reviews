import { useEffect, useState } from "react";
import { getNextGuessingElement, GuessingElement } from "../functions/data";
import Game from "./Game";

let started = false;
const App = () => {
  let [initialGuessingElement, setInitialGuessingElement] = useState<
    GuessingElement | undefined
  >(undefined);
  useEffect(() => {
    if (!started) {
      started = true;
      getNextGuessingElement().then((e) => setInitialGuessingElement(e));
    }
  });

  if (initialGuessingElement != undefined) {
    return <Game initialGuessingElement={initialGuessingElement}></Game>;
  } else
    return (
      <div
        className="appear-later container mx-auto text-gray-700 mt-2 md:mt-4 p-4"
        style={{ maxWidth: 800 }}
      >
        <div className="mt-4 flex text-lg md:text-2xl font-bold "></div>
        <div className="animate-pulse text-center text-5xl font-bold p-4 md:mt-4 rounded-xl mb-4">
          Is this review real or fake?
        </div>
        <div className="surface animate-pulse h-20">Game is loading... </div>
      </div>
    );
};

export default App;
