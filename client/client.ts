import { Client } from  'typesense'
import { readFile } from 'fs/promises'
import 'dotenv/config'
try{
    let client = new Client({
        'nodes': [{
            'host': '3izcvpjuet17nyq2p-1.a1.typesense.net', // For Typesense Cloud use xxx.a1.typesense.net
            'port': 443,      // For Typesense Cloud use 443
            'protocol': 'https'   // For Typesense Cloud use https
        }],
        'apiKey': `${process.env.ADMIN_API_KEY}`,
        'connectionTimeoutSeconds': 2
    })


    // let booksSchema = {
    //     'name': 'books',
    //     'fields': [
    //         { name: 'title', type: 'string' as const },
    //         { name: 'authors', type: 'string[]' as const, facet: true },
    //         { name: 'publication_year', type: 'int32' as const, facet: true },
    //         { name: 'ratings_count', type: 'int32' as const },
    //         { name: 'average_rating', type: 'float' as const }
    //     ],
    //     default_sorting_field: 'ratings_count'
    // }

    // client.collections().create(booksSchema)
    //     .catch((err) => {
    //         console.log(err)
    //     })

    // const booksInJsonl = await readFile("./client/temp/books.jsonl", 'utf-8');
    // client.collections('books').documents().import(booksInJsonl);

    let searchParameters = {
        'q': 'harry stone', //input text
        'query_by': 'title', // field
        'sort_by': 'ratings_count:desc'
    }

    client.collections('books')
        .documents()
        .search(searchParameters)
        .then((result) => {
            console.log(result.found)
            const titles = result.hits?.map( hit =>{
                console.log(hit.document);
            })
        })

}catch(error){
    console.log(error)
}


