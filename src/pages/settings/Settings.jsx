import React from 'react'
import HeroSection from '../../components/settings/HeroSection'
import GeneralSettings from '../../components/settings/GeneralSettings'
import NotificationSettings from '../../components/settings/NotificationSettings'
import LocationSettings from '../../components/settings/LocationSettings'
import SecuritySettings from '../../components/settings/SecuritySettings'
import AdminActivity from '../../components/settings/AdminActivity'
import LanguageLocalization from '../../components/settings/LanguageLocalization'

const Settings = () => {
  return (
    <div>
     <HeroSection/>
     <GeneralSettings/>
     <NotificationSettings/>
     <LocationSettings/>
     <SecuritySettings/>
     <AdminActivity/>
     <LanguageLocalization/>
    </div>
  )
}

export default Settings
