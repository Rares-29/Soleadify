import axios from "axios"
import homeReq, {nErrors, getPages, pageReq, getAddressesC, get_country} from "./requests.js";
import extract from "./parser.js"
import getAddress, {allAdd} from "./getAddress.js";

let urls2 = [];
let nrErrors = 0;
let ok = 0;


export const data = ((req, res) => {
  const p1 = new Promise((resolve, reject) => {
    extract((err, urls) => {
      if (err) {
        reject(err);
        }
      resolve(urls);
      })
    }).then(
      async (urls) =>{
        // Test pentru 100 de url-uri
        for (let i = 0; i <= 100; i ++)
          urls2[i] = urls[i];
          await Promise.all(urls2.map(homeReq))
          console.log(nErrors());
          const pages = getPages();
          await Promise.all(pages.map(pageReq));
          const addresses = allAdd();
          await Promise.all(addresses.map(get_country))
          const addressesC = getAddressesC();
          console.log("Done!");
          res.send(addressesC);
      })
  })






  