import axios from "axios"
import getAddress from "./getAddress.js"
import cheerio from "cheerio"
import * as dotenv from 'dotenv'
dotenv.config()

const keywords = ["FAQ", "F-A-Q", "POLICY", "CONTACT", "ABOUT"];
let pages = [];
let ok = 0;
let nrErrors = 0;

// Functia pentru a seta o anulare de request dupa 15 secunde
function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs);
  return abortController.signal;}  

export default async function homeReq (url) {
    ok++;
    await new Promise(r => setTimeout(r, Math.floor(ok / 80) * 30000));
    try {await axios.get("http://" + url.domain, {signal: newAbortSignal(15000) })
      .then(response => 
        {
            const html = response.data;
            const $ = cheerio.load(html);
            getAddress(html);
              // Search for all pages
                $("a").each(function(i, element) {
                    keywords.forEach(keyword => {
                        if ($(element).attr("href") !== undefined)
                            if ($(element).attr("href").toUpperCase().indexOf(keyword) !== -1)
                                if ($(element).attr("href").substring(0, 4) === "http")
                                    pages.push( $(element).attr("href"));
                                else 
                                  if ($(element).attr(href).substring(0, 1) !== "/")
                                    pages.push("http://" + url.domain + "/" + $(element).attr("href"));
                                  else
                                    pages.push("http://" + url.domain + $(element).attr("href"));
                    })
                })

      .catch(error => {
        console.log(error.code)
        console.log(error.message);
        console.log(error.stack);
        nrErrors++;
        });
    }) 
    }
    catch(err) {}
     
  }

  let ok2 = 0;
  export async function pageReq (url) {
      ok2++;
      await new Promise(r => setTimeout(r, Math.floor(ok2 / 80) * 30000));
      try {
          await axios.get(url, {signal: newAbortSignal(15000) })
              .then(response => 
              {
                  const html = response.data;
                  getAddress(html);
              })
              .catch(error => {
                  console.log(error.code)
                  console.log(error.message);
                  console.log(error.stack);
              });
  
          } catch(err) {}
  }
  
  let addressesC = [];
  const API_KEY = process.env.API_KEY;
  export const get_country = async function (address)
  {
    try {
      await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: API_KEY
        }
      })
      .then(response => {
        const components = response.data.results[0].address_components;
        const countryComponent = components.find(component => component.types.includes("country"));
        if (countryComponent) {
          const country = countryComponent.long_name;
          const new_address  = address + ", " + country;
          addressesC.push(new_address);
        } else {
            addressesC.push(address);
          }
        }).catch(error => {
            console.log(error);
            addressesC.push(address);
          })
      } catch(error) {
          console.log(error);
          addressesC.push(address);
        }
  }
  
  export const nErrors = () => {
    return nrErrors;
  }

  export const getPages = () => {
    return pages;
  }

  export const getAddressesC = () => {
    return addressesC;
  }