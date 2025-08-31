import heroImg from '../assets/hero.svg'
import { motion } from 'framer-motion';

const Hero = ({ isAuthenticated }) => {
  return (
    <section className="bg-base-100 container mx-auto px-4 lg:px-32 lg:py-16">
      <motion.div className="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold leading-snug">
            Share Your <span className="text-primary">Stories</span> <br />
            Inspire the World
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-leading-snug/60 max-w-xl mx-auto leading-relaxed">
            Inkspire is your space to write, read, and connect with a vibrant
            community of storytellers. Start your journey today.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <a
              href="/blogs"
              className="btn btn-primary px-6 py-3 rounded-lg text-white"
            >
              Explore Blogs
            </a>
            {isAuthenticated ? <a
              href="/create"
              className="btn btn-outline px-6 py-3 rounded-lg"
            >
              Start Writing
            </a> : <a
              href="/register"
              className="btn btn-outline px-6 py-3 rounded-lg"
            >
              Start Writing
            </a>}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={heroImg}
            alt="Inspiration"
            className="w-full max-w-md mx-auto lg:mx-0 rounded-xl"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
