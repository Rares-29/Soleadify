import cheerio from "cheerio"
import fs from "fs";
const countriesjs = fs.readFileSync("countries.json");
const countries = JSON.parse(countriesjs);
const classesjs = fs.readFileSync("classes.json");
const classes = JSON.parse(classesjs);


let addresses = [];

function verify(start, result) {
    const finish = addresses.length;
    for (let i = start; i <= finish;i ++)
        if(JSON.stringify(addresses[i]) == JSON.stringify(result)) return 0;
        
return 1;
}

const getAddress = (html, index) => {
    const start = addresses.length;
    const $ = cheerio.load(html);
    $("*").each(function(i, element) {
        classes.forEach(classe => {
            if ($(element).attr("class") !== undefined) {
                if ($(element).attr("class").indexOf(classe) !== -1)
                    {
                     const text = $(element).text().replace(/\s+ /g, ' ');
                     let pattern = (/\d{1,6}(\s+\S+){2,10}\s\d\d\d\d\d/g);
                     pattern = /\d{1,6}\s+[a-zA-Z](\S+\s+){2,8}\d\d\d\d\d/g;
                     let result = text.match(pattern);
                     if (result !== null)
                        if (verify(start, result))
                            {addresses.push(result);
                            }
                     //regular expressions 
                    }
            }

        })

    })   
}

const allAdd = () => {
    return addresses;
  }

export default getAddress
export {allAdd};