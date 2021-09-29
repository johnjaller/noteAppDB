const express=require("express")
class NoteRouter{
    constructor(NoteService) {
        this.NoteService=NoteService
    }
    router(){
        let router=express.Router()
        router.get("/",this.get.bind(this))
        router.post("/",this.post.bind(this))
        router.put("/:index",this.put.bind(this))
        router.delete("/:index",this.delete.bind(this))
        return router
    }
    get(req,res)
    {
        return this.NoteService.listNote(req.auth.user).then((data)=>{
            res.json(data)
        }).catch((err)=> {if(err) throw err})
    }
    post(req,res)
    {
        return this.NoteService.addNote(req.auth.user,req.body.note).then(()=>{
            this.NoteService.listNote(req.auth.user).then((data=>{
                res.json(data)
            }))
        }).catch((err)=> {if(err) throw err})
    }
    put(req,res)
    {
        return this.NoteService.editNote(req.auth.user,req.params.index,req.body.note).then(()=>{
            this.NoteService.listNote(req.auth.user).then((data=>{
                res.json(data)
            }))
        }).catch((err)=> {if(err) throw err})
    }
    delete(req,res)
    {
        return this.NoteService.deleteNote(req.auth.user,req.params.index).then(()=>{
            this.NoteService.listNote(req.auth.user).then((data=>{
                res.json(data)
            }))
        }).catch((err)=> {if(err) throw err})
    }
}
module.exports=NoteRouter