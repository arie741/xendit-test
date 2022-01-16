import axios from "axios";

export const addUser = async (email, password) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/users`,
      { email, password },
      {
        headers: { "content-type": "application/json" },
      }
    );

    return { error: false, response };
  } catch (error) {
    return { error: true, response: error.response.data };
  }
};

export const validateUser = async (email, password) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/users/auth`,
      {
        email,
        password,
      },
      {
        headers: { "content-type": "application/json" },
      }
    );
    return { error: false, response: response.data }
  } catch (error) {
    return { error: true, response: error };
  }
};
