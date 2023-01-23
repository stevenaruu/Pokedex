import React, { useState, useRef } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import PokemonCard from "../pokemon_card";
import { IPokemon } from "../../interfaces/IPokemon";
import axios from "axios";


function PokemonList() {

    const temporaryListPokemon = [
        {
            name: "Bellsprout",
            id: "69",
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png"
        }
    ]

    const [listPokemon, setListPokemon] = useState<IPokemon[]>(temporaryListPokemon);
    const [inputPokemonName, setInputPokemonName] = useState("");
    const [errorFlag, setErrorFlag] = useState<boolean>(false)

    const navigate = useNavigate();

    function buttonSubmitHandler() {

        axios.get("https://pokeapi.co/api/v2/pokemon/" + inputPokemonName.toLowerCase())
            .then((response) => {
                setErrorFlag(false)
                setListPokemon(
                    [
                        ...listPokemon,
                        {
                            name: response.data.name,
                            id: response.data.id,
                            sprite: response.data.sprites.front_default
                        }
                    ]
                )
            })
            .catch((reason) => {
                setErrorFlag(true)
            })
    }

    function deletePokemon(index: number) {
        const listPokemonAfterDeleted = listPokemon.filter((item, i) => i !== index)
        setListPokemon(listPokemonAfterDeleted)
    }

    function goToPokemonDetail(pokemonId: number) {
        navigate("/detail/" + pokemonId)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            buttonSubmitHandler()
        }
      };

    return (
        <div className='home'>
            <div className="container mx-auto text-center">
                <div className='flex flex-col justify-center relative top-2'>
                    <label htmlFor="search" className='text-white stroke-amber-300 font-bold text-3xl drop-shadow-md'>Search Pokémon!</label>
                    <div className='flex justify-center gap-5 mt-1 text-center'>
                        <input className='shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md' type="text" id="search" onChange={(e) => { setInputPokemonName(e.target.value) }} onKeyDown={handleKeyDown} />
                        <button className='bg-amber-300 rounded py-2 px-3 text-white font-bold text-lg drop-shadow-md transition ease-in-out delay-150 duration-150 hover:bg-amber-400' onClick={buttonSubmitHandler}>SEARCH!</button>
                    </div>
                    {errorFlag && <div className='text-white mt-2'>Pokémon doesnt exists</div>}
                    <div>
                        <div className='flex justify-center flex-wrap'>
                            {
                                listPokemon.map((item, i) => {
                                    return (
                                        <PokemonCard key={i} index={i} pokemon={item} deletedPokemon={deletePokemon} goToDetail={goToPokemonDetail} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PokemonList