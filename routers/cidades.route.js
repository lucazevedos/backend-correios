const Joi = require('@hapi/joi');
const cidadesController = require ('../controllers/cidades.controller');

const cidadeValid = {
    nome: Joi.string().required(),
    cep: Joi.string().required(),
    uf_estado: Joi.string().required(),
}


module.exports = [

    {
        method: 'POST',
        path: '/cidades',
        options: {
            handler: cidadesController.create,
            description: 'Add a cidade',
            tags: ['api'],
            validate: {
                payload: cidadeValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/cidades',
        options: {
            handler: cidadesController.findAll, 
            description: 'Find a list of cidade',
            tags: ['api']

        }
    },
    
    {
        method: 'PUT',
        path: '/cidades/{id}',
        options: {
            handler: cidadesController.update,
            description: 'Update a cidades',
            tags: ['api'],
            validate: {
                params:{
                    id: Joi.number().required()
                },

                payload: cidadeValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
]