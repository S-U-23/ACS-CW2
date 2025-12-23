import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom"; 
import List from "../components/List";

describe("PropertyPage", () => {

  // Test 1: Ensure List renders one thumbnail per property
  it("renders one thumbnail image per property", () => {
    const sampleProperties = [
      { id: "prop1", type: "House", picture: "images/prop1images/frontdoor.jpg" },
      { id: "prop2", type: "Flat", picture: "/images/prop2images/outsideflatview.jpg" },
    ];

    render(
      <List
        items={sampleProperties}
        emptyMessage="No properties"
        renderItem={(house) => (
          <img src={house.picture} alt={house.type} />
        )}
      />
    );

    // Grab all img elements in the rendered List
    const images = screen.getAllByRole("img");

    // Check that the correct number of thumbnails are rendered
    expect(images).toHaveLength(2);

    // Verify that each image src matches the property picture
    sampleProperties.forEach((property, index) => {
      expect(images[index]).toHaveAttribute("src", property.picture);
    });
  });

  // Test 2: Ensure "Add to Favourites" button disables after being clicked
  it("disables Add to Favourites button after click", () => {
    // Tiny wrapper component to handle button state
    function ButtonItem() {
      const [isDisabled, setDisabled] = useState(false);

      return (
        <List
          items={[{ id: "1", type: "House" }]}
          emptyMessage=""
          renderItem={() => (
            <button
              disabled={isDisabled} // React state controls disabled status
              onClick={() => setDisabled(true)} // Disable button on click
            >
              {isDisabled ? "Added to Favourites" : "Add to Favourites"}
            </button>
          )}
        />
      );
    }

    render(<ButtonItem />);

    // Grab the button by its accessible name
    const button = screen.getByRole("button", { name: /add to favourites/i });

    // Simulate a click → button should disable
    fireEvent.click(button);

    // Verify button is now disabled
    expect(button).toBeDisabled();

    // Verify button text has updated accordingly
    expect(button).toHaveTextContent(/added to favourites/i);
  });

});
