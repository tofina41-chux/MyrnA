// Automatically swaps between your local machine and your live server depending on where you are testing
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000' 
    : 'https://myrna-ms9b.onrender.com';

export default API_BASE_URL;