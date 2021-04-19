const express=require('express');
//const forcast=require('./weather-app/utils/app.js')
const geocode=require('./utils/geocode.js');
const forcast=require('./utils/forcast.js');
const path=require('path');
const hbs=require('hbs');
const app=express();
const publicpath=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'../templates/views');

const partialpath=path.join(__dirname,'../templates/partials');
app.set('view engine',"hbs");
app.set('views',viewspath);
hbs.registerPartials(partialpath);
app.use(express.static(publicpath));
console.log(publicpath);
 app.get('',(req,res)=>{
        res.render('index',{
            title:'Raman'
        }) 
  })
  app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About'
    }) 
})
 app.get('/weather',(req,res)=>{
       if(!req.query.place){
         return  res.send({error:"please provide a location"})
       }
       
    geocode(req.query.place,(error,data)=>{
        if(error)
        res.send({error:error});
        else{
           forcast(data.latitude,data.longitude,(error,data)=>{
             if(error)
             res.send({error:error});
             else
             res.send({temperature:data.temprature,location:data.location,desc:data.weather_descriptions});
           })
     }})
    
   
})

app.get('*',(req,res)=>{
    res.send("<h1>404 Error Page Not found</h1>")
})
app.listen(process.env.PORT||3000,()=>{
     console.log("Your code is working");
 })