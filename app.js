const express=require("express")
const handlebars=require("express-handlebars")
const basicAuth=require("express-basic-auth")
//middleware

const app=express()

app.use(basicAuth({authorizer:authChallenger,challenge:true,authorizeAsync:true}))

app.engine("handlebars",handlebars({defaultLayout:"main"}))
app.set("view engine","handlebars")
app.use(express.json())
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index",{
        user:user.auth.user
    })
})

app.listen(8080,()=>{
    console.log("App listen to port 8080")
})