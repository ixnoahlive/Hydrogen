let lastNote = Date.now();

register('soundPlay', (position, name, vol, pitch, category, event) => {
    if (!name.includes('note')) return; // See if name includes the word note as all noteblock sounds do
    if (category.toString()!=="RECORDS") return; // See if in records category

    let newNote = Date.now();

    if (newNote-lastNote>500) return; // Filter out notes that happened more than 0.5s apart from eachother
    lastNote = newNote

    cancel(event)
});