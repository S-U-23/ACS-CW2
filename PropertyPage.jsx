// PropertyPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "./List";
import "../css/PropertyPage.css";

// Main component to display property listings
function PropertyPage({ searchTerm, filters = {}, onFavourite, removeFavourite, favourites = [] }) {
  // State for storing the properties fetched from JSON
  const [houses, setHouses] = useState([]);
  // Loading indicator
  const [loading, setLoading] = useState(true);
  // Store any fetch errors
  const [error, setError] = useState(null);
  // React Router function to navigate programmatically
  const navigate = useNavigate();

  // Fetch properties.json once on component mount
  useEffect(() => {
    fetch("/properties.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then(data => {
        // Store the properties in state and stop loading
        setHouses(data.properties);
        setLoading(false);
      })
      .catch(err => {
        // If fetch fails, store the error message
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array = run only once

  // Show loading text if data is still fetching
  if (loading) return <p>Loading properties...</p>;
  // Show error message if fetch failed
  if (error) return <p>Error: {error}</p>;

  // Helper function to convert price string (like "£750,000") to number
  const parsePrice = (str) => {
    if (!str || str === "Any") return null; // No filter selected
    return Number(str.replace("£", "").replace(",", ""));
  };

  // Helper function to convert bedroom filter (like "3+") to number
  const parseBeds = str => {
    if (!str || str === "Any") return null; // No filter selected
    return Number(str.replace("+", ""));
  };

  // Filter houses based on the active filters and search term
  const filteredHouses = houses.filter(house => {
    // ----- TYPE FILTER -----
    if (filters.type && filters.type !== "Any" && house.type !== filters.type) return false;

    // ----- PRICE FILTER -----
    const housePrice = Number(house.price);
    const minPrice = parsePrice(filters.minPrice);
    const maxPrice = parsePrice(filters.maxPrice);
    if (minPrice !== null && housePrice < minPrice) return false; // skip if too cheap
    if (maxPrice !== null && housePrice > maxPrice) return false; // skip if too expensive

    // ----- BEDROOM FILTER -----
    const houseBeds = Number(house.bedrooms);
    const minBeds = parseBeds(filters.minBedrooms);
    const maxBeds = parseBeds(filters.maxBedrooms);
    if (minBeds !== null && houseBeds < minBeds) return false; // skip if fewer than min
    if (maxBeds !== null && houseBeds > maxBeds) return false; // skip if more than max

    // ----- POSTCODE / LOCATION FILTER -----
    if (filters.postcode && filters.postcode.trim() !== "") {
      const search = filters.postcode.toLowerCase();
      // Use optional chaining to avoid undefined errors
      const postcode = house.postcode?.toLowerCase() || "";
      const location = house.location?.toLowerCase() || "";
      // Show house if postcode starts with input OR location contains input
      if (!postcode.startsWith(search) && !location.includes(search)) return false;
    }

    // ----- SEARCH TERM FILTER -----
    if (searchTerm && searchTerm.trim() !== "" &&
        !house.type.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    // ----- DATE ADDED FILTER -----
    // Convert property's Date string (YYYY-MM-DD) into a JavaScript Date object
    const propDate = new Date(house.Date);

    // Filter by "Added After"
    if (filters.addedAfter) {
      const afterDate = new Date(filters.addedAfter);
      if (propDate < afterDate) return false; // skip if property is older than filter
    }

    // Filter by "Added Before"
    if (filters.addedBefore) {
      const beforeDate = new Date(filters.addedBefore);
      if (propDate > beforeDate) return false; // skip if property is newer than filter
    }

    // Passed all filters, include this house
    return true;
  });

  // Navigate to property details page
  const seeMore = (house) => navigate(`/property/${house.id}`);

  // ----- DRAG & DROP FOR REMOVING FAVOURITES -----
  const handleDropToRemove = (e) => {
    e.preventDefault(); // Prevent default browser behavior
    const data = e.dataTransfer.getData("houseToRemove"); // Get dragged house data
    if (data) {
      const house = JSON.parse(data); // Convert JSON string back to object
      removeFavourite(house); // Call remove function
    }
  };

  const handleDragOver = (e) => e.preventDefault(); // Needed to allow drop

  // ----- RENDER -----
  return (
    <div
      className="Border properties-dropzone"
      onDrop={handleDropToRemove}
      onDragOver={handleDragOver}
    >
      {/* Header showing number of results */}
      <div className="titles-container">
        <h1>Properties List</h1>
        <h2>Results: {filteredHouses.length}</h2>
      </div>

      {/* Render the list of properties using the List component */}
      <List
        items={filteredHouses}
        emptyMessage="No properties found"
        renderItem={house => (
          <div
            className="property-card"
            draggable
            onDragStart={(e) => {
              // Prevent adding duplicates to favourites
              if (favourites.some(h => h.id === house.id)) {
                alert("This property is already in your favourites!");
                e.preventDefault();
                return;
              }
              e.dataTransfer.setData("house", JSON.stringify(house)); // Drag data
            }}
          >
            <div className="property-top">
              {/* Property Image */}
              <img
                src={house.picture}
                alt={house.type}
                className="property-image"
                draggable="false"
              />

              {/* Property Details */}
              <div className="property-details">
                <h2>{house.type}</h2>
                <p><strong>Bedrooms:</strong> {house.bedrooms}</p>
                <p><strong>Price:</strong> £{house.price}</p>
                <p><strong>Tenure:</strong> {house.tenure}</p>
                <p><strong>Location:</strong> {house.location}</p>
                <p className="description"><strong>Description:</strong><br />{house.description}</p>
                <p><small>Added: {house.added.month} {house.added.day}, {house.added.year}</small></p>

                {/* Buttons */}
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
