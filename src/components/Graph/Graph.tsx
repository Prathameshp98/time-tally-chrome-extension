import React, { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip';
import StatProps from "../../Props/stats.d";
import formatTime from "../../Utils/general/formatTime";

const Graph = () => {
    const [topSites, setTopSites] = useState<StatProps[]>([]);
    const [maxTime, setMaxTime] = useState<number>(0);

    useEffect(() => {
        chrome.storage.local.get('data', (result) => {
            if (result.data && result.data.stats) {
                const statsArray: StatProps[] = result.data.stats;
                
                // Sort by time spent and get top 5 sites
                const sortedSites = statsArray
                    .filter(site => site.time > 0)
                    .sort((a, b) => b.time - a.time)
                    .slice(0, 5);
                
                // Find maximum time for scaling the bars
                const maxTimeValue = sortedSites.length > 0 ? sortedSites[0].time : 0;
                
                setTopSites(sortedSites);
                setMaxTime(maxTimeValue);
            }
        });
    }, []);

    const getBarHeight = (time: number): number => {
        if (maxTime === 0) return 0;
        return Math.max((time / maxTime) * 80, 4); // Minimum 4px height for visibility
    };

    const getBarColor = (index: number): string => {
        const colors = [
            'bg-blue-500',
            'bg-green-500', 
            'bg-purple-500',
            'bg-orange-500',
            'bg-red-500'
        ];
        return colors[index] || 'bg-gray-500';
    };

    const truncateDomain = (domain: string): string => {
        if (domain.length <= 8) return domain;
        return domain.substring(0, 8) + '...';
    };

    return (
        <div className="bg-white w-component-half h-36 mt-4 rounded shadow-sm border border-gray-200 p-3 flex flex-col overflow-hidden">
            <h3 className="text-base font-semibold text-gray-800 mb-2 truncate flex-shrink-0">Top Sites</h3>
            
            {topSites.length === 0 ? (
                <div className="flex items-center justify-center flex-1 text-gray-500 text-xs">
                    No data available yet
                </div>
            ) : (
                <div className="flex-1 flex flex-col min-w-0 min-h-0">
                    <Tooltip id="graph-tooltip" />
                    <div className="flex items-end justify-between h-12 gap-1 mb-1 min-w-0">
                        {topSites.map((site, index) => (
                            <div key={site.id} className="flex flex-col items-center flex-1 min-w-0">
                                <div 
                                    className={`w-full ${getBarColor(index)} rounded-t transition-all duration-300 hover:opacity-80`}
                                    style={{ height: `${Math.max((site.time / maxTime) * 40, 3)}px` }}
                                    data-tooltip-id="graph-tooltip"
                                    data-tooltip-content={`${site.name}: ${formatTime(site.time)}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between gap-1 min-w-0 flex-shrink-0">
                        {topSites.map((site, index) => (
                            <div key={`${site.id}-label`} className="flex-1 text-center min-w-0">
                                <div 
                                    className="text-xs text-gray-600 truncate"
                                    data-tooltip-id="graph-tooltip"
                                    data-tooltip-content={site.name}
                                >
                                    {truncateDomain(site.name)}
                                </div>
                                <div 
                                    className="text-xs text-gray-500 truncate"
                                    data-tooltip-id="graph-tooltip"
                                    data-tooltip-content={formatTime(site.time)}
                                >
                                    {formatTime(site.time)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Graph;