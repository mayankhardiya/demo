const pool = require('./dbconfig');
let Speciality = function()
{
    this.getSpeciality = function(callback)
    {
        pool.getConnection((err,con)=>
        
       {
        if(!err)
        {
          let sql = "select * from speciality";
          con.query(sql,[],(err,results,fields)=>
          {
                con.release();
                callback(err,results,fields);
          });
        }
    });
    }
}
module.exports = new Speciality();