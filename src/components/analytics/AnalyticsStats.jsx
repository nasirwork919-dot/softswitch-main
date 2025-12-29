import React from 'react'
import TotalUsers from '../../assets/TotalUsers.png'
import TotalCommunities from '../../assets/TotalCommunities.png'
import TotalPosts from '../../assets/TotalPosts.png'
import TotalEvents from '../../assets/TotalEvents.png'
import MarketplaceListings from '../../assets/MarketplaceListings.png'
import ServiceProviders from '../../assets/ServiceProviders.png'
import MonthlyGrowth from '../../assets/MonthlyGrowth.png'
import ServicesUsage from '../../assets/ServicesUsage.png'
import { ArrowUp } from 'lucide-react'

const AnalyticsStats = () => {
    const statsData = [
        {
            id: 1,
            title: 'Total Users',
            image: TotalUsers,
            value: '24,582',
            sub: [ArrowUp, "12.5% from last month"]
        },
        {
            id: 2,
            title: 'Total Communities',
            image: TotalCommunities,
            value: '1,847',
            sub: [ArrowUp, "8.3% from last month"]
        },
        {
            id: 3,
            title: 'Total Posts',
            image: TotalPosts,
            value: '89,421',
            sub: [ArrowUp, "15.7% from last month"]
        },
        {
            id: 4,
            title: 'Total Events',
            image: TotalEvents,
            value: '3,256',
            sub: [ArrowUp, "22.3% from last month"]
        },
        {
            id: 5,
            title: 'Marketplace Listings',
            image: MarketplaceListings,
            value: '12,894',
            sub: [ArrowUp, "18.9% from last month"]
        },
        {
            id: 6,
            title: 'Service Providers',
            image: ServiceProviders,
            value: '4,127',
            sub: [ArrowUp, "10.4% from last month"]
        },
        {
            id: 7,
            title: 'Monthly Growth',
            image: MonthlyGrowth,
            value: '+11.4%',
            sub: [ArrowUp, "14.6% from last month"]
        },
        {
            id: 8,
            title: 'Services Usage',
            image: ServicesUsage,
            value: '27,950',
            sub: [ArrowUp, "Requests this month"]
        },
    ];

    return (
        <div className='w-full mt-8'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {statsData.map((item) => {
                    const Icon = item.sub[0];

                    return (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col">
                                <p className="text-gray-600 text-sm font-medium">{item.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{item.value}</h3>

                                <p className="text-green-600 text-xs font-medium mt-1 flex items-center">
                                    <Icon className="w-3 h-3 mr-1" />
                                    {item.sub[1]}
                                </p>
                            </div>

                            <div className="rounded-full flex items-center justify-center">
                                <img src={item.image} alt={item.title} className="w-12 h-12" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default AnalyticsStats
