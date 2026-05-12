"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Code2,
  Command,
  Copy,
  FolderGit2,
  Github,
  Home,
  Layers3,
  LucideIcon,
  Mail,
  Rocket,
  Search,
  UserRound,
  X,
} from "lucide-react";

type Action = {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  run: () => void;
};

const contactEmail = "sajidulislam08909@gmail.com";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setHighlightedIndex(0);
  }, []);

  const scrollToSection = useCallback((selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    closePalette();
  }, [closePalette]);

  const actions = useMemo<Action[]>(
    () => [
      {
        id: "home",
        label: "Go to home",
        hint: "Hero section",
        icon: Home,
        run: () => scrollToSection("#home"),
      },
      {
        id: "about",
        label: "View about",
        hint: "Process and profile",
        icon: UserRound,
        run: () => scrollToSection("#about"),
      },
      {
        id: "projects",
        label: "Open selected projects",
        hint: "Case studies",
        icon: FolderGit2,
        run: () => scrollToSection("#projects"),
      },
      {
        id: "services",
        label: "View services",
        hint: "Software development services",
        icon: Rocket,
        run: () => scrollToSection("#services"),
      },
      {
        id: "works",
        label: "Open GitHub projects",
        hint: "Live repository sync",
        icon: Github,
        run: () => scrollToSection("#works"),
      },
      {
        id: "tech",
        label: "View tech stack",
        hint: "Skills and tools",
        icon: Layers3,
        run: () => scrollToSection("#tech"),
      },
      {
        id: "contact",
        label: "Contact Sajid",
        hint: "Project inquiry form",
        icon: Mail,
        run: () => scrollToSection("#contact"),
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: contactEmail,
        icon: Copy,
        run: async () => {
          await navigator.clipboard.writeText(contactEmail);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        },
      },
      {
        id: "github-profile",
        label: "Open GitHub profile",
        hint: "Sajid777Officials",
        icon: Code2,
        run: () => {
          window.open(
            "https://github.com/Sajid777Officials",
            "_blank",
            "noopener,noreferrer"
          );
          closePalette();
        },
      },
      {
        id: "linkedin-profile",
        label: "Open LinkedIn profile",
        hint: "sajid08909",
        icon: UserRound,
        run: () => {
          window.open(
            "https://www.linkedin.com/in/sajid08909/",
            "_blank",
            "noopener,noreferrer"
          );
          closePalette();
        },
      },
    ],
    [closePalette, scrollToSection]
  );

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return actions.filter((action) =>
      [action.label, action.hint, action.id]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [actions, query]);

  useEffect(() => {
    const openPalette = () => setIsOpen(true);
    window.addEventListener("open-command-palette", openPalette);

    return () => window.removeEventListener("open-command-palette", openPalette);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((current) => !current);
        return;
      }

      if (!isOpen) return;

      if (event.key === "Escape") {
        closePalette();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((current) =>
          filteredActions.length === 0
            ? 0
            : (current + 1) % filteredActions.length
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((current) =>
          filteredActions.length === 0
            ? 0
            : (current - 1 + filteredActions.length) % filteredActions.length
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();
        filteredActions[highlightedIndex]?.run();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePalette, filteredActions, highlightedIndex, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-[#090909] shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-5 w-5 text-[#00ffcc]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlightedIndex(0);
            }}
            placeholder="Search sections, actions, or links"
            className="h-11 flex-1 bg-transparent text-base text-white outline-none placeholder:text-gray-600"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close command palette"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {copied && (
          <div className="border-b border-[#00ffcc]/20 bg-[#00ffcc]/10 px-4 py-3 text-sm font-semibold text-[#00ffcc]">
            Email copied to clipboard.
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredActions.length > 0 ? (
            filteredActions.map((action, index) => {
              const Icon = action.icon;
              const isHighlighted = highlightedIndex === index;

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={action.run}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors ${
                    isHighlighted
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] text-[#00ffcc]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{action.label}</span>
                    <span className="block truncate text-sm text-gray-500">
                      {action.hint}
                    </span>
                  </span>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-12 text-center">
              <Command className="mx-auto h-8 w-8 text-gray-600" />
              <p className="mt-4 font-semibold text-white">No action found.</p>
              <p className="mt-1 text-sm text-gray-500">
                Try searching for projects, contact, stack, or GitHub.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
