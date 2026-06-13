"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaDownload, FaStar, FaCodeBranch, FaFilter } from 'react-icons/fa';
import ProjectModal from './ProjectModal';
import TiltCard from './TiltCard';

const projects = [
  {
    title: 'MINDLY – Mental Health Tracker',
    status: 'Ongoing',
    description: 'A comprehensive web application designed to help users track their mental well-being through mood logging, journaling, and guided meditation resources. The goal is to provide an accessible and private space for self-reflection and mental health management.',
    thumbnail: '/window.svg',
    thumbnailAlt: 'MINDLY app preview',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Firebase (Auth & Firestore)', 'Framer Motion'],
    keyFeatures: [
      'Secure user authentication and data storage.',
      'Interactive mood tracking with visual data representation.',
      'Private and encrypted journaling module.',
      'Resource hub with curated articles and meditation guides.',
      'Gamified elements to encourage consistent usage.',
    ],
    githubUrl: 'https://github.com/Harsh63870/MINDLY',
    liveUrl: null,
  },
  {
    title: 'Eco Rush – Android App',
    status: 'Completed',
    description: 'An Android app built with Kotlin that raises awareness about endangered species through engaging quizzes, facts, and playful mini‑games. Designed to combine learning with fun to inspire conservation action.',
    thumbnail: '/globe.svg',
    thumbnailAlt: 'Eco Rush app preview',
    techStack: ['Android', 'Kotlin', 'Jetpack Compose', 'Firebase'],
    keyFeatures: [
      'Interactive quizzes and mini‑games about endangered animals.',
      'Curated fact cards with images and quick tips for conservation.',
      'Lightweight animations and sound effects for engagement.',
      'Offline-friendly experience for wider accessibility.',
    ],
    githubUrl: 'https://github.com/Harsh63870/ECO_rush',
    liveUrl: null,
    downloadUrl: '/eco-rush.zip',
  },
  {
    title: 'PRAKRITI – SIH 2025',
    status: 'Ongoing',
    description: 'A Smart India Hackathon 2025 project focused on sustainability and environmental awareness. Core problem statement and solution details are under active development.',
    thumbnail: '/file.svg',
    thumbnailAlt: 'PRAKRITI project preview',
    techStack: ['TBD'],
    keyFeatures: [
      'In progress – detailed features will be published soon.',
    ],
    githubUrl: 'https://github.com/Harsh63870/P.R.A.K.R.I.T.I-DronaBytes',
    liveUrl: null,
  },
  {
    title: 'DSA Visualizer',
    status: 'Planned',
    description: 'An interactive educational tool designed to visualize complex data structures and algorithms. This project aims to help students and developers understand the inner workings of algorithms like sorting, pathfinding, and tree traversals through dynamic animations.',
    thumbnail: '/next.svg',
    thumbnailAlt: 'DSA Visualizer preview',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'Vite'],
    keyFeatures: [
      'Step-by-step visualization of algorithm execution.',
      'Control over animation speed and flow.',
      'Side-by-side code display to correlate logic with visuals.',
      'Support for a wide range of common DS & Algos.',
      'User-configurable inputs to test different scenarios.',
    ],
    githubUrl: 'https://github.com/yourusername/dsa-visualizer',
    liveUrl: null,
  },
];

const Projects = () => {
  const [repoStats, setRepoStats] = useState({});
  const [loadingStats, setLoadingStats] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const truncate = useMemo(() => (text, max = 180) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max - 1) + '…' : text;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchStats = async () => {
      const entries = await Promise.all(
        projects
          .filter(p => !!p.githubUrl)
          .map(async (p) => {
            try {
              const url = new URL(p.githubUrl);
              const [, owner, repo] = url.pathname.split('/');
              if (!owner || !repo) return [p.githubUrl, null];
              const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { signal: controller.signal });
              if (!res.ok) return [p.githubUrl, null];
              const data = await res.json();
              return [p.githubUrl, { stars: data.stargazers_count, forks: data.forks_count }];
            } catch (_) {
              return [p.githubUrl, null];
            }
          })
      );
      const next = {};
      for (const [key, value] of entries) next[key] = value;
      setRepoStats(next);
      setLoadingStats(false);
    };
    fetchStats();
    return () => controller.abort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = filter === 'all' || project.status.toLowerCase() === filter.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section 
      id="projects" 
      className="py-16 sm:py-20 md:py-24 text-gray-900 dark:text-white"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          id="projects-heading"
          className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-12 tracking-tight"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.5 }} 
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        {/* Filter and Search */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 border border-gray-200 dark:border-white/10 w-full sm:w-auto">
            <FaFilter className="text-gray-500 dark:text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              <option value="all">All Projects</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="planned">Planned</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" style={{ perspective: 1200 }}>
          {filteredProjects.map((project, index) => (
            <TiltCard key={project.title} className="h-full">
            <motion.article
              className="group h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-black/30 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="p-6 sm:p-7" style={{ transform: 'translateZ(40px)' }}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-300 dark:to-purple-400">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-800 dark:text-cyan-200' : project.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-200' : 'bg-purple-500/20 text-purple-800 dark:text-purple-200'}`}>
                    {project.status}
                  </span>
                </div>
                {project.githubUrl && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm mb-4">
                    {loadingStats && (
                      <div className="flex gap-2">
                        <span className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                        <span className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      </div>
                    )}
                    {!loadingStats && repoStats[project.githubUrl] && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10">
                        <span className="inline-flex items-center gap-1"><FaStar aria-hidden="true" /> {repoStats[project.githubUrl]?.stars ?? 0}</span>
                        <span className="inline-flex items-center gap-1"><FaCodeBranch aria-hidden="true" /> {repoStats[project.githubUrl]?.forks ?? 0}</span>
                      </div>
                    )}
                  </div>
                )}
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {truncate(project.description, 200)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs sm:text-[13px] px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700/60 text-blue-700 dark:text-cyan-300">{tech}</span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-xs sm:text-[13px] px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">+{project.techStack.length - 4}</span>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 shadow-sm"
                  >
                    View Details
                  </motion.button>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold px-4 py-2 shadow-sm"
                    >
                      <FaGithub aria-hidden="true" /> GitHub
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold px-4 py-2 shadow-sm"
                    >
                      <FaExternalLinkAlt aria-hidden="true" /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
            </TiltCard>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">No projects found matching your criteria.</p>
          </motion.div>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default Projects;
