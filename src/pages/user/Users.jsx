import React from 'react'
import HeroSection from '../../components/users/HeroSection'
import SearchFilters from '../../components/users/SearchFilters'

const Users = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <HeroSection />
      <SearchFilters />
    </div>
  )
}

export default Users
