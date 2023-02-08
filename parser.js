import duckdb from "duckdb"
var db = new duckdb.Database(':memory:');
var path = "./list.parquet";


const extract = ( async (callback) => {
   db.all(`SELECT * FROM READ_PARQUET('${path}')`, (err, res) => {
    if (err) {
        console.log(err);
      callback(err, null);
    }
    callback(null, res);
  })
}
) 
export default extract;