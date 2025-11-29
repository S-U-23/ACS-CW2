import { useState } from "react";
import InputWidget from "./InputWidget";
import SelectWidget from "./SelectWidget";
import DateWidget from "./DateWidget";
import '../css/SearchPage.css';

function SearchPage({ searchTerm, setSearchTerm }) {
  // --- States for all filters ---
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState("£0");
  const [maxPrice, setMaxPrice] = useState("£100,000");
  const [minBedrooms, setMinBedrooms] = useState("0");
  const [maxBedrooms, setMaxBedrooms] = useState("1");
  const [addedAfter, setAddedAfter] = useState("");
  const [addedBefore, setAddedBefore] = useState("");
  const [postcode, setPostcode] = useState("");

  return (
    <div className="Body">
      {/* Banner */}
      <p id="p">Welcome to Buy a house</p>

      <div className="search-container">
        <h2>Search Properties</h2>

        {/* Search bar */}
        <InputWidget
          label=""
          placeholder="Search properties..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <h3>Filters</h3>
        <div className="filters">
          {/* Property Type */}
          <SelectWidget
            label="Type:"
            value={type}
            onChange={setType}
            options={["Any", "House", "Flat"]}
          />

          {/* Min Price */}
          <SelectWidget
            label="Min Price:"
            value={minPrice}
            onChange={setMinPrice}
            options={[
              "£0","£100,000","£200,000","£300,000","£400,000","£500,000"
            ]}
          />

          {/* Max Price */}
          <SelectWidget
            label="Max Price:"
            value={maxPrice}
            onChange={setMaxPrice}
            options={[
              "£100,000","£200,000","£300,000","£400,000","£500,000","£600,000+"
            ]}
          />

          {/* Min Bedrooms */}
          <SelectWidget
            label="Min Bedrooms:"
            value={minBedrooms}
            onChange={setMinBedrooms}
            options={["0","1","2","3","4","5"]}
          />

          {/* Max Bedrooms */}
          <SelectWidget
            label="Max Bedrooms:"
            value={maxBedrooms}
            onChange={setMaxBedrooms}
            options={["1","2","3","4","5+"]}
          />

          {/* Date Added */}
          <DateWidget
            label="Added After:"
            value={addedAfter}
            onChange={setAddedAfter}
          />

          <DateWidget
            label="Added Before:"
            value={addedBefore}
            onChange={setAddedBefore}
          />

          {/* Postcode Area */}
          <InputWidget
            label="Postcode Area:"
            placeholder="e.g. BR1, NW1"
            value={postcode}
            onChange={setPostcode}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
