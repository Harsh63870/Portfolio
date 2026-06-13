"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaTimes } from 'react-icons/fa';
import Statistics from './Statistics';









const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

const Achievements = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [achievements, setAchievements] = React.useState([
    'Loading latest LeetCode achievements...',
  ]);

  React.useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const username = 'pyro_hvp021';
        const res = await fetch(`/api/leetcode?username=${username}`);
        const data = await res.json();

        if (!data?.matchedUser) {
          setAchievements(['Unable to load achievements right now.']);
          return;
        }

        const submitStats = data.matchedUser.submitStats?.acSubmissionNum || [];
        const totalSolved = submitStats.find((s) => s.difficulty === 'All')?.count ?? 0;
        const easySolved = submitStats.find((s) => s.difficulty === 'Easy')?.count ?? 0;
        const mediumSolved = submitStats.find((s) => s.difficulty === 'Medium')?.count ?? 0;
        const hardSolved = submitStats.find((s) => s.difficulty === 'Hard')?.count ?? 0;

        const contestRating = data.userContestRanking?.rating;
        const globalRank = data.userContestRanking?.globalRanking;
        const profileRank = data.matchedUser.profile?.ranking;

        const languageProblemCount = data.matchedUser.languageProblemCount || [];
        const topLanguages = languageProblemCount
          .filter((l) => l.problemsSolved > 0)
          .sort((a, b) => b.problemsSolved - a.problemsSolved)
          .slice(0, 3)
          .map((l) => `${l.languageName} (${l.problemsSolved})`);

          const nextAchievements = [
            `Solved ${totalSolved}+ problems on LeetCode, strengthening problem-solving and algorithmic thinking.`,
          
            `Balanced practice across difficulty levels: Easy ${easySolved}, Medium ${mediumSolved}, Hard ${hardSolved}.`,
          
            topLanguages.length > 0
              ? `Primarily solved problems using ${topLanguages.join(', ')}, with a focus on C++ for performance and efficiency.`
              : 'Focused on C++ and core programming fundamentals.',
          
            contestRating
              ? `Current contest rating: ${Math.round(contestRating)}, reflecting consistent participation in competitive programming contests.`
              : 'Actively participating in competitive programming contests to improve problem-solving speed and accuracy.',
          
            globalRank
              ? `Contest participation rank: #${globalRank}, with a profile rank of #${profileRank}.`
              : `Profile rank: #${profileRank}, with ongoing participation in contests and problem-solving platforms.`,
          ];

        setAchievements(nextAchievements);
      } catch (error) {
        setAchievements(['Unable to load achievements right now.']);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section
      id="achievements"
      className="py-16 sm:py-20 md:py-24 text-gray-900 dark:text-white"
      aria-labelledby="achievements-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="achievements-heading"
          className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          CP & LeetCode
        </motion.h2>

        {/* Summary Card */}
        <motion.div
          className="max-w-4xl mx-auto bg-white/80 dark:bg-black/20 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Key Achievements</h3>
          <ul className="space-y-4 sm:space-y-5 mb-8" role="list">
            {achievements.map((achievement, index) => (
              <motion.li
                key={achievement}
                className="flex items-start text-base sm:text-lg md:text-xl"
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={index}
              >
                <FaTrophy className="text-yellow-500 dark:text-yellow-400 mr-4 sm:mr-5 flex-shrink-0 mt-1" size={24} aria-hidden="true" />
                <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
              </motion.li>
            ))}
          </ul>

          <div className="text-center">
            <motion.button
              onClick={() => setShowDetails(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
            >
              View Detailed Statistics
            </motion.button>
          </div>
        </motion.div>

        {/* Modal for Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
              >
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white z-10 bg-gray-100 dark:bg-gray-800 rounded-full"
                >
                  <FaTimes size={24} />
                </button>

                <div className="p-2 sm:p-6">
                  <Statistics className="py-8" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default Achievements;
