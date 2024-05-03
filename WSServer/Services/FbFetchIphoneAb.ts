export default async function FbFetchIphoneAb(){
    const now = new Date();

    const millisecondsSinceUnixEpoch = now.getTime();

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysSinceUnixEpoch = millisecondsSinceUnixEpoch / millisecondsPerDay;

    const today = Math.floor(daysSinceUnixEpoch);
    const yesterday = today - 1;

    const radius = 20; // kilomiters 

    try {
        const response = await fetch("https://www.facebook.com/api/graphql/", {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/x-www-form-urlencoded",
              "dpr": "1.25",
              "sec-ch-prefers-color-scheme": "dark",
              "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
              "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"123.0.6312.122\", \"Not:A-Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"123.0.6312.122\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-model": "\"\"",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-ch-ua-platform-version": "\"10.0.0\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "viewport-width": "803",
              "x-asbd-id": "129477",
              "x-fb-friendly-name": "CometMarketplaceSearchContentContainerQuery",
              "x-fb-lsd": "AVplRxYwoVY"
            },
            "referrer": "https://www.facebook.com/marketplace/109478605737093/search?query=iphone",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `av=0&__aaid=0&__user=0&__a=1&__req=1j&__hs=19824.HYP%3Acomet_loggedout_pkg.2.1..0.0&dpr=1.5&__ccg=EXCELLENT&__rev=1012706015&__s=a9iq1d%3Adzunqr%3Avbaxis&__hsi=7356638079535646989&__dyn=7xeUmwlE7ibwKBAg35xu13wIwk8KewSwMwNw9G2S0im3y4o0B-q1ew65xO0FE2awt81s8hwGwQw9m1YwBgao6C0Mo2swlo5q4U2exi4UaEW1GwNwwwJK2W5olw8Xxm16waCm7-0iK2S3qazo11E2ZwrUdUcobUak0KU6O1FwgWwvE2PxW&__csr=ghEAmBnlZanQqFejLFrHClalB-8BCAFoyimfK4edig-HXhoO-5rHGmFk6HKaCgkjzECqrAG58Txy3Wazo6BzQuUS798b88E8Ugy9E98aohglBxp1-4EiwjUcp8gwzwwwlUfo09qEoy80mLw2g80tlG5k680P600iDy6ci02aK0dmwkEy07yo0lWxK03WJxO01eRw1t60dC80tuaz8y0zo1zU&__comet_req=15&lsd=AVplRxYwoVY&jazoest=21067&__spin_r=1012706015&__spin_b=trunk&__spin_t=1712850779&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CometMarketplaceSearchContentContainerQuery&variables=%7B%22buyLocation%22%3A%7B%22latitude%22%3A57.1526%2C%22longitude%22%3A-2.11%7D%2C%22contextual_data%22%3Anull%2C%22count%22%3A24%2C%22cursor%22%3Anull%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22iphone%22%7D%2C%22browse_request_params%22%3A%7B%22commerce_enable_local_pickup%22%3Atrue%2C%22commerce_enable_shipping%22%3Atrue%2C%22commerce_search_and_rp_available%22%3Atrue%2C%22commerce_search_and_rp_category_id%22%3A%5B%5D%2C%22commerce_search_and_rp_condition%22%3Anull%2C%22commerce_search_and_rp_ctime_days%22%3A%22${today}%3B${yesterday}%22%2C%22filter_location_latitude%22%3A57.1526%2C%22filter_location_longitude%22%3A-2.11%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%2C%22filter_radius_km%22%3A${radius}%7D%2C%22custom_request_params%22%3A%7B%22browse_context%22%3Anull%2C%22contextual_filters%22%3A%5B%5D%2C%22referral_code%22%3Anull%2C%22saved_search_strid%22%3Anull%2C%22search_vertical%22%3A%22C2C%22%2C%22seo_url%22%3Anull%2C%22surface%22%3A%22SEARCH%22%2C%22virtual_contextual_filters%22%3A%5B%5D%7D%7D%2C%22savedSearchID%22%3Anull%2C%22savedSearchQuery%22%3A%22iphone%22%2C%22scale%22%3A1.5%2C%22shouldIncludePopularSearches%22%3Atrue%2C%22topicPageParams%22%3A%7B%22location_id%22%3A%22109478605737093%22%2C%22url%22%3Anull%7D%7D&server_timestamps=true&doc_id=7897349150275834`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }); 

        const data = await response.json();
        return data.data.marketplace_search.feed_units.edges;
        
    } catch (error) {
      console.log(error);
      return null;  
    }
}
