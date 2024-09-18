'use client'
import { useState, useEffect } from 'react';
import { GetFarms, GetFarmData, GetFarmByID } from '@/app/utils/supabase/server'
import { useSearchParams } from 'next/navigation';
import { FarmHumidityChart, SoliDataChart } from '../components/chart';

interface FarmData {
    id: number;
    created_at: string;
    soil_moisture: number;
    area_humidity: number;
    area_temp: number
}

interface Farm {
    id: number;
    created_at: string;
    district: string;
    state: string;
    country: string;
    farm_id: number;
    details: {
        Crops: string[];
    };
}

export default function Dashboard() {
    const searchParams = useSearchParams();
    const farmId = searchParams.get('farmId');

    const [farmData, setFarmData] = useState<FarmData[]>([]);
    const [farmDetails, setFarmDetails] = useState<Farm[]>([]);
    useEffect(() => {
        async function fetchData() {
            if (typeof farmId === 'string') {
                const farm_data = await GetFarmData(farmId);
                setFarmData(farm_data);
                const farm_details = await GetFarmByID(farmId);
                setFarmDetails(farm_details)
                console.log(farm_details)
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {/* Top Section */}
            <div className=" h-screen grid grid-cols-2 gap-4 mb-6">
                {/* Left Side (two boxes stacked vertically) */}
                <div className="space-y-5 ">
                    <div className="bg-gray-200 h-1/3 rounded shadow-md">
                        <SoliDataChart data={farmData} />
                    </div>
                    <div className="bg-gray-200 h-1/3 rounded shadow-md">
                        <FarmHumidityChart data={farmData} />
                    </div>
                </div>

                {/* Right Side (Crops and Stats) */}
                <div className="space-y-3">
                    <div className="bg-gray-200 h-3/5 rounded shadow-md p-4">
                        <p className="text-center text-lg font-bold mb-4">Crops</p>
                        <div className="grid grid-cols-2 gap-4">
                            {farmDetails.length > 0 && farmDetails[0].details.Crops.map((crop, index) => (
                                <div key={index} className="bg-green-100 text-green-900 px-4 py-2 rounded-lg text-center shadow-sm">
                                    {crop}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-200 h-1/3 rounded shadow-md flex items-center justify-center">
                        <p className="text-center">Stats</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-4 h-screen">
                {/* Badges and Connect (Two boxes side by side) */}
                <div className="bg-gray-200 h-5/6 rounded shadow-md flex items-center justify-center">
                    <p className="text-center">Badges</p>
                </div>
                <div className="bg-gray-200 h-5/6 rounded shadow-md flex items-center justify-center">
                    <p className="text-center">Connect</p>
                </div>
            </div>
        </div>
    );
}
