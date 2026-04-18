"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaFolderOpen, FaTrophy, FaBriefcase, FaEnvelope, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';

const navItems = [
  { id: 'hero', label: 'Home', icon: <FaHome />, type: 'section' },
  { id: 'about', label: 'About', icon: <FaUser />, type: 'section' },
  { id: 'skills', label: 'Skills', icon: <FaCode />, type: 'section' },
  { id: 'projects', label: 'Projects', icon: <FaFolderOpen />, type: 'section' },
  { id: 'achievements', label: 'Achievements', icon: <FaTrophy />, type: 'section' },
  { id: 'experiences', label: 'Experiences', icon: <FaBriefcase />, type: 'section' },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope />, type: 'section' },
];

const pageNavItems = [
  { href: '/stats', label: 'Stats', icon: <FaChartBar /> },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY < 100);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full px-4 py-3 shadow-lg border border-gray-200 dark:border-gray-700 hidden sm:flex"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label="Main navigation"
      >
        <ul className="flex items-center gap-2 sm:gap-3" role="menubar">
          {navItems.map((item) => (
            <li key={item.id} role="none">
              <motion.button
                onClick={() => scrollToSection(item.id)}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`relative p-2 sm:p-3 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-900/30 outline-none ring-2 ring-blue-400 dark:ring-cyan-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={item.label}
              >
                <span className="text-lg sm:text-xl" aria-hidden="true">{item.icon}</span>
                {activeSection === item.id && (
                  <motion.span
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-cyan-400 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Additional Pages Navigation */}
      <motion.nav
        className="fixed top-6 right-6 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full px-2 py-2 shadow-lg border border-gray-200 dark:border-gray-700 hidden lg:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-label="Pages navigation"
      >
        <ul className="flex items-center gap-2" role="menubar">
          {pageNavItems.map((item) => (
            <li key={item.href} role="none">
              <Link href={item.href}>
                <motion.button
                  aria-label={`Navigate to ${item.label}`}
                  className="relative p-2 sm:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={item.label}
                >
                  <span className="text-lg sm:text-xl" aria-hidden="true">{item.icon}</span>
                </motion.button>
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default Navigation;

