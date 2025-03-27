
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the fundamentals of React and how to create your first component.',
      date: 'May 12, 2023',
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'Understanding Machine Learning Basics',
      excerpt: 'A beginner-friendly introduction to key machine learning concepts.',
      date: 'June 23, 2023',
      category: 'AI & ML',
    },
    {
      id: 3,
      title: 'Building Responsive UIs with Tailwind CSS',
      excerpt: 'How to create beautiful, responsive interfaces using Tailwind CSS.',
      date: 'July 5, 2023',
      category: 'CSS',
    },
    {
      id: 4,
      title: 'JavaScript Array Methods You Should Know',
      excerpt: 'Exploring powerful array methods that make JavaScript coding easier.',
      date: 'August 17, 2023',
      category: 'JavaScript',
    },
  ];

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

  return (
    <section className="pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Blog</h1>
          <div className="h-1 w-20 bg-accent"></div>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
            Thoughts, tutorials and insights on technology and development.
          </p>
        </div>

        <motion.div 
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id}
              className="group border-b border-border pb-8 last:border-0"
              variants={itemVariants}
            >
              <a href="#" className="block space-y-3 hover:no-underline">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                  <span className="px-2 py-1 text-xs rounded-full bg-secondary">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center pt-2 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blog;
