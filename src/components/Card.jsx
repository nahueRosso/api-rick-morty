import React from 'react'
import "../App.css";


const Card = ({result,index}) => {
  return (
    <>
      <div className="containerCard" key={index}>
                <div className="containerImagen">
                  <img src={result.image} alt="" />
                </div>

                <div className="containerTexto">
                  <h2 className="nameCharacter">{result.name}</h2>
                  <h3 className="firsth3">
                    <div
                      className="circle"
                      style={
                        result.status == "Dead"
                          ? { backgroundColor: "#ff0000" }
                          : result.status == "Alive"
                          ? { backgroundColor: "#02fc4d" }
                          : { backgroundColor: "#4e4e4e" }
                      }
                    ></div>
                    {result.status} - {result.species}
                  </h3>
                  <h4> last know location </h4>
                  <h3>{result.location.name}</h3>
                </div>
              </div>
    </>
  )
}

export default Card
