import _ from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURLs: { jsonplaceholder: string; auth: string } = {
  jsonplaceholder: "https://jsonplaceholder.typicode.com",
  auth: "http://10.5.223.153:8000",
};

export const axios = _.create();

// Get the token from AsyncStorage
AsyncStorage.getItem("token")
  .then((token) => {
    // Set the token as the authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  })
  .catch((error) => {
    console.error("Error retrieving token from AsyncStorage:", error);
  });

export default axios;
