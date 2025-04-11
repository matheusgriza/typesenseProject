import './client/client.ts'
import 'dotenv/config'
const response = await fetch('https://3izcvpjuet17nyq2p-1.a1.typesense.net/health', {
    method: 'GET'
});

console.log("Health Check:", response.statusText)




