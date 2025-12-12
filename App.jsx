import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchPage from "./components/SearchPage";
import PropertyPage from "./components/PropertyPage";
import PropertyDetailsPage from "./components/PropertyDetailsPage";
import Favorites from "./components/Favourite";
import Header from "./components/header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ LOAD favourites from localStorage
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE favourites whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // --- Filters state ---
  const [filters, setFilters] = useState({
    type: "Any",
    minPrice: "Any",
    maxPrice: "Any",
    minBedrooms: "Any",
    maxBedrooms: "Any",
    addedAfter: "",
    addedBefore: "",
    postcode: "",
  });

  // ✅ Add favourite
  const addFavourite = (house) => {
    setFavourites((prev) =>
      prev.some((h) => h.id === house.id) ? prev : [...prev, house]
    );
  };

  // ✅ Remove favourite
  const removeFavourite = (house) => {
    setFavourites((prev) =>
      prev.filter((h) => h.id !== house.id)
    );
  };

  // ✅ Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
    localStorage.removeItem("favourites");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <> 
              <Header/>
              <SearchPage
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
              />

              <div className="Border app-container">
                <div className="properties-column">
                  <PropertyPage
                    searchTerm={searchTerm}
                    filters={filters}
                    onFavourite={addFavourite}
                    removeFavourite={removeFavourite}
                    favourites={favourites}
                  />
                </div>

                <div className="favourites-column">
                  <Favorites
                    FavouriteHouses={favourites}
                    removeFavourite={removeFavourite}
                    clearFavourites={clearFavourites}
                    onDropProperty={addFavourite}
                  />
                </div>
              </div>
              <Footer/>
            </>
          }
       
        />

        <Route path="/property/:id" element={<PropertyDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
