import { useEffect, useState } from "react";
import List from "./List";
import "../css/PropertyPage.css";

function PropertyPage({ searchTerm, onFavourite, removeFavourite, favourites = { favourites } }) {
  // State for all houses fetched from JSON
  const [houses, setHouses] = useState([]);
  // Loading state while fetching data
  const [loading, setLoading] = useState(true);
  // Error state for failed network request
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the properties data from local JSON file
    fetch("/properties.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch properties"); // Handle bad response codes
        return res.json();
      })
      .then(data => {
        setHouses(data.properties); // Save properties into state
        setLoading(false);
      })
      .catch(err => {
        setError(err.message); // Save error message if failed
        setLoading(false);
      });
  }, []);

  // Display loading or error message if applicable
  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter houses by search term (type of property)
  const filteredHouses = houses.filter(house =>
    house.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Placeholder function for "See More" (no navigation)
  const seeMore = (house) => {
    console.log("See More clicked for:", house);
  };

  // Handle dropping a favourite into the remove zone
  const handleDropToRemove = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("houseToRemove");
    if (data) {
      const house = JSON.parse(data); // Convert dragged data back to object
      removeFavourite(house); // Remove from favourites
    }
  };

  // Allow drop event
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="Border properties-dropzone"
      onDrop={handleDropToRemove}
      onDragOver={handleDragOver}
    >
      {/* Page header showing number of filtered properties */}
      <div className="titles-container">
        <h1>Properties List</h1>
        <h2>Results: {filteredHouses.length}</h2>
      </div>

      {/* List component renders all filtered houses */}
      <List
        items={filteredHouses}
        emptyMessage="No properties found"
        renderItem={house => (
          <div
            className="property-card"
            draggable
            onDragStart={(e) => {
              // Attach house data to drag event
              e.dataTransfer.setData("house", JSON.stringify(house));
            }}
          >
            <div className="property-top">
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

                {/* Description */}
                <p className="description">
                  <strong>Description:</strong><br />{house.description}
                </p>

                {/* Date added */}
                <p>
                  <small>
                    Added: {house.added.month} {house.added.day}, {house.added.year}
                  </small>
                </p>

                {/* Favourite + See More buttons */}
                <div className="buttons">
                  <button
                    className={`fav-btn ${favourites.some(h => h.id === house.id) ? "disabled-btn" : ""}`}
                    onClick={() => onFavourite(house)}
                    disabled={favourites.some(h => h.id === house.id)}
                  >
                    {favourites.some(h => h.id === house.id) ? "Add to Favourites" : "Add to Favourites"}
                  </button>

                  {/* See More button now only logs click, no navigation */}
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
