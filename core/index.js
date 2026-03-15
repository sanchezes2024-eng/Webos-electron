const fs = require('fs');
const path = require('path');
class WebOSCore {
    constructor(root) {
        this.root = root;
        if (!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true });
    }
    setupUser(username) {
        const userPath = path.join(this.root, username);
        if (!fs.existsSync(userPath)) {
            fs.mkdirSync(userPath, { recursive: true });
            ['/fs', '/extensions', '/settings'].forEach(d => fs.mkdirSync(path.join(userPath, d)));
        }
        return { path: userPath, partition: 'persist:user-' + username };
    }
    listUserFiles(username, subPath = 'fs') {
        const target = path.join(this.root, username, subPath);
        return fs.existsSync(target) ? fs.readdirSync(target).map(f => ({ name: f, isDir: fs.statSync(path.join(target, f)).isDirectory() })) : [];
    }
}
module.exports = WebOSCore;
