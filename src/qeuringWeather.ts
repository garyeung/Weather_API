import { Response, Request } from "express";
import axios from "axios";
import reditClient from "./redisClient";

async function queryWeather(req: Request, res: Response) {
    const location = req.query.location; // Ensure location is string

    if (!location) {
        res.status(400).json({
            error: "The location is required",
        });
        return;
    }

    const catchKey = `weather: ${location}`; 
    const cacheData = await reditClient.get(catchKey);
    if(cacheData){
        res.status(200).json(JSON.parse(cacheData));
        return;
    }

    try {
        const result = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}`);

        // Cache the result in Redis for futre requests
        reditClient.set(catchKey, JSON.stringify(result.data), {
            EX: 3600,
        })
        res.status(200).json(result.data); // Respond with the weather data
    } catch (error) {
        console.error("Error fetching weather data:", error);

        if (axios.isAxiosError(error) && error.response) {
            // Check if the error is an Axios error and has a response
            if (error.response.status === 400) {
                res.status(404).json({
                    error: "Location not found",
                });
            }

            // For other Axios error statuses
           else {
                res.status(error.response.status).json({
                message: error.response.data.message || "An error occurred",
            });
            }
            return;
        }

        // Handle other types of errors
        res.status(500).json({
            error: "An unexpected error occurred",
        });
    }
}

export default queryWeather;