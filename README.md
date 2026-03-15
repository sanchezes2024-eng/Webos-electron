# Webos-electron
# 🌐 WebOS-Electron

A lightweight, **ChromeOS-inspired** operating system environment built with **Electron**. This project implements a multi-user account system where all data is stored in isolated local folders, featuring a built-in browser with support for Chrome Extensions.

## 🚀 Features

*   **Multi-User Architecture:** Each account is stored in a dedicated folder under `/accounts`.
*   **Isolated Sessions:** Uses Electron `partitions` to ensure cookies, history, and cache remain private to each user.
*   **Custom Kernel Module:** Powered by a local `@webos/core` Node module for system-level logic.
*   **File System API:** A secure bridge between the UI and the local `/accounts/[user]/fs` directory.
*   **Extension Support:** Ability to load unzipped Chrome Extensions (`.crx` folders) per user.
*   **Webview Browser:** A built-in browser app with a functional address bar and navigation.

## 📂 Project Structure

```
/my-web-os
├── main.js                 # The Kernel (Window & Session management)
├── preload.js              # Security Bridge (IPC)
├── /system                 # OS User Interface
│   ├── index.html          # Desktop / Login Screen
│   ├── desktop.js          # UI Logic (Taskbar, App Launcher)
│   └── style.css           # ChromeOS Look & Feel
├── /node_modules
│   └── /@webos
│       └── /core           # Local system module
│           ├── index.js    # FS & Account Logic
│           └── package.json
└── /accounts               # Persistent User Data (Auto-generated)
```

## 🛠️ Installation

1. **Clone the repository:**
   
   ```
   git clone https://github.com
   cd web-os-electron
   ```

2. **Install dependencies:**
   
   ```
   npm install
   ```
   
3. **Run the OS:**

   ```
   npm start
   ```

## 📖 How It Works

### Account Isolation
When a user logs in, the `@webos/core` module automatically initializes the directory structure:
- /accounts/[username]/fs (Personal files)
- /accounts/[username]/extensions (Chrome extensions)
- /accounts/[username]/settings (User preferences)

### Chrome Extensions
To load an extension, place the unzipped extension folder into the user's `extensions` directory and call:

```
window.api.installExt('extension-folder-name');
```

### File Management
The OS UI communicates with the Node.js `fs` module via a secure IPC bridge defined in `preload.js`, ensuring the frontend cannot execute arbitrary shell commands.

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---
**Built with Electron & Node.js**
