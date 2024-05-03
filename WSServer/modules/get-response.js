import axios from "axios";
import {URL} from "url";


async function GetResponse(url) { // task implement abitlity to handle multiple links
    try {

        // Convert url string to object 
        const urlObject = new URL(url);
        //console.log(urlObject); // - dev

        // axios 
        const response = await axios.get(urlObject.toString());
        //console.log("Response:", response);    // -dev
        return response.data;

    }catch(error) {
        throw error;
    }

} 

export default GetResponse;

