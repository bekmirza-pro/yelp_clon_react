import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
// import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let history = useHistory();
  // const { restaurants } = useContext(RestaurantsContext);
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);

      setRestaurantName(response.data.restaurant_name);
      setLocation(response.data.location);
      setPriceRange(response.data.price_range);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let UpdateRestaurant = [];
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      restaurantName,
      location,
      priceRange,
    });

    UpdateRestaurant.push(updatedRestaurant);

    history.push("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={restaurantName || ""}
            onChange={(e) => setRestaurantName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location || ""}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange || ""}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
