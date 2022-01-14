import axios from "axios";

export const getSubscribers = async () => {
  try {
    let response = await axios.post("http://localhost:3001/subscribers");
    return { error: true, response };
  } catch (error) {
    return { error: true, response: error };
  }
};

export const addSubscribers = async (email) => {
  try {
    let response = await axios.post(
      "http://localhost:3001/subscribers",
      { email },
      {
        headers: { "content-type": "application/json" },
      }
    );

    return { error: false, response };
  } catch (error) {
    return { error: true, response: error };
  }
};
