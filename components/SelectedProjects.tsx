"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  status: string;
  image: string;
  deployUrl: string;
  githubUrl?: string;
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Pocket Rent",
    description:
      "A polished rental landing page with app-focused sections, partner highlights, and long-form responsive marketing content.",
    tags: ["HTML", "CSS", "Landing Page"],
    category: "Frontend",
    status: "Local resource",
    image: "/portfolio-resources/pocket-rent.jpeg",
    deployUrl: "https://pocket-rent.netlify.app",
  },
  {
    id: 2,
    title: "Uncle Money Website",
    description:
      "A responsive, kid-friendly website for the Uncle Money children's book, built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Next.js",
    status: "Book site",
    image: "/portfolio-resources/uncle-money-cover.jpeg",
    deployUrl: "https://github.com/Sajid777Officials/uncle-money-website",
    githubUrl: "https://github.com/Sajid777Officials/uncle-money-website",
  },
  {
    id: 3,
    title: "Jerins Parlour",
    description:
      "A beauty service landing page with branded sections, service cards, gallery-style visuals, and mobile-friendly layout.",
    tags: ["HTML", "CSS", "Responsive UI"],
    category: "Landing Page",
    status: "Live page",
    image: "/portfolio-resources/jerins-parlour.jpeg",
    deployUrl: "https://jerins-purlour.netlify.app",
    githubUrl: "https://github.com/Sajid777Officials/Jerins-parlour",
  },
  {
    id: 4,
    title: "Password Generator",
    description:
      "A utility app for generating stronger passwords with a clear interface and practical front-end state handling.",
    tags: ["React", "JavaScript", "Utility"],
    category: "Tool",
    status: "Vercel app",
    image: "/portfolio-resources/password-generator.jpeg",
    deployUrl: "https://random-password-genarator.vercel.app",
    githubUrl: "https://github.com/Sajid777Officials/Random-Password-Genarator",
  },
  {
    id: 5,
    title: "Tic Tac Toe Game",
    description:
      "A fully functional vanilla JavaScript game demonstrating DOM manipulation, event handling, and state logic.",
    tags: ["JavaScript", "HTML", "CSS"],
    category: "Game",
    status: "Vanilla JS",
    image: "/portfolio-resources/tic-tac-toe.jpeg",
    deployUrl: "https://tik-tak-toe007.netlify.app",
    githubUrl: "https://github.com/Sajid777Officials/Tic-Tac-Toe-Game",
  },
  {
    id: 6,
    title: "Amazon Clone",
    description:
      "A CSS layout practice project recreating an e-commerce homepage with product sections, navigation, and responsive spacing.",
    tags: ["HTML", "CSS", "Clone UI"],
    category: "CSS Practice",
    status: "Netlify page",
    image: "/portfolio-resources/amazon-clone.jpeg",
    deployUrl: "https://amazon-clone-117.netlify.app",
  },
];

const allTags = [
  "All",
  ...Array.from(new Set(featuredProjects.flatMap((project) => project.tags))),
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function SelectedProjects() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return featuredProjects.filter((project) => {
      const matchesTag = activeTag === "All" || project.tags.includes(activeTag);
      const searchableText = [
        project.title,
        project.description,
        project.category,
        project.status,
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesTag && searchableText.includes(normalizedQuery);
    });
  }, [activeTag, query]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleToggleShow = () => {
    setVisibleCount((currentCount) =>
      currentCount >= filteredProjects.length ? 3 : filteredProjects.length
    );
  };

  const clearFilters = () => {
    setActiveTag("All");
    setQuery("");
    setVisibleCount(3);
  };

  return (
    <section className="px-5 py-24 sm:px-6" id="projects">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              <SlidersHorizontal className="h-4 w-4 text-[#00ffcc]" />
              Filterable repositories
            </div>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Selected <span className="text-[#00ffcc]">Projects</span>
            </h2>
            <p className="mt-4 max-w-2xl text-gray-400">
              Search by product type or stack, then open the project or source
              code from each card.
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(3);
              }}
              type="search"
              placeholder="Search projects or stack"
              className="h-12 w-full rounded-lg border border-white/10 bg-[#0b0b0b] pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#00ffcc]/50"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          {allTags.map((tag) => {
            const isActive = activeTag === tag;

            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setActiveTag(tag);
                  setVisibleCount(3);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#00ffcc] bg-[#00ffcc] text-black"
                    : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-[#00ffcc]/40 hover:text-white"
                }`}
              >
                {tag}
              </button>
            );
          })}

          <span className="ml-auto text-sm text-gray-500">
            {filteredProjects.length} result
            {filteredProjects.length === 1 ? "" : "s"}
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                layout
                exit={{ opacity: 0, scale: 0.96 }}
                className="h-full"
              >
                <Tilt
                  tiltMaxAngleX={7}
                  tiltMaxAngleY={7}
                  scale={1.015}
                  transitionSpeed={400}
                  glareEnable
                  glareMaxOpacity={0.12}
                  glareColor="#00ffcc"
                  glarePosition="all"
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0c0c0c] transition-colors duration-300 hover:border-[#00ffcc]/35"
                >
                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#050505]/35 transition-colors duration-500 group-hover:bg-[#050505]/10" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {project.status}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="rounded-full bg-[#8b5cf6]/15 px-3 py-1 text-xs font-semibold text-[#c4b5fd]">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} source code`}
                          className="text-gray-500 transition-colors hover:text-white"
                        >
                          <Github size={19} />
                        </a>
                        <a
                          href={project.deployUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} project link`}
                          className="text-gray-500 transition-colors hover:text-[#00ffcc]"
                        >
                          <ExternalLink size={19} />
                        </a>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#00ffcc]/10 px-3 py-1 text-xs font-semibold text-[#00ffcc]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.deployUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-bold text-white transition-colors hover:text-[#00ffcc]"
                    >
                      Open project
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="rounded-lg border border-white/10 bg-[#0b0b0b] px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">No projects found.</p>
            <p className="mt-2 text-gray-500">
              Clear the filters to see the full project collection.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full border border-[#00ffcc] px-5 py-2 text-sm font-semibold text-[#00ffcc] transition-colors hover:bg-[#00ffcc] hover:text-black"
            >
              Clear filters
            </button>
          </div>
        )}

        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <button
              type="button"
              onClick={handleToggleShow}
              className="flex items-center gap-2 rounded-full border-2 border-[#00ffcc] bg-transparent px-8 py-3 font-bold text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300 hover:bg-[#00ffcc] hover:text-black hover:shadow-[0_0_25px_rgba(0,255,204,0.35)]"
            >
              {visibleCount >= filteredProjects.length ? (
                <>
                  See Less <ChevronUp size={20} />
                </>
              ) : (
                <>
                  See More <ChevronDown size={20} />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
