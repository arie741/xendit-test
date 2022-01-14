import axios from "axios";

export const getUsers = async () => {
  try {
    let response = await axios.post("http://localhost:3001/users");
    return { error: true, response };
  } catch (error) {
    return { error: true, response: error };
  }
};

export const addUser = async (email, password) => {
  try {
    let response = await axios.post(
      "http://localhost:3001/users",
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
    let { data } = await axios.get(`http://localhost:3001/users/${email}`);
    if (data.email === email && data.password === password) {
      return { error: false, response: true };
    } else {
      return { error: true, response: false };
    }
  } catch (error) {
    return { error: true, response: error };
  }
};
