"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import InfiniteScroll from "react-infinite-scroll-component"
import React, { useRef } from "react"
import { Input } from "../ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    fetchData: () => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    fetchData,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })
    const targetRef = useRef(null);
    const router = useRouter();

    return (
        <div id="scrollableTarget" ref={targetRef} className="rounded-md border h-[500px] overflow-y-scroll px-1">
            <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                className="!w-full"
                scrollableTarget="scrollableTarget"
            >
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Search city within the table..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {
                            table.getRowModel().rows?.length ? (

                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="cursor-pointer"
                                        onClick={() => router.push(`/weather?lat=${(row.original as any).coordinates.lat}&lon=${(row.original as any).coordinates.lon}`)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                <Link href={`/weather?lat=${(row.original as any).coordinates.lat}&lon=${(row.original as any).coordinates.lon}`}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Link>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))



                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>

                </Table>
            </InfiniteScroll>
        </div>
    )
}
