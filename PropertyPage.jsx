// PropertyPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "./List";
import "../css/PropertyPage.css";

function PropertyPage({ searchTerm, filters = {}, onFavourite, removeFavourite, favourites = [] }) {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/properties.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then(data => {
        setHouses(data.properties);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

  // Helper to parse prices
  const parsePrice = str => {
    if (!str || str === "Any") return null;
    return Number(str.replace(/[^0-9]/g, ""));
  };

  // Helper to parse bedrooms
  const parseBeds = str => {
    if (!str || str === "Any") return null;
    return Number(str.replace("+", ""));
  };

  // Filter houses
  const filteredHouses = houses.filter(house => {
    // Type filter
    if (filters.type && filters.type !== "Any" && house.type !== filters.type) return false;

    // Price filters
    const housePrice = Number(house.price);
    const minPrice = parsePrice(filters.minPrice);
    const maxPrice = parsePrice(filters.maxPrice);
    if (minPrice !== null && housePrice < minPrice) return false;
    if (maxPrice !== null && housePrice > maxPrice) return false;

    // Bedroom filters
    const houseBeds = Number(house.bedrooms);
    const minBeds = parseBeds(filters.minBedrooms);
    const maxBeds = parseBeds(filters.maxBedrooms);
    if (minBeds !== null && houseBeds < minBeds) return false;
    if (maxBeds !== null && houseBeds > maxBeds) return false;

    // Postcode / location filter
// Postcode / location filter
// Postcode / location filter
if (filters.postcode && filters.postcode.trim() !== "") {
  const search = filters.postcode.toLowerCase();
  const postcode = house.postcode.toLowerCase();
  const location = house.location.toLowerCase();

  // Show house if postcode starts with input OR location contains input
  if (!postcode.startsWith(search) && !location.includes(search)) return false;
}
  


    // Search term filter
    if (searchTerm && searchTerm.trim() !== "" &&
        !house.type.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true; // passed all filters
  });

  // Navigate to property details
  const seeMore = (house) => navigate(`/property/${house.id}`);

  // Drag & drop for removing favourites
  const handleDropToRemove = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("houseToRemove");
    if (data) {
      const house = JSON.parse(data);
      removeFavourite(house);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="Border properties-dropzone"
      onDrop={handleDropToRemove}
      onDragOver={handleDragOver}
    >
      <div className="titles-container">
        <h1>Properties List</h1>
        <h2>Results: {filteredHouses.length}</h2>
      </div>

      <List
        items={filteredHouses}
        emptyMessage="No properties found"
        renderItem={house => (
          <div
            className="property-card"
            draggable
            onDragStart={(e) => {
              if (favourites.some(h => h.id === house.id)) {
                alert("This property is already in your favourites!");
                e.preventDefault();
                return;
              }
              e.dataTransfer.setData("house", JSON.stringify(house));
            }}
          >
            <div className="property-top">
              <img
                src={house.picture}
                alt={house.type}
                className="property-image"
                draggable="false"
              />
              <div className="property-details">
                <h2>{house.type}</h2>
                <p><strong>Bedrooms:</strong> {house.bedrooms}</p>
                <p><strong>Price:</strong> £{house.price}</p>
                <p><strong>Tenure:</strong> {house.tenure}</p>
                <p><strong>Location:</strong> {house.location}</p>
                <p className="description"><strong>Description:</strong><br />{house.description}</p>
                <p><small>Added: {house.added.month} {house.added.day}, {house.added.year}</small></p>
                <div className="buttons">
                  <button
                    className={`fav-btn ${favourites.some(h => h.id === house.id) ? "disabled-btn" : ""}`}
                    onClick={() => onFavourite(house)}
                    disabled={favourites.some(h => h.id === house.id)}
                  >
                    {favourites.some(h => h.id === house.id) ? "Added to Favourites" : "Add to Favourites"}
                  </button>
                  <button className="details-btn" onClick={() => seeMore(house)}>
                    See More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default PropertyPage;
