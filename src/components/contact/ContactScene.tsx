"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MessageSquare,
  ArrowRight,
  Heart,
  Check,
  Copy,
  Download,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/Icons";
import { siteConfig } from "@/data/site";
import { ClayCard } from "./ClayCard";
import { ClayInput } from "./ClayInput";
import { ClayButton } from "./ClayButton";
import { PeekingCharacter } from "./PeekingCharacter";
import { SuccessState } from "./SuccessState";
import { useCursor } from "@/components/Providers";

export function ContactScene() {
  const { setCursorVariant, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const formspreeKey = process.env.NEXT_PUBLIC_FORMSPREE_KEY;
    if (formspreeKey) {
      try {
        await fetch(`https://formspree.io/f/${formspreeKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _replyto: formData.email,
            _to: siteConfig.email,
          }),
        });
      } catch (err) {
        console.error("Form submission error:", err);
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none pt-4 pb-12">
      {/* ============================================================ */}
      {/* 3D PUFFY CLOUDS (always cream/white, never dark blobs)       */}
      {/* ============================================================ */}

      {/* Cloud 1 (Top-Left) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute -top-8 -left-24 lg:-left-32 pointer-events-none z-0"
      >
        <svg width="160" height="95" viewBox="0 0 160 95" fill="none">
          <filter id="cloudPuff1" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#2A2733" floodOpacity="0.08" />
          </filter>
          <linearGradient id="cloudGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFBF5" />
            <stop offset="100%" stopColor="#FFE9B7" stopOpacity="0.6" />
          </linearGradient>
          <g filter="url(#cloudPuff1)">
            {/* 3 overlapping circles */}
            <circle cx="52" cy="58" r="28" fill="url(#cloudGrad1)" />
            <circle cx="102" cy="60" r="26" fill="url(#cloudGrad1)" />
            <circle cx="76" cy="42" r="32" fill="url(#cloudGrad1)" />
            {/* Top soft highlight */}
            <ellipse cx="76" cy="30" rx="20" ry="10" fill="#FFFFFF" opacity="0.9" />
          </g>
        </svg>
      </motion.div>

      {/* Cloud 2 (Top-Right) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:block absolute top-6 -right-20 lg:-right-28 pointer-events-none z-0"
      >
        <svg width="150" height="90" viewBox="0 0 150 90" fill="none">
          <filter id="cloudPuff2" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#2A2733" floodOpacity="0.08" />
          </filter>
          <linearGradient id="cloudGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFBF5" />
            <stop offset="100%" stopColor="#CAE1E9" stopOpacity="0.6" />
          </linearGradient>
          <g filter="url(#cloudPuff2)">
            {/* 3 overlapping circles */}
            <circle cx="48" cy="54" r="26" fill="url(#cloudGrad2)" />
            <circle cx="94" cy="56" r="24" fill="url(#cloudGrad2)" />
            <circle cx="70" cy="38" r="30" fill="url(#cloudGrad2)" />
            {/* Top soft highlight */}
            <ellipse cx="70" cy="26" rx="18" ry="9" fill="#FFFFFF" opacity="0.9" />
          </g>
        </svg>
      </motion.div>

      {/* ============================================================ */}
      {/* 3D CLAY POTS: Placed strictly OUTSIDE the card edges         */}
      {/* ============================================================ */}

      {/* Leafy Plant (Bottom-Left outside the card) */}
      <motion.div
        animate={{ rotate: [-1.2, 1.2, -1.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute bottom-8 -left-32 pointer-events-none z-30"
        style={{ transformOrigin: "bottom center" }}
      >
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          <filter id="plantClayShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#2A2733" floodOpacity="0.10" />
          </filter>
          <g filter="url(#plantClayShadow)">
            {/* Clay Pot */}
            <path
              d="M 38 90 L 82 90 L 74 130 L 46 130 Z"
              fill="#FFD8E5"
              stroke="#E85D88"
              strokeWidth="1.2"
            />
            {/* Pot Rim */}
            <rect
              x="34"
              y="84"
              width="52"
              height="9"
              rx="4.5"
              fill="#FFE9B7"
              stroke="#F59E0B"
              strokeWidth="1"
            />
            {/* Soil */}
            <ellipse cx="60" cy="88" rx="20" ry="3.5" fill="#5E5B6E" />
            {/* Stems & Leaves */}
            <path d="M 60 88 Q 50 65 38 50 Q 48 46 60 62" fill="#B8E0D2" stroke="#2A9D8F" strokeWidth="1" />
            <path d="M 60 88 Q 66 60 82 48 Q 76 62 60 72" fill="#CAE1E9" stroke="#4A8FE7" strokeWidth="1" />
            <path d="M 60 80 Q 60 40 60 22 Q 64 42 60 62" fill="#D8F3DC" stroke="#2A9D8F" strokeWidth="1" />
            {/* Leaf bulb highlights */}
            <circle cx="38" cy="50" r="9" fill="#B8E0D2" />
            <circle cx="82" cy="48" r="10" fill="#CAE1E9" />
            <circle cx="60" cy="22" r="11" fill="#D8F3DC" />
          </g>
        </svg>
      </motion.div>

      {/* Pink Flower Pot (Bottom-Right outside the card) */}
      <motion.div
        animate={{ rotate: [1.2, -1.2, 1.2] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="hidden lg:block absolute bottom-8 -right-32 pointer-events-none z-30"
        style={{ transformOrigin: "bottom center" }}
      >
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          <filter id="flowerClayShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#2A2733" floodOpacity="0.10" />
          </filter>
          <g filter="url(#flowerClayShadow)">
            {/* Clay Pot */}
            <path
              d="M 38 90 L 82 90 L 74 130 L 46 130 Z"
              fill="#FFE9B7"
              stroke="#F59E0B"
              strokeWidth="1.2"
            />
            {/* Pot Rim */}
            <rect
              x="34"
              y="84"
              width="52"
              height="9"
              rx="4.5"
              fill="#CAE1E9"
              stroke="#4A8FE7"
              strokeWidth="1"
            />
            {/* Stem */}
            <path d="M 60 88 Q 57 52 60 36" stroke="#74C69D" strokeWidth="3.5" strokeLinecap="round" />
            {/* Flower Petals */}
            <circle cx="60" cy="23" r="8.5" fill="#FFD8E5" />
            <circle cx="60" cy="47" r="8.5" fill="#FFD8E5" />
            <circle cx="48" cy="35" r="8.5" fill="#FFD8E5" />
            <circle cx="72" cy="35" r="8.5" fill="#FFD8E5" />
            {/* Gold Center */}
            <circle cx="60" cy="35" r="6.5" fill="#FFE9B7" stroke="#F59E0B" strokeWidth="1" />
          </g>
        </svg>
      </motion.div>

      {/* Floating stars (small and subtle, max 3) */}
      <motion.div
        animate={{ y: [-4, 4, -4], rotate: [0, 15, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-1/4 -left-10 pointer-events-none z-10"
      >
        <span className="text-xl text-[#F59E0B]/80">✦</span>
      </motion.div>
      <motion.div
        animate={{ y: [4, -4, 4], rotate: [0, -15, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="hidden md:block absolute top-1/2 -right-10 pointer-events-none z-10"
      >
        <span className="text-lg text-[#E85D88]/80">✦</span>
      </motion.div>

      {/* ============================================================ */}
      {/* MAIN CLAY STACK: Back Card wrapping Header, Doll & Front     */}
      {/* ============================================================ */}
      <ClayCard
        variant="base"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-10 pb-8 px-6 sm:px-8 text-center"
      >
        {/* ------------------------------------------------------------ */}
        {/* 1. HEADING & SUBTITLE (with clear margin-bottom >= 24px)     */}
        {/* ------------------------------------------------------------ */}
        <div className="space-y-3 mb-6 relative z-10">
          {/* Small Monospace CONTACT Tag */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.14em] font-semibold"
            style={{
              backgroundColor: "#FFE9A8",
              color: "#1E1B2E",
              border: "1px solid rgba(30,27,46,0.1)",
            }}
          >
            <Heart className="w-3 h-3 fill-current" style={{ color: "var(--accent)" }} />
            <span>CONTACT</span>
          </motion.div>

          {/* Big Serif Heading: "Let's Talk" */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl leading-none tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Let&apos;s{" "}
            <span className="italic font-normal" style={{ color: "var(--accent)" }}>
              Talk
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-sm sm:text-base max-w-[420px] mx-auto text-balance leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {siteConfig.subheading}
          </motion.p>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 2. CHARACTER CONTAINER – reserves 300px for the doll          */}
        {/* ------------------------------------------------------------ */}
        <div className="relative w-[320px] h-[300px] mx-auto overflow-visible z-10">
          <PeekingCharacter isSuccess={submitted} />
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 3. FRONT FORM CARD (-mt-10 tucks ~40px behind her chin)      */}
        {/* ------------------------------------------------------------ */}
        <ClayCard
          variant="elevated"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="-mt-10 relative z-20 p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Input 1: Name */}
                <ClayInput
                  id="contact-name"
                  name="name"
                  label="Your Name"
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                  required
                  icon={<User className="w-4 h-4 text-[#2A2733]" />}
                  iconBgColor="#FFE9B7"
                />

                {/* Input 2: Email */}
                <ClayInput
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                  required
                  icon={<Mail className="w-4 h-4 text-[#2A2733]" />}
                  iconBgColor="#CAE1E9"
                />

                {/* Input 3: Message */}
                <ClayInput
                  id="contact-message"
                  name="message"
                  label="Your Message"
                  placeholder="Tell me about your project, idea, or role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  error={errors.message}
                  required
                  isTextArea
                  rows={4}
                  icon={<MessageSquare className="w-4 h-4 text-[#2A2733]" />}
                  iconBgColor="#FFD8E5"
                />

                {/* Primary Button: "Send Message →" */}
                <div className="pt-2">
                  <ClayButton
                    type="submit"
                    variant="primary"
                    isLoading={submitting}
                    className="w-full py-4 text-sm font-semibold tracking-wide"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </ClayButton>
                </div>

                {/* Divider: "or reach me directly" */}
                <div className="relative py-2 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-black/06 dark:border-white/08" />
                  </div>
                  <span className="relative px-3 text-[10px] font-mono uppercase tracking-wider text-[#8E8A9F] bg-[#FFFBF5] dark:bg-[#2E2A3A]">
                    or reach me directly
                  </span>
                </div>

                {/* Row of 4 Round Puffy Icon Buttons */}
                <div className="flex items-center justify-center gap-3.5 pt-1">
                  {/* GitHub */}
                  <a
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sneha on GitHub"
                    title="Sneha on GitHub"
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={resetCursor}
                  >
                    <ClayButton variant="icon" aria-label="GitHub">
                      <GithubIcon className="w-5 h-5" />
                    </ClayButton>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={siteConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sneha on LinkedIn"
                    title="Sneha on LinkedIn"
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={resetCursor}
                  >
                    <ClayButton variant="icon" aria-label="LinkedIn">
                      <LinkedinIcon className="w-5 h-5" />
                    </ClayButton>
                  </a>

                  {/* Instagram */}
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sneha on Instagram"
                    title="Sneha on Instagram"
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={resetCursor}
                  >
                    <ClayButton variant="icon" aria-label="Instagram">
                      <InstagramIcon className="w-5 h-5" />
                    </ClayButton>
                  </a>

                  {/* Direct Email Link */}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    aria-label="Email Sneha"
                    title="Email Sneha"
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={resetCursor}
                  >
                    <ClayButton variant="icon" aria-label="Email">
                      <Mail className="w-5 h-5" />
                    </ClayButton>
                  </a>
                </div>

                {/* Click-to-copy chip with Copied toast & direct mailto link */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all text-xs font-mono hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                      style={{
                        backgroundColor: "var(--surface-2)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <span>{siteConfig.email}</span>
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </button>
                    {copiedEmail && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider shadow-md whitespace-nowrap z-20"
                        style={{
                          backgroundColor: "var(--pill-active-bg)",
                          color: "var(--pill-active-text)",
                        }}
                      >
                        Copied!
                      </motion.div>
                    )}
                  </div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    aria-label="Send direct email"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono border hover:scale-105 transition-all shadow-xs"
                    style={{
                      backgroundColor: "#FFE9B7",
                      borderColor: "rgba(30,27,46,0.1)",
                      color: "#1E1B2E",
                    }}
                  >
                    <Mail className="w-3 h-3" />
                    <span>Mail</span>
                  </a>
                </div>

                {/* Resume Download Link */}
                <div
                  className="pt-3 border-t flex items-center justify-between text-xs"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <span className="font-mono text-[11px]">Prefer a file?</span>
                  <a
                    href={siteConfig.resumeUrl}
                    download="Sneha_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 shadow-xs"
                    style={{
                      backgroundColor: "#FFE9B7",
                      color: "#1E1B2E",
                    }}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={resetCursor}
                  >
                    <span>Resume</span>
                    <Download className="w-3 h-3" />
                  </a>
                </div>

                {/* Tiny Location Line at the bottom */}
                <div
                  className="flex items-center justify-center gap-1 text-[11px] font-mono pt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <MapPin className="w-3 h-3" style={{ color: "var(--accent)" }} />
                  <span>{siteConfig.location}</span>
                </div>
              </motion.form>
            ) : (
              <SuccessState onReset={() => setSubmitted(false)} />
            )}
          </AnimatePresence>
        </ClayCard>
      </ClayCard>
    </div>
  );
}
