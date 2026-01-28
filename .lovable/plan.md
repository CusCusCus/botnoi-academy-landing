
# BOTNOI ACADEMY Landing Page

## Overview
A modern, playful, and professional one-page landing page for the BOTNOI ACADEMY internship recruitment program, featuring soft pastel colors, smooth animations, and a welcoming design.

---

## Design System

### Visual Identity
- **Colors**: Soft Pink (#FCE4EC), Sky Blue (#E3F2FD), Deep Navy Blue (#1A237E)
- **Typography**: "Kanit" from Google Fonts for Thai/English text
- **Style**: Rounded corners (24px), soft drop shadows, spacious layout

---

## Page Sections

### 1. Navigation Bar
- Sticky header that transitions from transparent to white on scroll
- Links: Home, Internship, Review, Contact
- Smooth scroll navigation to each section

### 2. Hero Section
- Bold centered title: "BOTNOI ACADEMY"
- Animated subtitles: "Learn together" and "Play together"
- Cute 3D-style robot mascot placeholder illustration (centered)
- Floating circular icons with student/AI graphics around the mascot

### 3. About Section
- Heading: "What is BOTNOI Academy?"
- Vision text in Thai about the learning experience
- Large gradient CTA button: "เรียนรู้จากโจทย์จริง และลงมือทำจริง"
- Hover glow/scale effect on button

### 4. Trainee Experience Grid
- **Left**: "Trainee Memory" with scattered Polaroid-style photo placeholders
- **Right**: "Unlimited Experience" card with blue border and student illustration

### 5. Master Mentor Section
- Full-width Navy Blue background with Pink header strip
- Two mentor profile cards with placeholder portraits
- Quote block: "We want our interns to learn, grow, and gain real-world experience..."

### 6. Our Services Section (2×2 Grid)
- Section title with description about AI solutions
- Four service cards:
  - AI Chatbot (Teal accent)
  - AI Voicebot (Yellow accent)
  - BOTNOI Live (Pink accent)
  - Document Search (Green accent)
- Each card includes title, description, and YouTube video embed with play button
- Video opens in modal overlay when clicked

### 7. Contact Section
- Working contact form with fields: Name, Email, Message
- Form validation with Zod
- Backend integration via Supabase edge function to send emails
- Social links and contact information

---

## Functionality & Interactions
- Smooth scrolling navigation between sections
- Hover effects: cards lift with shadow, buttons scale/glow
- Video modal for YouTube embeds in service cards
- Fully responsive design (stacked cards on mobile)
- Fade-in animations as sections come into view

---

## Backend Requirements
- **Lovable Cloud** for backend functionality
- **Edge Function** to handle contact form submissions
- **Resend** integration for sending contact form emails
- Form validation on both client and server side

---

## Responsive Design
- Mobile: Single-column layout, stacked cards
- Tablet: 2-column where appropriate
- Desktop: Full grid layouts as designed
