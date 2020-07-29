const Joi = require('@hapi/joi');
const consultaController = require ('../controllers/consulta.controller');


module.exports = [

    {
        method: 'GET',
        path: '/consulta/{param}',
        options: {
            handler: consultaController.findAll, 
            description: 'Endereço ou CEP',
            tags: ['api'],
            validate: {
                params:{
                    param: Joi.string().required(),
                    
                },
                failAction: (request, h, error) => {
                    throw error;
                }
            } 
        }
    },
    

]