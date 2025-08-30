import React from 'react'
import Hero from '../components/Hero'
import TextCarousel from '../components/Carousel'
import TeamMember from '../components/teammember'
const Home = () => {
  return (
    <div>
      <Hero />
      <div className="flex flex-col items-center content-center py-16">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Featured <span className="text-primary">Blogs</span>
        </h1>
        <TextCarousel />
        <TeamMember/>
      </div>
    </div>
  )
}

export default Home
