const request=require('postman-request');
function forcast(latitude,longitude,callback){
    const url='http://api.weatherstack.com/current?access_key=4d5dd4217cc240be922aafba452aa161&query='+longitude+','+latitude;
   // console.log(url);
    request({url:url,json:true},(error,response)=>{
       if(error)
        callback("Unable to connect",undefined);
       else if(response.body.error)
       callback("Unable to find loaction",undefined);
       else
       callback(undefined,{
           temprature:response.body.current.temperature,
           location:response.body.location,
           weather_descriptions:response.body.current.weather_descriptions
       });
     // console.log(data.current.weather_descriptions[0]);
    });
  };

  module.exports=forcast;