async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Create an ethers provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Get the signer
            const signer = provider.getSigner();

            // Get the connected account address
            const address = await signer.getAddress();

            console.log('Connected account:', address);

            // Display the connected account
            document.getElementById('walletAddress').innerText = `Connected: ${address}`;
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    } else {
        console.log('MetaMask is not installed!');
        alert('Please install MetaMask to connect your wallet.');
    }
}
