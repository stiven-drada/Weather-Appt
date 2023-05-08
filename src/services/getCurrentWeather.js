import { kelvinToCelsius } from "../utils/kelvinToCelsius";
import { kelvinToFarenheit } from "../utils/kelvinToFarenheit";
import { getIconById } from "../utils/getIconByid";
import axios from "axios";

export const getCurrentWeather = async (lat , lon) =>{
    try {
        const params = {
             lat, lon, appid:"2c620eab352a353436186e1e8bbf3ad9" 
        }; 

        const res = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params,
            }
        );
        const weatherInfo = {
            country: res.data.sys.country,
            city: res.data.name,
            weather: { 
                main:res.data.weather[0].main,
                description: res.data.weather[0].description,
                icon: getIconById(res.data.weather[0].icon),
            },
            temperature : {
                kelvin: res.data.main.temp,
                celsius:kelvinToCelsius(res.data.main.temp),
                farenheit : kelvinToFarenheit(res.data.main.temp),
            },
        };
       
    return weatherInfo 
    } catch (error) {
        console.error(error)
        
    }

};
