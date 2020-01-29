const pool = require('./dbconfig');
let Country = function()
{
    this.getCountryList = function(callback)
    {
        pool.getConnection((err,con)=>
        {
            if(!err)
            {
                let sql = "select * from country"
                con.query(sql,[],(err,result,fields)=>
            {
                callback(err,result,fields);
                con.release();
            });
            }
        });
    }
}
module.exports = new Country();