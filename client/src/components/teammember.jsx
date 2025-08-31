import React from 'react';
import { motion } from 'framer-motion';
import pfp1 from '../assets/images/members/1.png';
import pfp2 from '../assets/images/members/2.png';
import pfp3 from '../assets/images/members/3.png';
import pfp4 from '../assets/images/members/4.png';

export default function TeamSection() {
  const members = [
    {
      name: "Marvin McKinney",
      role: "Founder",
      img: pfp1,
    },
    {
      name: "Kathryn Murphy",
      role: "CTO",
      img: pfp2,
    },
    {
      name: "Jerome Bell",
      role: "CMO",
      img: pfp3,
    },
    {
      name: "Wade Warren",
      role: "CEO",
      img: pfp4,
    },
  ];

  return (
    <motion.section className="py-12 sm:py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="font-manrope text-3xl sm:text-5xl font-bold text-foreground mb-3">
            Meet the <span className="text-primary">Brains</span>
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto">
            These people work on making our product the best.
          </p>
        </div>

        {/* Members */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-8 sm:gap-y-12 gap-x-8 sm:gap-x-16">
          {members.map((member, index) => (
            <div
              key={index}
              className="group text-center transition-all duration-300"
            >
              <div className="relative mb-3 sm:mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover mx-auto border-2 border-transparent 
                             transition-all duration-300 lg:group-hover:-translate-y-4"
                />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-0.5 transition-colors duration-300 group-hover:text-primary">
                {member.name}
              </h4>
              <span className="text-xs sm:text-sm text-muted-foreground block transition-colors duration-300 group-hover:text-foreground">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
