import axios from "axios";

export const getUsers = async () => {
  try {
    let response = await axios.post(`${process.env.REACT_APP_BACKEND_ADDRESS}/users`);
    return { error: true, response };
  } catch (error) {
    return { error: true, response: error };
  }
};

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
    let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${email}`);
    if (data.email === email && data.password === password) {
      return { error: false, response: true };
    } else {
      return { error: true, response: false };
    }
  } catch (error) {
    return { error: true, response: error };
  }
};
