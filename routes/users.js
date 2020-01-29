const express = require('express');
const router = express.Router();
const country  = require('../model/country');
const speciality = require('../model/speciality');
const doctor = require('../model/doctor');
const post = require('../model/post');
const city = require('../model/city');
const mail = require('./mailer');
router.get('/signup',(request,response)=>
{
let countryPromise = new Promise((resolve,reject)=>
{
    country.getCountryList(function(err,results,fields)
    {
        err ? reject() : resolve(results);
        
    });
});
let specialityPromise = new Promise((resolve,reject)=>
{
    speciality.getSpeciality(function(err,results,fields)
    {
        err ? reject()  : resolve(results);
    })
});
Promise.all([countryPromise,specialityPromise]).then((result)=>
{
       // console.log(result);
       response.render('signup',{countryList : result[0],speciality : result[1]})
}).catch(()=>{

        console.log('error');
});
});
router.post('/sign_up_task',(request,response)=>
{   //console.log(request.body);
    doctor.registerDoctor(request,(err,results,fields)=>
    {
       //console.log(err);
       // err ? response.render('error') : response.render('login');
     
           mail.mailer(request.body.email,(error,info)=>
           {
               console.log("mailer..."+info+error);
            response.render('login');
        })
           
       });
    });

router.post('/sign_in',(request,response)=>
{
    doctor.signInDoctor(request,(err,results,fields)=>
    {
        if(err)
        {
            response.render('error');
        }
        else{
            if(results.length != 0)  
        {
            //console.log(results);
            request.session.name = results[0].name;
            request.session.email = results[0].email;
            request.session.gender = results[0].gender;
            request.session.dob = results[0].dob;
            request.session.docid = results[0].id;
            request.session.profile_pic = results[0].profile_pic;
            request.session.city_id = results[0].city_id;
        //response.render('home'); 
        response.redirect('/users/home');
        }
        else
        response.render('login');
    }
    });
});
    router.get('/home',(request,response)=>
    {
        post.getPublicPost(request,(err,results,fields)=>{
        response.render('home',{profile_pic:request.session.profile_pic,name:request.session.name, gender:request.session.gender , dob : request.session.dob,email : request.session.email,publicPostList : results});
        //console.log(results);
    });
    });
    router.get('/logout',(request,response)=>
    {
        request.session.destroy();
        response.render('login');
    });
    router.post('/upload_post',(request,response)=>
    {
        post.savePost(request,(err,results,fields)=>
        {
            //console.log(err);
            //response.send('Uploaded');
            response.redirect('/users/home');
        });
    });
    router.post('/change_profile',(request,response)=>
    {
        doctor.changeProfile(request,(err,results,fields,file_name)=>
        {
            if(!err)
            {
                request.session.profile_pic = file_name;
                response.redirect('/users/home');
            }
        });
    });
    router.get('/verify_account',(request,response)=>
    {
        doctor.verifyDoctor(request,(err,results,fields)=>
        {
            if(!err)
            response.render('login');
        });
        
    });
    router.get('/search_view',(request,response)=>
    {
        city.getAllCity(request,(err,cities,fields)=>
        {
            if(!err)
            {
                doctor.getListofDoctor(request.session.city_id,(err,results,fields)=>
                {
                    //console.log(cities);
                    console.log(results);
                    if(!err)
                    response.render('search_by_city',{cityList: cities,profile_pic: request.session.profile_pic,name: request.session.name, gender: request.session.gender, dob: request.session.dob, email: request.session.email,doctorList: results});                  
                })
            }
        })
    })
    

module.exports = router;