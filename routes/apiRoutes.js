var dataBase = require(`../db/db.json`);
const fs = require(`fs`);

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(dataBase);
    });

    app.post("/api/notes", function(req, res){
        dataBase.push(req.body);
        dataBase.forEach((obj, i) => {
            obj.id = i + 1;
        });
        fs.writeFile("./db/db.json", JSON.stringify(dataBase), function (){
            res.json(dataBase);
        });
    });

    app.delete(`/api/notes/:id`, (req,res) =>{
        for (let i = 0; dataBase.length; i++) {
            if(dataBase[i].id == req.params.id){
                dataBase.splice(i, 1);
            };
            
        };
        res.json("deleted")
    })
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
    // app.delete("./api/notes/:id", (req, res) => {
    //     let db = JSON.parse(fs.readFileSync("../db/db.json"))
    //     //fs.readFile("../db/db.json")
    //     let deleteNote = db.filter(item => item.id !== req.params.id);
    //     fs.writeFileSync(`..//db.json`, JSON.stringify(deleteNote));
    //     res.json(deleteNote);
   
    // });
};
