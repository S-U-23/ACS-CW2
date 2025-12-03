import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import List from "../components/List";

function PropertyDetailsPage() {
  const { id } = useParams(); // get the property ID from the URL
  const navigate = useNavigate(); // navigate back to home
  const [property, setProperty] = useState(null); // store current property
  const [currentImage, setCurrentImage] = useState(0); // track which image is showing

  
  const imagesList = {
    prop1: [
      "/images/prop1images/frontdoor.jpg",
      "/images/prop1images/kitchenimage.jpg",
      "/images/prop1images/swimpool.jpg",
      "/images/prop1images/bathroom.jpg",
      "/images/prop1images/bedroom.jpg",
      "/images/prop1images/kidbedroom.jpg",
      "/images/prop1images/kidbedroom1.jpg",
    ],
    prop2: [
      "/images/prop2images/outsideflatview.jpg",
      "/images/prop2images/flatdoor.jpg",
      "/images/prop2images/livingroom.jpg",
      "/images/prop2images/kitchen.jpg",
      "/images/prop2images/bathroom.jpg",
      "/images/prop2images/bedroom.jpg",
      "/images/prop2images/kidroom.jpg",
    ],
    prop3: [
      "/images/prop3images/frontdoor.png",
      "/images/prop3images/livingroom.png",
      "/images/prop3images/kitchen.png",
      "/images/prop3images/toilet.png",
      "/images/prop3images/bedroom.png",
      "/images/prop3images/bedroom2.png",
      "/images/prop3images/garden.png",
    ],
    prop4: [
      "/images/prop4images/frontdoor.png",
      "/images/prop4images/frontdoor2.png",
      "/images/prop4images/livingroom.png",
      "/images/prop4images/livingroom2.png",
      "/images/prop4images/kitchen.png",
      "/images/prop4images/bathroom.png",
      "/images/prop4images/bedroom.png",
    ],
    prop5: [
      "/images/prop5images/frontdoor.png",
      "/images/prop5images/livingroom.png",
      "/images/prop5images/kitchen.png",
      "/images/prop5images/bedroom.png",
      "/images/prop5images/bedroom1.png",
      "/images/prop5images/bathroom.png",
      "/images/prop5images/garden2.png",
    ],
    prop6: [
      "/images/prop6images/frontdoor.png",
      "/images/prop6images/livingroom.png",
      "/images/prop6images/livingroom2.png",
      "/images/prop6images/kitchen.png",
      "/images/prop6images/kitchen2.png",
      "/images/prop6images/bathroom.png",
      "/images/prop6images/bedroom1.png",
    ],
    prop7: [
      "/images/prop7images/frontdoor.png",
      "/images/prop7images/livingroom.png",
      "/images/prop7images/livingroom2.png",
      "/images/prop7images/kitchen.png",
      "/images/prop7images/kitchen2.png",
      "/images/prop7images/bathroom.png",
      "/images/prop7images/garden.png",
    ],
  };
  const propDes={
    prop1:[
      "hello"
    ],
    prop2:[
      "porp2",
    ],
  };
  // fetch properties.json and get the property matching the ID
  useEffect(() => {
    fetch("/properties.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then(data => {
        const found = data.properties.find(p => p.id === id);
        setProperty(found || null); // store property or null if not found
        setCurrentImage(0); // reset image index
      })
      .catch(err => {
        console.error(err);
        setProperty(null); // show empty message if fetch fails
      });
  }, [id]);

  return (
    <List
      items={property ? [property] : []} // wrap property in array so List works
      emptyMessage="Loading property details..." // show while fetching
      renderItem={(property) => {
        // choose images: JSON first, fallback next, or single picture
        let propertyImages;
        if (property.images && property.images.length) {
          propertyImages = property.images;
        } else {
          propertyImages = imagesList[property.id] || [property.picture];
        }

        // if no images at all
        if (!propertyImages || propertyImages.length === 0) {
          return <p>No images available</p>;
        }

        // go to next image or wrap to first
        const nextImage = () => {
          if (currentImage + 1 < propertyImages.length) {
            setCurrentImage(currentImage + 1);
          } else {
            setCurrentImage(0);
          }
        };

        // go to previous image or wrap to last
        const prevImage = () => {
          if (currentImage - 1 >= 0) {
            setCurrentImage(currentImage - 1);
          } else {
            setCurrentImage(propertyImages.length - 1);
          }
        };

        return (
          <div className="property-details-container">
            <button className="back-btn" onClick={() => navigate("/")}>
              ← Back
            </button>
            <br />

            <h1 className="property-title">
              {property.type} - £{property.price}
            </h1>
            <h3 className="property-location">{property.location}</h3>

            <div className="property-main">
              <div className="property-images">
                <p><strong>Property photos:</strong></p>

                <div className="main-image-container">
                  {/* main image */}
                  <img
                    src={propertyImages[currentImage]}
                    alt={`Property ${currentImage + 1}`}
                    className="main-image"
                  />
                  {/* arrows */}
                  <button className="arrow left" onClick={prevImage}>❮</button>
                  <button className="arrow right" onClick={nextImage}>❯</button>
                </div>

                {/* thumbnails */}
                <div className="thumbnails">
                  {propertyImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      className={`thumb ${index === currentImage ? "active" : ""}`}
                      onClick={() => setCurrentImage(index)} // click to jump
                    />
                  ))}
                </div>
              </div>

              {/* map */}
              <div className="property-map-container">
                <p><strong>Location Map:</strong></p>
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                  title={`Map for ${property.type}`}
                  allowFullScreen
                  loading="lazy"
                  className="property-map"
                />
              </div>
            </div>

            {/* property info */}
            <div className="property-info">
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p><strong>Tenure:</strong> {property.tenure}</p>
              <p>{property.description}</p>
            </div>
          </div>
        );
      }}
    />
  );
}

export default PropertyDetailsPage;
