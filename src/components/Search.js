import React, { useEffect, useState, useRef } from "react";
import Button from '@material-ui/core/Button';
import "../App.css";


const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const clearInput = useRef("");
  const [listTodisplay, setlistTodisplay] = useState([]);




  useEffect(() => {
    const pokemon = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    Promise.all(promises).then(pokemonArr => {
      return pokemonArr.map(value =>
        value
          .json()
          .then(({ name, sprites: { front_default: sprite } }) =>
            pokemon.push({ name, sprite })
          )
      );
    });
    setOptions(pokemon);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setDisplay(false);
    setlistTodisplay([...listTodisplay, poke]);

  };

  const keyPressed = e => {
    if(e.key === "Enter")

    setlistTodisplay([...listTodisplay, e.target.value]);

  };

  const handleDelete = name => {
    const newList = listTodisplay.filter((poke)=>poke.toString() !== name)
    setlistTodisplay(newList)

  } 

  const handleInput = name =>{
      setDisplay(!display)
      setSearch("")
  
  } 



  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <div className="container-input-tags">

        {listTodisplay.map((pokemon) =><Button className="pick" variant="contained" color="primary" info={pokemon} 
          key={Math.random}>{pokemon.toString()}<span className="close" onClick={()=>handleDelete(pokemon.toString())}>x</span></Button>)}

      <input
        id="auto"
       ref={clearInput}
        onClick={handleInput}
        placeholder="Type to search"
        value={search}
        onKeyDown={keyPressed}
        onChange={event => setSearch(event.target.value)}
      />
      </div>

      {display && (
        <div className="autoContainer">
          {options
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                ref={clearInput}
                  onClick={() => updatePokeDex(value.name)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.name}</span>
                  <img src={value.sprite} alt="pokemon" />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Auto;