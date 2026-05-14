"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactEmail = "sajidulislam08909@gmail.com";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      nextErrors.name = "Your name is required.";
    }

    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.message.trim().length < 20) {
      nextErrors.message = "Tell me a little more about the project.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    if (!validateForm()) {
      setStatus("Please fix the highlighted fields.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app with the message ready to send.");
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatus("Copy failed, but the email is visible above.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#050505] px-5 py-24 sm:px-6 md:px-12 lg:px-24"
    >
      <div
        ref={contentRef}
        className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-[#0a0a0a] p-6 shadow-[0_0_60px_rgba(0,255,204,0.04)] md:p-10 lg:p-14"
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              <Send className="h-4 w-4 text-[#00ffcc]" />
              Project inquiry
            </div>

            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Let&apos;s build something{" "}
              <span className="text-[#00ffcc]">together.</span>
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-400 md:text-lg">
              I&apos;m open to software development work of all kinds: websites,
              web apps, APIs, dashboards, e-commerce, automation, AI features,
              deployment, maintenance, and product improvements.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4 text-gray-300">
                <Mail className="h-6 w-6 text-[#00ffcc]" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-lg transition-colors hover:text-[#00ffcc]"
                >
                  {contactEmail}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:border-[#00ffcc]/40 hover:text-white"
                >
                  {copied ? (
                    <CheckCircle2 className="h-5 w-5 text-[#00ffcc]" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="h-6 w-6 text-[#00ffcc]" />
                <span className="text-lg">Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a
                href="https://github.com/Sajid777Officials"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-[#00ffcc] hover:bg-[#00ffcc] hover:text-black"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sajid08909/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-[#00ffcc] hover:bg-[#00ffcc] hover:text-black"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-gray-400"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="John Doe"
                  aria-invalid={Boolean(errors.name)}
                  className="w-full rounded-lg border border-white/10 bg-[#050505] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-700 focus:border-[#00ffcc]/50 aria-[invalid=true]:border-[#f59e0b]"
                />
                {errors.name && (
                  <p className="flex items-center gap-2 text-sm text-[#fde68a]">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-gray-400"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="john@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-lg border border-white/10 bg-[#050505] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-700 focus:border-[#00ffcc]/50 aria-[invalid=true]:border-[#f59e0b]"
                />
                {errors.email && (
                  <p className="flex items-center gap-2 text-sm text-[#fde68a]">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-gray-400"
              >
                Your Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Tell me about your project..."
                aria-invalid={Boolean(errors.message)}
                className="w-full resize-none rounded-lg border border-white/10 bg-[#050505] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-700 focus:border-[#00ffcc]/50 aria-[invalid=true]:border-[#f59e0b]"
              />
              {errors.message && (
                <p className="flex items-center gap-2 text-sm text-[#fde68a]">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {status && (
              <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300">
                {status}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00ffcc] px-6 py-4 font-bold text-black shadow-[0_0_24px_rgba(0,255,204,0.3)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]"
            >
              Send Message
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
