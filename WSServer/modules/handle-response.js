import GetResponse from "./get-response.js";


async function HandleResponse(url) { // possibility of building timer here 
    const HTMLelement = await GetResponse(url);
    return HTMLelement;
}

export default HandleResponse;