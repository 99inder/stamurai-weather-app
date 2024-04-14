"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export type City = {
    id: string
    geoname_id: String
    name: String
    countryName: String
    country_code: String
    timezone: String
}

export const columns: ColumnDef<City>[] = [
    {
        accessorKey: "geoname_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="w-full flex justify-between"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Geo Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // header: "Geo Id",
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="w-full flex justify-between"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    City
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // header: "City",
    },
    {
        accessorKey: "countryName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="w-full flex justify-between"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Country
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // header: "Country",
    },
    {
        accessorKey: "country_code",
        header: "Country Code",
    },
    {
        accessorKey: "timezone",
        header: "Timezone",
    },
]
