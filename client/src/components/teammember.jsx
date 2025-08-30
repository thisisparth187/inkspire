import React from 'react';

export default function TeamSection() {
  const members = [
    {
      name: "Marvin McKinney",
      role: "Founder",
      img: "https://avatar.iran.liara.run/public/boy",
    },
    {
      name: "Kathryn Murphy",
      role: "CTO",
      img: "https://avatar.iran.liara.run/public/45",
    },
    {
      name: "Jerome Bell",
      role: "CMO",
      img: "https://avatar.iran.liara.run/public/4",
    },
    {
      name: "Wade Warren",
      role: "CEO",
      img: "https://avatar.iran.liara.run/public/girl",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
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
    </section>
  );
}
