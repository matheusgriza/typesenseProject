import { Client } from  'typesense'
import { readFile } from 'fs/promises'
import 'dotenv/config'


function createClient(){
    try{
        let client = new Client({
            'nodes': [{
                'host': 'typesense-dev.paycaddy.money', // For Typesense Cloud use xxx.a1.typesense.net
                'port': 443,      // For Typesense Cloud use 443
                'protocol': 'https'   // For Typesense Cloud use https
            }],
            'apiKey': `${process.env.API_KEY}`,
            'connectionTimeoutSeconds': 2
        })
    
        return client
    }catch(error){
        
        throw error
    }
}


try{
    let client = createClient();

    let booksSchema = {
        'name': 'users',
        'fields': [
            { name: 'clientId', type: 'string' as const, facet: true },
            { name: 'name', type: 'string' as const },
            { name: 'type', type: 'string' as const, facet: true },
            { name: 'amountWallet', type: 'int32' as const },
            { name: 'amountCard', type: 'int32' as const }
        ],
        default_sorting_field: 'name'
    }

    client.collections().create(booksSchema)
        .catch((err) => {
            console.log(err)
        })

    //Aca es donde debemos generar los .jsonl y enviarlos a la vm 
    const booksInJsonl = await readFile("./client/temp/books.jsonl", 'utf-8');
    client.collections('books').documents().import(booksInJsonl);

    let searchParameters = {
        'q': 'harry', //input text
        'query_by': 'title',
        'sort_by': 'publication_year:asc',
    }

    client.collections('books')
        .documents()
        .search(searchParameters)
        .then((result) => {
            console.log( result )
            // const titles = result.hits?.map( hit =>{
            //     console.log(hit.document);
            // })
        })

}catch(error){
    console.log(error)
}


