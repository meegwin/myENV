import Navbar from "./components/Navbar";
import "./App.scss";
import Weather from "./components/Weather";
import ChartWave from "./components/ChartWave";
function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <div className="home__screen">
        <div className="home__screen__top">
          <Weather />
        </div>
      </div>
      <div className="home__screen__bottom">
        <ChartWave />
      </div>
    </div>
  );
}

export default App;
