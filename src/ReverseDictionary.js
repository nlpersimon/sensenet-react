import { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router";
import { useHistory } from "react-router";

const DefinitionInput = ({ setSensets }) => {
  const defContainer = useRef(null);
  const { q } = useParams();
  const history = useHistory();

  const submitDefinition = (e) => {
    if (e) {
      e.preventDefault();
    }
    fetch(`http://venom.nlplab.cc:9484/api/compound?compound=${encodeURIComponent(defContainer.current.value)}`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results)
        fetch(`http://venom.nlplab.cc:9484/api/rd?query=${encodeURIComponent(results.query)}&pos=${encodeURIComponent(results.pos)}`, {
          method: "GET",
          mode: "cors",
        })
          .then((response) => {
            return response.json();
          })
          .then((results) => {
            console.log(results);
            setSensets(results.message);
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
    return sense.en_def.split(" ").map((text, i) => {
      return highlight.has(i) ? (
        <span className="text-googleRed-500" key={i}>
          {text}{" "}
        </span>
      ) : (
        text + " "
      );
    });
  };
  const src = sense.source === 'cambridge' ? 'dictionary.cambridge.org' : 'wordnetweb.princeton.edu';
  return (
    <section className="mt-2">
      <a
        href={sense.source_url}
      >
        {`https://${src}`}
      </a>
      <p className="text-gray-600">
        {constructEnDefHtml(sense)}&ensp;{sense.ch_def}
      </p>
    </section>
  );
};

const SensetResult = ({ senset }) => {
  return (
    <article className="mb-8">
      <h3 className="text-2xl text-googleBlue-500">
        {senset.word}
        {senset.guideword && <span>&ensp;{senset.guideword}</span>}
        {senset.pos_norm && (
          <span className="text-xl text-orange-500">&ensp;{senset.pos_norm}</span>
        )}
        <span className="text-xl text-myPurple-500">&ensp;{senset.level}</span>
      </h3>
      {senset.senses.map((sense) => (
        <SenseResult sense={sense} key={sense.sense_id}/>
      ))}
    </article>
  )
}

const ReverseResults = ({ sensets }) => {
  return (
    <section>
      <div className="bg-white px-4 mx-4 mb-4 rounded pb-4">
        {sensets.map((senset) => (
          <SensetResult senset={senset.senset} key={senset.senset.senset_id} />
        ))}
      </div>
    </section>
  );
};

const ReverseDictionary = () => {
  const [sensets, setSensets] = useState([]);
  return (
    <div className="ml-32">
      <DefinitionInput setSensets={setSensets} />
      <ReverseResults sensets={sensets} />
    </div>
  );
};

export default ReverseDictionary;
