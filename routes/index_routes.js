const express = require('express');
const state = require('../model/state');
const city = require('../model/city');
const doctor = require('../model/doctor');
const router = express.Router();

router.get('/',(request,response)=>
{
    response.render('login');
});
router.get('/get_state',(request,response)=>
{
    state.getState(request,function(err,results,fields){
    if(!err)
    {
        let stateList = "<option value='0'>Select State</option>";
        for(index in results)
            stateList = stateList+"<option value='" +results[index].id+" '>"+results[index].state_name+"</option>";
            response.send(stateList);
    }
    else
    response.rendor('error');
});
});
router.get('/get_city',(request,response)=>
{
    city.getCity(request,function(err,results,fields){
        if(!err)
        {
            let cityList = "<option value='0'>Select City</option>";
            for(index in results)
            cityList = cityList+"<option value=' " +results[index].id+"'>"+results[index].city_name+"</option>";
            response.send(cityList);
        }
        else
        response.render('error');
});
});
router.get('/get_email', (request,response)=>
{
doctor.getALLEmail(request,(err,results,fields)=>
{
if(!err)
{
    if(results==0)
    response.send('0');
    else
    response.send('1');
}
});
});
module.exports = router;
