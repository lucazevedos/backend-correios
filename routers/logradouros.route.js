const Joi = require('@hapi/joi');
const logradourosController = require ('../controllers/logradouros.controller');

const logradouroValid = {
    nome: Joi.string().required(),
    cep: Joi.string().required(),
    id_bairro: Joi.number().required(),

}


module.exports = [

    {
        method: 'POST',
        path: '/logradouros',
        options: {
            handler: logradourosController.create,
            description: 'Add a logradouro',
            tags: ['api'],
            validate: {
                payload: logradouroValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/logradouros',
        options: {
            handler: logradourosController.findAll, 
            description: 'Find a list of logradouros',
            tags: ['api']

        }
    },
    
    {
        method: 'PUT',
        path: '/logradouros/{id}',
        options: {
            handler: logradourosController.update,
            description: 'Update a logradouro',
            tags: ['api'],
            validate: {
                params:{
                    id: Joi.number().required()
                },

                payload: logradouroValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },

    {
        method: 'DELETE',
        path: '/logradouros/{id}',
        options: {
            handler: logradourosController.delete,
            description: 'Delete a logradouro',
            tags: ['api'],
            validate: {
                params:{
                    id: Joi.number().required()
                },
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
]