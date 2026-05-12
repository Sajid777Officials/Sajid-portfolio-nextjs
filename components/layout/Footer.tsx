import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/Sajid777Officials",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sajid08909/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:sajidulislam08909@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-[#050505] px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Sajid. Built with Next.js, Three.js, and
          a lot of attention to detail.
        </p>

        <div className="flex items-center gap-3">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:border-[#00ffcc]/50 hover:text-[#00ffcc]"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
