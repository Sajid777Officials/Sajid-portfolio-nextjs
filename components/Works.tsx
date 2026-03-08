"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Tilt from "react-parallax-tilt"; // Importing the 3D Tilt package

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

const Works = () => {
  const [projects, setProjects] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Sajid777Officials/repos?sort=updated&per_page=100"
        );
        const data = await response.json();
        const originalProjects = data.filter((repo: Repo) => !repo.fork);
        setProjects(originalProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleShowMore = () => {
    if (visibleCount >= projects.length) {
      setVisibleCount(6);
    } else {
      setVisibleCount(projects.length);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <section className="py-20 px-5 max-w-7xl mx-auto" id="works">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          My <span className="text-[#00ffcc]">Live Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Explore all my repositories fetched directly from GitHub. Hover over the cards to see the 3D tilt effect in action.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ffcc]"></div>
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleProjects.map((project) => (
              <motion.div key={project.id} variants={cardVariants} layout>
                {/* Wrapping the card content with the Tilt component.
                  tiltMaxAngleX / Y: Controls how much the card tilts (in degrees)
                  scale: Slightly zooms in the card on hover
                  glareEnable: Adds a shiny reflection on the card
                  glareColor: Matching the neon theme color
                */}
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  scale={1.02}
                  transitionSpeed={400}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#00ffcc"
                  glarePosition="all"
                  className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-[#00ffcc]/50 transition-colors duration-300 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-gray-800/50 rounded-lg text-[#00ffcc] group-hover:scale-110 transition-transform">
                        <Github size={24} />
                      </div>
                      <div className="flex gap-3">
                        {project.homepage && (
                          <a href={project.homepage} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#00ffcc] transition">
                            <ExternalLink size={20} />
                          </a>
                        )}
                        <a href={project.html_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description || "No description provided for this repository."}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics && project.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded-md">
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500" /> {project.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={16} /> {project.forks_count}</span>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>

          {projects.length > 6 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={handleShowMore}
                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-[#00ffcc] text-[#00ffcc] rounded-full font-medium hover:bg-[#00ffcc] hover:text-black transition-all duration-300"
              >
                {visibleCount >= projects.length ? (
                  <>Show Less <ChevronUp size={20} /></>
                ) : (
                  <>View All Projects <ChevronDown size={20} /></>
                )}
              </button>
            </motion.div>
          )}
        </>
      )}
    </section>
  );
};

export default Works;