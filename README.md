# Weather_API

## Description
(https://roadmap.sh/projects/weather-api-wrapper-service)  
This is a weather API that fetches and returns weather data.  
In this project, instead of relying on our own weather data, we will build a weather API that fetches and returns weather data from a 3rd party API.

## Prerequisites
```sh
install redis
install npm@latest
```
Register on [Visual Crossing’s API](https://www.visualcrossing.com/weather-api) to get your key or use your favorite API.  

## Installation
```sh
git clone https://github.com/garyeung/todo_list_API.git

cd todo_list_API 

npm install 
```

## Usage
Make sure your redis server is running
```
npm run build
npm run start

GET yourhost/weather/?location="name or lat&long"
```

## Mechanism  
- Rely the weather data according to the city location of the request including name, latitude & longitude.

- If the cache has the current data return it to the client side, otherwise request the Weather API and store the cache.
  
- Cache have expiration time.
  
- There is a rate limit to prevent abuse of the API. 