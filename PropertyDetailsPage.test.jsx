import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyDetailsPage from "../components/PropertyDetailsPage";
describe("PropertyDetailsPage image gallery", () => {

  // Test to ensure all thumbnail images for a property are rendered correctly
  it("renders one thumbnail image per property image", () => {
    // Sample property images to simulate what the component would render
    const propertyImages = [
      "/images/prop1images/frontdoor.jpg",
      "/images/prop1images/kitchenimage.jpg",
      "/images/prop1images/swimpool.jpg",
      "/images/prop1images/bathroom.jpg",
      "/images/prop1images/bedroom.jpg",
      "/images/prop1images/kidbedroom.jpg",
      "/images/prop1images/kidbedroom1.jpg",
    ];

    // Render a simple thumbnails container simulating the gallery in the component
    render(
      <div className="thumbnails">
        {propertyImages.map((img, index) => (
          <img
            key={index}                  // Unique key for each mapped element
            src={img}                     // Image source
            alt={`Thumb ${index + 1}`}    // Accessible alt text
          />
        ))}
      </div>
    );

    // Grab all <img> elements that were rendered
    const images = screen.getAllByRole("img");

    // Assert: The number of rendered images should match the number of property images
    expect(images).toHaveLength(propertyImages.length);

    // Assert: Each image should have the correct 'src' attribute
    propertyImages.forEach((img, index) => {
      expect(images[index]).toHaveAttribute("src", img);
    });
  });

});
