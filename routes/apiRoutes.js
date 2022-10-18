const fs = require(`fs`);

//allows us to use this in other files
module.exports = function (app) {
    //pulling the data from db.json
    app.get("/api/notes", function (req, res) {
        let db = JSON.parse(fs.readFileSync("./db/db.json"))
        res.json(db);
        
    });
    //posting the data from api.notes to the db.json file for each new note
    app.post("/api/notes", function(req, res){
        let db = JSON.parse(fs.readFileSync("./db/db.json"))
        db.push(req.body);
        
        db.forEach((obj, i) => {
            obj.id = i + 1;
        });
        fs.writeFile("./db/db.json", JSON.stringify(db), function (){
            res.json(db);
        });
    });

    //deleting the selected note that the user wanted to delete and removing it from the db.json file
    app.delete("/api/notes/:id", (req, res) => {
        let db = JSON.parse(fs.readFileSync("./db/db.json"))
        let deleteNote = db.filter(item => item.id != req.params.id);
        fs.writeFileSync(`./db/db.json`, JSON.stringify(deleteNote));
        res.json(deleteNote);
   
    });
};

// FOR FUTURE DEVELOPMENT: MAKE THESE WORK!!!!

   // app.delete(`/api/notes/:id`, (req,res) =>{
    //     for (let i = 0; dataBase.length; i++) {
    //         if(dataBase[i].id == req.params.id){
    //             dataBase.splice(i, 1);
    //         };
            
    //     };
    //     res.json("deleted")
    // })
    // app.delete(`/api/notes/:id`, function (req, res){
    //     let id = parseInt(req.params.id);
    //     fs.readFile("db/db.json", `utf8`, (err, data) =>{
    //         idData =JSON.parse(data);

    //         delete idData["idData" + 2];

    //         console.log(JSON.stringify(idData));
    //         res.status(200);

    //     });
    // })

    // app.delete(`/api/notes/:id`, (req, res) =>{
    //     fs.readFile(__dirname, "../db/db.json", "id.json", `utf8`, (err, data) =>{
    //         data = JSON.parse(data);
    //         delete data["id" + 2];
    //         console.log (data);
    //         res.end(JSON.stringify(data));
    //     })
    // })