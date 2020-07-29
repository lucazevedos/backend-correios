const Joi = require('@hapi/joi');
const estadosController = require ('../controllers/estados.controller');

const estadoValid = {
    uf: Joi.string().required(),
    nome: Joi.string().required(),
}


module.exports = [

    {
        method: 'POST',
        path: '/estados',
        options: {
            handler: estadosController.create,
            description: 'Add a estados',
            tags: ['api'],
            validate: {
                payload: estadoValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/estados',
        options: {
            handler: estadosController.findAll, 
            description: 'Find a list of estado',
            tags: ['api']

        }
    },
    
    {
        method: 'PUT',
        path: '/estados/{uf}',
        options: {
            handler: estadosController.update,
            description: 'Update a estado',
            tags: ['api'],
            validate: {
                params:{
                    uf: Joi.string().required()
                },

                payload: estadoValid,
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        }
    },

]