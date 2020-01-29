const path = require('path');
const pool = require('./dbconfig');
const Post = function()
{
this.savePost = function(request,callback)
{
    let filePath = request.files.post_image;
    let textPath = request.body.post_text;
    let typePost = request.body.post_type;
    let file_name = new Date().getTime()+filePath.name;
        filePath.mv(path.join(__dirname,'../public/uploads',file_name),function(err)
    {
        if(!err)
        {
            pool.getConnection((err,con)=>
            {
                let sql = "insert into post(doc_id,post_image,post_text,post_type,post_date) values (?,?,?,?,?)";
                con.query(sql,[parseInt(request.session.docid),file_name,textPath,typePost,new Date().toString()],(err,results,fields)=>
                {
                    //console.log(request.session.docid);
                    //console.log(filePath.name);
                    //console.log(textPath);
                    con.release();
                    callback(err,results,fields);
                });
            });
        }
    });
  
}
 this.getPublicPost = function(request,callback)
 {
     pool.getConnection((err,con)=>
     {
         if(!err)
         {
            let sql ="select post.id , post.post_image, post.post_date,post.post_text,post.post_type,doctor.name from post inner join doctor on post.doc_id = doctor.id where post.post_type ='Public' order by post.id desc";
            con.query(sql,[],(err,results,fields)=>
            {
                con.release();
                callback(err,results,fields);
                            //console.log(post.post_type);
                            //console.log(results);

            });
        }
        
     });
 }

}
module.exports = new Post();