import React from 'react'
import HeroSection from '../../components/health-wellness/Herosection'
import StatsCards from '../../components/health-wellness/StatsCards'
import Tracking from '../../components/health-wellness/Tracking'
import Reminders from '../../components/health-wellness/Reminders'

const HealthWellness = () => {
  return (
    <div>
      <HeroSection/>
      <StatsCards/>
      <Tracking/>
      < Reminders/>
    </div>
  )
}

export default HealthWellness
