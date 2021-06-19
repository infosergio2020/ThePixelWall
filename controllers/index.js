
module.exports = {
    render_index: function (req,res) {
        if(req.app.locals.gfs){
            gridfs = req.app.locals.gfs;
            gridfs.files.find().toArray((err,files)=>{
                // check if files
                if(!files || files.length === 0){
                    res.render('index',{files:[]});
                } else {
                    files.map(file => {
                        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
                            file.isImage=true;
                        } else {
                            file.isImage=false;
                        }
                    });
                    console.log( files );
                    res.render('index', { files: files });
                }
            });
        }
    },
    render_uploads: function (req,res) {
        res.render('uploads');
    },
    post_upload: function (req,res) {
        console.log(JSON.stringify({file: req.file}));
        res.redirect('/');
    },
    image_delete: async function (req,res) {
        if(req.app.locals.gfs){
            gridfs = req.app.locals.gfs;
            gridfs.remove({_id:req.params.id, root: 'uploads'}, (err,gridStore) => {
                if(err){ return res.status(404).json({err: err}) }
                res.redirect('/');
            });
        }
    },
    profileBy: async function (req,res) {
        const { name } = req.params;
        gridfs = req.app.locals.gfs;
        file = await gridfs.files.findOne({filename: req.params.filename});
        res.render('profile',{file: file});
    },
    // @desc Display image
    render_image: function (req,res){
        if(req.app.locals.gfs){
            gridfs = req.app.locals.gfs;
            gridfs.files.findOne({filename: req.params.filename}, (err,file)=>{
                // check if files
                if(!file || file.length === 0){
                    return res.status(404).json({
                        err: 'No existe el archivo'
                    });
                }
                // check if image
                if( file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
                    const readstream = gridfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    res.status(404).json({
                        err: 'No es una imagen'
                    });
                }
            });
        }
    }
}