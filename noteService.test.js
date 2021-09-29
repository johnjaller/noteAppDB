const NoteService = require("./service/NoteService.js");
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);


describe("NoteService testing on async function", () => {
  beforeEach(() => {
    return knex.migrate.rollback().then(()=>{return knex.migrate.latest()}).then(()=>{return knex.seed.run()})
});
test("listNote(user) should display data to specific user", async() => {
  let noteService=new NoteService(knex)
   let note= await noteService.listNote('sam')
   expect(note).toEqual([{ content: 'Hello World', id: 1 }, { content: 'What?', id: 2 }])

})
test("listNote(user) should display nothing for user if no note can be found", async() => {
  let noteService=new NoteService(knex)
   let note= await noteService.listNote('john')
   expect(note).toEqual([])

})
test("addNote(user) should add data to specific user", async() => {
  let noteService=new NoteService(knex)
   let add=await noteService.addNote('sam','good morning')
   let note= await noteService.listNote('sam')
   expect(note).toEqual([{ content: 'Hello World', id: 1 }, { content: 'What?', id: 2 },{ content: 'good morning', id: 3 }])

})
test("addNote(user) should only have one note to specific user if no note before", async() => {
  let noteService=new NoteService(knex)
   let add=await noteService.addNote('john','good morning')
   let note= await noteService.listNote('john')
   expect(note).toEqual([{content:'good morning',id:3}])

})
test("editNote(user,index) should edit specific note for specific user", async() => {
  let noteService=new NoteService(knex)
   let edit=await noteService.editNote('sam',2,'good morning')
   let note= await noteService.listNote('sam')
   expect(note).toEqual([{ content: 'Hello World', id: 1 }, { content: 'good morning', id: 2 }])

})
test("deleteNote(user) should delete note for specific user", async() => {
  let noteService=new NoteService(knex)
   let edit=await noteService.deleteNote('sam',2)
   let note= await noteService.listNote('sam')
   expect(note).toEqual([{ content: 'Hello World', id: 1 }])

})
});
