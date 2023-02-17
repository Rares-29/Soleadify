import axios from "axios"
import extract from "../parser.js"
import getAddress from "../getAddress.js";
import {allAdd  } from "../getAddress.js";


let urls2 = [];
let nrErrors = 0;
let index = 0;
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
        for (let i = 0; i <= 600; i ++)
          urls2[i] = urls[i];
          await Promise.all(urls2.map(async url => {
            ok++;
            await new Promise(r => setTimeout(r, Math.floor(ok / 80) * 30000));
            // Functia pentru a seta o anulare de request dupa 15 secunde
            function newAbortSignal(timeoutMs) {
              const abortController = new AbortController();
              setTimeout(() => abortController.abort(), timeoutMs);
              return abortController.signal;}      
            try {await axios.get("http://" + url.domain, {signal: newAbortSignal(15000) })
              .then(response => 
                {
                  console.log("yes"); 
                  const html = response.data;
                  getAddress(html, index);
                  // De scris functia care obtine toate adresele de pe site-uri, in functie de keyword-uri incearca tot
                  // De repetat functia pentru un loop in care cautam pe paginile faq, contact
                  // 
                })
              .catch(error => {
                console.log(error.code)
                console.log(error.message);
                console.log(error.stack);
                nrErrors++;
                });
            } 
            catch(err) {console.log(err);}
             
          }))
          console.log(nrErrors);
          res.send(allAdd());
      })
  })






  