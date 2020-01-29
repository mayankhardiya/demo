const pool = require('./dbconfig');
let City = function()
{
    this.getCity = function(request,callback)
    {
        pool.getConnection((err,con)=>{
          if(!err)
             {
               let sql ="select * from city where state_id=?";
               con.query(sql,[parseInt(request.query.sid)],(err,results,fields)=>
                {
                con.release();
                 callback(err,results,fields);
                 });
             }
        });
    };

    this.getAllCity = function(request,callback)
    {
        pool.getConnection((err,con)=>
        {
            if(!err)
            {
                let sql="select * from city";
                con.query(sql,[],(err,results,fields)=>
                {
                    con.release();
                    callback(err,results,fields);
                });
            }
        })
    }
}
module.exports = new City();