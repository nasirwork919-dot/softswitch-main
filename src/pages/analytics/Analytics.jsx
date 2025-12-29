import React from 'react'
import HeroSection from '../../components/analytics/HeroSection'
import AnalyticsStats from '../../components/analytics/AnalyticsStats'
import UserGrowth from '../../components/analytics/UserGrowth'
import Marketplace from '../../components/analytics/Marketplace'
import PerformingCommunities from '../../components/analytics/PerformingCommunities'

const Analytics = () => {
  return (
    <div>
      <HeroSection/>
      <AnalyticsStats/>
      <UserGrowth/>
      <Marketplace/>
      <PerformingCommunities/>
    </div>
  )
}

export default Analytics
