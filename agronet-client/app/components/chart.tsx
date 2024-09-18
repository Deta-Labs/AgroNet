import React from "react";
import { Chart } from "react-google-charts";

// Define the shape of the farm data
interface FarmData {
    id: number;
    created_at: string;
    soil_moisture: number;
    area_humidity: number;
    area_temp: number;
}

// Props for the FarmDataChart component
interface FarmDataChartProps {
    data: FarmData[];
}

export const SoliDataChart: React.FC<FarmDataChartProps> = ({ data }) => {

    const chartData = [
        ["Time", "Soil Moisture", "Area Temperature"], // Chart headers
        ...data.map((item) => [
            new Date(item.created_at).toLocaleTimeString(),
            item.soil_moisture,
            item.area_temp,
        ]),
    ];

    const options = {
        title: "Soil Moisture and Area Temperature Over Time",
        hAxis: { title: "Time", format: "h:mm:ss a" },
        vAxis: { title: "Values" },
        curveType: "function", // For smooth lines
        legend: { position: "bottom" },
        colors: ["#e2431e", "#6f9654"],
        backgroundColor: "#E5E7EB",
        chartArea: { backgroundColor: "#ffffff" },
    };

    return (
        <div>
            <Chart
                chartType="LineChart"
                width="100%"
                height="100%"
                data={chartData}
                options={options}
            />
        </div>
    );
};

export const FarmHumidityChart: React.FC<FarmDataChartProps> = ({ data }) => {

    const chartData = [
        ["Time", "Farm Humidity"], // Chart headers
        ...data.map((item) => [
            new Date(item.created_at).toLocaleTimeString(),
            item.area_humidity,
        ]),
    ];

    const options = {
        title: "Farm Moisture Time",
        hAxis: { title: "Time", format: "h:mm:ss a" },
        vAxis: { title: "Values" },
        curveType: "function", // For smooth lines
        legend: { position: "bottom" },
        colors: ["#e2431e"],
        backgroundColor: "#E5E7EB",
        chartArea: { backgroundColor: "#ffffff" },
    };

    return (
        <div>
            <Chart
                chartType="LineChart"
                width="100%"
                height="100%"
                data={chartData}
                options={options}
            />
        </div>
    );
};
