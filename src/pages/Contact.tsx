import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, you would handle the form submission here
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Contact</h1>
          <div className="h-1 w-20 bg-accent"></div>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
            Have a question or want to work together? Reach out to me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-muted-foreground">
              Feel free to contact me for any project inquiries, collaborations, or just to say hello.
              I'm always open to discussing new projects and creative ideas.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-secondary">
                  <Mail className="h-5 w-5" />
                </div>
                <span>mukhesh@example.com</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-secondary">
                  <Github className="h-5 w-5" />
                </div>
                <span>github.com/mukhesh</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-secondary">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span>linkedin.com/in/mukhesh</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-md bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-md bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border border-border rounded-md bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Send Message <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
