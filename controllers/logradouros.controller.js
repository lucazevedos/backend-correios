const Boom = require('@hapi/boom');

module.exports = {

    create: async (request, h) => {
        const pool = request.mysql.pool;

        try {
            
                await pool.query('insert into logradouros set ?', request.payload);
                return h.response({message: 'logradouro criado!'}).code(201);

        } catch (error) {
            throw Boom.badRequest(error);       
        
        }
    
    },
    findAll: async (request, h) => {
        const pool = request.mysql.pool;
        try {
            const [rows, fields] = await pool.query('select * from logradouros order by nome');

            return h.response(rows).code(200);
        } catch (error) {
            throw Boom.badRequest(error);
        }
    },

    update: async (request, h) => {
        const pool = request.mysql.pool;

        const id = request.params.id;

        try {
            const [rows, fields] = await pool.query('select * from logradouros where id = ?', id);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('logradouro not faund');
            }
            
            await pool.query('update logradouros set ? where id = ?', [request.payload, id]);

            return h.response({message: 'logradouro updated Succesfully!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    },

    delete: async (request, h) => {
        const pool = request.mysql.pool;

        const id = request.params.id;

        try {
            const [rows, fields] = await pool.query('select * from logradouros where id = ?', id);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('logradouro not faund');
            }
            
            await pool.query('delete from logradouros where id = ?',  id);

            return h.response({message: 'logradouro delete Succesfully!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    }
}