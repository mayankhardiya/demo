const pool = require('./dbconfig');
let State = function(){
    this.getState = function(request,callback)
    {
        pool.getConnection((err,con)=>
    {
        if(!err)
        {
        let sql = "select * from state where country_id=?"
        con.query(sql,[parseInt(request.query.cid)],(err,results,fields)=>
        {
            con.release();
           callback(err,results,fields);
        });
        }
    });
    }

}
module.exports = new State();