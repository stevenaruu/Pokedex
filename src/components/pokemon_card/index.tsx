import { XMarkIcon } from '@heroicons/react/24/solid'
import { IPokemon } from "../../interfaces/IPokemon";

interface IPokemonCardProps {
  index: number
  pokemon: IPokemon
  deletedPokemon: (index: number) => void
  goToDetail: any
}

interface IPokemonState {

}

function PokemonCard(props: IPokemonCardProps) {
  return (
    <div className='bg-amber-100 h-72 w-52 rounded drop-shadow-md p-4 m-4'>
      <div className='flex justify-end'>
        <XMarkIcon onClick={ () => props.deletedPokemon(props.index)} width={20} height={20} className='cursor-pointer hover:text-neutral-400 active:text-black transition ease-in-out delay-150 duration-150'/>
      </div>
      <div onClick={() => props.goToDetail(props.pokemon.id)}>
        {props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1).toLowerCase()}
      </div>
      <div onClick={() => props.goToDetail(props.pokemon.id)}>
        {props.pokemon.id}
      </div>
      <div onClick={() => props.goToDetail(props.pokemon.id)}>
        <img src={props.pokemon.sprite} alt='' width={250} height={250} />
      </div>
    </div>
  )
}

export default PokemonCard