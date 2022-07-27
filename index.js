const express= require('express')
const app= express()
const uploadUser= require('./midllewares/uploadimage')
const pg= require('pg')
const port= process.env.PORT
// app.use(express.urlencoded({extended:false}))//essa configuração é padrão
// app.use(express.json()) //vai aceitar apenas o formato json
const consStr= process.env.DATABASE_URL
const pool= new pg.Pool({connectionString:consStr})



app.get('/sapatos',(req, res)=>{
    pool.connect((err, client)=>{
        if(err){
            return res.status(401).send({
                message: 'Erro ao conectar'
            })
        }

        client.query('select * from product', (error, result)=>{
            if(error){
                res.send({
                    message: 'Erro ao buscar dados',
                    erro: error.message
                })

            }
            return res.status(200).send(result.rows)
        })
    })
})



app.get('/sapatos/:idsapato', (req, res)=>{
    pool.connect((err, client)=>{
        if(err){
            return res.status(401).send({
                message: 'Erro ao conectar'
            })
        }

        client.query('select * from product where productCode=$1',[req.params.idsapato], (error, result)=>{
            if(error){
                res.send({
                    message: 'Erro ao buscar dados',
                    erro: error.message
                })

            }
            return res.status(200).send(result.rows[0])
        })
    })
            
 })




app.post('/upload', uploadUser.array ('imageArray', 3), (req, res)=>{
    pool.connect((err, client)=>{
        if(err){
            return res.status(401).send({
                message: 'Falha na conexão'
            })
        }


        const arrayImag = []; //Para retorna as imagens no response
let i; //indice
for (i = 0; i<req.files.length; i++) {
 // req.files[i].path
  arrayImag.push( req.files[i].path); // adicionando no vetor
console.log('array :' , arrayImag)
}
const arrayTam = []; //Para retorna as imagens no response
let tam; //indice
for (tam = 0; tam<req.body.size.length; tam++) {
 // req.files[i].path
  arrayTam.push( req.body.size[tam]); // adicionando no vetor
console.log('array :' , arrayTam)
}
        //var sql= 'insert into sapato(descricao, preco, img_prod) values ($1, $2, $3)'
       // var dados= [req.body.descricao, req.body.preco, req.file.path]
        var sql= 'INSERT INTO product(productName,productImages,productPrice, productSize,productCategory,sellersName)values($1, $2, $3, $4, $5, $6)'
        var dados= [req.body.name, arrayImag,  req.body.price, arrayTam, req.body.category, req.body.nameVend]
        client.query(sql, dados, (error, result)=>{
            if(error){
                res.send({
                    dado: req.body.name,

                    message: 'Erro ao inserir dados'
                })
            }
            return res.send({
                message: 'Dados inseridos com sucesso'
            })
        })
        })

    // if (req.file){
    //     res.send({
    //         erro: false,
    //         teste: arrayImag,
    //         message: 'Upload realizado com sucesso',
            

    //     })
    // }
    // res.status(400).json({
    //     erro: true,
    //     // aaa: arrayImag,
    //     message: 'Falha no upload'
    // })
   
})



app.listen(port, ()=>{
    console.log('Executando em: ', port)
})