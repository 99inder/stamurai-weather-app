"use client"

import { useEffect, useState } from "react";
import { columns } from "@/components/DataTable/columns";
import { DataTable } from "@/components/DataTable/DataTable";

const dataLimitPerRequest = 10;


export default function DemoPage() {
  const [data, setData] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchData, setSearchData] = useState<any[]>([]);

  const [startIndex, setStartIndex] = useState<number>(0);

  const fetchData = async () => {
    const apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=geoname_id%2Cname%2Cascii_name%2Ccountry_code%2Ccou_name_en AS countryName%2Ctimezone%2Ccoordinates&limit=${dataLimitPerRequest}&start=${startIndex}`;
    try {
      const response = await fetch(apiUrl);
      const newData = await response.json();

      setData((prevData) => [...prevData, ...newData.results]);
      setStartIndex((prev) => prev + dataLimitPerRequest);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSearchData = async () => {
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name,%22${searchQuery}%22) OR search(cou_name_en,%22${searchQuery}%22) OR suggest(name,%22${searchQuery}%22) OR suggest(cou_name_en,%22${searchQuery}%22) & select=geoname_id%2Cname%2Cascii_name%2Ccountry_code%2Ccou_name_en AS countryName%2Ctimezone%2Ccoordinates&limit=${dataLimitPerRequest}&start=${startIndex}`
    try {
      const response = await fetch(url);
      const newData = await response.json();

      setSearchData((prevData) => [...prevData, ...newData.results]);
      setStartIndex((prev) => prev + dataLimitPerRequest);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e: any) => {
    setStartIndex(0);
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    if (!searchQuery.length)
      fetchData();
    else {
      setStartIndex(0);
      setSearchData([]);
      fetchSearchData();
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto py-10">
      <input
        type="text"
        placeholder="Search..."
        className="outline outline-1 rounded-md focus:outline-blue-500 focus:outline-2 w-1/3 p-2"
        value={searchQuery}
        onChange={handleChange}
      />
      <div className="mt-5">
        <DataTable columns={columns} data={searchQuery.length ? searchData : data} fetchData={searchQuery.length ? fetchSearchData : fetchData} />
      </div>
    </div>
  )
}