
import './App.css';
import { Card } from './components/result/Destinations';
import {Search} from './components/search/Search';

function App() {
  return (
    <div className="App">
      <Search />
      <Card />
    </div>
  );
}

export default App;
