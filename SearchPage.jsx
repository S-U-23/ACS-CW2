import { useState } from "react";
import InputWidget from "./InputWidget"; // Custom input component
import SelectWidget from "./SelectWidget"; // Custom select/dropdown component
import DateWidget from "./DateWidget"; // Custom date picker component
import '../css/SearchPage.css'; // Import styling for this page

function SearchPage({ searchTerm, setSearchTerm }) {
  // --- Initial filter values ---
  // Define the default values for all filters so we can reset them later
  const initialFilters = {
    type: "Any",
    minPrice: "£0",
    maxPrice: "£100,000",
    minBedrooms: "0",
    maxBedrooms: "1",
    addedAfter: "",
    addedBefore: "",
    postcode: ""
  };

  // --- States for all filters ---
  // Each filter gets its own piece of state for controlled inputs
  const [type, setType] = useState(initialFilters.type);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [minBedrooms, setMinBedrooms] = useState(initialFilters.minBedrooms);
  const [maxBedrooms, setMaxBedrooms] = useState(initialFilters.maxBedrooms);
  const [addedAfter, setAddedAfter] = useState(initialFilters.addedAfter);
  const [addedBefore, setAddedBefore] = useState(initialFilters.addedBefore);
  const [postcode, setPostcode] = useState(initialFilters.postcode);

  // --- Reset filters function ---
  // Resets all filter states and search bar back to default values
  const resetFilters = () => {
    setType(initialFilters.type);
    setMinPrice(initialFilters.minPrice);
    setMaxPrice(initialFilters.maxPrice);
    setMinBedrooms(initialFilters.minBedrooms);
    setMaxBedrooms(initialFilters.maxBedrooms);
    setAddedAfter(initialFilters.addedAfter);
    setAddedBefore(initialFilters.addedBefore);
    setPostcode(initialFilters.postcode);
    setSearchTerm(""); // Optional: reset search bar input too
  };

  return (
    <div className="Body">
      {/* Welcome banner */}
      <p id="p">Welcome to Buy a house</p>

      {/* Container for search bar, filters, and reset button */}
      <div className="search-container">
        <h2>Search Properties here:</h2>

        {/* Search bar using custom InputWidget */}
        <InputWidget
          label=""
          placeholder="Search properties..."
          value={searchTerm} // Controlled by parent state
          onChange={setSearchTerm} // Update parent state on change
        />

        {/* Filters section */}
        <h3>Filters:</h3>
        <div className="filters">
          {/* Dropdown for property type */}
          <SelectWidget
            label="Type:"
            value={type}
            onChange={setType}
            options={["Any", "House", "Flat"]}
          />

          {/* Dropdown for minimum price */}
          <SelectWidget
            label="Min Price:"
            value={minPrice}
            onChange={setMinPrice}
            options={["£0","£100,000","£200,000","£300,000","£400,000","£500,000"]}
          />

          {/* Dropdown for maximum price */}
          <SelectWidget
            label="Max Price:"
            value={maxPrice}
            onChange={setMaxPrice}
            options={["£100,000","£200,000","£300,000","£400,000","£500,000","£600,000+"]}
          />

          {/* Dropdown for minimum bedrooms */}
          <SelectWidget
            label="Min Bedrooms:"
            value={minBedrooms}
            onChange={setMinBedrooms}
            options={["0","1","2","3","4","5"]}
          />

          {/* Dropdown for maximum bedrooms */}
          <SelectWidget
            label="Max Bedrooms:"
            value={maxBedrooms}
            onChange={setMaxBedrooms}
            options={["1","2","3","4","5+"]}
          />

          {/* Date picker for "Added After" */}
          <DateWidget
            label="Added After:"
            value={addedAfter}
            onChange={setAddedAfter}
          />

          {/* Date picker for "Added Before" */}
          <DateWidget
            label="Added Before:"
            value={addedBefore}
            onChange={setAddedBefore}
          />

          {/* Input for postcode/area */}
          <InputWidget
            label="Postcode Area:"
            placeholder="e.g. BR1, NW1"
            value={postcode}
            onChange={setPostcode}
          />
        </div>

        {/* Reset Filters button */}
        <div className="reset-container">
          <button onClick={resetFilters} className="reset-btn">Reset Filters</button>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
