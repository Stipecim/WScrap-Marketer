// web scrape by Stipecim reuse for ebay scrapp to get avreage price or other ways 
import HandleResponse from "./modules/handle-response.js";
import * as cheerio from "cheerio";



class Wscrap {
    parentElementClass;
    childElementClass;
    firstCharacter;
    
    constructor () {
        this.listcalled = false;
        this.datalist = [];
        this.$ = cheerio;
    }

    async Scrap(url, parentElementClass, childElementClass, firstCharacter) {
        const HTMLelement = await HandleResponse(url);
        this.$ = cheerio.load(HTMLelement);
        
        
        this.parentElementClass = parentElementClass;
        this.childElementClass = childElementClass;
        this.firstCharacter = firstCharacter;
       
        return this;
    }

    list() {
        this.listcalled = true;
        return this;
    }

    text() {
        if (this.listcalled) {
            let count = 0;
            this.$(this.parentElementClass).each((index, element) => {
              const data = this.$(element).find(this.childElementClass).text();
              count++;
              
              console.log("Data:",  data);
              // Use === for comparison
              if (data[0] === this.firstCharacter) {
                this.datalist.push(data);
              }
            });
            
            console.log(count);
            console.log(this.datalist);
            return this.datalist;
        }
    }
}
const url = "https://www.ebay.co.uk/sch/9355/i.html?_nkw=iphone+12+pro&_in_kw=3&LH_Complete=1&LH_Sold=1&LH_BO=1&LH_ItemCondition=3000&_sop=12&Storage%2520Capacity=128%2520GB&rt=nc&Features=E%252Dcompass&_dcat=9355";

async function dosometh() {
    const wscrap = new Wscrap();
    wscrap.Scrap(url, '.s-item', '.s-item__price', '£')
    .then((result) => {
        wscrap.list().text(); //Handle successful result
      })
      .catch((error) => {
        console.error(error.message); // Handle error
      });

}

dosometh();