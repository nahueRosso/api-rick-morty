import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiSearch, BiCaretLeft,BiCaretRight } from "react-icons/bi";
import "./App.css";

function App() {
  const [urlApi,setUrlApi] = useState("https://rickandmortyapi.com/api/character/")
  const [api, setApi] = useState();
  const [filter, setFilter] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");
  const [numberPage, setNumberPage] = useState(1)
  const [circleColor,setCircleColor] = useState("")

  const refe = useRef()
  

 
  useEffect(() => {
  axios.get(`https://rickandmortyapi.com/api/character/?page=${numberPage}`).then((results) => {setApi(results.data)})
    

},[numberPage])

// console.log(refe.current.lastChild.children[1].firstChild.style.background)

    const arrowRight = () =>{
      setNumberPage(e=>e!=42?e+1:e=1)
    }
    const arrowLeft = () =>{
      setNumberPage(e=>e!=1?e-1:e=42)
    }

setTimeout(() => {
  
  refe.current.map(element => {
    console.log(element)
    
  });


}, 1000);    


  return (
    <>
      <h1>Rick and Morty character</h1>

      <div className="navbar">
        <div className="search deployed">
          <input
            placeholder="search for name"
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
          <BiSearch style={{fontSize:"1.5em",fill:"#888"}}/>
        </div>          

          <select name="listStatus" onChange={e=> setFilterStatus(e.target.value.toLowerCase())} className="Status deployed">
            <option value="" selected>all status</option>
            <option value="alive" >alive</option>
            <option value="dead">dead</option>
            <option value="unknown">unknown</option>
          </select>


          <select name="listSpecies" onChange={e=> setFilterSpecies(e.target.value.toLowerCase())} className="Species deployed">
            <option value="" selected>all species</option>
            <option value="Human" >Human</option>
            <option value="Alien">alien</option>
            <option value="Robot">robot</option>
          </select>
        
        {console.log(filterSpecies)}
      </div>



  <div className="cards" ref={refe}>
        {api.results
          .filter((result) => result.name.toLowerCase().includes(filter))
          .filter((result) => result.status.toLowerCase().includes(filterStatus))
          .filter((result) => result.species.toLowerCase().includes(filterSpecies))
          .map((result, index) => {         
            
            return (
              <div  className="containerCard" key={index}>
                <div className="containerImagen">
                  <img src={result.image} alt="" />
                </div>

                <div className="containerTexto">
                  <h2 className="nameCharacter">{result.name}</h2>
                  <h3 className="firsth3">
                    <div className="circle" style={result.status =="Dead"?{backgroundColor:"red"}:result.status == "alive"?{backgroundColor:"green"}:{backgroundColor:"grey"}
                    } ></div>
                    {result.status} - {result.species}
                  </h3>
                  <h4> last know location </h4>
                  <h3>{result.location.name}</h3>
                </div>
              </div>
            );
          })}
      </div>
 



     

      <div className="selecPages">
        <BiCaretLeft style={{fontSize:"2em",fill:"#ccc"}} onClick={arrowLeft}/>
          <input  className="numberPage" value={numberPage}/>
        <BiCaretRight style={{fontSize:"2em",fill:"#ccc"}} onClick={arrowRight}/>
      </div>
    </>
  );
}

export default App;
