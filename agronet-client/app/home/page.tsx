'use client'
import { useState, useEffect } from 'react';
import { GetFarms } from '@/app/utils/supabase/server'
import { useRouter } from 'next/navigation';

interface Farm {
    id: number;
    created_at: string;
    district: string;
    state: string;
    country: string;
    farm_id: number;
}


export default function MainPage() {
    const router = useRouter();

    const handleRedirect = (id: number) => {
        router.push(`/dashboard?farmId=${id}`);
    };

    const [farms, setFarms] = useState<Farm[]>([]);
    const [filteredFarms, setFilteredFarms] = useState<Farm[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await GetFarms();
            setFarms(data);
            setFilteredFarms(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredFarms(
                farms.filter(farm =>
                    farm.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    farm.district.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredFarms(farms);
        }
    }, [searchQuery, farms]);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search by state or district"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFarms.length > 0 ? filteredFarms.map((farm) => (
                    <button onClick={()=>handleRedirect(farm.id)}>
                        <div key={farm.id} className="border p-4 rounded shadow-md bg-white">
                            <p><strong>Country:</strong> {farm.country}</p>
                            <p><strong>State:</strong> {farm.state}</p>
                            <p><strong>District:</strong> {farm.district}</p>
                            <p><strong>Created At:</strong> {new Date(farm.created_at).toLocaleString()}</p>
                        </div>
                    </button>

                )) : (
                    <p>No farms found.</p>
                )}
            </div>
        </div>
    );
}
