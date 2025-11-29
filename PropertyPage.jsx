import { useEffect, useState } from "react";
import "../css/PropertyPage.css";

// PropertyPage component: displays a list of properties, allows search filtering and adding to favourites
function PropertyPage({ searchTerm, onFavourite, removeFavourite, favourites = [] }) {
  const [houses, setHouses] = useState([]);       // Stores all properties fetched from JSON
  const [loading, setLoading] = useState(true);   // Loading state for fetch
  const [error, setError] = useState(null);       // Error state for fetch failures

  // Fetch properties from JSON file on component mount
  useEffect(() => {
    fetch("/properties.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then(data => {
        setHouses(data.properties); // Store fetched properties
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);       // Store error message if fetch fails
        setLoading(false);
      });
  }, []);

  // Display loading or error messages
  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter properties based on search term (matches property type)
  const filteredHouses = houses.filter(house =>
    house.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Border properties-container">
      {/* Header with page title and number of results */}
      <div className="titles-container">
        <h1>Properties List</h1>
        <h2>Results: {filteredHouses.length}</h2>
      </div>

      {/* Map over filtered houses and display each property */}
      {filteredHouses.map(house => (
        <div className="property-top" key={house.id}>
          {/* Property image */}
          <img
            src={house.picture}
            alt={house.type}
            className="property-image"
            draggable="false"
          />

          {/* Property details section */}
          <div className="property-details">
            <h2>{house.type}</h2>
            <p><strong>Bedrooms:</strong> {house.bedrooms}</p>
            <p><strong>Price:</strong> £{house.price}</p>
            <p><strong>Tenure:</strong> {house.tenure}</p>
            <p><strong>Location:</strong> {house.location}</p>
            <p className="description">
              <strong>Description:</strong><br/>{house.description}
            </p>
            <p>
              <small>Added: {house.added.month} {house.added.day}, {house.added.year}</small>
            </p>

            {/* Buttons for favourites and additional details */}
            <div className="buttons">
              {/* Add to Favourites button: disabled if property is already in favourites */}
              <button
                className={`fav-btn ${favourites.some(h => h.id === house.id) ? "disabled-btn" : ""}`}
                onClick={() => onFavourite(house)}
                disabled={favourites.some(h => h.id === house.id)}
              >
                Add to Favourites
              </button>

              {/* See More button: currently calls seeMore function (not yet implemented) */}
              <button className="details-btn" onClick={() => seeMore(house)}>
                See More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyPage;
