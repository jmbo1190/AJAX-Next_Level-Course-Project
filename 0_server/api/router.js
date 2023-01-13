const express = require('express');
const router = express.Router();


// Create dogs data (normally we would get the data from a database)
let dogs = [
    {
        id: "1",
        name: "Skinny",
        age: 1,
        gender: "Female",
        notes: "broken front leg",
    },
    {
        id: "2",
        name: "Charm",
        age: 2,
        gender: "Female",
        notes: "great dog, friendly with others",
    }
];
// console.log(dogs);


// Create ID
const createID = () => {
    return Date.now() + Math.random().toFixed(0);
};

// this TEST route is going to be https://localhost:3000/api/dogs0
router.get("/dogs0", (req, res, next) =>{
    res.send("This is the dogs0 route");
});



// GET the dogs
// this route is going to be https://localhost:3000/api/dogs
router.get("/dogs", (req, res) => {
    console.log(`GET request received at ${new Date().toLocaleTimeString()}`);
    res.json(dogs); // take one JSobject, convert it to a JSON string via stringify()
                    // and send it in the response body back to the browser
                    // with Content-Type header set to 'application/json'
});


// POST a new dog
router.post("/dogs", (req, res) => {
    console.log(`POST request received at ${new Date().toLocaleTimeString()}`);
    console.log("req.body: ", req.body);
    
    let newDog = {
        id: createID(),
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        notes: req.body.notes
    };
    dogs.push(newDog);
    // console.log(dogs);
    res.json({message: "POST request successful.", newDogAdded: newDog});

    
    //res.json({message: "POST request successful."});


});


// Update (PUT) an existing dog
router.put('/dogs/:id', // the colon means we want to receive this segment as a parameter
    (req, res) => {
        console.log(`PUT request received at ${new Date().toLocaleTimeString()}`);
        console.log("req.body: ", req.body);
        console.log("req.params: ", req.params);
        dogID = req.params.id;
        let updatedDog = {
            id: dogID,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            notes: req.body.notes
        };     
        let existingDog = dogs.find(dog => (dog.id === dogID));
        let existingDogIndex = dogs.indexOf(existingDog);
        // console.log("existingDog: ", existingDog, " at index: ", existingDogIndex);
        let nbToDelete = 1;
        dogs.splice(existingDogIndex, nbToDelete, updatedDog);
        // console.log("dogs after update: ", dogs);
        res.json({message: "Successfully Updated Dog", updatedDog});
        
    });


// DELETE an existing dog
router.delete('/dogs/:id', // the colon means we want to receive this segment as a parameter
    (req, res) => {
        console.log(`DELETE request received at ${new Date().toLocaleTimeString()}`);
        console.log("req.body: ", req.body);
        console.log("req.params: ", req.params);
        dogID = req.params.id;
          
        let existingDog = dogs.find(dog => (dog.id === dogID));
        console.log("existingDog: ", existingDog);
        if (existingDog){
            let existingDogIndex = dogs.indexOf(existingDog);
            console.log("existingDog: ", existingDog, " at index: ", existingDogIndex);
            let nbToDelete = 1;
            dogs.splice(existingDogIndex, nbToDelete);
            // console.log("dogs after update: ", dogs);
            res.json({message: "Successfully Deleted Dog", existingDog});
        } else {
            console.log("Failed to delete dog with ID: "+ dogID+" (not found)");
            res.json({message: "Failed to delete dog with ID: "+ dogID+" (not found)", id: dogID});
        }
        
        
    });

module.exports = router;
