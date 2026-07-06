"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaFileAlt, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useThemeMode, usePrefersReducedMotion } from '../hooks/useThemeMode';

const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false });

const Hero = () => {
  const isDark = useThemeMode();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section 
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500"
      role="banner"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0">
        <HeroScene isDark={isDark} reducedMotion={reducedMotion} />
      </div>
      <div
        className="absolute inset-0 z-0 bg-gradient-to-t from-white/70 via-transparent to-white/30 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/40"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 bg-white/80 dark:bg-black/50 backdrop-blur-3xl p-8 sm:p-12 rounded-3xl border border-gray-200/50 dark:border-white/30 shadow-2xl text-center max-w-4xl mx-4 shadow-blue-400/20"
      >
        <motion.div
          className="mx-auto mb-8 w-fit"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative p-1 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 shadow-xl shadow-blue-500/30 dark:shadow-cyan-500/20">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-white/80 dark:ring-white/10">
              <Image
                src="/images/profile.jpeg"
                alt="Harsh Vardhan Pandey"
                fill
                priority
                sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </motion.div>
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Harsh Vardhan Pandey</span>
        </motion.h1>
        <motion.p 
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          A Software Developer passionate about open source, backend engineering, and scalable systems. Currently focused on building impactful projects, contributing to large-scale communities, and strengthening my expertise in modern software development.
        </motion.p>
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.a
            href="\HarshVardhanPandey.pdf"
            download
            aria-label="Download resume PDF"
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 25px rgba(74, 144, 226, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            whileFocus={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white px-8 py-3 rounded-full font-bold text-base sm:text-lg border-2 border-blue-400 dark:border-cyan-400 hover:from-blue-600 hover:to-blue-700 dark:hover:from-cyan-600 dark:hover:to-blue-700 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-blue-500/30 dark:shadow-cyan-500/30 focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-cyan-400/50"
          >
            <FaFileAlt aria-hidden="true" /> View Resume
          </motion.a>
          <div className="flex gap-6">
            <motion.a
              href="https://github.com/Harsh63870"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.15 }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-cyan-400/50 rounded-full p-2"
              title="GitHub Profile"
            >
              <FaGithub size={36} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/harsh-vardhan-pandey-00b463280/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.15 }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-cyan-400/50 rounded-full p-2"
              title="LinkedIn Profile"
            >
              <FaLinkedin size={36} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://leetcode.com/u/pyro_hvp021/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LeetCode profile"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.15 }}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-orange-400/50 rounded-full p-2"
              title="LeetCode Profile"
            >
              <FaCode size={36} aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
