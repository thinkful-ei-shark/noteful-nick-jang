
export const findFolder = (folders = [], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes = [], noteId) => {
  const note = notes.find(note => String(note.id) === String(noteId));
  return note;
}

export const getNotesForFolder = (notes = [], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => String(note.folder_id) === String(folderId))
)

export const countNotesForFolder = (notes = [], folderId) =>
  notes.filter(note => note.folder_id === folderId).length
