import { Routes, Route } from 'react-router-dom';
import PokemonList from './components/pokemon_list';
import PokemonDetail from './components/pokemon_detail';

function App() {
  return(

    <Routes>
      <Route path='/' element={<PokemonList />}/>
      <Route path='/detail/:id' element={<PokemonDetail />} />
    </Routes>

  )
}

export default App;