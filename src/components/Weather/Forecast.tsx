import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";


const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Forecast({ data }: any) {

    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <>
            <label className="text-[23px] font-bold">Daily</label>
            <Accordion allowZeroExpanded>
                {data.length !== 0 && data.list.splice(0, 7).map((item: any, idx: number) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="bg-[#f5f5f5] rounded-[15px] h-[40px] m-[5px] flex items-center cursor-pointer text-sm py-[5px] px-[20px]">
                                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} className="w-[40px]" alt="weather" />
                                    <label className="cursor-pointer text-[#212121] flex-auto font-semibold ml-[15px]">{forecastDays[idx]}</label>
                                    <label className="cursor-pointer flex-auto mr-[15px] text-right">{item.weather[0].description}</label>
                                    <label className="text-[#757575]">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="grid gap-y-0 gap-x-[15px] flex-auto grid-cols-[auto_auto] py-[5px] px-[15px]">
                                <div className="flex items-center justify-between h-[30px]">
                                    <label className="text-[#757575]">Pressure:</label>
                                    <label className="text-[#212121]">{item.main.pressure}</label>
                                </div>
                                <div className="flex items-center justify-between h-[30px]">
                                    <label className="text-[#757575]">Humidity:</label>
                                    <label className="text-[#212121]">{item.main.humidity}</label>
                                </div>
                                <div className="flex items-center justify-between h-[30px]">
                                    <label className="text-[#757575]">Clouds:</label>
                                    <label className="text-[#212121]">{item.clouds.all}%</label>
                                </div>
                                <div className="flex items-center justify-between h-[30px]">
                                    <label className="text-[#757575]">Wind speed:</label>
                                    <label className="text-[#212121]">{item.wind.speed} m/s</label>
                                </div>
                                <div className="flex items-center justify-between h-[30px]">
                                    <label className="text-[#757575]">Sea level:</label>
                                    <label className="text-[#212121]">{item.main.sea_level}m</label>
                                </div>
                                <div className="flex items-center justify-between h-[30px]">
                                    <label className="text-[#757575]">Feels like:</label>
                                    <label className="text-[#212121]">{item.main.feels_like}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}