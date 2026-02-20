# 🍄 The Mycelium Protocol: Technical Source

This repository contains the "source code" for the **Mycelium Protocol**—a fractal social operating system designed for coordination and resonance over coercion and force 🕸️.

## 🏗️ Repository Structure
* **`/docs`**: The source Markdown files that power the documentation site.
    * **`index.md`**: The Landing Page. The high-resonance welcome for new Spores 🍄.
    * **`bootstrapping.md`**: The Bootstrapper’s Manual. Your "Installation Guide" for new Pods 🚀.
    * **`/0-root`**: Design Logic & Philosophy. The immutable yardstick for all protocols 📏.
    * **`/1-spore`**: Individual Sync & Handshake Protocols. Auth for the soul 👤.
    * **`/2-pod`**: Local Community (Pod) Vitals. Metabolic and kinetic mapping 🔋.
    * **`/3-mycelium`**: Inter-Pod Links & Resilience. The immune system of the network 🛡️.

## 🛠️ Setup & Local Development
The protocol is managed via `pyproject.toml`. Follow these steps to spin up a local pod for development:

### 1. Initialize Environment 🧪
```bash
# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install the protocol in editable mode with all dependencies
pip install -e .
```

### 2. Live Preview 🌐
Runs a local server with hot-reloading at `http://127.0.0.1:8000`. Watch the protocol update in real-time as you edit!
```bash
mkdocs serve
```

### 3. Build & Verify 🔍
Generates the static site and the offline PDF manual. The `--strict` flag ensures all signal-links are healthy and resolved.
```bash
mkdocs build --strict
```

## 🤝 Contributing
Updates to the protocol are handled via **Signal Proposals** (Pull Requests) 📡. We don't use "Authority"; we use **Resonance**. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before broadcasting your changes.

## 📡 Deployment
This repository is automatically synced to **GitHub Pages** via the `.github/workflows/ci.yaml` pipeline whenever changes merge into `main` ✨.

---
**"Right over Might. Signal over Force. Flow over Hoarding."** 🌿
