const Joi = require('@hapi/joi');
const bairrosController = require ('../controllers/bairros.controller');

const bairroValid = {
    nome: Joi.string().required(),
    id_cidade: Joi.number().required(),

}


module.exports = [

    {
        method: 'POST',
        path: '/bairros',
        options: {
            handler: bairrosController.create,
            description: 'Adicionar bairro',
            tags: ['api'],
            validate: {
                payload: bairroValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/bairros',
        options: {
            handler: bairrosController.findAll, 
            description: 'Listar bairros',
            tags: ['api']

        }
    },
    
    {
        method: 'PUT',
        path: '/bairros/{id}',
        options: {
            handler: bairrosController.update,
            description: 'Update bairro',
            tags: ['api'],
            validate: {
                params:{
                    id: Joi.number().required()
                },

                payload: bairroValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
]