const Boom = require('@hapi/boom');

module.exports = {

    create: async (request, h) => {
        const pool = request.mysql.pool;

        try {
            
                await pool.query('insert into estados set ?', request.payload);
                return h.response({message: 'Estado criado!'}).code(201);

        } catch (error) {
            throw Boom.badRequest(error);       
        
        }
    
    },
    findAll: async (request, h) => {
        const pool = request.mysql.pool;
        try {
            const [rows, fields] = await pool.query('select * from estados order by uf');

            return h.response(rows).code(200);
        } catch (error) {
            throw Boom.badRequest(error);
        }
    },

    update: async (request, h) => {
        const pool = request.mysql.pool;

        const uf = request.params.uf;

        try {
            const [rows, fields] = await pool.query('select * from estados where uf = ?', uf);

            if(rows.length === undefined || rows.length === 0){
                return Boom.notFound('estado not faund');
            }
            
            await pool.query('update estados set ? where uf = ?', [request.payload, uf]);

            return h.response({message: 'Estado updated Succesfully!'}).code(200);

        } catch (error) {
            throw Boom.badRequest(error);
        }

    },

}