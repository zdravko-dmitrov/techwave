import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhonesGrid from "./components/PhonesGrid";
import Compare from "./components/Compare";
import ErrorPopup from "./components/ErrorPopup";
import ImageSlider from "./components/ImageSlider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [phones, setPhones] = useState([]);
  const [compare, setCompare] = useState([]);
  const [compareError, setCompareError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetch("smartphones.json")
      .then((response) => response.json())
      .then((data) => setPhones(data))
      .catch((error) => console.error("No results", error));
  }, []);

  const toggleCompare = (phoneId) => {
    setCompareError("");
    setIsPopupOpen(false);

    setCompare((prev) => {
      if (prev.includes(phoneId)) {
        return prev.filter((id) => id !== phoneId);
      } else if (prev.length < 2) {
        return [...prev, phoneId];
      } else {
        setCompareError("You can compare only 2 phones");
        setIsPopupOpen(true);
        return prev;
      }
    });
  };

  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <h1>Image Slider Example</h1>
        <ImageSlider />
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

          {}
          {isPopupOpen && (
            <ErrorPopup
              message={compareError}
              onClose={() => setIsPopupOpen(false)}
            />
          )}

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
