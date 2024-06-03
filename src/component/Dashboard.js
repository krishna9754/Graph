import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import dataItem from './data.json';

const Dashboard = () => {
    const [data, setData] = useState(dataItem);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle function for dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Define classes for dark and light modes
    const themeClass = isDarkMode ? "dark" : "light";
    const bgColorClass = isDarkMode ? "bg-black" : "bg-white";
    const textColorClass = isDarkMode ? "text-white" : "text-black";

    const barData = {
        labels: data.map(item => new Date(item.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Source Ports',
                data: data.map(item => item.src_port),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: data.map(item => new Date(item.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Destination Ports',
                data: data.map(item => item.dest_port),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            },
        ],
    };

    const pieData = {
        labels: ['ET SCAN Suspicious inbound to mySQL port 3306', 'ET SCAN Potential VNC Scan 5900-5920'],
        datasets: [
            {
                label: 'Alerts',
                data: [
                    data.filter(item => item.alert && item.alert.signature === 'ET SCAN Suspicious inbound to mySQL port 3306').length,
                    data.filter(item => item.alert && item.alert.signature === 'ET SCAN Potential VNC Scan 5900-5920').length,
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            },
        ],
    };

    return (
        // <div className={`w-fit ${textColorClass} `}>
            <div className={`container p-4 ${themeClass} ${bgColorClass}`}>
                <button onClick={toggleDarkMode} className={`absolute top-0 right-0 px-4 py-2 rounded ${bgColorClass} ${textColorClass}`}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <h1 className={`text-2xl font-bold mb-4`}>Security Alerts Dashboard</h1>
                {/* <div className="grid"> */}
                    <div className={`p-4 shadow rounded `}>
                        <h2 className={`text-xl mb-2 ${textColorClass}`}>Source Ports</h2>
                        <Bar data={barData} />
                    </div>
                    <div className={`p-4 shadow rounded ${bgColorClass}`}>
                        <h2 className={`text-xl mb-2 ${textColorClass}`}>Destination Ports</h2>
                        <Line data={lineData} />
                    </div>
                    <div className={`w-[500px] p-4 shadow rounded ${bgColorClass}`}>
                        <h2 className={`text-xl mb-2 ${textColorClass}`}>Alerts</h2>
                        <Pie data={pieData} />
                    </div>
                {/* </div> */}
            </div>
        // </div>
    );
};

export default Dashboard;
