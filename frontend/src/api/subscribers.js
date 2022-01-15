import axios from "axios";

export const getSubscribers = async () => {
  try {
    let response = await axios.post(`${process.env.REACT_APP_BACKEND_ADDRESS}/subscribers`);
    return { error: true, response };
  } catch (error) {
    return { error: true, response: error };
  }
};

export const addSubscribers = async (email) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/subscribers`,
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
