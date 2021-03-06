class NoteService{
    constructor(knex)
    {
        this.knex=knex
    }
    listNote(user)
    {
        let query=this.knex.select('content','notes.id').from('notes').join('users','users.id','notes.user_id').where('users.username',user).orderBy('notes.id')
        return query.then((data)=>{
        console.log(data)
            return data
        }).catch((err)=> {if(err) throw err})
    }
    addNote(user,data)
    {
        let userId=this.knex.select('id').from('users').where('username',user)
        let query=this.knex('notes').insert({content:data,user_id:userId})
        return query.catch((err)=> {if(err) throw err})
        // Insert into notes (content,user_id) VALUES('Hello World',(select id from users where username='sam'));
        
    }
    editNote(user,index,data)
    {
        let userId=this.knex.select('id').from('users').where('username',user)

        let query=this.knex('notes').update('content',data).where('id',index).where('user_id',userId)
        return query.catch((err)=> {if(err) throw err})
    }
    deleteNote(user,index)
    {
        let userId=this.knex.select('id').from('users').where('username',user)

        let query=this.knex('notes').where('id',index).where('user_id',userId).where('user_id',userId).del()
        return query.catch((err)=> {if(err) throw err})
    }
}

module.exports=NoteService  