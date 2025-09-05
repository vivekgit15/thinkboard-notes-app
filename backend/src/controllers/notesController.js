import Note from "../models/Note.js";

// The below two functions are same but written in different way

//  export const  getAllNotes = (req , res ) =>{
//     res.status(200).send("You just fetched the notes");

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1}); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req,res){
    try {
      
        const note = await Note.findById(req.params.id)

        if(!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note)
    } catch (error) {
        console.log("Error in getNoteById controller", error);
    res.status(200).json({ message: "Internal  error" });
    }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal  error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(200).json({ message: "Internal  error" });
  }
}

export async function deleteNote(req, res) {
  try {
    
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(deletedNote);
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(200).json({ message: "Internal  error" });
  }
}
