import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhonesGrid from "./components/PhonesGrid";
import Compare from "./components/Compare";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [phones, setPhones] = useState([]);
  const [compare, setCompare] = useState([]);

  useEffect(() => {
    fetch("smartphones.json")
      .then((response) => response.json())
      .then((data) => setPhones(data))
      .catch((error) => console.error("No results", error));
  }, []);

  const toggleCompare = (phoneId) => {
    setCompare((prev) =>
      prev.includes(phoneId)
        ? prev.filter((id) => id !== phoneId)
        : [...prev, phoneId]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <Router>
          <nav className="MainMenu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/compare">Compare</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <PhonesGrid
                  compare={compare}
                  phones={phones}
                  toggleCompare={toggleCompare}
                />
              }
            ></Route>
            <Route
              path="/compare"
              element={
                <Compare
                  compare={compare}
                  phones={phones}
                  toggleCompare={toggleCompare}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
