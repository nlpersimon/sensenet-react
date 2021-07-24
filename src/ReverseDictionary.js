import { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router";
import { useHistory } from "react-router";

const DefinitionInput = ({ setSenses }) => {
  const defContainer = useRef(null);
  const { q } = useParams();
  const history = useHistory();

  const submitDefinition = (e) => {
    if (e) {
      e.preventDefault();
    }
    fetch("http://troubadour.nlplab.cc:1487/parse_query", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: defContainer.current.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        fetch("http://troubadour.nlplab.cc:1487/camb_reverse", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            definition: results.definition,
            pos: results.pos,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((results) => {
            setSenses(results);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const defaultDefinition = "keep delaying";

  useEffect(() => {
    if (q) {
      defContainer.current.value = q;
      submitDefinition();
    } else {
      history.push(`/${defaultDefinition}`);
    }
  }, [q]);

  return (
    <section className="my-10">
      <form
        onSubmit={() => {
          history.push(`/${defContainer.current.value}`);
        }}
        className="flex border justify-center rounded-full bg-white w-3/5 ml-4 h-12 shadow-lg"
      >
        <input
          className="flex-1 px-2 mx-4 rounded-l-full focus:outline-none border-r"
          id="input-def"
          ref={defContainer}
          defaultValue={defaultDefinition}
        />
        <button
          className="bg-white text-xl text-blue-600 rounded-full mr-4"
          type="submit"
        >
          <BsSearch />
        </button>
      </form>
      <div className="flex justify-between transform -translate-y-4"></div>
    </section>
  );
};

const SenseResult = ({ sense }) => {
  //console.log(sense);
  const constructEnDefHtml = (sense) => {
    const highlight = new Set(sense.highlight);
    return sense.definition.en.split(" ").map((text, i) => {
      return highlight.has(i) ? (
        <span className="text-red-500" key={i}>
          {text}{" "}
        </span>
      ) : (
        text + " "
      );
    });
  };
  return (
    <article className="mb-8">
      <a
        href={`https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${sense.lemma}`}
      >
        {"dctionary.cambridge.org > "}
        <span className="text-gray-500">{sense.lemma}</span>
      </a>
      <h3 className="text-2xl text-blue-600">
        {sense.lemma}
        {sense.guideword && <span>&ensp;{sense.guideword}</span>}
        {sense.pos && (
          <span className="text-xl text-orange-500">&ensp;{sense.pos}</span>
        )}
      </h3>
      <p className="text-gray-600">
        {constructEnDefHtml(sense)}&ensp;{sense.definition.ch}
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
