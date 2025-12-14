import { useQuery } from "@tanstack/react-query";
import type { Sweet } from "@/lib/interfaces";
import axios from "axios";
import { base } from "@/lib/base";
import useLocalStorage from "@/hooks/useLocalStorage";
import DataTable from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { useMemo } from "react";
import UserNav from "@/components/user-nav";
import { AddSweetDialog } from "@/components/add-sweet-dialog";

export default function AdminPage() {
    const [accessToken] = useLocalStorage<string | null>("accessToken", null);

    const { data: sweetsData } = useQuery<Sweet[] | null>({
        queryKey: ['allSweets'],
        queryFn: async () => {
            const response = await axios.get(`${base}/sweets`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data.data;
        },
    });

    const categories = useMemo(() => {
        if (!sweetsData) return [];
        const uniqueCategories = [...new Set(sweetsData.map(sweet => sweet.category))];
        return uniqueCategories;
    }, [sweetsData]);

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <UserNav />
            <div className="px-4 md:px-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <AddSweetDialog />
                </div>
                {sweetsData &&
                    <DataTable
                        columns={columns}
                        data={sweetsData}
                        categories={categories}
                    />
                }
            </div>
        </div>
    )
}