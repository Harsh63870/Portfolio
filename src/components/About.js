"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaRocket, FaHeart, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const [leetcodeCount, setLeetcodeCount] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/leetcode?username=pyro_hvp021')
      .then(res => res.json())
      .then(data => {
        if (data.matchedUser) {
          const all = data.matchedUser.submitStats.acSubmissionNum.find(s => s.difficulty === 'All').count;
          setLeetcodeCount(all);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-24 text-gray-900 dark:text-white"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="about-heading"
          className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="max-w-6xl mx-auto">
          {/* Main About Content */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
  <motion.div
    className="text-base sm:text-lg text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7 }}
  >
    <p>
      I&apos;m <span className="text-blue-600 dark:text-cyan-300 font-semibold">Harsh Vardhan Pandey</span>, an Information Technology student at{" "}
      <span className="text-blue-600 dark:text-cyan-300 font-semibold">
        IIIT Gwalior
      </span>{" "}
      passionate about software engineering, open-source development, and backend systems.
    </p>

    <p>
      I enjoy solving complex problems through{" "}
      <span className="text-blue-600 dark:text-cyan-300 font-semibold">
        Data Structures and Algorithms
      </span>
      , building full-stack applications, and designing efficient software
      solutions.
    </p>

    <p>
      With{" "}
      <span className="font-bold text-white bg-blue-500/80 dark:bg-cyan-500/20 px-3 py-1.5 rounded-md inline-block">
        {leetcodeCount ? `${leetcodeCount}+` : "447+"} Problems Solved
      </span>
      , I continuously sharpen my problem-solving skills and understanding of
      efficient software design.
    </p>
  </motion.div>

  <motion.div
    className="text-base sm:text-lg text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7 }}
  >
    <p>
      My experience spans modern web technologies, AI-powered applications,
      and backend development, with contributions to large-scale open-source
      projects in cloud-native infrastructure, networking, security, and web
      platforms.
    </p>

    <p>
      Beyond development, I actively participate in open-source programs,
      mentor aspiring contributors, and continuously explore new technologies
      to broaden my understanding of modern software systems.
    </p>

    <p>
      Currently, I am focused on strengthening my expertise in{" "}
      <span className="text-blue-600 dark:text-cyan-300 font-semibold">
        Backend Engineering
      </span>
      ,{" "}
      <span className="text-blue-600 dark:text-cyan-300 font-semibold">
        Distributed Systems
      </span>
      , and{" "}
      <span className="text-blue-600 dark:text-cyan-300 font-semibold">
        Cloud-Native Technologies
      </span>{" "}
      while building software that delivers real-world impact.
    </p>
  </motion.div>
</div>
          {/* Timeline */}
<motion.div
className="mb-16"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}

>

  <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
    Journey & Growth
  </h3>

  <div className="relative max-w-3xl mx-auto">
    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-purple-500 transform md:-translate-x-1/2"></div>

```
{[
  {
    year: '2024',
    title: 'Foundation & Problem Solving',
    description:
      'Started my B.Tech journey in Information Technology at IIIT Gwalior and built a strong foundation in programming, algorithms, and software development.',
    icon: <FaGraduationCap />
  },
  {
    year: '2024',
    title: 'Competitive Programming Journey',
    description:
      'Began solving algorithmic challenges on LeetCode and Codeforces, strengthening analytical thinking and problem-solving skills through consistent practice.',
    icon: <FaCode />
  },
  {
    year: '2025',
    title: 'Building Real-World Products',
    description:
      'Developed projects such as Mindly and Candee, gaining hands-on experience with full-stack development, modern frameworks, and product-oriented thinking.',
    icon: <FaRocket />
  },
  {
    year: '2025 - 2026',
    title: 'Open Source & Mentorship',
    description:
      'Contributed to open-source ecosystems, participated in developer programs, and mentored aspiring contributors through SWOC.',
    icon: <FaLightbulb />
  },
  {
    year: '2026',
    title: 'Production-Scale Contributions',
    description:
      'Successfully merged contributions into large-scale open-source projects, gaining experience with code reviews, testing workflows, and collaborative development.',
    icon: <FaCode />
  },
  {
    year: 'Present',
    title: 'Backend, Cloud & Distributed Systems',
    description:
      'Currently focused on backend engineering, cloud-native technologies, distributed systems, and building scalable software with real-world impact.',
    icon: <FaRocket />
  }
].map((milestone, index) => (
  <motion.div
    key={index}
    className={`relative flex items-center mb-8 ${
      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
    }`}
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div
      className={`flex-1 ${
        index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
      }`}
    >
      <div className="bg-white/80 dark:bg-black/20 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
        <div className="flex items-center gap-3 mb-2 md:justify-end">
          <span className="text-blue-600 dark:text-cyan-400">
            {milestone.icon}
          </span>
          <span className="text-sm font-semibold text-blue-600 dark:text-cyan-400">
            {milestone.year}
          </span>
        </div>

        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {milestone.title}
        </h4>

        <p className="text-gray-700 dark:text-gray-300">
          {milestone.description}
        </p>
      </div>
    </div>

    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-500 dark:bg-cyan-500 rounded-full border-4 border-white dark:border-gray-900 transform md:-translate-x-1/2 z-10 flex items-center justify-center">
      <div className="w-3 h-3 bg-white dark:bg-gray-900 rounded-full"></div>
    </div>

    <div className="flex-1 hidden md:block"></div>
  </motion.div>
))}
```

  </div>
</motion.div>


          {/* Interests & Hobbies */}
          <motion.div
            className="bg-white/80 dark:bg-black/20 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <FaHeart className="text-red-500" />
              <span>Interests & Goals</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Current Focus</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {[
  'Backend Engineering',
  'Distributed Systems',
  'Cloud-Native Technologies',
  'Open Source Development',
  'System Design',
  'AI-Powered Applications'
].map((interest, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-blue-500 dark:text-cyan-400">•</span>
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Learning Goals</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {[
  'Production-Scale Systems',
  'Advanced System Design',
  'Kubernetes & Cloud',
  'Open Source Impact',
  'Scalable Architectures',
  'Product Development'
].map((goal, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-purple-500 dark:text-purple-400">•</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
