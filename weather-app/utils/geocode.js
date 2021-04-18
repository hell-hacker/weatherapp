const request=require('postman-request');
let url='http://api.weatherstack.com/current?access_key=4d5dd4217cc240be922aafba452aa161&query=26.4947,77.9940';

const  geocode=(place,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiaGVsbC1oYWNrZXIiLCJhIjoiY2tuZnpuOXJyMG02cjJubnc2eWtjc2RydSJ9.034pucWnXooyS9zxUkU3Yw';
     
      request({url:url,json:true},function(error,response){
       
         const data=response.body.features;
         if(error)
         callback("Unable to connect.",undefined);
         else if(data.length==0)
         callback("Unable to find location.",undefined);
         else
         callback(undefined,{
           latitude:response.body.features[0].center[0],
           longitude:response.body.features[0].center[1],
           location:response.body.features[0].place_name
         })
     });
   }
   
module.exports= geocode;