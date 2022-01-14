import axios from "axios";

export default axios.create({
    baseURL: "https://yelp-clonee.herokuapp.com/api/v1/restaurants",
});