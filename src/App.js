import './App.css';
import { Router } from '@reach/router';
import Hero from './components/Hero';
import StadiumsList from './components/StadiumsList';
import IndividualStadium from './components/IndividualStadium';

function App() {
  return (
    <div className="App">
      <Router>
        <Hero path="/" />
        <StadiumsList path="/countries/:country" />
        <IndividualStadium path="/stadiums/:stadiumId" />
      </Router>
    </div>
  );
}

export default App;
