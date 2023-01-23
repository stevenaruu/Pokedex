import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IPokemon, IPokemonDetail, IStats } from "../../interfaces/IPokemon";

function PokemonDetail() {

    const placeHolder = {
        pokemon: { name: "Loading", id: "", sprite: "" },
        stats: [
            { baseStat: 0, statName: "" }
        ]
    }

    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemonStats, setPokemonStats] = useState<IPokemonDetail>(placeHolder);

    React.useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
            .then((response) => {
                setPokemonStats(
                    {
                        pokemon: { name: response.data.name, id: response.data.id, sprite: response.data.sprites.front_default },
                        stats: response.data.stats.map((stat: any, i: number) => {
                            return { baseStat: stat.base_stat, statName: stat.stat.name };
                        })

                    }
                )
            })
            .catch((reason) => {

            })
            .finally(() => {
                console.log(pokemonStats);
            });

    }, []);

    function capitalizeFirst(input: string) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    function goToHome() {
        navigate("/");
    }

    return (
        <div className="detail">
            <div className="container text-center mx-auto relative top-20 flex flex-col items-center">
                <div className="bg-amber-100 h-96 w-64 rounded drop-shadow-md p-4">
                    <div>
                        {capitalizeFirst(pokemonStats.pokemon.name)}
                    </div>
                    <div>
                        {pokemonStats.pokemon.id}
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <img src={pokemonStats.pokemon.sprite} alt="" width={100} height={100} />
                        </div>
                    </div>
                    <div>
                        Base Stats
                    </div>
                    <div>
                        {pokemonStats.stats.map((item, i) => {
                            return (
                                <div key={i}>
                                    {item.statName + " : " + item.baseStat}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="m-8">
                    <button type="button" onClick={goToHome} className="bg-amber-300 rounded py-2 px-3 text-white font-bold text-lg drop-shadow-md hover:bg-amber-400 transition ease-in-out delay-150 duration-150">Back to Home</button>
                </div>
            </div>
        </div>
    )
}
export default PokemonDetail;