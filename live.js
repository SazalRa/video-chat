import Pusher from 'pusher';

const pusher = new Pusher({
    appId: '621223',
    key: '98225c9e7c5cc82fffd6',
    secret: 'd04facec094876f6365d',
    cluster: 'ap1',
    encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
  });

const PusherAuth = async (req, h) => {
    
    const data =  req.payload;
    console.log(data);
    const socketId = data.socket_id;
    const channel = data.channel_name;

    const presenceData = {
        user_id:
            Math.random()
                .toString(36)
                .slice(2)+ Date.now() 
    };

    const auth = pusher.authenticate(socketId, channel, presenceData);
    return h.response(auth);

}

export {
    PusherAuth  
}