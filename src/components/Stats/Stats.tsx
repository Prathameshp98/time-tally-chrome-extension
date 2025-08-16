import React, { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip';
import StatProps from "../../Props/stats.d";
import formatTime from "../../Utils/general/formatTime";

interface StatsData {
    totalSites: number;
    totalTime: number;
    mostVisited: string;
    longestSession: number;
}

const Stats = () => {
    const [stats, setStats] = useState<StatsData>({
        totalSites: 0,
        totalTime: 0,
        mostVisited: "None",
        longestSession: 0
    });

    useEffect(() => {
        chrome.storage.local.get('data', (result) => {
            if (result.data && result.data.stats) {
                const statsArray: StatProps[] = result.data.stats;
                
                // Calculate total sites
                const totalSites = statsArray.length;
                
                // Calculate total time spent across all sites
                const totalTime = statsArray.reduce((sum, site) => sum + site.time, 0);
                
                // Find most visited site (by time)
                const mostVisitedSite = statsArray.reduce((prev, current) => 
                    (prev.time > current.time) ? prev : current, 
                    { name: "None", time: 0 } as StatProps
                );
                
                // Find longest single session
                const longestSession = statsArray.reduce((max, site) => 
                    Math.max(max, site.maxTime), 0
                );

                setStats({
                    totalSites,
                    totalTime,
                    mostVisited: mostVisitedSite.name,
                    longestSession
                });
            }
        });
    }, []);

    return (
        <div className="bg-white w-component-half h-36 mt-4 rounded shadow-sm border border-gray-200 p-3 flex flex-col overflow-hidden">
            <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">Quick Stats</h3>
            <div className="flex-1 space-y-1.5 text-xs overflow-hidden">
                <Tooltip id="stats-tooltip" place="top" delayShow={300} />
                <div className="flex justify-between items-center min-w-0">
                    <span className="text-gray-600 flex-shrink-0">Sites Tracked:</span>
                    <span className="font-medium text-blue-600 ml-2">{stats.totalSites}</span>
                </div>
                <div className="flex justify-between items-center min-w-0">
                    <span className="text-gray-600 flex-shrink-0">Total Time:</span>
                    <span 
                        className="font-medium text-green-600 ml-2 truncate"
                        data-tooltip-id="stats-tooltip"
                        data-tooltip-content={formatTime(stats.totalTime)}
                    >
                        {formatTime(stats.totalTime)}
                    </span>
                </div>
                <div className="flex justify-between items-center min-w-0">
                    <span className="text-gray-600 flex-shrink-0">Most Used:</span>
                    <span 
                        className="font-medium text-purple-600 ml-2 truncate flex-1 text-right"
                        data-tooltip-id="stats-tooltip"
                        data-tooltip-content={stats.mostVisited}
                    >
                        {stats.mostVisited}
                    </span>
                </div>
                <div className="flex justify-between items-center min-w-0">
                    <span className="text-gray-600 flex-shrink-0">Longest Session:</span>
                    <span 
                        className="font-medium text-orange-600 ml-2 truncate"
                        data-tooltip-id="stats-tooltip"
                        data-tooltip-content={formatTime(stats.longestSession)}
                    >
                        {formatTime(stats.longestSession)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Stats;