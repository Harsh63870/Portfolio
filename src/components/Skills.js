"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaBrain, FaLaptopCode, FaCertificate, FaMedal, FaLayerGroup, FaCodeBranch,
  FaPython, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaLinux,
  FaProjectDiagram, FaCube, FaServer, FaExchangeAlt, FaRobot, FaMagic, FaTerminal,
  FaCogs, FaSitemap,
} from 'react-icons/fa';
import {
  SiCplusplus, SiNextdotjs, SiExpress, SiPostgresql, SiMysql, SiPostman,
  SiGithubactions, SiOpenai,
} from 'react-icons/si';

// Maps each skill to a logo/icon. `color` is the brand color (omitted for
// monochrome marks so they inherit the readable text color in both themes).
const skillIcons = {
  'C++': { icon: SiCplusplus, color: '#00599C' },
  'Python': { icon: FaPython, color: '#3776AB' },
  'JavaScript': { icon: FaJs, color: '#EAB308' },
  'Data Structures': { icon: FaProjectDiagram },
  'Algorithms': { icon: FaCogs },
  'Object-Oriented Programming': { icon: FaCube },
  'System Design': { icon: FaServer },

  'React': { icon: FaReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs },
  'Node.js': { icon: FaNodeJs, color: '#339933' },
  'Express.js': { icon: SiExpress },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'REST APIs': { icon: FaExchangeAlt },

  'Open Source Development': { icon: FaCodeBranch },
  'Git': { icon: FaGitAlt, color: '#F05032' },
  'GitHub': { icon: FaGithub },
  'Docker': { icon: FaDocker, color: '#2496ED' },
  'Postman': { icon: SiPostman, color: '#FF6C37' },
  'Linux': { icon: FaLinux },
  'CI/CD Workflows': { icon: SiGithubactions, color: '#2088FF' },

  'Generative AI': { icon: FaRobot, color: '#10A37F' },
  'Prompt Engineering': { icon: FaTerminal },
  'AI-Powered Applications': { icon: FaMagic },
  'LLM Integration': { icon: SiOpenai, color: '#10A37F' },
  'AI Workflows': { icon: FaSitemap },
};

const skillCategories = [
  {
    title: 'Software Engineering',
    icon: <FaCode />,
    skills: [
      'C++', 'Python', 'JavaScript', 'Data Structures', 'Algorithms',
      'Object-Oriented Programming', 'System Design'
    ],
    color: 'green'
  },
  {
    title: 'Web & Backend Development',
    icon: <FaLaptopCode />,
    skills: [
      'React', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'REST APIs'
    ],
    color: 'blue'
  },
  {
    title: 'Open Source & Dev Tools',
    icon: <FaCodeBranch />,
    skills: [
      'Open Source Development', 'Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'CI/CD Workflows'
    ],
    color: 'cyan'
  },
  {
    title: 'AI & Emerging Technologies',
    icon: <FaBrain />,
    skills: [
      'Generative AI', 'Prompt Engineering', 'AI-Powered Applications',
      'LLM Integration', 'AI Workflows'
    ],
    color: 'purple'
  }
];

// Full static class strings so Tailwind's JIT compiler includes them.
const colorMap = {
  blue: { border: 'border-blue-500', text: 'text-blue-600 dark:text-blue-400', hex: '#3b82f6' },
  green: { border: 'border-green-500', text: 'text-green-600 dark:text-green-400', hex: '#22c55e' },
  purple: { border: 'border-purple-500', text: 'text-purple-600 dark:text-purple-400', hex: '#a855f7' },
  cyan: { border: 'border-cyan-500', text: 'text-cyan-600 dark:text-cyan-400', hex: '#06b6d4' },
};

const certifications = [
  {
    title: 'Social Winter of Code (SWOC)',
    role: 'Contributor',
    date: 'Dec 2025',
    icon: <FaCodeBranch className="text-orange-500" />,
    description: 'Contributed to open-source projects during the winter program, collaborating with mentors and the community.',
    color: 'orange'
  },
  {
    title: 'Hacktoberfest 2025',
    role: 'Open Source Contributor',
    date: 'Oct 2025',
    icon: <FaLayerGroup className="text-blue-500" />,
    description: 'Contributed multiple accepted pull requests to open-source repositories, following best practices.',
    color: 'blue'
  },
  {
    title: "ZERO's Arena",
    role: 'Semi-Finalist',
    date: 'Sep 2025',
    icon: <FaMedal className="text-yellow-500" />,
    description: 'Reached the Semi-Final stage in a competitive technical event organized by CODE GEASS.',
    color: 'yellow'
  },
  {
    title: 'Open Source Connect India',
    role: 'Contributor',
    date: 'Jul 2025',
    icon: <FaCodeBranch className="text-green-500" />,
    description: 'Active contributor connecting with the Indian open-source community to foster collaboration.',
    color: 'green'
  },
  {
    title: 'Generative AI (Simplilearn)',
    role: 'Certified',
    date: 'Jun 2025',
    icon: <FaCertificate className="text-purple-500" />,
    description: 'Mastered RNN, LSTM, GRU, GANs, Transformers, and AI content generation techniques.',
    color: 'purple'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-24 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Skills & Certifications</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical expertise, certifications, and contributions to the open-source community.
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.title}
              className={`bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border-t-4 ${colorMap[cat.color].border} shadow-sm hover:shadow-md transition-all h-full`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`flex items-center gap-3 mb-6 ${colorMap[cat.color].text}`}>
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map(skill => {
                  const entry = skillIcons[skill];
                  const Icon = entry?.icon || FaCode;
                  const brand = entry?.color || colorMap[cat.color].hex;
                  return (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -3, scale: 1.05, boxShadow: `0 10px 24px -6px ${brand}66` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="group/skill inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 text-sm font-semibold rounded-full bg-white/90 dark:bg-gray-800/70 backdrop-blur border border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-200 shadow-sm cursor-default"
                    >
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full ring-1 ring-inset ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover/skill:rotate-6"
                        style={{ backgroundColor: `${brand}1f` }}
                      >
                        <Icon className="text-base" style={{ color: brand }} aria-hidden="true" />
                      </span>
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Timeline/Grid */}
        <motion.h3
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Licenses & Certifications
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-2xl">
                  {cert.icon}
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
                  {cert.date}
                </span>
              </div>
              <h4 className="text-lg font-bold mb-1 leading-tight">{cert.title}</h4>
              <p className="text-sm font-medium text-blue-600 dark:text-cyan-400 mb-2">{cert.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
