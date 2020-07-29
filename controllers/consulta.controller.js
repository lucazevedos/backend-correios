const Boom = require('@hapi/boom');

module.exports = {

  
    findAll: async (request, h) => {
        const pool = request.mysql.pool;
        const param = request.params.param;
        try {
            const [rows, fields] = await pool.query("select coalesce(L.nome, '') as Logradouro, coalesce(B.nome, '') as Bairro, C.nome as Cidade, E.UF as UF, coalesce(L.cep, C.cep)  as CEP from estados E inner join cidades C on E.uf=C.uf_estado left join bairros B on C.id=B.id_cidade left join logradouros L on B.id=L.id_bairro where l.nome like '%"+param+"%' or l.cep like '%"+param+"%' or c.cep like '%"+param+"%'");

            return h.response(rows).code(200);
        } catch (error) {
            throw Boom.badRequest(error);
        }
    },

}