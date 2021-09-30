const NoteService = require("./service/NoteService.js");
const knexConfig = require("./knexfile").development;
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: "noteapptest",
    user: "postgres",
    password: "postgres",
  },
});


describe("NoteService testing on async function", () => {
  beforeEach(() => {
    jest.setTimeout(20000);
    noteService=new NoteService(knex)
    return knex.migrate.rollback().then(()=>{return knex.migrate.latest()}).then(()=>{return knex.seed.run()})
});
afterAll(() => setTimeout(() => process.exit(), 1000))
test("listNote(user) should display data to specific user", () => {
   return  noteService.listNote('sam').then((note)=>{
     expect(note).toEqual([{ content: 'Hello World', id: 1 }, { content: 'What?', id: 2 }])

   })

})
test("listNote(user) should display nothing for user if no note can be found", () => {
  return  noteService.listNote('john').then((note)=>{
    expect(note).toEqual([])

  })

})
test("addNote(user) should add data to specific user", () => {
    return noteService.addNote('sam','good morning').then(()=>{
      noteService.listNote('sam').then((note)=>{
        
        expect(note).toEqual([{ content: 'Hello World', id: 1 }, { content: 'What?', id: 2 },{ content: 'good morning', id: 3 }])
      })

    })

})
test("addNote(user) should only have one note to specific user if no note before", () => {
   return noteService.addNote('john','good morning').then(()=>{
     
     noteService.listNote('john').then((note)=>{
       expect(note).toEqual([{content:'good morning',id:3}])

     })
   })

})
test("editNote(user,index) should edit specific note for specific user", async() => {
   return noteService.editNote('sam',2,'good morning').then(()=>{
     noteService.listNote('sam').then((note)=>{
       expect(note).toEqual([{ content: 'Hello World', id: 1 }, { content: 'good morning', id: 2 }])

     })

   })

})
test("deleteNote(user) should delete note for specific user", async() => {
   return noteService.deleteNote('sam',2).then(()=>{
     noteService.listNote('sam').then((note)=>{
      expect(note).toEqual([{ content: 'Hello World', id: 1 }])

     })

   })

})
});
