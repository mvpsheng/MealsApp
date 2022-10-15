import './App.css'
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Search from './components/Search';
import Modal from './components/Modal';
import { useGlobalContext } from './context';
export default function App() {

  const {showModal} = useGlobalContext()
  
  return (
    <main>
      <Search/>
      {/*<Favourites />*/}
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}
