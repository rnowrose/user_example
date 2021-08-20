import DisplayPage from './components/DisplayPage'
import NavBar from './components/NavBar';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
      </div>
      <DisplayPage />

    </div>
  );
}

export default App;
