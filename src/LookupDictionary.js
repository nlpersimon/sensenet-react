import { useState, useEffect } from "react";

const EntryView = ({ sense }) => {
  const { definition, examples, guideword, lemma, level, pos } = sense;
  if (!lemma || !definition) {
    return <></>;
  }
  return (
    <article>
      <header>
        <h1 className="text-2xl text-center font-bold">{lemma}</h1>
        <section className="flex justify-around mt-2 mb-8">
          <h2 className="text-lg">{pos}</h2>
          <h2 className="text-lg">{guideword}</h2>
          <h2 className="text-lg">{level}</h2>
        </section>
      </header>
      <section className="ml-4">
        <h1 className="text-xl font-semibold">Definition</h1>
        <div className="ml-4">
          <p className="my-2">{definition.en}</p>
          <p>{definition.ch}</p>
        </div>
        <h1 className="text-xl font-semibold mt-8">Examples</h1>
        <ul className="ml-8 list-disc">
          {examples.map((example) => {
            return (
              <li className="mb-2">
                <span>{example.en}</span>
                <br />
                <span>{example.ch}</span>
              </li>
            );
          })}
        </ul>
      </section>
      <footer className="ml-4">
        <a
          href={`https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${lemma}`}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          source: Cambridge
        </a>
      </footer>
    </article>
  );
};

const LookupDictionary = () => {
  const [sense, setSense] = useState({
    lemma: "",
    pos: "",
    level: "",
    definition: {
      en: "",
      ch: "",
    },
    examples: [],
  });
  const searchSense = () => {
    fetch("http://troubadour.nlplab.cc:1487/camb_lookup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sense: document.getElementById("input-sense").value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((sense) => {
        setSense(sense);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.getElementById("input-sense").value = "apple-noun-1";
    searchSense();
  }, []);
  return (
    <>
      <header className="mb-4">
        <h1 className="text-lg mt-8 ml-4">Dictionary</h1>
      </header>
      <div className="bg-white mx-4 rounded pb-2">
        <header className="flex justify-between pb-8">
          <div className="flex items-end">
            <input
              type="text"
              className="h-8 ml-4 w-11/12 px-2 border-2 border-gray-400 rounded"
              size="60"
              id="input-sense"
            />
          </div>
          <button
            id="search"
            className="h-8 text-center ml-2 bg-white text-green-600 border border-green-600 rounded px-2 mt-8 mr-4 hover:bg-green-600 hover:text-white transition duration-150"
            onClick={searchSense}
          >
            Search
          </button>
        </header>
        <EntryView sense={sense} />
      </div>
    </>
  );
};

export default LookupDictionary;
