
import fbMarketIphoneService from "../WSServer/Services/marketItemService.js";
import Iphone from "../WSServer/model/marketItem.js";
//import FbFetchIphoneAb from "./FbFetchIphoneAb.js";

// possibly fetch for more stuff 
export default async function GetIphone(): Promise<Iphone[] | null>  {



    const data = await FbFetchIphoneAb(); 
    
    if(data === null) {
      return null
    }

    
    const iphones: Iphone [] = [];

    data.forEach((obj: any, index: number) => {
      iphones.push({
        id: index,
        uniqueId: obj.node.listing.id,
        name: obj.node.listing.marketplace_listing_title,
        price: obj.node.listing.listing_price.formatted_amount,
        location: obj.node.listing.location.reverse_geocode.city_page.display_name 
      });
    });
    
    fbMarketIphoneService(iphones);

    return iphones;
    
}


