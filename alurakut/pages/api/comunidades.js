import { SiteClient } from 'datocms-client';

export default async function recebeRequests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = 'de3febbff93d271d695cf5053390cd';
        const client = new SiteClient(TOKEN);
    
        // tem que fazer validação dos dados antes
        const registroCriado = await client.items.create({
            itemType:"968426",
            ...request.body,
            // title:'asdasd' ,
            // creatorSlug:'ptmarmello',
            // imageUrl:'asdasd' , 
        })
    
        response.json({
           registroCriado: registroCriado,
        })
        return;

    }
    
    response.status(404).json({
        message:'Not a POST Method'
    })

}