const multer = require ('multer');
module.exports=( multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null,'./upload' )
        },
        filename: (req, file, cb)=>{
            cb(null, Date.now().toString()+"_" + file.originalname)
        }
    })
})

)