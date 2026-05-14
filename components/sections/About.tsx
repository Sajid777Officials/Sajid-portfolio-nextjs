"use client";

import { motion } from "framer-motion";
import {
  Code2,
  DatabaseZap,
  Layers3,
  Rocket,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Frontend systems",
    copy: "Responsive React and Next.js interfaces with smooth motion, strong component structure, and clean interaction states.",
  },
  {
    icon: DatabaseZap,
    title: "Backend architecture",
    copy: "REST APIs, authentication flows, databases, integrations, and realtime features built for production use.",
  },
  {
    icon: Workflow,
    title: "Product thinking",
    copy: "I map the user journey first, then ship features that feel simple on the surface and dependable underneath.",
  },
];

const timeline = [
  {
    label: "Discover",
    title: "Clarify the product goal",
    copy: "Define user flows, success metrics, and the smallest useful version before design or code starts.",
  },
  {
    label: "Build",
    title: "Move fast with structure",
    copy: "Create typed components, API contracts, database schemas, and reusable UI patterns that can scale.",
  },
  {
    label: "Refine",
    title: "Polish for production",
    copy: "Improve accessibility, responsive behavior, animation timing, performance, and deployment readiness.",
  },
];

const metrics = [
  { value: "Full", label: "Product builds" },
  { value: "API", label: "Backend work" },
  { value: "AI", label: "Automation" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 w-full px-5 py-24 sm:px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:sticky lg:top-28"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
            <Rocket className="h-4 w-4 text-[#00ffcc]" />
            Available for full-stack projects
          </div>

          <h2 className="text-4xl font-bold tracking-normal text-white md:text-5xl">
            Building useful products with sharp interfaces and reliable systems.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
            I&apos;m Sajid, a software developer from Dhaka. I build complete
            digital products, from polished interfaces and dashboards to APIs,
            databases, automation, deployment, and long-term improvements.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gray-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid gap-4 md:grid-cols-3"
          >
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-[#0b0b0b] p-5 transition-all duration-300 hover:border-[#00ffcc]/40 hover:shadow-[0_0_32px_rgba(0,255,204,0.07)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-[#00ffcc]/25 bg-[#00ffcc]/10 text-[#00ffcc]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="rounded-lg border border-white/10 bg-[#0b0b0b] p-6 md:p-8"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8b5cf6]/15 text-[#c4b5fd]">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  How I ship work
                </h3>
                <p className="text-sm text-gray-500">
                  A focused process for modern web products
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {timeline.map((step, index) => (
                <div key={step.label} className="grid gap-4 sm:grid-cols-[7rem_1fr]">
                  <div className="flex items-start gap-3 text-sm font-semibold text-[#00ffcc]">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/10 text-xs">
                      {index + 1}
                    </span>
                    {step.label}
                  </div>
                  <div className="border-l border-white/10 pb-5 pl-5 last:pb-0">
                    <h4 className="font-semibold text-white">{step.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {step.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-[#f59e0b]/20 bg-[#f59e0b]/10 p-5 text-sm text-[#fde68a]"
          >
            <ShieldCheck className="h-5 w-5" />
            Clean code, responsive UI, accessibility checks, and deployment
            polish are included in the build mindset.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
