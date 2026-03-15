const webview = document.getElementById('browser-view');
const urlInput = document.getElementById('url-bar');
const fileList = document.getElementById('file-list');

// Simple Browser Logic
urlInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        let url = urlInput.value;
        if (!url.startsWith('http')) url = 'https://' + url;
        webview.loadURL(url);
    }
});

// Load FS via custom module
async function refreshFS() {
    const files = await window.api.getFiles(window.api.user);
    fileList.innerHTML = files.map(f => `<li>${f.isDir ? '📁' : '📄'} ${f.name}</li>`).join('');
}

refreshFS();
