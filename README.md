# SEO Launchpad Pro

Act as an expert Front-End Developer. Build a high-converting, single-page Lead Generation Landing Page for a digital marketing agency called "SEO Services Planet". 

The generated code must be contained across exactly three simple files: index.html, style.css, and script.js. Use clean, basic, and understandable semantic layout tags without any external frameworks (No Bootstrap, No Tailwind, No React).

Color & Brand Identity Constraints:

- Based on the live web profile of seoservicesplanet.com, use its exact corporate color scheme. Dynamically implement a Deep Navy/Midnight Blue (#0B132B or #1C2541) as the main structural background base for high trust, clean White/Light Grey text regions for stark legibility, and an Electric Cyan/Bright Orange accent hex code for primary call-to-action (CTA) buttons. 

- Header Logo: Render the brand identity inside the navigation bar as text styled with CSS: "SEO" in the high-contrast accent color, followed by "Services Planet" in Bold White/Dark Navy depending on the header background color.

Page Layout Sections (Semantic HTML structure):

- Fixed Header: Sticky navigation containing the text logo on the left and smooth-scrolling links on the right (Services, Strategy, Contact) alongside a clear Call-To-Action (CTA) accent button labeled "Get Free Audit".

- Hero Section: A centered high-impact section with a bold headline: "Grow Your Business with Expert SEO Services", a short supporting subtitle about organic Google traffic, and a primary dynamic button linking to the contact section.

- Services Grid: A 3-column layout built using pure CSS Flexbox or Grid. Display 3 distinct service cards reflecting the company's real core offerings: "On-Page SEO Optimization", "Advanced Link Building", and "Search Engine Compatibility Analysis". Each card should feature a clean border, subtle shadow, and a smooth scale-up hover effect.

- Our Strategy Section: A visual step-by-step numbered workflow timeline layout (1. Audit & Analysis, 2. Keyword Research, 3. Implementation).

- Contact Audit Form: A centered lead-capture card titled "Request a Free Website Audit". Include inputs for Full Name, Business Email, and Website URL, plus a prominent submit button styled in the company's primary accent color.

- Professional Footer: A clean dark footer displaying the copyright year 2026 and an explicit credit disclaimer reading: "Designed & Developed by [Your Name] during my Front End Developer Internship at SEO Services Planet."

Technical & JavaScript Requirements:

- Responsive Design: Write clear media queries in style.css ensuring the navigation collapses gracefully and the services grid stacks vertically on smaller mobile displays.

- JavaScript Logic: Keep the script.js file clean, minimal, and fully documented with comments. It must intercept the audit form submission, prevent the default page reload behavior, execute basic front-end email/URL validation, and show a clear, stylized "Success! Our SEO team will contact you shortly." confirmation message right below the form.

Deliver the final result in three clean, distinctly marked code blocks for HTML, CSS, and JS so I can easily analyze and study the logic afterward.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
