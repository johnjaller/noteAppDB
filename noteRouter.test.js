const express = require("express");
const expressBasicAuth = require("express-basic-auth");
const app = express();
const NoteRouter = require("./router/NoteRouter.js");

describe("testing for route", () => {
  beforeEach(() => {
    noteService = {
      listNote: jest.fn().mockResolvedValue(true),
      addNote: jest.fn().mockResolvedValue(true),
      deleteNote: jest.fn().mockResolvedValue(true),
      editNote: jest.fn().mockResolvedValue(true),
    };
    noteRouter = new NoteRouter(noteService);

    res = {
      status: jest.fn().mockResolvedValue(200),
      json: () => {
        return "Error?";
      },
    };
  });
  test("get should call listNote",   (done) => {
    noteRouter.get({auth:{user:"sam"}},res).then(()=>{
       expect(noteService.listNote).toHaveBeenCalledWith("sam")
    done()})
  });
  test("post should call addNote and listNote",   (done) => {
    noteRouter.post(  {
      auth: {
        user: "sam",
      },
      body: {
        note: "amazing",
      },
    },res).then(()=>{
       expect(noteService.addNote).toHaveBeenCalledWith("sam","amazing")
       expect(noteService.listNote).toHaveBeenCalledWith("sam")
    done()})
  });
  test("put should call editNote and listNote",   (done) => {
    noteRouter.put(  {
      auth: {
        user: "sam",
      },
      params:{index:1},
      body: {
        note: "amazing",
      },
    },res).then(()=>{
       expect(noteService.editNote).toHaveBeenCalledWith("sam",1,"amazing")
       expect(noteService.listNote).toHaveBeenCalledWith("sam")
    done()})
  });
  test("delete should call deleteNote and listNote",   (done) => {
    noteRouter.delete(  {
      auth: {
        user: "sam",
      },
      params:{index:1},
      
    },res).then(()=>{
       expect(noteService.deleteNote).toHaveBeenCalledWith("sam",1)
       expect(noteService.listNote).toHaveBeenCalledWith("sam")
    done()})
  });
});
