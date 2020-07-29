const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const estadosRouter = require ('./routers/estados.route');
const cidadesRouter = require ('./routers/cidades.route');
const bairrosRouter = require ('./routers/bairros.route');
const logradourosRouter = require ('./routers/logradouros.route');
const consultaRouter = require ('./routers/consulta.route');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const swaggerOptions = {
        info: {
                title: 'Correios API Documentation',
                version: Pack.version,
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.register({
        plugin: require('hapi-mysql2'),
        options: {
            settings:{
                connectionLimit: 10,
                host:'localhost',
                user: 'root',
                password:'1234',
                database:'correios_db'
            },
            decorate: true
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route(estadosRouter);
    server.route(cidadesRouter);
    server.route(bairrosRouter);
    server.route(logradourosRouter);
    server.route(consultaRouter);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
