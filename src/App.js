
import './App.css';
import { Destinations } from './components/result/Destination';
import {Search} from './components/search/Search';

function App() {
  return (
    <div className="App">
      <Search />
      <Destinations />
    </div>
  );
}

export default App;
