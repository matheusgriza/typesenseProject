import './client/client.ts'
import 'dotenv/config'

const response = await fetch('https://typesense-dev.paycaddy.money/health', {
    method: 'GET'
});

console.log("Health Check:", response.statusText)




