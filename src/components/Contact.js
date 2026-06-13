"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa';
const contactInfo = [
  { icon: <FaMapMarkerAlt />, text: 'Lucknow, India', type: 'location' },
  { icon: <FaEnvelope />, text: 'harshvardhanpandey372@gmail.com', type: 'email', href: 'mailto:harshvardhanpandey372@gmail.com' },
  { icon: <FaGithub />, text: 'GitHub', type: 'social', href: 'https://github.com/Harsh63870' },
  { icon: <FaLinkedin />, text: 'LinkedIn', type: 'social', href: 'https://www.linkedin.com/in/harsh-vardhan-pandey-00b463280/' },
];
const Contact = () => {
  return (
    <section 
      id="contact" 
      className="py-16 sm:py-20 md:py-24 text-gray-900 dark:text-white"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          id="contact-heading"
          className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.5 }} 
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>
        <motion.div 
          className="max-w-lg mx-auto bg-gray-100/80 dark:bg-black/20 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg text-center shadow-cyan-500/5 hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-base sm:text-lg leading-relaxed">Feel free to reach out. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.</p>
          <div className="space-y-5">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                {item.href ? (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`Contact via ${item.text}`}
                    className="flex items-center justify-center text-lg sm:text-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-cyan-400/50 rounded-lg p-2"
                  >
                    <span className="mr-4 text-blue-500 dark:text-cyan-400" aria-hidden="true">{React.cloneElement(item.icon, { size: 22 })}</span>
                    {item.text}
                  </a>
                ) : (
                  <div className="flex items-center justify-center text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                    <span className="mr-4 text-blue-500 dark:text-cyan-400" aria-hidden="true">{React.cloneElement(item.icon, { size: 22 })}</span>
                    {item.text}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <motion.a 
            href="\HarshVardhanPandey.pdf" 
            download
            aria-label="Download resume PDF"
            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-cyan-500/80 dark:to-blue-500/80 text-white px-8 py-3 rounded-full font-bold text-base sm:text-lg border-2 border-blue-400 dark:border-cyan-400 hover:from-blue-600 hover:to-blue-700 dark:hover:from-cyan-500/90 dark:hover:to-blue-500/90 transition-all duration-300 inline-flex items-center gap-3 mt-10 shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-cyan-400/50"
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 25px rgba(74, 144, 226, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            whileFocus={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.5 }} 
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <FaFilePdf size={20} aria-hidden="true" /> Download Resume
          </motion.a>
        </motion.div>
        <div className="mt-12 sm:mt-16 text-gray-600 dark:text-gray-500 text-center text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} Harsh Vardhan Pandey. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;


