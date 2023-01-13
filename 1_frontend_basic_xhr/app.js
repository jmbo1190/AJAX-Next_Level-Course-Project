import { AjaxLib } from './api/ajax_lib.js';


let para = document.getElementsByTagName("p")[0];
let table = document.getElementById("tableResults");

let getButton = document.getElementById("get");
let postButton = document.getElementById("post");
let putButton = document.getElementById("put");
let deleteButton = document.getElementById("delete");

const SERVER_URL = "http://127.0.0.1:3000/api";


const fetchDogs = (callback) => {
    let url = SERVER_URL + "/dogs";
    
    let xhr = new AjaxLib();
    xhr.get(url, (err, dogs) => {
        if (err) {
            throw new Error(err);
        } else {
            let tableRows = "";
            for (const dog of dogs) {
                tableRows += `
                    <tr>
                        <td>${dog.id}</td>
                        <td>${dog.name}</td>
                        <td>${dog.age}</td>
                        <td>${dog.gender}</td>
                        <td>${dog.notes}</td>
                    </tr>
                `;
            }
            table.innerHTML = tableRows;
            if (callback) callback();
        };
    });
};



// GET request

getButton.addEventListener("click", () => {
    fetchDogs(()=>{
            para.className = "get";
            para.textContent = "GET request was successful";
        });
});


// POST request

postButton.addEventListener("click", () => {
    let dog = {name: "Woofey", age: 4, gender: "Male", notes: "scruffy scruffy..."};
    let url = SERVER_URL + "/dogs";
    let xhr = new AjaxLib();
    xhr.post(url, dog, (err, respData) => {
        if (err) throw new Error(err);
        para.className = "post";
        if (respData.message) {
            para.textContent = respData.message;
        } else {
            para.textContent = "POST request was successful";
        }
        fetchDogs();
    });
});



// PUT (update) request

putButton.addEventListener("click", () => {
    let dogID = 2;
    let dog = {id: dogID, name: "Dolly", age: 4, gender: "Female", notes: "sleepy..."};
    let url = SERVER_URL + `/dogs/${dogID}`;
    let xhr = new AjaxLib();
    xhr.put(url, dog, (err, respData) => {
        if (err) throw new Error(err);
        para.className = "put";
        if (respData.message) {
            para.textContent = respData.message;
        } else {
            para.textContent = "PUT request was successful";
        }
        fetchDogs();
    });
});



// DELETE request

deleteButton.addEventListener("click", () => {
    let dogID = 1;
    let url = SERVER_URL + `/dogs/${dogID}`;
    let xhr = new AjaxLib();
    xhr.delete(url, (err, respData) => {
        if (err) throw new Error(err);
        para.className = "delete";
        if (respData.message) {
            para.textContent = respData.message;
        } else {
            para.textContent = "DELETE request was successful";
        }
        fetchDogs();
    });
});