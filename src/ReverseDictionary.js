import { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";

const DefinitionInput = ({ setSenses }) => {
  const defContainer = useRef(null);

  const submitDefinition = () => {
    fetch("http://troubadour.nlplab.cc:1487/camb_reverse", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        definition: defContainer.current.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        setSenses(results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    submitDefinition();
  }, []);

  return (
    <section className="my-10">
      <div className="flex border justify-center rounded-full bg-white w-3/5 ml-4 h-12 shadow-lg">
        <input
          className="flex-1 px-8 mx-4 rounded-full focus:outline-none"
          id="input-def"
          ref={defContainer}
          defaultValue="a round fruit with firm, white flesh and a green, red, or yellow
            skin"
        />
        <button
          className="bg-white text-xl text-green-600 rounded-full mr-4"
          onClick={submitDefinition}
        >
          <BsSearch />
        </button>
      </div>
      <div className="flex justify-between transform -translate-y-4"></div>
    </section>
  );
};

const SenseResult = ({ sense }) => {
  console.log(sense);
  return (
    <article className="mb-8">
      <a
        href={`https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${sense.lemma}`}
      >
        <span className="text-gray-500">{"dctionary.cambridge.org > "}</span>
        {sense.lemma}
      </a>
      <h3 className="text-2xl text-blue-600">{sense.lemma}</h3>
      <p>
        {sense.definition.en}
        <br />
        {sense.definition.ch}
      </p>
    </article>
  );
};

const ReverseResults = ({ senses }) => {
  return (
    <section>
      <div className="bg-white px-4 mx-4 mb-4 rounded pb-4">
        {senses.map((sense) => (
          <SenseResult sense={sense} key={sense.sense} />
        ))}
      </div>
    </section>
  );
};

const ReverseDictionary = ({ setSense }) => {
  const [senses, setSenses] = useState([]);
  return (
    <div className="ml-32">
      <DefinitionInput setSenses={setSenses} />
      <ReverseResults senses={senses} setSense={setSense} />
    </div>
  );
};

export default ReverseDictionary;
