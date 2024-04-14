import React from 'react'

export default function CurrentWeather({ data }: any) {


    return (
        <>
            {
                data.length != 0 &&
                <div className="w-[300px] rounded-[6px] text-white bg-[#333] mt-[20px] mx-auto mb-0 px-5 pb-5 pt-0 drop-shadow-xl shadow-md shadow-black">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg leading- tracking-[1px]">{data.name}</p>
                            <p className="font-normal text-[14px] leading- m-0">{data.weather.description}</p>
                        </div>
                        <img
                            alt="weather"
                            className="w-[100px]"
                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-5xl w-auto tracking-[-3px] my-[10px]">{Math.round(data.main.temp)}°C</p>
                        <div className="w-full pl-[20px]">
                            <div className="flex justify-between">
                                <span className="text-left font-normal text-xs">Details</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-left font-normal text-xs">Feels like</span>
                                <span className="text-right font-semibold text-xs">
                                    {Math.round(data.main.feels_like)}°C
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-left font-normal text-xs">Wind</span>
                                <span className="text-right font-semibold text-xs">{data.wind.speed} m/s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-left font-normal text-xs">Humidity</span>
                                <span className="text-right font-semibold text-xs">{data.main.humidity}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-left font-normal text-xs">Pressure</span>
                                <span className="text-right font-semibold text-xs">{data.main.pressure} hPa</span>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    );
}