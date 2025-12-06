import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import List from "../components/List";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../css/PropertyDetailsPage.css";

function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then((data) => {
        const found = data.properties.find((p) => p.id === id);
        setProperty(found || null);
        setCurrentImage(0);
      })
      .catch((err) => {
        console.error(err);
        setProperty(null);
      });
  }, [id]);

  return (
    <List
      items={property ? [property] : []}
      emptyMessage="Loading property details..."
      renderItem={(property) => {
        const propertyImages =
          property.images && property.images.length
            ? property.images
            : imagesList[property.id] || [property.picture];

        const nextImage = () =>
          setCurrentImage((prev) => (prev + 1) % propertyImages.length);
        const prevImage = () =>
          setCurrentImage(
            (prev) => (prev - 1 + propertyImages.length) % propertyImages.length
          );

        return (
          <div className="property-details-container">
            <button className="back-btn" onClick={() => navigate("/")}>
              ← Back
            </button>

            <div className="property-header">
              <h1 className="property-title">
                {property.type} - £{property.price}
              </h1>
              <h3 className="property-location">{property.location}</h3>
            </div>

            {/* React Tabs */}
            <Tabs>
              <TabList>
                <Tab>Photos</Tab>
                <Tab>Map</Tab>
                <Tab>Details</Tab>
              </TabList>

              <TabPanel>
                <div
                  className="property-images"
                 
                >
                  <div className="main-image-container">
                    <img
                      src={propertyImages[currentImage]}
                      alt={`Property ${currentImage + 1}`}
                      className="main-image"
                    />
                    <button className="arrow left" onClick={prevImage}>
                      ❮
                    </button>
                    <button className="arrow right" onClick={nextImage}>
                      ❯
                    </button>
                  </div>
                  <div className="thumbnails">
                    {propertyImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumb ${index + 1}`}
                        className={`thumb ${index === currentImage ? "active" : ""}`}
                        onClick={() => setCurrentImage(index)}
                      />
                    ))}
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="property-map-container">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      property.location
                    )}&output=embed`}
                    title={`Map for ${property.type}`}
                    allowFullScreen
                    loading="lazy"
                    className="property-map"
                  />
                </div>
              </TabPanel>

              <TabPanel>
                <div className="property-info">
                  <h2>Property Details</h2>
                  <p>
                    <strong>Property Type:</strong> {property.type}
                  </p>
                  <p>
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </p>
                  <p>
                    <strong>Price:</strong> £{property.price}
                  </p>
                  <p>
                    <strong>Tenure:</strong> {property.tenure}
                  </p>
                  <p>
                    <strong>Location:</strong> {property.location}
                  </p>
                  <p>
                    <strong>Added On:</strong> {property.added.day}{" "}
                    {property.added.month}, {property.added.year}
                  </p>
                  <p>
                    <strong>Description:</strong> {property.longDescription}
                  </p>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        );
      }}
    />
  );
}

export default PropertyDetailsPage;
