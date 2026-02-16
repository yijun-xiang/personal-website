'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, ExternalLink, BookOpen, Users, Calendar, Award, Copy, Check } from 'lucide-react';

interface Publication {
  title: string;
  authors: { name: string; isMe: boolean }[];
  journal: string;
  volume: string;
  issue: string;
  year: string;
  doi: string;
  doiUrl: string;
  abstract: string;
  keywords: string[];
  type: string;
}

const publications: Publication[] = [
  {
    title: "AI and Measurement Concerns: Dealing with Imbalanced Data in Autoscoring",
    authors: [
      { name: "Yunting Liu", isMe: false },
      { name: "Yijun Xiang", isMe: true },
      { name: "Xutao Feng", isMe: false },
      { name: "Mark Wilson", isMe: false },
    ],
    journal: "Journal of Educational Measurement",
    volume: "63",
    issue: "1",
    year: "2026",
    doi: "10.1111/jedm.70031",
    doiUrl: "https://doi.org/10.1111/jedm.70031",
    abstract: "Unbiasedness for proficiency estimates is important for autoscoring engines since the outcome might be used for future learning or placement. Imbalanced training data may lead to certain biases and lower the prediction accuracy for classification algorithms. In this article, we investigated several data augmentation methods to lower the negative effect of imbalanced data in measurement settings. Four approaches were examined: (1) Resampling methods, either oversampling or undersampling; (2) Active resampling methods, where the resampling weight is based on representativeness in the training set; (3) Data expansion methods using synonym Replacement, slightly changing the meaning or semantics of the original answers; and (4) Content recreation method using Generative AI (e.g., ChatGPT) to create responses for less populated scores. We compared the performance (e.g., Accuracy, QWK, F1) as well as the distance metric for different combinations of the methods. Two datasets with different imbalanced distributions were used. Results show that all four methods can help to mitigate the bias issue and the efficacy was influenced by the imbalance level, representativeness of the original data and the level of increment in the variety of the response (i.e., lexical diversity). In general, resampling and GenAI with active resampling showed the best overall performance.",
    keywords: ["NLP", "Imbalanced Learning", "Data Augmentation", "Large Language Models", "Algorithmic Fairness"],
    type: "Journal Article",
  },
];

const ResearchPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedAbstract, setExpandedAbstract] = useState<number | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const generateBibtex = (pub: Publication) => {
    const authorStr = pub.authors.map(a => a.name).join(' and ');
    const key = pub.authors[0].name.split(' ').pop()?.toLowerCase() + pub.year;
    return `@article{${key},
  title={${pub.title}},
  author={${authorStr}},
  journal={${pub.journal}},
  volume={${pub.volume}},
  number={${pub.issue}},
  year={${pub.year}},
  doi={${pub.doi}}
}`;
  };

  const copyBibtex = async (pub: Publication, index: number) => {
    const bibtex = generateBibtex(pub);
    await navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(index);
    setTimeout(() => setCopiedBibtex(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-green-900/10 to-gray-900 text-white transition-all duration-700 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      <header className={`relative z-20 transition-all duration-700 ${
        isLoaded ? 'translate-y-0' : '-translate-y-4'
      }`} style={{ transitionDelay: '100ms' }}>
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-green-500/50 group-hover:bg-green-500/10 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium">Back</span>
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Home</span>
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Research
            </h1>

            <div className="w-10 sm:w-[100px]"></div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent to-green-400/50 w-16 sm:w-20"></div>
            <p className="text-green-400 font-semibold tracking-wide uppercase text-sm">Publications</p>
            <div className="h-px bg-gradient-to-l from-transparent to-green-400/50 w-16 sm:w-20"></div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Exploring data augmentation strategies and generative AI methods to address
            imbalanced data challenges in automated scoring and educational measurement.
          </p>
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-green-400">{publications.length}</div>
              <div className="text-xs sm:text-sm text-gray-500">Publication{publications.length > 1 ? 's' : ''}</div>
            </motion.div>
            <div className="w-px h-10 sm:h-12 bg-gray-700"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">NLP</div>
              <div className="text-xs sm:text-sm text-gray-500">Deep Learning</div>
            </motion.div>
            <div className="w-px h-10 sm:h-12 bg-gray-700"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">LLM</div>
              <div className="text-xs sm:text-sm text-gray-500">Generative AI</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Publications */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-green-500/30 shadow-lg shadow-green-500/10"
            >
              {/* Type Badge & Year */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-xs px-4 py-1 rounded-full font-semibold flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {pub.type.toUpperCase()}
                </span>
                <span className="bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {pub.year}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-center">
                {pub.title}
              </h2>

              {/* Authors */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  {pub.authors.map((author, i) => (
                    <span key={i}>
                      <span className={author.isMe ? 'text-green-400 font-semibold' : ''}>
                        {author.name}
                      </span>
                      {i < pub.authors.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>

              {/* Journal Info */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm italic">
                  {pub.journal}, Volume {pub.volume}, Issue {pub.issue}
                </p>
              </div>

              {/* Abstract */}
              <div className="mb-6 text-center">
                <button
                  onClick={() => setExpandedAbstract(expandedAbstract === index ? null : index)}
                  className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors mb-3"
                >
                  <Award className="w-4 h-4" />
                  {expandedAbstract === index ? 'Hide Abstract' : 'Show Abstract'}
                </button>
                <AnimatePresence>
                  {expandedAbstract === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {pub.abstract}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Keywords */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 mb-6 justify-center"
              >
                {pub.keywords.map((keyword, i) => (
                  <motion.span
                    key={i}
                    variants={tagVariants}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm cursor-default"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </motion.div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={pub.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2"
                >
                  Read Paper
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                <motion.button
                  onClick={() => copyBibtex(pub, index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedBibtex === index ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy BibTeX
                    </>
                  )}
                </motion.button>
              </div>

              {/* DOI */}
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/30 rounded-lg text-xs text-gray-500">
                  <span className="font-mono">DOI: {pub.doi}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            More research coming soon! Connect with me on{' '}
            <a
              href="https://scholar.google.com/citations?user=QBDwDGgAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Google Scholar
            </a>
            {' '}for updates.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default ResearchPage;
