
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Code, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  codeUrl?: string;
  liveUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Minion Eye Tracker',
      description: 'An interactive eye-tracking application that follows cursor movement, designed using WebGL and Three.js.',
      technologies: ['JavaScript', 'WebGL', 'Three.js', 'HTML', 'CSS'],
      demoUrl: 'https://example.com/minion-eye-tracker',
      codeUrl: 'https://github.com/mukhesh/minion-eye-tracker',
      liveUrl: 'https://minion-tracker.example.com',
    },
    {
      id: 2,
      title: 'Digital Clock',
      description: 'A sleek, customizable digital clock application with multiple themes and time formats.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      demoUrl: 'https://example.com/digital-clock',
      codeUrl: 'https://github.com/mukhesh/digital-clock',
      liveUrl: 'https://digital-clock.example.com',
    },
    {
      id: 3,
      title: 'Snake Game',
      description: 'A modern implementation of the classic Snake game with difficulty levels and score tracking.',
      technologies: ['JavaScript', 'Canvas API', 'HTML', 'CSS'],
      demoUrl: 'https://example.com/snake-game',
      codeUrl: 'https://github.com/mukhesh/snake-game',
      liveUrl: 'https://snake-game.example.com',
    },
    {
      id: 4,
      title: 'Calculator',
      description: 'A feature-rich calculator with standard and scientific calculation modes.',
      technologies: ['JavaScript', 'React', 'HTML', 'CSS'],
      demoUrl: 'https://example.com/calculator',
      codeUrl: 'https://github.com/mukhesh/calculator',
      liveUrl: 'https://calculator.example.com',
    },
    {
      id: 5,
      title: 'Todo List',
      description: 'A minimalist todo application with drag-and-drop functionality, local storage, and filtering options.',
      technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
      demoUrl: 'https://example.com/todo-list',
      codeUrl: 'https://github.com/mukhesh/todo-list',
      liveUrl: 'https://todo-list.example.com',
    },
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleClick = (action: string, project: Project) => {
    // In a real application, these would link to actual project resources
    if (action === 'demo') {
      toast({
        title: `Viewing ${project.title} Demo`,
        description: "This would open the project demo in a real application.",
      });
    } else if (action === 'code') {
      toast({
        title: `Viewing ${project.title} Code`,
        description: "This would open the source code repository in a real application.",
      });
    } else if (action === 'live') {
      toast({
        title: `Visiting ${project.title}`,
        description: "This would open the live project in a real application.",
      });
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Projects</h1>
          <div className="h-1 w-20 bg-accent"></div>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
            A collection of projects I've built using HTML, CSS, JavaScript and React.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              className="group relative border border-border rounded-lg overflow-hidden hover:border-accent transition-colors duration-300"
              variants={itemVariants}
            >
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <span className="text-6xl opacity-20">0{project.id}</span>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-secondary/80 text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center pt-4 space-x-3">
                  <button 
                    className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => handleClick('demo', project)}
                    aria-label={`View ${project.title} demo`}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => handleClick('code', project)}
                    aria-label={`View ${project.title} code`}
                  >
                    <Code className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => handleClick('live', project)}
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
