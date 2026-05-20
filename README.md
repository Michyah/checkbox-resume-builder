# 📄 Résumé Builder

A clean, professional résumé builder — built with vanilla JavaScript and Vite.

---

## 🗂 File Structure

```
resume-builder/
├── index.html                  ← The main webpage (entry point)
├── package.json                ← Project info & scripts
├── vite.config.js              ← Build tool settings
├── .gitignore                  ← Files to exclude from Git
└── src/
    ├── main.js                 ← App startup
    ├── components/
    │   └── ResumePreview.js    ← Live resume preview renderer
    ├── pages/
    │   ├── LandingPage.js      ← Welcome / home screen
    │   ├── ProfilePage.js      ← Step 1: Name, email, etc.
    │   ├── EducationPage.js    ← Step 2: Schools / degrees
    │   ├── ExperiencePage.js   ← Step 3: Work history
    │   ├── ProjectsPage.js     ← Step 4: Personal projects
    │   ├── SkillsPage.js       ← Step 5: Skills & interests
    │   └── PreviewPage.js      ← Step 6: Final preview & save
    ├── styles/
    │   ├── global.css          ← All shared styles & design tokens
    │   └── resume.css          ← Resume document styles
    └── utils/
        ├── store.js            ← App state (data storage)
        └── helpers.js          ← Shared helper functions
```

---

## 🚀 How to Run It (Step by Step for Beginners)

### Step 1 — Install Node.js (if you haven't already)

1. Go to https://nodejs.org
2. Download the **LTS** version (the green button)
3. Run the installer and follow the prompts
4. When done, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:
   ```
   node --version
   ```
   You should see a version number like `v20.0.0`. That means it worked!

---

### Step 2 — Open the Project in VS Code

1. Open **VS Code**
2. Go to **File → Open Folder...**
3. Select the `resume-builder` folder you downloaded
4. You'll see all the files on the left sidebar

---

### Step 3 — Open the Terminal in VS Code

1. In VS Code, go to **Terminal → New Terminal** (at the top menu)
2. A black/dark panel will appear at the bottom of your screen
3. You'll type commands here

---

### Step 4 — Install the Project's Tools

In the terminal, type this and press Enter:
```
npm install
```
Wait for it to finish (you'll see lots of text, that's normal). This downloads the tools the project needs.

---

### Step 5 — Start the App

Type this in the terminal and press Enter:
```
npm run dev
```

You'll see something like:
```
  VITE v5.0.0  ready in 300 ms
  ➜  Local:   http://localhost:5173/
```

Now open your browser and go to **http://localhost:5173** — your app is running!

To stop the app, press `Ctrl + C` in the terminal.

---

## 📦 How to Export / Build for Sharing

When you're ready to share the app (not just run it yourself), you "build" it:

1. In the terminal, type:
   ```
   npm run build
   ```
2. A new folder called **`dist/`** will be created
3. That `dist/` folder contains your finished app — it works by just opening `index.html` in a browser, or you can upload it to any web host (Netlify, GitHub Pages, etc.)

---

## 🐙 How to Upload to GitHub (Step by Step)

### Part A — Create a GitHub Account
1. Go to https://github.com and sign up for a free account

### Part B — Create a New Repository
1. Once logged in, click the **+** button (top right) → **New repository**
2. Give it a name like `resume-builder`
3. Leave it **Public** (or Private, your choice)
4. Do **NOT** check "Add README" (we already have one)
5. Click **Create repository**

### Part C — Connect Your Project to GitHub
Back in VS Code terminal, type these commands one at a time, pressing Enter after each:

```bash
git init
git add .
git commit -m "Initial commit: Resume Builder app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
git push -u origin main
```

> ⚠️ Replace `YOUR_USERNAME` with your actual GitHub username!

GitHub will ask for your username and password (or a personal access token).

### Part D — View Your Code Online
Go to `https://github.com/YOUR_USERNAME/resume-builder` and you'll see all your files!

---

## 🌐 How to Host It Live (Free) with GitHub Pages

1. In VS Code terminal, run:
   ```
   npm run build
   ```
2. Then push the `dist` folder to a branch called `gh-pages`:
   ```
   git add dist -f
   git commit -m "Deploy"
   git subtree push --prefix dist origin gh-pages
   ```
3. On GitHub, go to your repo → **Settings → Pages**
4. Under "Source", select **Branch: gh-pages**, folder: **/ (root)**
5. Click Save — your site will be live at:
   `https://YOUR_USERNAME.github.io/resume-builder`

---

## 💾 How Your Data is Saved

All resume data is saved automatically to your browser's **localStorage**. This means:
- ✅ Data persists when you close and reopen the browser
- ✅ No account or server needed
- ⚠️ Data is browser-specific (won't sync between devices)
- ⚠️ Clearing browser data will erase saved resumes

---

## 🎨 Customizing Colors

All colors are in `src/styles/global.css` at the top, under `:root { }`. Change the values there to retheme the entire app.
