"use client";

import { motion } from "framer-motion";
import {
  Bot,
  CloudCog,
  Code2,
  Database,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  MonitorSmartphone,
  Rocket,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

const services = [
  {
    title: "Web App Development",
    description:
      "Modern business websites, landing pages, dashboards, SaaS products, admin panels, and full-stack web applications.",
    icon: Code2,
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Mobile-Ready Experiences",
    description:
      "Responsive interfaces, progressive web apps, and mobile-first product flows that work cleanly across devices.",
    icon: MonitorSmartphone,
    tags: ["PWA", "Responsive UI", "UX"],
  },
  {
    title: "Backend & API Systems",
    description:
      "Secure REST APIs, authentication, role-based access, integrations, file uploads, and server-side business logic.",
    icon: ServerCog,
    tags: ["Node.js", "Express", "Auth"],
  },
  {
    title: "Database Design",
    description:
      "MongoDB and SQL data modeling, schemas, queries, relationships, migrations, and performance-minded storage design.",
    icon: Database,
    tags: ["MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    title: "E-Commerce Development",
    description:
      "Product catalogs, carts, checkout flows, payment integrations, order dashboards, and inventory management.",
    icon: ShoppingCart,
    tags: ["Payments", "Admin", "Orders"],
  },
  {
    title: "Dashboards & Analytics",
    description:
      "Operational dashboards, reporting views, charts, KPIs, filters, exports, and data-heavy interfaces.",
    icon: LayoutDashboard,
    tags: ["Charts", "Reports", "Data UI"],
  },
  {
    title: "AI & Automation",
    description:
      "AI-powered features, chat assistants, content tools, workflow automation, API automation, and productivity helpers.",
    icon: Bot,
    tags: ["AI APIs", "Automation", "Tools"],
  },
  {
    title: "Cloud & Deployment",
    description:
      "Deployment setup, environment configuration, Vercel hosting, domain setup, CI-ready builds, and release support.",
    icon: CloudCog,
    tags: ["Vercel", "CI/CD", "Hosting"],
  },
  {
    title: "Performance Optimization",
    description:
      "Core Web Vitals improvements, bundle cleanup, loading states, image optimization, and frontend speed tuning.",
    icon: Gauge,
    tags: ["SEO", "Speed", "Vitals"],
  },
  {
    title: "Security & Reliability",
    description:
      "Input validation, protected routes, secure auth flows, API hardening, error states, and safer production behavior.",
    icon: ShieldCheck,
    tags: ["Validation", "JWT", "Hardening"],
  },
  {
    title: "MVP & SaaS Builds",
    description:
      "From idea to launch: product planning, feature scope, UI, backend, database, deployment, and iteration support.",
    icon: Rocket,
    tags: ["MVP", "SaaS", "Launch"],
  },
  {
    title: "Maintenance & Support",
    description:
      "Bug fixes, feature upgrades, code cleanup, dependency updates, redesigns, and long-term product improvements.",
    icon: LifeBuoy,
    tags: ["Fixes", "Refactor", "Support"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 w-full bg-[#050505] px-5 py-24 sm:px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              <Rocket className="h-4 w-4 text-[#00ffcc]" />
              Software development services
            </div>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              What I Can <span className="text-[#00ffcc]">Build</span>
            </h2>
            <p className="mt-4 max-w-2xl text-gray-400">
              I handle complete software development work, from frontend polish
              and backend architecture to deployment, automation, and ongoing
              support.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#00ffcc] px-6 py-3 text-sm font-bold text-[#00ffcc] transition-colors hover:bg-[#00ffcc] hover:text-black"
          >
            Request a service
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.45, delay: index * 0.035 }}
                className="group rounded-lg border border-white/10 bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-[#00ffcc]/40 hover:shadow-[0_0_32px_rgba(0,255,204,0.07)]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#00ffcc]/20 bg-[#00ffcc]/10 text-[#00ffcc] transition-transform group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-white/[0.04] px-3 py-1 text-xs font-semibold text-gray-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {service.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-semibold text-gray-300"
                    >
                      {tag}
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
