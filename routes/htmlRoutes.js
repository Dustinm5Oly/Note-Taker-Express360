const path = require(`path`);

module.exports = (app) =>{
    //essentially pulling the data from notes and using the html file "notes" to give the page structure
    app.get ("./notes", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
};