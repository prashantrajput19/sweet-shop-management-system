import { XIcon, Tag } from "lucide-react";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { useMemo } from "react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    categories?: string[];
}

export function DataTableToolbar<TData>({ table, categories = [] }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    // Convert categories to the format expected by DataTableFacetedFilter
    const categoryOptions = useMemo(() => {
        return categories.map(category => ({
            value: category,
            label: category,
            icon: Tag,
        }));
    }, [categories]);

    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder={"Filter by name"}
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />

                {table.getColumn("category") && categoryOptions.length > 0 && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        title={"Category"}
                        options={categoryOptions}
                    />
                )}

                {isFiltered && (
                    <Button
                        variant="outline"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3">
                        {"Clean Filters"}
                        <XIcon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}