import React from 'react'
import HeroSection from '../../components/heroSection/HeroSection'
import DashboardStats from '../../components/dashBoard/DashboardStats'
import PlatformActivity from '../../components/graph/PlatformActivity'
import RecentActivity from '../../components/dashBoard/RecentActivity'

const DashBoard = () => {
    return (
        <div className="min-h-screen space-y-8 animate-in fade-in duration-500">
            <HeroSection />
            <section className="space-y-6">
                <DashboardStats />
                <PlatformActivity />
                <RecentActivity />
            </section>
        </div>
    )
}

export default DashBoard