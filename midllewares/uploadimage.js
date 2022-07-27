const multer = require ('multer');


// const arrayImages = []; //Para retorna as imagens no response
// let i; //indice
// for (i = 0; i<req.files.length; i++) {
//   const { filename : image } = req.files[i]; //pegando o nome da imagem
//   const [name] = image.split('.');
//  let filename = `${name}.jpg`; //mudando pra jpg
//   await sharp(req.files[i].path)
//    .resize(500) // redimensionando para 500px
//     .jpeg({ quality: 80 }) //qualidade para 80%
//     .toFile(
//       path.resolve(req.files[i].destination, 'obras', filename) //salvando
//     )
//     arrayImages.push(filename); // adicionando no vetor
//   fs.unlinkSync(req.files[i].path); //apagando a imagem original, deixando apenas a imagem tratada salva.
// }


// // const arrayImag = []; //Para retorna as imagens no response
// // let ii; //indice
// // for (ii = 0; ii<req.files.length; ii++) {
// //   const { filename : image } = req.files[ii];
// //   arrayImages.push(filename); // adicionando no vetor

// // }



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