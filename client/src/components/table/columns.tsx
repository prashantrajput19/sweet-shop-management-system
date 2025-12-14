import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import type { Sweet } from "@/lib/interfaces";
import dayjs from "dayjs";

export const columns: ColumnDef<Sweet>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Name"} />,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Category"} />,
        cell: ({ row }) => {
            const category = row.getValue("category") as string;
            return (
                <div className="flex items-center">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {category}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Price"} />,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            return <div className="font-medium">₹{price}</div>;
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Stock"} />,
        cell: ({ row }) => {
            const stock = row.getValue("stock") as number;
            const stockStatus = stock === 0 ? "out" : stock < 10 ? "low" : "good";
            const statusColors = {
                out: "bg-destructive/10 text-destructive ring-destructive/20",
                low: "bg-yellow-500/10 text-yellow-600 ring-yellow-500/20",
                good: "bg-green-500/10 text-green-600 ring-green-500/20",
            };
            return (
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColors[stockStatus]}`}>
                    {stock} {stock === 1 ? "unit" : "units"}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Created At"} />,
        cell: ({ row }) => {
            return dayjs(row.getValue("createdAt")).format("DD MMM YYYY");
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];