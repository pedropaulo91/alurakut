import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

    if (request.method === 'POST') {
        const TOKEN = '3d1fa66073fd31f91588cf44b119cc';
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de cadastrar 
        const registroCriado = await client.items.create({
            itemType: "972885", // Id do Model "Communities" criado pelo Dato
            ...request.body
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/pedropaulo91.png",
            // creatorSlug: "pedropaulo"

        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado

        });

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    });

}