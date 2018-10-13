import Hapi from 'hapi';
import { StreamLoader } from './video';
import { PusherAuth } from './live';
import Inert from 'inert';

const server = Hapi.server({
    port: 3748,
    host: 'localhost'
    // routes: {
    //     files: {
    //         relativeTo: Path.join(__dirname,'assets')
    //     }
    // }
});



const init = async () => {

    await server.start();
    await server.register(Inert);
    console.log(`Server running at: ${server.info.uri}`);
};

server.route({
    method:'GET',
    path:'/video',
    handler: StreamLoader
});

server.route({
    method:'GET',
    path:'/',
    handler: function(request, h){

        return h.file('./index.htm');
    }
});

server.route({
    method: 'GET',
    path: '/live',
    handler: function(req, h){

        return h.file('./views/livestream.htm');
    }
});

server.route({
    method: 'POST',
    path: '/pusher/auth',
    handler: PusherAuth
});

server.route({
    method: 'GET',
    path: '/live-chat',
    handler: function(req, h) {

        return h.file('./views/livechat.htm');
    }  
});


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();