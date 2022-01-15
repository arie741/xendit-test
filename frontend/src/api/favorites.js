import axios from "axios";

export const getFavorites = async (email) => {
    try{
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/favorites/${email}`);
        return { error: true, response };
    } catch(error){
        return { error: true, response: error };
    }
} 

export const addFavorite = async(email, favorite)=> {
    try{
        let response = await axios.post(
            `${process.env.REACT_APP_BACKEND_ADDRESS}/users/favorites`,
            { email, favorite },
            {
              headers: { "content-type": "application/json" },
            }
          );
        return { error: true, response };
    } catch(error){
        return { error: true, response: error };
    }
}