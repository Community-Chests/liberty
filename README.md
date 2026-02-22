# 🍄 The Mycelium Protocol: Technical Source

This repository contains the "source code" for the **Mycelium Protocol**—a fractal social operating system designed for coordination and resonance over coercion and force 🕸️.

## 🏗️ Repository Structure
* **`/docs`**: The source Markdown files (Obsidian-compatible) that power the documentation site.
    * **`index.md`**: The Landing Page. The high-resonance welcome for new Spores 🍄.
    * **`bootstrapping.md`**: The Bootstrapper’s Manual. Your "Installation Guide" for new Pods 🚀.
    * **`/0-root`**: Design Logic & Philosophy. The immutable yardstick for all protocols 📏.
    * **`/1-spore`**: Individual Sync & Handshake Protocols. Auth for the soul 👤.
    * **`/2-pod`**: Local Community (Pod) Vitals. Metabolic and kinetic mapping 🔋.
    * **`/3-mycelium`**: Inter-Pod Links & Resilience. The immune system of the network 🛡️.
* **`merge-docs.mjs`**: The custom unification script that stitches the protocol into dual offline PDFs (Dark/Screen and Light/Print).
* **`astro.config.mjs`**: Configuration for the Starlight web engine.

## 🛠️ Setup & Local Development
The protocol is powered by **Astro**, **Starlight**, and **Node.js**. Follow these steps to spin up a local pod for development:

### 1. Initialize Environment 🧪
Ensure you are running **Node.js v24.0.0** or higher.
```bash
# Install the protocol dependencies
npm install
```

### 2. Live Preview 🌐
Runs the document unifier and spins up a local server with hot-reloading at `http://localhost:4321`.
```bash
npm run dev
```
*Note: This command automatically generates the local PDFs in the `/public` directory before starting the Astro server, ensuring your sidebar download links work locally.*

### 3. Build & Verify 🔍
Generates the dual high-fidelity PDFs (Offline Dark Mode & Print-Ready Light Mode), builds the static Astro site, and indexes the local Pagefind search engine.
```bash
npm run build
```

## 🤝 Contributing
Updates to the protocol are handled via **Signal Proposals** (Pull Requests) 📡. We don't use "Authority"; we use **Resonance**. Please read `CONTRIBUTING.md` before broadcasting your changes.

## 📡 Deployment
This repository is automatically synced to **GitHub Pages** via the `.github/workflows/ci.yaml` pipeline whenever changes merge into `main` ✨. The pipeline handles Node setup, PDF compilation, Astro builds, and deployment natively.

---
**"Right over Might. Signal over Force. Flow over Hoarding."** 🌿
