'use client'

import React, { useEffect, useState } from 'react'
import CurrentWeather from '@/components/Weather/CurrentWeather';
import Forecast from '@/components/Weather/Forecast';
import { useSearchParams } from 'next/navigation'
import { fetchCurrentWeatherData, fetchForecastData } from '@/services/operations/fetchForecastAPI';

const page = () => {

    const searchParams = useSearchParams()

    const [currentWeatherData, setCurrentWeatherData] = useState([]);
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const handleFetchData = () => {
            const lat = searchParams.get('lat')
            const lon = searchParams.get('lon')

            const currentWeatherFetch = fetchCurrentWeatherData(lat, lon);
            const forecastFetch = fetchForecastData(lat, lon);

            Promise.all([currentWeatherFetch, forecastFetch])
                .then(async (response) => {
                    const weatherResponse = response[0];
                    const forecastResponse = response[1];

                    setCurrentWeatherData(weatherResponse);
                    setForecastData(forecastResponse);
                })
                .catch(console.log);
        };

        handleFetchData();
    }, [])
    return (
        <div className='max-w-maxContent mx-auto'>
            <CurrentWeather data={currentWeatherData} />
            <Forecast data={forecastData} />
        </div>
    );
};

export default page;