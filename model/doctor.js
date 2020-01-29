const pool = require('./dbconfig');
const path = require('path');

let Doctor = function()
{
    this.registerDoctor = function(request,callback)
    {
        pool.getConnection((err,con)=>
        {
            if(!err)
            {
               // console.log(request.body);
                let sql = "insert into doctor (name,mobile,email,password,dob,mci,gender,city_id,speciality_id,state_id,country_id,experience,verify) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
               
                con.query(sql,[request.body.name,parseInt(request.body.mobile_no),request.body.email,request.body.password,request.body.dob,parseInt(request.body.mci),request.body.gender,parseInt(request.body.city_id),parseInt(request.body.specialization_id),parseInt(request.body.state_id),parseInt(request.body.country_id),request.body.experience,'no'],(err,results,fields)=>
                {
                con.release();
                
                callback(err,results,fields);
                });
            }
        });
    }
    this.signInDoctor = function(request,callback)
    {
        pool.getConnection((err,con)=>
        {
            if(!err)
            {
                let sql = "select * from doctor where email =? and password =? and verify='yes'";
                con.query(sql,[request.body.email,request.body.password],(err,results,fields)=>{
                con.release();
                //console.log(results);
                callback(err,results,fields);
                });
            }
        });
    }
    this.getALLEmail = function(request,callback)
    {
        pool.getConnection((err,con)=>
        {
            if(!err)
            {
            let sql = "select email from doctor where email =?";
            con.query(sql,[request.query.eid],(err,results,fields)=>
            {   
                con.release();
                callback(err,results,fields);
            });
        }
        });
    }
    this.changeProfile = function(request,callback)
    {
        let filePath =  request.files.profile_pic;
        let file_name = new Date().getTime()+filePath.name;
        filePath.mv(path.join(__dirname,'../public/profile',file_name),function(err)
        {
            if(!err)
            {
                pool.getConnection((err,con)=>
                {
                    let sql ="update doctor set profile_pic=? where id=? ";
                    con.query(sql,[file_name,parseInt(request.session.docid)],(err,results,fields)=>
                    {
                        con.release();
                        callback(err,results,fields,file_name);
                    });
                });
            }
        });
    }
    this.verifyDoctor =function(request,callback)
    {
        pool.getConnection((err,con)=>
        {
            let sql = "update doctor set verify='yes' where email=?";
            con.query(sql,[request.query.email],(err,results,fields)=>
            {
                con.release();
                callback(err,results,fields);
            });
        });
    }
    this.getListofDoctor = function(city_id,callback)
    {
        pool.getConnection((err,con)=>
        {
            let sql ="select * from doctor where city_id=?";
            con.query(sql,[parseInt(city_id)],(err,results,fields)=>
            {
                con.release();
                //console.log(results);
                callback(err,results,fields);
            });
            
        })
    }

}
module.exports = new Doctor();