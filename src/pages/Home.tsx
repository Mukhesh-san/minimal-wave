
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-10 px-4">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="block">Hello, I'm</span>
          <span className="text-gradient">Mukhesh</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Student, Developer, Creative Thinker
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <Link 
            to="/projects" 
            className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            View Projects <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
          <Link 
            to="/about" 
            className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
