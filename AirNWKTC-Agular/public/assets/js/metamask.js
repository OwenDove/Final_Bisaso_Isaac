// Function to check if MetaMask is installed
async function checkMetaMaskInstalled() {
    // Check if MetaMask is installed
    if (window.ethereum) {
        // MetaMask is installed
        return true;
    } else {
        // MetaMask is not installed
        return false;
    }
}

// Function to connect to MetaMask
async function connectMetaMask() {
    try {
        // Request access to the user's MetaMask accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // MetaMask successfully connected
        console.log('Connected to MetaMask:', accounts[0]);
        return accounts[0];
    } catch (error) {
        // User denied account access
        console.error('MetaMask connection error:', error);
        throw error;
    }
}

// Function to initialize MetaMask connection
async function initMetaMaskConnection() {
    try {
        // Check if MetaMask is installed
        const installed = await checkMetaMaskInstalled();
        if (!installed) {
            throw new Error('MetaMask is not installed');
        }
        // Connect to MetaMask
        const address = await connectMetaMask();
        // Do something with the connected address
        // For example, you can display it on the page or use it to interact with smart contracts
        console.log('Connected address:', address);
        // Show admin panel content
        document.getElementById('admin-panel').style.display = 'block';
        // Hide MetaMask connection button
        document.getElementById('connect-metamask').style.display = 'none';
    } catch (error) {
        // MetaMask connection failed
        console.error('MetaMask connection error:', error);
        // Show error message
        document.getElementById('metamask-error').textContent = 'Error connecting to MetaMask. Please make sure it is installed and unlocked.';
    }
}

// Add event listener to MetaMask connection button
document.getElementById('connectButton').addEventListener('click', () => {
    initMetaMaskConnection();
});
