# TideOps V2 — Premium Website Build Brief

## Business
- **Name:** TideOps
- **Tagline:** "We Install AI Into Your Business"
- **What they do:** White-glove AI and automation solutions for small businesses
- **Services:** AI Assistants, Workflow Automation, Custom Systems
- **Process:** Audit → Build → Install
- **Target:** Real estate teams, contractors, service businesses, agencies
- **CTA:** Book a strategy call → link to contact.html
- **Brand colors:** Near-black (#050505) background, electric blue (#2563eb) accent, white text

## Design Direction
- Apple/Stripe-tier premium. Dark mode. Cinematic.
- Glassmorphic cards, GSAP scroll animations, staggered reveals
- Massive typography (80-100px hero), Inter font
- Gradient text on key headlines (blue-to-purple or blue-to-white)
- Tons of whitespace — confident, not cramped

## Assets Available

### Scroll-Driven Frame Animation (HERO)
- 121 WEBP frames in `assets/frames/hero/` (frame_0001.webp to frame_0121.webp)
- Shows scattered mechanical parts assembling into an AI brain
- **THIS IS THE HERO CENTERPIECE** — implement as scroll-driven frame animation (digital flipbook)
- Use HTML canvas element, preload all frames, advance frame based on scroll position
- Each scroll increment = next frame. User controls the animation by scrolling.
- Frames should be preloaded in background before user reaches the section

### Background Videos (Sections 2 & 3)
- `assets/videos/desk-transform.mp4` — chaotic desk transforming to clean AI dashboard (top-down view)
- `assets/videos/storefront.mp4` — storefront with AI/binary code overlay appearing inside
- Use as autoplay muted loop video backgrounds in their respective sections
- On mobile, replace with static fallback frame (extract first frame as jpg)

## Page Structure

### Single Page (index.html) with these sections:

1. **Nav** — sticky, frosted glass on scroll, logo text "TideOps", links: Services / How It Works / About / Contact, CTA button "Book a Call"

2. **Hero** — full viewport height. The scroll-driven frame animation (canvas) takes center. Overlay text: "We Install AI Into Your Business" (massive, gradient text). Subtitle: "Custom AI and automation systems that save time, reduce manual work, and make your business run smarter." CTA button below.

3. **Problem Section** — "Your Business Is Leaking Time" headline. desk-transform.mp4 as video background with dark overlay. Brief copy about how manual processes, inconsistent follow-up, and operational bottlenecks are costing them. Make it feel visceral.

4. **Services** — "What We Do" headline. Three glassmorphic cards:
   - AI Assistants: "Custom AI tools for emails, lead follow-up, customer communication, and repetitive admin tasks."
   - Workflow Automation: "We connect your software, streamline processes, and automate the tasks that slow you down."
   - Custom Systems: "Tailored AI and automation built around the way your business already operates."
   - Cards should have icons (use clean SVG icons or emoji), glow border on hover, staggered scroll reveal

5. **How It Works** — "From Manual Work to Smarter Systems" headline. Three steps:
   - Step 1: Audit — "We review your workflow, identify bottlenecks, and find the highest-impact opportunities."
   - Step 2: Build — "We design and build a custom solution tailored to your business, tools, and team."
   - Step 3: Install — "We implement, test, and make sure it works smoothly in your day-to-day operations."
   - Horizontal timeline or numbered vertical layout with connecting line

6. **Results/Transformation** — storefront.mp4 as video background. Stats counters that animate on scroll. Use compelling numbers (make them realistic for an AI consultancy). Headline: "Better Systems, Not More Software"

7. **Who It's For** — "Built for Growing Businesses" headline. List of ideal clients with subtle icons. Common signs you're ready (bullet points or small cards).

8. **CTA Section** — Full-width dark section with gradient accent. "See Where AI Can Save Your Business Time" headline. Single glowing CTA button: "Book Your Strategy Call". Link to contact.html.

9. **Footer** — TideOps logo, copyright, links to Services/About/Contact. Email: hello@tideops.io

## Also Build
- **contact.html** — clean contact form (name, email, company, message) + "Book Your Strategy Call" headline. Same nav/footer. Dark theme.

## Technical Requirements
- Vanilla HTML/CSS/JS — no frameworks
- GSAP + ScrollTrigger via CDN for scroll animations
- Inter font from Google Fonts
- CSS custom properties for brand tokens
- Mobile responsive (breakpoints at 1024, 768, 480)
- On mobile: replace videos with static images, simplify animations
- Magnetic CTA button effect (button pulls toward cursor)
- Custom cursor (dot + ring) on desktop
- Animated stat counters
- Staggered card reveals on scroll
- Frosted glass nav on scroll
- Hero text letter-by-letter animation on load
- Smooth 60fps everywhere

## Scroll-Driven Frame Animation Implementation

This is the KEY technique. For the hero section:

```javascript
// Concept — actual implementation should be production-quality
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const frameCount = 121;
const frames = [];

// Preload all frames
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = `assets/frames/hero/frame_${String(i).padStart(4, '0')}.webp`;
  frames.push(img);
}

// On scroll, calculate which frame to show
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  // Map scroll position to frame index (only within the hero section)
  const frameIndex = Math.min(frameCount - 1, Math.floor((scrollTop / sectionHeight) * frameCount));
  ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
});
```

The animation should occupy the hero section. As the user scrolls through the hero, the frame advances. The scroll speed should feel good — about 3-4 full scroll gestures to complete the animation (not 8 like the guide warned about).

## Reference Skills
Read the website-builder SKILL.md in this project for additional CSS patterns, GSAP code, and best practices. It's in the tideops-claude-skills folder.
