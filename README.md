# Varsha Singh — Personal Portfolio

A modern, responsive personal portfolio website for a BCA (Data Science & AI) student.


## 📁 Files

```
portfolio/
├── index.html   ← Main HTML file (all sections)
├── style.css    ← All styles (dark theme, responsive, animations)
├── script.js    ← All interactivity (typewriter, tilt, reveal, form, etc.)
├── resume.pdf   ← Replace with your actual resume PDF
└── README.md    ← This file
```

## 🚀 Running Locally

Simply open `index.html` in any modern browser — no build tools needed.

```bash
# Option 1: just double-click index.html

# Option 2: use VS Code Live Server extension

# Option 3: Python quick server
cd portfolio
python -m http.server 5500
# then open http://localhost:5500
```

## 🛠 Customisation Checklist

| What                | Where                             |
|---------------------|-----------------------------------|
| Your name           | `index.html` — `hero-name`, `nav-brand`, footer |
| Profile photo       | `style.css` — `.profile-img-placeholder` — swap the gradient background for `url('your-photo.jpg') center/cover no-repeat` |
| Roles (typewriter)  | `script.js` — `roles` array       |
| About text          | `index.html` — `#about` section   |
| Skills              | `index.html` — `#skills` section  |
| Projects            | `index.html` — `#projects` section|
| Education           | `index.html` — `#education` section|
| Certifications      | `index.html` — `#certifications` section|
| Social links        | `index.html` — `href` attributes on GitHub / LinkedIn icons |
| Email / phone       | `index.html` — `#contact` section |
| Resume PDF          | Replace `resume.pdf` with your actual file |
| Accent colour       | `style.css` — `--accent` CSS variable (default: `#6c63ff`) |

## ✨ Features

- 🌙 Dark theme with glassmorphism navbar
- ✍️ Typewriter role animation
- 🃏 3-D perspective tilt on profile card (mouse tracking)
- 🎞 Scroll-reveal fade-in for every section (IntersectionObserver)
- 📊 Animated skill progress bars
- 🌊 Parallax floating background shapes
- 📱 Fully responsive (mobile, tablet, desktop)
- 📬 Contact form with validation & success feedback
- ⬆️ Back-to-top button
- 🔗 GitHub & LinkedIn quick links

## � Portfolio Preview

```md
## Portfolio Preview

### Home Section
![Portfolio Home](./images/portfolio-home.png)

### About Section
![Portfolio About](./images/portfolio-about.png)
```

## �📦 External Dependencies (CDN — no install needed)

- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)
- [Font Awesome 6](https://fontawesome.com/)

Both load from CDN. An internet connection is required on first load; after that they are browser-cached.
