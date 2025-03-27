
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Code, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  codeUrl: string;
  liveUrl: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Minion Eye Tracker',
      description: 'An interactive eye-tracking application that follows cursor movement, designed using WebGL and Three.js.',
      technologies: ['JavaScript', 'WebGL', 'Three.js', 'HTML', 'CSS'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      demoUrl: 'https://codepen.io/collection/XLebem/',
      codeUrl: 'https://github.com/topics/eye-tracking',
      liveUrl: 'https://threejs.org/examples/#webgl_interactive_cubes_gpu',
    },
    {
      id: 2,
      title: 'Digital Clock',
      description: 'A sleek, customizable digital clock application with multiple themes and time formats.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      demoUrl: 'https://codepen.io/trending?type=pens&language=javascript',
      codeUrl: 'https://github.com/topics/digital-clock',
      liveUrl: 'https://codepen.io/collection/DQvYpQ',
    },
    {
      id: 3,
      title: 'Snake Game',
      description: 'A modern implementation of the classic Snake game with difficulty levels and score tracking.',
      technologies: ['JavaScript', 'Canvas API', 'HTML', 'CSS'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      demoUrl: 'https://codepen.io/search/pens?q=snake+game',
      codeUrl: 'https://github.com/topics/snake-game',
      liveUrl: 'https://playsnake.org/',
    },
    {
      id: 4,
      title: 'Calculator',
      description: 'A feature-rich calculator with standard and scientific calculation modes.',
      technologies: ['JavaScript', 'React', 'HTML', 'CSS'],
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      demoUrl: 'https://codepen.io/search/pens?q=calculator',
      codeUrl: 'https://github.com/topics/calculator-app',
      liveUrl: 'https://www.desmos.com/scientific',
    },
    {
      id: 5,
      title: 'Todo List',
      description: 'A minimalist todo application with drag-and-drop functionality, local storage, and filtering options.',
      technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      demoUrl: 'https://codepen.io/search/pens?q=todo+app',
      codeUrl: 'https://github.com/topics/todo-app',
      liveUrl: 'https://todoist.com/',
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

  const handleClick = (url: string, action: string, project: Project) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: `${action} link unavailable`,
        description: `The ${action.toLowerCase()} for ${project.title} is not available yet.`,
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
              className="group relative border border-border rounded-lg overflow-hidden hover:border-accent transition-colors duration-300 h-full"
              variants={itemVariants}
            >
              <div 
                className="aspect-video bg-secondary relative overflow-hidden"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                    onClick={() => handleClick(project.demoUrl, 'Demo', project)}
                    aria-label={`View ${project.title} demo`}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => handleClick(project.codeUrl, 'Code', project)}
                    aria-label={`View ${project.title} code`}
                  >
                    <Code className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => handleClick(project.liveUrl, 'Live', project)}
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
