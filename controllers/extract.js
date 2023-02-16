import axios from "axios"
import cheerio from "cheerio"
import extract from "../parser.js"
import fs from "fs";


const verify_targets = fs.readFileSync("fs.json");
const targets = JSON.parse(verify_targets);
const classes_targets = fs.readFileSync("classes.json");
const classes = JSON.parse(classes_targets);


const source = axios.CancelToken.source();
const cancel = source.cancel;
let cancelTokens = [];
let cancelTokens2 = [];
export const data = ((req, res) => {
    let addresses = []; 
    const p1 = new Promise((resolve, reject) => {
        extract((err, urls) => {
            if (err) {
              reject(err);
            }
             resolve(urls);

     
    }) 
      }).then(
        async (urls) =>{
            const promises = [];
            var ok = 0;
            
            var nr = 0;
            ok = 0;
            let er = 0;
            res.send(urls);
            let urls2 = [];
            let urls3 = [];
            //Test pt 50
            for (let i = 0; i <= 50; i ++)
            urls2.push(urls[i]);
            await Promise.all(urls2.map(async url => {
                         setTimeout(() => {
                           cancelTokens[ok];
                          }, 2000);
                try {const html = await axios.get("http://" + url.domain, {
                    cancelToken: new axios.CancelToken((c) => {
                        cancelTokens.push(c);})
               }).then(response => {return response.data}).catch(error => {urls3[er]; er++;console.log("no"); return error;});
            //    const address = $(".contact-info").text().replace(/\s+/g, ' ');
            //    if (address !== '')
             //     addresses.push(address);
               const $ = cheerio.load(html);

                let links = [];
                function verifyAdress(str)
                {
                  let ver = 0; 
                    targets.forEach(target => {
                      if (str.indexOf(target.name) !== -1) ver = 1;
                      if (str.indexOf(target.abbreviation) !== -1) ver = 1;
                    })   
                   return ver;
                }

                $("*").each(function(i, element) {
                  if ($(element).attr("class") !== undefined) {
                    classes.forEach(class_target => {
                      if ($(element).attr("class").includes(class_target)){
                        // Verificare daca contin keyword-uri, daca contin, le adaugam in adrese
                        if (verifyAdress( $(element).text().replace(/\s + /g, ' '))){ 
                          addresses.push($(element).text().replace(/\s+/g, ' '));}
                    }
                    })
                        }
                })
                 //Extrag link-urile de la fiecare pagina pentru fiecare website
                $("a").each(function(i, element) {
                  links.push($(element).attr("href"));
                })

                await Promise.all(links.map(async link => {
                    setTimeout(() => {
                      cancelTokens2[ok];
                    }, 3000);
                    try {
                      const html = await axios.get(link, {
                      cancelToken: new axios.CancelToken((c) => {
                      cancelTokens2.push(c);})
                                  }).then(response => response.data).catch(error =>  error) ;
                      const $ = cheerio.load(html);
                      $("*").each(function(i, element) {
                        let ct = 0;
                        
                        if ($(element).attr("class") !== undefined) 
                        classes.forEach(class_target => {
                          if ($(element).attr("class").includes(class_target))
                              {
                                //console.log($(element).text().replace(/\s+/g, ' '));
                                // Verificare daca contin keyword-uri, daca contin, le adaugam in adrese
                                addresses.forEach(adr => {
                                  address =  $(element).text().replace(/\s+/g, ' ');
                                if (adr === address) {ct = 1;}
                                })
                                if (ct === 0 && verifyAddres(address))                              
                                    addresses.push(address);
                            
                            }
                          })
                      })
                        } catch(error) {};ok++;
                  }))
              }  
              catch(error) {console.log(error);}ok++;
               
              //console.log(url);           
            }))
                console.log(nr);
                console.log(addresses);
        
        }
      )
    
})