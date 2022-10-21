import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiSearch, BiCaretLeft, BiCaretRight } from "react-icons/bi";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [api, setApi] = useState();
  const [filter, setFilter] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");
  const [numberPage, setNumberPage] = useState(1);


  useEffect(() => {
    const getResponse = async () => {
      try {
           const results = await axios.get(`https://rickandmortyapi.com/api/character/?page=${numberPage}`)

           setApi(results.data.results
            .filter((result) => result.name.toLowerCase().includes(filter))
            .filter((result) =>
              result.status.toLowerCase().includes(filterStatus)
            )
            .filter((result) =>
              result.species.toLowerCase().includes(filterSpecies)
            ))

            console.log(api);

      } catch(err) {
           console.log('err')
      }

    }
    getResponse()
    
  }, [numberPage,filterStatus ,filterSpecies,filter])

  const arrowRight = () => {
    setNumberPage((e) => (e != 42 ? e + 1 : (e = 1)));
  };
  const arrowLeft = () => {
    setNumberPage((e) => (e != 1 ? e - 1 : (e = 42)));
  };

  return (
    <>
      <h1 >Rick and Morty character</h1>

      <div className="navbar">
        <div className="search deployed">
          <input
            placeholder="search for name"
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
          <BiSearch style={{ fontSize: "1.5em", fill: "#888" }} />
        </div>

        <select
          name="listStatus"
          onChange={(e) => setFilterStatus(e.target.value.toLowerCase())}
          className="Status deployed"
        >
          <option value="" selected>
            all status
          </option>
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </select>

        <select
          name="listSpecies"
          onChange={(e) => setFilterSpecies(e.target.value.toLowerCase())}
          className="Species deployed"
        >
          <option value="" selected>
            all species
          </option>
          <option value="Human">Human</option>
          <option value="Alien">alien</option>
          <option value="Robot">robot</option>
        </select>

      </div>

      <div className="cards" >
        {api.map((result, index) => {
            return (
              <Card result={result} index={index} />
            );
          })}
      </div>

      <div className="selecPages">
        <BiCaretLeft
          // onKeyPress={arrowLeft}
          style={{ fontSize: "2em", fill: "#ccc" }}
          onClick={arrowLeft}
        />
        <input className="numberPage" value={numberPage} />
        <BiCaretRight
          // onKeyPress={arrowRight}
          style={{ fontSize: "2em", fill: "#ccc" }}
          onClick={arrowRight}
        />
      </div>
    </>
  );
}

export default App;
