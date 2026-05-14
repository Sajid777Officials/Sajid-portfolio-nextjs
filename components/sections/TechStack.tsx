"use client";

import { motion } from "framer-motion";
import {
  Braces,
  Cloud,
  Database,
  GitBranch,
  MonitorSmartphone,
  Server,
} from "lucide-react";

const skillsData = [
  {
    category: "Frontend",
    icon: MonitorSmartphone,
    accent: "text-[#00ffcc]",
    bar: "bg-[#00ffcc]",
    level: 92,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    category: "Backend",
    icon: Server,
    accent: "text-[#c4b5fd]",
    bar: "bg-[#8b5cf6]",
    level: 86,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Socket.io"],
  },
  {
    category: "Database",
    icon: Database,
    accent: "text-[#fde68a]",
    bar: "bg-[#f59e0b]",
    level: 82,
    skills: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma", "Firebase"],
  },
  {
    category: "Tooling",
    icon: GitBranch,
    accent: "text-[#bae6fd]",
    bar: "bg-[#0ea5e9]",
    level: 88,
    skills: ["Git", "Vercel", "Postman", "Docker", "ESLint"],
  },
];

const workflows = [
  "API contract planning",
  "Responsive component systems",
  "Realtime state updates",
  "Deployment-ready optimization",
];

export default function TechStack() {
  return (
    <section
      id="tech"
      className="relative z-10 w-full bg-[#050505] px-5 py-24 sm:px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              <Braces className="h-4 w-4 text-[#00ffcc]" />
              Stack and workflow
            </div>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              My <span className="text-[#00ffcc]">Tech Stack</span>
            </h2>
            <p className="mt-4 max-w-2xl text-gray-400">
              Tools I use to ship complete products, from polished interfaces to
              stable APIs and deployable systems.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-3">
              <Cloud className="h-5 w-5 text-[#00ffcc]" />
              <p className="font-semibold text-white">Build habits</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {workflows.map((workflow) => (
                <span
                  key={workflow}
                  className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-semibold text-gray-300"
                >
                  {workflow}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillsData.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.category}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-lg border border-white/10 bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-[#00ffcc]/30 hover:shadow-[0_0_32px_rgba(0,255,204,0.07)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.05] ${group.accent}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-gray-400">
                    {group.level}%
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {group.category}
                </h3>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${group.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.15 + index * 0.08 }}
                    className={`h-full rounded-full ${group.bar}`}
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-[#00ffcc]/40 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
