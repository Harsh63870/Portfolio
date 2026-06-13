"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaChartLine, FaGithub, FaStar } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const Statistics = ({ className }) => {
  const router = useRouter();
  const [stats, setStats] = useState({
    leetcode: {
      totalSolved: 0,
      ranking: 'N/A',
      contestRating: null,
      contestGlobalRanking: null,
      monthlyData: [],
      easy: 0,
      medium: 0,
      hard: 0,
      languages: [],
      starRating: null,
    },
    codeforces: {
      totalSolved: 0,
      rank: 'N/A',
      rating: 0,
    },
    github: {
      publicRepos: 0,
      followers: 0,
      totalStars: 0,
    },
    loading: true,
  });

  
  const formatRating = (value) => {
    if (value === null || value === undefined) return 'Unrated';
    const num = typeof value === 'number' ? value : Number(value);
    if (Number.isNaN(num)) return 'Unrated';
    return String(Math.round(num));
  };

  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const leetcodeUsername = 'pyro_hvp021';
        // Your Codeforces handle (from your profile URL)
        const codeforcesUsername = 'harshvardhanpandey37211';
        const githubUsername = 'Harsh63870';

        const [lcRes, cfRes, ghRes] = await Promise.all([
          fetch(`/api/leetcode?username=${leetcodeUsername}`),
          fetch(`/api/codeforces?username=${codeforcesUsername}`),
          fetch(`/api/github?username=${githubUsername}`),
        ]);

        const [lcData, cfData, ghData] = await Promise.all([lcRes.json(), cfRes.json(), ghRes.json()]);

        if (!lcData?.matchedUser) return;

        const submitStats = lcData.matchedUser.submitStats.acSubmissionNum;
        const totalSolved = submitStats.find(s => s.difficulty === 'All').count;
        const easySolved = submitStats.find(s => s.difficulty === 'Easy').count;
        const mediumSolved = submitStats.find(s => s.difficulty === 'Medium').count;
        const hardSolved = submitStats.find(s => s.difficulty === 'Hard').count;

        const ranking = lcData.matchedUser.profile.ranking;
        const starRating = lcData.matchedUser.profile?.starRating ?? null;

        // contest rating exists in your GraphQL query as `userContestRanking`
        const contestRating = lcData.userContestRanking?.rating ?? null;
        const contestGlobalRanking = lcData.userContestRanking?.globalRanking ?? null;

        // Process submission calendar for monthly data
        const calendarRaw = lcData.matchedUser.submissionCalendar;
        const calendar = typeof calendarRaw === 'string' ? JSON.parse(calendarRaw) : calendarRaw;

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Aggregate submissions per actual year-month (so different years don't merge).
        const byMonth = new Map();
        Object.entries(calendar).forEach(([timestamp, count]) => {
          const date = new Date(parseInt(timestamp) * 1000);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          byMonth.set(key, (byMonth.get(key) || 0) + Number(count));
        });

        // Build a rolling window of the last 12 months ending at the current month,
        // so the chart advances over time instead of being stuck on a fixed Jan–Dec axis.
        const now = new Date();
        const rollingMonths = [];
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          rollingMonths.push({
            month: `${months[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`,
            problems: byMonth.get(key) || 0,
          });
        }

        // Process language stats
        const languageColors = {
          'C++': '#00599c',
          'C': '#a8b9cc',
          'Python': '#3776ab',
          'Java': '#b07219',
          'JavaScript': '#f7df1e',
          'TypeScript': '#3178c6',
          'Golang': '#00add8',
          'Rust': '#dea584',
        };

        let languages = [];
        if (lcData.matchedUser.languageProblemCount) {
          languages = lcData.matchedUser.languageProblemCount
            .filter(l => l.problemsSolved > 0)
            .map(l => ({
              name: l.languageName,
              problems: l.problemsSolved,
              color: languageColors[l.languageName] || '#8884d8',
            }))
            .sort((a, b) => b.problems - a.problems);
        }

        setStats(prev => ({
          ...prev,
          leetcode: {
            totalSolved,
            ranking: ranking ? `#${ranking}` : 'N/A',
            contestRating,
            contestGlobalRanking,
            monthlyData: rollingMonths,
            easy: easySolved,
            medium: mediumSolved,
            hard: hardSolved,
            languages,
            starRating,
          },
          codeforces: cfData?.info
            ? prev.codeforces
            : cfData && typeof cfData.rating !== 'undefined'
              ? {
                  totalSolved: cfData.totalSolved ?? 0,
                  rank: cfData.rank ?? 'unrated',
                  rating: cfData.rating ?? 0,
                }
              : prev.codeforces,
          github: !ghData?.error
            ? {
                publicRepos: ghData.publicRepos ?? 0,
                followers: ghData.followers ?? 0,
                totalStars: ghData.totalStars ?? 0,
              }
            : prev.github,
          loading: false,
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 15 * 60 * 1000); // refresh occasionally
    return () => clearInterval(interval);
  }, []);

  // Update chart data with real stats
  const leetcodeData = stats.loading ? [
    { month: 'Jan', problems: 0 },
    { month: 'Feb', problems: 0 },
  ] : stats.leetcode.monthlyData.length > 0 ? stats.leetcode.monthlyData : [];

  const languageStats = stats.loading ? [] : stats.leetcode.languages;

  const platformStats = [
    { name: 'LeetCode', problems: stats.loading ? 0 : stats.leetcode.totalSolved, color: '#ffa116' },
    { name: 'Codeforces', problems: stats.loading ? 0 : stats.codeforces.totalSolved, color: '#1f8acb' },
  ];

  const lcTotal = stats.loading ? 0 : stats.leetcode.totalSolved;
  const difficulty = [
    { label: 'Easy', value: stats.loading ? 0 : stats.leetcode.easy, color: '#22c55e' },
    { label: 'Medium', value: stats.loading ? 0 : stats.leetcode.medium, color: '#eab308' },
    { label: 'Hard', value: stats.loading ? 0 : stats.leetcode.hard, color: '#ef4444' },
  ];

  const tooltipStyle = {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    color: '#f8fafc',
    fontSize: '13px',
  };

  const cardBase =
    'relative overflow-hidden rounded-3xl border border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl';

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <div className={`text-gray-900 dark:text-white ${className || 'py-16 sm:py-20 md:py-24'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Live data
          </span>
          <h2
            id="statistics-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400"
          >
            Statistics Dashboard
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A real-time snapshot of my problem-solving and open-source activity across LeetCode, Codeforces, and GitHub.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
          {/* Featured LeetCode card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className={`${cardBase} col-span-2 row-span-2 p-6 sm:p-8 group`}
          >
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-orange-400/30 to-amber-500/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3 text-orange-500 dark:text-orange-400 mb-4">
                <FaCode className="text-xl" />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  LeetCode Problems Solved
                </h3>
              </div>
              <p className="text-6xl sm:text-7xl font-extrabold tabular-nums leading-none bg-gradient-to-br from-orange-500 to-amber-500 bg-clip-text text-transparent">
                {stats.loading ? '—' : lcTotal}
              </p>

              <div className="mt-8 space-y-4">
                {difficulty.map((d) => {
                  const pct = lcTotal ? Math.round((d.value / lcTotal) * 100) : 0;
                  return (
                    <div key={d.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{d.label}</span>
                        <span className="tabular-nums text-gray-500 dark:text-gray-400">
                          {d.value} <span className="opacity-60">({pct}%)</span>
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-gray-200/70 dark:bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: d.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Compact metric cards */}
          {[
            { label: 'LeetCode Rating', value: stats.loading ? '—' : formatRating(stats.leetcode.contestRating), icon: <FaStar />, accent: 'from-yellow-400/30 to-amber-500/10', text: 'text-amber-500 dark:text-amber-300' },
            { label: 'Global Ranking', value: stats.loading ? '—' : stats.leetcode.ranking, icon: <FaChartLine />, accent: 'from-emerald-400/30 to-green-500/10', text: 'text-emerald-500 dark:text-emerald-300' },
            { label: 'Codeforces Rating', value: stats.loading ? '—' : stats.codeforces.rating, icon: <FaChartLine />, accent: 'from-sky-400/30 to-blue-500/10', text: 'text-sky-500 dark:text-sky-300' },
            { label: 'Codeforces Solved', value: stats.loading ? '—' : stats.codeforces.totalSolved, icon: <FaCode />, accent: 'from-blue-400/30 to-indigo-500/10', text: 'text-blue-500 dark:text-blue-300' },
            { label: 'GitHub Repos', value: stats.loading ? '—' : stats.github.publicRepos, icon: <FaGithub />, accent: 'from-purple-400/30 to-fuchsia-500/10', text: 'text-purple-500 dark:text-purple-300' },
            { label: 'GitHub Stars', value: stats.loading ? '—' : stats.github.totalStars, icon: <FaStar />, accent: 'from-pink-400/30 to-rose-500/10', text: 'text-pink-500 dark:text-pink-300' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              whileHover={{ y: -4 }}
              className={`${cardBase} p-5 sm:p-6`}
            >
              <div className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${m.accent} blur-2xl`} />
              <div className="relative">
                <div className={`flex items-center gap-2 mb-3 ${m.text}`}>
                  {m.icon}
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                    {m.label}
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold tabular-nums break-words">{m.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 mb-6">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className={`${cardBase} lg:col-span-3 p-6 sm:p-8`}>
            <h3 className="text-lg font-bold mb-6">Monthly Activity <span className="text-gray-400 font-normal text-sm">· LeetCode</span></h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leetcodeData} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(148,163,184,0.3)' }} />
                <Line type="monotone" dataKey="problems" stroke="url(#lineGrad)" strokeWidth={3} dot={{ r: 3, fill: '#22d3ee' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className={`${cardBase} lg:col-span-2 p-6 sm:p-8`}>
            <h3 className="text-lg font-bold mb-6">Solved by Language</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={languageStats} cx="50%" cy="45%" label={false} innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="problems">
                  {languageStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.1)" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Platform Comparison */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className={`${cardBase} p-6 sm:p-8 mb-10`}>
          <h3 className="text-lg font-bold mb-6">Platform Comparison <span className="text-gray-400 font-normal text-sm">· total problems</span></h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={platformStats} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
              <Bar dataKey="problems" radius={[10, 10, 0, 0]} maxBarSize={90}>
                {platformStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition"
          >
            ← Back to Home
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;



