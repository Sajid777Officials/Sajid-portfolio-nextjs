"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitFork,
  Github,
  RefreshCw,
  Search,
  Star,
} from "lucide-react";
import Tilt from "react-parallax-tilt";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  language: string | null;
  updated_at: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: "uncle-money-website",
    description:
      "A responsive, kid-friendly website for the children's book Uncle Money, built with Next.js and Tailwind CSS.",
    html_url: "https://github.com/Sajid777Officials/uncle-money-website",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["nextjs", "tailwindcss", "typescript"],
    fork: false,
    language: "TypeScript",
    updated_at: "2026-03-10T00:00:00Z",
  },
  {
    id: 2,
    name: "Sajid-portfolio-nextjs",
    description:
      "A premium 3D developer portfolio built with Next.js, React Three Fiber, GSAP, and Tailwind CSS.",
    html_url: "https://github.com/Sajid777Officials/Sajid-portfolio-nextjs",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["nextjs", "threejs", "portfolio"],
    fork: false,
    language: "TypeScript",
    updated_at: "2026-03-08T00:00:00Z",
  },
  {
    id: 3,
    name: "Task-Manager--Backend",
    description:
      "A simple and clean task management web app built with Node.js, Express, MongoDB, and Tailwind CSS.",
    html_url: "https://github.com/Sajid777Officials/Task-Manager--Backend",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["nodejs", "express", "mongodb"],
    fork: false,
    language: "EJS",
    updated_at: "2025-12-22T00:00:00Z",
  },
  {
    id: 4,
    name: "Doc-mini-app",
    description:
      "A sleek and interactive documentation mini-application built with React.js and smooth animations.",
    html_url: "https://github.com/Sajid777Officials/Doc-mini-app",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["react", "javascript", "animation"],
    fork: false,
    language: "JavaScript",
    updated_at: "2025-12-09T00:00:00Z",
  },
  {
    id: 5,
    name: "Random-Password-Genarator",
    description:
      "A simple password generator for creating strong, secure, and unpredictable passwords.",
    html_url: "https://github.com/Sajid777Officials/Random-Password-Genarator",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["javascript", "security", "utility"],
    fork: false,
    language: "JavaScript",
    updated_at: "2025-11-09T00:00:00Z",
  },
  {
    id: 6,
    name: "To-do-List",
    description:
      "A feature-rich to-do app built with React.js and Tailwind CSS, with tasks saved to Local Storage.",
    html_url: "https://github.com/Sajid777Officials/To-do-List",
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["react", "tailwindcss", "localstorage"],
    fork: false,
    language: "JavaScript",
    updated_at: "2025-11-05T00:00:00Z",
  },
];

export default function Works() {
  const [projects, setProjects] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const [lastSynced, setLastSynced] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.github.com/users/Sajid777Officials/repos?sort=updated&per_page=100"
      );

      if (!response.ok) {
        throw new Error("GitHub did not return a successful response.");
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("GitHub returned an unexpected payload.");
      }

      const originalProjects = data
        .filter((repo): repo is Repo => {
          const candidate = repo as Partial<Repo>;
          return Boolean(candidate.id && candidate.html_url && !candidate.fork);
        })
        .sort(
          (first, second) =>
            new Date(second.updated_at).getTime() -
            new Date(first.updated_at).getTime()
        );

      if (originalProjects.length === 0) {
        setProjects(fallbackRepos);
        setError("Showing saved project data because GitHub returned no repositories.");
        setLastSynced("saved data");
        return;
      }

      setProjects(originalProjects);
      setLastSynced(new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } catch {
      setProjects(fallbackRepos);
      setError("Showing saved project data because live GitHub projects could not be loaded.");
      setLastSynced("saved data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const languages = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(projects.map((project) => project.language).filter(Boolean))
      ),
    ] as string[],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesLanguage =
        language === "All" || project.language === language;
      const searchableText = [
        project.name,
        project.description ?? "",
        project.language ?? "",
        ...(project.topics ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesLanguage && searchableText.includes(normalizedQuery);
    });
  }, [language, projects, query]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((currentCount) =>
      currentCount >= filteredProjects.length ? 6 : filteredProjects.length
    );
  };

  return (
    <section className="px-5 py-20 sm:px-6" id="works">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              <Github className="h-4 w-4 text-[#00ffcc]" />
              Live GitHub sync
            </div>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              My <span className="text-[#00ffcc]">Live Projects</span>
            </h2>
            <p className="mt-4 max-w-2xl text-gray-400">
              Repositories are fetched from GitHub, sorted by recent activity,
              and filterable by language or keyword.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(6);
                }}
                type="search"
                placeholder="Search GitHub repos"
                className="h-12 w-full rounded-lg border border-white/10 bg-[#0b0b0b] pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#00ffcc]/50 sm:w-72"
              />
            </div>

            <button
              type="button"
              onClick={fetchProjects}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-gray-300 transition-colors hover:border-[#00ffcc]/40 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {languages.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setLanguage(item);
                setVisibleCount(6);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                language === item
                  ? "border-[#00ffcc] bg-[#00ffcc] text-black"
                  : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-[#00ffcc]/40 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}

          <span className="ml-auto text-sm text-gray-500">
            {lastSynced ? `Synced ${lastSynced}` : "Waiting for GitHub"}
          </span>
        </div>

        {error && !loading && (
          <div className="mb-8 rounded-lg border border-[#f59e0b]/20 bg-[#f59e0b]/10 p-5 text-[#fde68a]">
            <p className="font-semibold">{error}</p>
            <p className="mt-2 text-sm text-[#fef3c7]/80">
              You can retry the live sync at any time.
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-lg border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleProjects.map((project) => (
                <motion.div key={project.id} variants={cardVariants} layout>
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    scale={1.015}
                    transitionSpeed={400}
                    glareEnable
                    glareMaxOpacity={0.12}
                    glareColor="#00ffcc"
                    glarePosition="all"
                    className="group flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#0c0c0c] p-6 transition-all duration-300 hover:border-[#00ffcc]/40 hover:shadow-[0_0_32px_rgba(0,255,204,0.07)]"
                  >
                    <div>
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.05] text-[#00ffcc] transition-transform group-hover:scale-105">
                          <Github size={24} />
                        </div>
                        <div className="flex gap-3">
                          {project.homepage && (
                            <a
                              href={project.homepage}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${project.name} live site`}
                              className="text-gray-400 transition hover:text-[#00ffcc]"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.name} repository`}
                            className="text-gray-400 transition hover:text-white"
                          >
                            <Github size={20} />
                          </a>
                        </div>
                      </div>

                      <div className="mb-3 flex items-center gap-2">
                        {project.language && (
                          <span className="rounded-full bg-[#0ea5e9]/15 px-3 py-1 text-xs font-semibold text-[#bae6fd]">
                            {project.language}
                          </span>
                        )}
                        <span className="text-xs text-gray-600">
                          Updated {formatDate(project.updated_at)}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white">
                        {project.name}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                        {project.description ||
                          "No description provided for this repository."}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.topics?.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-md bg-white/[0.05] px-2 py-1 text-xs font-medium text-gray-300"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500" />
                          {project.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={16} />
                          {project.forks_count}
                        </span>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="rounded-lg border border-white/10 bg-[#0b0b0b] px-6 py-12 text-center">
                <p className="text-lg font-semibold text-white">
                  No repositories match that filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setLanguage("All");
                    setVisibleCount(6);
                  }}
                  className="mt-6 rounded-full border border-[#00ffcc] px-5 py-2 text-sm font-semibold text-[#00ffcc] transition-colors hover:bg-[#00ffcc] hover:text-black"
                >
                  Clear filters
                </button>
              </div>
            )}

            {filteredProjects.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 flex justify-center"
              >
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="flex items-center gap-2 rounded-full border border-[#00ffcc] bg-transparent px-6 py-3 font-medium text-[#00ffcc] transition-all duration-300 hover:bg-[#00ffcc] hover:text-black"
                >
                  {visibleCount >= filteredProjects.length ? (
                    <>
                      Show Less <ChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      View All Projects <ChevronDown size={20} />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
