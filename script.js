//Getting pre code to kick start with an web-application on Firebase
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" 
//setting up (or) linking application to my database [personal db link] 
const appSettings = {
    databaseURL : "https://playground-41da5-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
// importing database functions
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// initializing myApp
const app = initializeApp(appSettings)
// defining  myDatabase
const database=getDatabase(app)
// creating an reference point in my database [folder]
const TodoListInDb = ref(database,"TODO")
// console.log(app)

let inputEl=document.getElementById("input-el")
let saveBtn=document.getElementById("save-btn")
let ulEl=document.getElementById("ul-el")

//Tracking the input giving by user and adding into the database 
saveBtn.addEventListener("click",function(){
    // getting the input value
    let txt = inputEl.value
    if(txt!=""&&txt!=" "){
        clearInputField() //clearing the input field
        // insertIntoDatabase(TodoListInDb,txt)
        push(TodoListInDb,txt) // inserting the data/task into the reference point  in my database
    
        // editing inner html of respected tag
        // addToHtml(txt)
         
        //logging database status
        console.log(`${txt} is added to database`)
    }
})
onValue(TodoListInDb,function(snapshot){        //running a loop to get the values in the database
    if(snapshot.exists()){
        let tasksArray = Object.entries(snapshot.val())
        clearTasks()
        for(let i=0 ; i < tasksArray.length; i++){
            let currItem = tasksArray[i]
            addToHtml(currItem)
        }
    }
    else {
        ulEl.innerHTML="NO Tasks..."
    }
    // console.log(tasksArray)
})
function clearInputField(){
    inputEl.value=""
}
function clearTasks(){
    ulEl.innerHTML=""
}
function addToHtml(dictOrObject){
    let currTaskId = dictOrObject[0]
    let currTask = dictOrObject[1]
    let li = document.createElement("li") //1-creating an element
    li.textContent = currTask //2-adding  the text content
    ulEl.append(li) //3- appending the element into the html at respected tag
    li.addEventListener("click",function(){
        console.log("working!!")
        let ExactRefOfTask = ref(database,`TODO/${currTaskId}`)
        remove(ExactRefOfTask)
    })
}
// function insertIntoDatabase(refPointer,data){
//     push(refPointer,data)
// }