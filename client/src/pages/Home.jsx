import React from 'react'
import Hero from '../components/Hero'
import TextCarousel from '../components/Carousel'
import TeamMember from '../components/teammember'
import { motion } from 'framer-motion';
import Background from '../components/Background'

const Home = ({ isAuthenticated }) => {
  return (
    <div>
        <Hero isAuthenticated={isAuthenticated} />
      <motion.div className="flex flex-col items-center content-center py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h1 className="text-4xl lg:text-6xl font-bold leading-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Featured <span className="text-primary">Blogs</span>
        </motion.h1>
        <TextCarousel />
        <TeamMember />
      </motion.div>
    </div>
  )
}

export default Home
