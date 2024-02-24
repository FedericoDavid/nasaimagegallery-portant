import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import DetailsContainer from "./containers/DetailsContainer";

import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/details/:nasa_id" element={<DetailsContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
