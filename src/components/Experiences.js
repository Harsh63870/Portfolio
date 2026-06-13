"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const experiences = [
  {
    type: 'education',
    title: 'B.Tech in Information Technology',
    organization: 'Indian Institute of Information Technology, Gwalior',
    period: '2024 - Present',
    description: 'Building a strong foundation in algorithms, data structures, and backend systems. I focus on writing clean, efficient code and applying it through projects and open-source work.',
    icon: <FaGraduationCap />,
    skills: ['Problem Solving', 'Backend Systems', 'Open Source Development', 'Algorithms'],
    achievements: [
      'CGPA: 9.3 / 10',
      '447+ DSA problems solved · 1859 contest rating',
      'Consistent daily algorithmic problem solving',
    ],
  },
  {
    type: 'work',
    title: 'Mentor',
    organization: 'SWOC (Social Winter of Code)',
    period: 'Dec 2025 – Mar 2026',
    description: 'Mentored open-source contributors and reviewed their pull requests. Guided beginners through Git, GitHub, and real development workflows, improving the quality and consistency of contributions across the program.',
    icon: <FaBriefcase />,
  },
];

const Experiences = () => {
  return (
    <section 
      id="experiences" 
      className="py-16 sm:py-20 md:py-24 text-gray-900 dark:text-white"
      aria-labelledby="experiences-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          id="experiences-heading"
          className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.5 }} 
          transition={{ duration: 0.5 }}
        >
          Experiences
        </motion.h2>
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-purple-500 hidden md:block"></div>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-16 md:pl-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-0 top-6 w-4 h-4 bg-blue-500 dark:bg-cyan-500 rounded-full border-4 border-white dark:border-gray-900 z-10 transform md:-translate-x-1/2"></div>
                  
                  <div className="bg-gray-100/80 dark:bg-black/20 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 ml-4 md:ml-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                        {exp.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                          <span className="text-sm sm:text-base text-blue-600 dark:text-cyan-400 font-semibold">{exp.period}</span>
                        </div>
                        <p className="text-blue-600 dark:text-cyan-400 font-semibold text-base sm:text-lg mb-3">{exp.organization}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">{exp.description}</p>
                        
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Key Skills:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-300 font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                  <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;