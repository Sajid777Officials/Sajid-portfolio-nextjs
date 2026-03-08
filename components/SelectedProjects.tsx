"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, ChevronDown, ChevronUp } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

// 1. Define the TypeScript interface for our project data
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;     
  deployUrl: string; 
  githubUrl: string; 
}

// 2. Dummy projects data (Expanded to 6 projects to test 'See More')
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack scalable e-commerce solution with payment gateway integration and real-time inventory management.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop", 
    deployUrl: "https://my-ecommerce-store.vercel.app", 
    githubUrl: "https://github.com/Sajid777Officials/ecommerce",
  },
  {
    id: 2,
    title: "Healthcare Patient Portal",
    description: "Secure, responsive dashboard for patients to book appointments, view records, and chat with doctors.",
    tags: ["Next.js", "Tailwind CSS", "GSAP", "Prisma"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop", 
    deployUrl: "https://patient-portal.netlify.app", 
    githubUrl: "https://github.com/Sajid777Officials/healthcare",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Real-time collaborative task manager with Kanban boards, user authentication, and activity tracking.",
    tags: ["React", "Redux", "Socket.io", "Express"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", 
    deployUrl: "https://task-manager-pro.vercel.app", 
    githubUrl: "https://github.com/Sajid777Officials/task-manager",
  },
  {
    id: 4,
    title: "AI Image Generator",
    description: "A SaaS application that uses OpenAI's API to generate stunning images based on user text prompts.",
    tags: ["Next.js", "OpenAI API", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop", 
    deployUrl: "https://ai-image-gen.vercel.app", 
    githubUrl: "https://github.com/Sajid777Officials/ai-image-generator",
  },
  {
    id: 5,
    title: "Real Estate Directory",
    description: "A platform for buying and renting properties with advanced search filters, map integration, and virtual tours.",
    tags: ["React", "Firebase", "Google Maps API"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop", 
    deployUrl: "https://real-estate-hub.netlify.app", 
    githubUrl: "https://github.com/Sajid777Officials/real-estate",
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "An analytics dashboard for social media managers to track engagement, schedule posts, and view metrics.",
    tags: ["Vue.js", "Chart.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", 
    deployUrl: "https://social-dashboard.vercel.app", 
    githubUrl: "https://github.com/Sajid777Officials/social-dashboard",
  }
];

const SelectedProjects = () => {
  // State to control how many projects are shown initially (3 by default)
  const [visibleCount, setVisibleCount] = useState(3);

  // Function to toggle between showing 3 projects and all projects
  const handleToggleShow = () => {
    if (visibleCount >= featuredProjects.length) {
      setVisibleCount(3); // Reset to 3 if all are currently shown
    } else {
      setVisibleCount(featuredProjects.length); // Show all if only 3 are shown
    }
  };

  // Slice the array based on the current visibleCount state
  const visibleProjects = featuredProjects.slice(0, visibleCount);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 px-5 max-w-7xl mx-auto" id="selected-projects">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Selected <span className="text-[#00ffcc]">Projects</span>
        </h2>
        <div className="w-16 h-1 bg-[#00ffcc] mt-4 rounded-full"></div>
      </div>

      {/* Projects Grid Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {visibleProjects.map((project) => (
          <motion.div key={project.id} variants={cardVariants} layout className="h-full">
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              scale={1.02}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="#00ffcc"
              glarePosition="all"
              className="bg-[#0c0c0c] border border-gray-800/60 rounded-2xl flex flex-col h-full overflow-hidden hover:border-[#00ffcc]/30 transition-colors duration-300 group"
            >
              {/* Project Image */}
              <div className="relative w-full aspect-video border-b border-gray-800/60 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized={true} 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#050505]/30 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Project Details */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-[#00ffcc]/10 text-[#00ffcc] text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                  <a
                    href={project.deployUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-white font-bold text-sm hover:text-[#00ffcc] transition-colors group/link"
                  >
                    View Details
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>

      {/* See More / See Less Button */}
      {featuredProjects.length > 3 && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={handleToggleShow}
            className="flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-[#00ffcc] text-[#00ffcc] rounded-full font-bold hover:bg-[#00ffcc] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,204,0.1)] hover:shadow-[0_0_25px_rgba(0,255,204,0.4)]"
          >
            {visibleCount >= featuredProjects.length ? (
              <>See Less <ChevronUp size={20} /></>
            ) : (
              <>See More <ChevronDown size={20} /></>
            )}
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default SelectedProjects;