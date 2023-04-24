const express = require("express");
const app = express();
app.use(express.json());
let arr = [];


function checkIdExist(id) {
   
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            return arr[i]
            
        }
    }
    return false;

}
app.post('/v1/tasks', (req, res) => {
    try {
        let date = new Date();
        let id = date.getTime() + arr.length;
        const title = req.body.title;
        const is_completed = req.body.is_completed;
        let obj = {};
        obj.id = id;
        obj.title = title;
        obj.is_completed = is_completed;
        arr.push(obj);
        res.status(201).json({"id":id})
    }
    catch (error) {

        res.status(500).json({ "Error": error })

    }

})

app.get("/v1/tasks", (req, res) => {
    try {

        res.status(200).json({ task: arr })

    } catch (error) {
        res.status(500).json({ "Error": error })
    }
})

app.get("/v1/tasks/:id", (req, res) => {
    const id = req.params.id;
    const obj= checkIdExist(id);
     if (obj) {
            res.status(200).json(obj)
        } else {
            res.status(404).json({ "error": "There is no task at that id" })
        }

    
})

app.delete("/v1/tasks/:id", (req, res) => {
    try {
        const id = req.params.id;
        
        if (checkIdExist(id)) {
            let idxid= arr.indexOf(checkIdExist(id))  
            if(idxid==0) arr.shift()
            else arr.splice(idxid, idxid)
        }
        res.status(200).json();


    } catch (error) {
        res.status(500).json({ "error": error })
    }
})

app.patch("/v1/tasks/:id", (req, res) => {
    try {
        const id = req.params.id;
        if(checkIdExist(id)) {
        let idxid= arr.indexOf(checkIdExist(id)) 
        arr[idxid].title = req.body.title;
        arr[idxid].is_completed = req.body.is_completed;
        }
        res.json(200).json();


    } catch (error) {
        res.status(500).json({ "error": error })
    }
})
app.listen(3000, () => console.log("server running in port 3000"));
