import fs, { realpathSync } from 'fs'; 
import Path from  'path';
import { Readable } from 'stream';

class ResponseStream extends Readable {
    _read() {}
}

const StreamLoader = async (request, h) => {

    try{

        const path = Path.resolve(__dirname+'/assets/song.mp4');
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = request.headers.range;

        const stream = new ResponseStream();

        if(range){
            
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1

            const chunksize = (end-start)+1
            const streamFile = fs.createReadStream(path, {start, end})

            streamFile.on('data',function(data){
            
                stream.push(data);
            });
            streamFile.on('end',function(){
                stream.push(null);
                console.log('End Stream');
            });
                

            return h.response(streamFile).header('Content-Length',fileSize)
                .header('Content-Range',`bytes ${start}-${end}/${fileSize}`)
                .header('Accept-Ranges','bytes')
                .header('Content-Length',chunksize)
                .header('Content-Type','video/mp4').code(206)

        }else{

            return h.response(stream).header('Content-Length',fileSize).header('Content-Type','video/mp4').code(206);
        }

    }
    catch(err){
        console.log(err);
    }

    
}

export {
    StreamLoader
}