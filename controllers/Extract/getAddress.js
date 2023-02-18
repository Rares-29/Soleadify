import cheerio from "cheerio"
import fs from "fs";
import axios from "axios";
const countriesjs = fs.readFileSync("countries.json");
const countries = JSON.parse(countriesjs);
const classesjs = fs.readFileSync("classes.json");
const classes = JSON.parse(classesjs);


let addresses = [];
let pattern = /\d{1,6}\s+[a-zA-Z](\S+\s+){2,10}\d\d\d\d\d/g;
//pattern = (/\d{1,6}(\s+\S+){2,10}\s\d\d\d\d\d/g);

function verify(start, result) {
    const finish = addresses.length;
    for (let i = 0; i <= finish;i ++)
        if(JSON.stringify(addresses[i]) == JSON.stringify(result)) return 0;
        
return 1;
}

const getAddress = (html) => {
    const start = addresses.length;
    const $ = cheerio.load(html);

    // Search for certain classes
    $("*").each(function(i, element) {
        classes.forEach(async classe => {
            if ($(element).attr("class") !== undefined) {
                if ($(element).attr("class").toUpperCase().indexOf(classe) !== -1)
                    {
                     const text = $(element).text().replace(/\s+ /g, ' ');
                     const results = text.match(pattern);
                     if (results !== null)
                        results.forEach(result => {
                            if (verify(start, result))
                            {   //result.match(pattern2)
                                addresses.push(result);
                            }
                        })
                        
                     //regular expressions 
                    }
            }
        })
    // Search on footer 
    const text = ($("footer").text()).replace(/\s+ /g, ' ');
    const results = text.match(pattern);
    if (results !== null)
        results.forEach(result => {
            if (verify(start, result))
            {
                addresses.push(result);
            
            }    
        })
    })

}

const allAdd = () => {
    return addresses;
  }

export default getAddress
export {allAdd};
