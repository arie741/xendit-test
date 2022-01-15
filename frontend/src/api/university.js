import axios from "axios"

export const getUniversity = async (name = "", country = "") => {
    try{
        let url = `${process.env.REACT_APP_HIPO_ADDRESS}/search?name=${name}&country=${country}`
        let response = await axios.get(url)
        if(response.data.length === 0){
            throw "No universities match the inputs.";
        }
        return {error: false, response};
    } catch(error){
        return {error: true, response: error};
    }
}