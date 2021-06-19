//-------------------IMPORT MULTIMEDIA-----------------------
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { GridFsStorage } = require('multer-gridfs-storage');
//-----------------------------END---------------------------

//-------------------STORAGE ENGINE--------------------------
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req,file)=>{
        return new Promise((resolve,rejects)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){return rejects(err);}
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                    metadata: req.body
                };
                resolve(fileInfo);
            });
        });
    }
});
//-------------------------END-------------------------------
const upload = multer({storage});
module.exports = {
    upload:upload
}