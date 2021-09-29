const express=require("express")
const handlebars=require("express-handlebars")
const cors=require('cors')
const basicAuth=require("express-basic-auth")
const myAuthroizer=require('./auth.js')
const NoteService=require('./service/NoteService.js')
const NoteRouter=require('./router/NoteRouter.js')
//middleware
const app=express()

app.use(cors())
app.engine("handlebars",handlebars({defaultLayout:"main"}))
app.use(express.urlencoded({extended:false}))
app.set("view engine","handlebars")
app.use(express.json())

app.use(express.static("public"))
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);
app.use(basicAuth({authorizer:myAuthroizer(knex),challenge:true,authorizeAsync:true}))

const noteService=new NoteService(knex)
const noteRouter=new NoteRouter(noteService)
app.use('/api/notes',noteRouter.router())
app.get("/",(req,res)=>{
    noteService.listNote(req.auth.user).then((data)=>{
        let notes=data.map(item=>item.content)
        let id=data.map(item=>item.id)
        res.render('home',{
            username:req.auth.user,
            noteArr:data
        })
    })
    })

app.listen(8080,()=>{
    console.log("App listen to port 8080")
})
module.exports=app