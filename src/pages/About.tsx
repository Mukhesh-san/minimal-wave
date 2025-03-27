
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">About Me</h1>
          <div className="h-1 w-20 bg-accent"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <p className="text-xl leading-relaxed text-muted-foreground">
              I'm a college student studying B.Tech in Artificial Intelligence and Machine Learning, 
              currently in my second year. My passion lies at the intersection of technology and creativity.
            </p>
            
            <div className="space-y-4">
              <p className="leading-relaxed">
                With a keen interest in software development, I enjoy creating projects that challenge 
                me to learn new skills while solving interesting problems. I'm particularly fascinated 
                by the potential of AI to transform how we interact with technology.
              </p>
              
              <p className="leading-relaxed">
                When I'm not coding or studying, I enjoy exploring new technologies, contributing to 
                open-source projects, and collaborating with fellow students on innovative ideas.
              </p>
            </div>
            
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Machine Learning', 'Git'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg bg-secondary p-6">
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              <div className="space-y-3">
                <p className="font-medium">B.Tech in AI & ML</p>
                <p className="text-sm text-muted-foreground">Second Year Student</p>
              </div>
            </div>
            
            <div className="rounded-lg bg-secondary p-6">
              <h2 className="text-xl font-semibold mb-4">Interests</h2>
              <ul className="space-y-2">
                <li>• Machine Learning</li>
                <li>• Web Development</li>
                <li>• Open Source</li>
                <li>• Robotics</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
