import axios from "axios"
import cheerio from "cheerio"
import extract from "../parser.js"

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
            function verifyAdress(str)
            {
              ver = 0;
              let targets = ["Street"]; 
              targets.forEach(target => {
                if (str.indexOf(target) !== -1) ver = 1; 
              })
              return ver;
            }

            var nr = 0;
            ok = 0;
            res.send(urls);
            let urls2 = [];
            //Test pt 50
            for (let i = 0; i <= 50; i ++)
            urls2.push(urls[i]);
            await Promise.all(urls2.map(async url => {
                        setTimeout(() => {
                          cancelTokens[ok];
                         }, 3000);
                try {const html = await axios.get("http://" + url.domain, {
                    cancelToken: new axios.CancelToken((c) => {
                        cancelTokens.push(c);})

               }).then(response => response.data);
                const $ = cheerio.load(html);
                const address = $(".contact-info").text().replace(/\s+/g, ' ');
                if (address !== '')
                addresses.push(address);
                
                let links = [];
                let classes = [];

                $("*").each(function(i, element) {
                  if ($(element).attr("class") !== undefined) {
                    if ($(element).attr("class").substring(0, 7) === "contact")
             //           console.log($(element).text().replace(/\s+/g, ' '));
                        // Verificare daca contin keyword-uri, daca contin, le adaugam in adrese
                        if (verifyAdress( $(element).text().replace(/\s+/g, ' ')))
                          addresses.push($(element).text().replace(/\s+/g, ' '));
                      }
                })
           //     console.log(classes);
                 //Extrag link-urile de la fiecare pagina pentru fiecare website
                $("a").each(function(i, element) {
                  links.push($(element).attr("href"));
                })
                ok++;

                await Promise.all(links.map(async link => {
                    let classes = [];
                    setTimeout(() => {
                      cancelTokens2[ok];
                    }, 3000);
                    try {
                      const html = await axios.get(link, {
                      cancelToken: new axios.CancelToken((c) => {
                      cancelTokens2.push(c);})
                                  }).then(response => response.data);
                      const $ = cheerio.load(html);
                      $("*").each(function(i, element) {
                        let ct = 0;
                        
                        if ($(element).attr("class") !== undefined) 
                          if ($(element).attr("class").substring(0, 7) === "contact")
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
                        } catch(error) {};ok++;
                  }))
              }  
              catch(error) {nr++;}ok++;
              console.log(ok); 
              //console.log(url);           
            }))
                console.log(nr);
                console.log(addresses);
        
        }
      )
    
})