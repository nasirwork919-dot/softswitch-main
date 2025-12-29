import React from 'react'
import HeroSection from '../../components/services-managment/HeroSection'
import ServicesManagmentTabs from '../../components/services-managment/ServicesManagmentTabs'

const ServicesManagment = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <HeroSection />
            <ServicesManagmentTabs />
        </div>
    )
}

export default ServicesManagment