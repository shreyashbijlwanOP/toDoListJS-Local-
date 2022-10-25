let title = document.getElementById("title")
let description = document.getElementById("description")
let alertBox = document.getElementById("alertBox")
let output = document.getElementById("todoOutput")
let collection = JSON.parse(localStorage.getItem("listItem")) ?? [];
let Items = document.querySelector("footer").getElementsByTagName("span")[0]
console.log(Items)
let obj = {}

Display();



function Add()
{
    obj.title = title.value;
    obj.description = description.value;

   if(obj.id==0 || obj.id)
   {
    collection = collection.map(element=>element.id===obj.id? obj : element);
    document.getElementById("add").textContent = "Add"
    alert("Updated Successfully")
   }
   else{
    obj.id =  MaxId() +1     
    obj.date = new Date().toDateString()
    collection.push(obj);
    alert("Task Added Successfully")
   }

   title.value = "";
   description.value = "";
   UpdateLocalStorage();
   Display();
   obj = {};
console.log(collection)
}

function Delete(id)
{
    collection = collection.filter(element=>element.id!=id);
    UpdateLocalStorage();
    Display();

}

function Display ()
{
    collection = JSON.parse(localStorage.getItem("listItem")) ?? []

   if(collection.length)
   {
    output.innerText = " "

    collection.forEach((element,index)=>{
        output.innerHTML += `
        <div class ="card"> 
        <h3>${element.title}</h3>
        <p> ${element.description}</p>
        <div class ="btn-col"><button class="btn btn-danger" onclick="checkFiled(Delete,${element.id})" >Delete</button> 
        <button class= "btn btn-warning" onclick=checkFiled(Update,${element.id})> Update</button> </div> 
        <span>${element.date}</span>
        <div>`  
    })
   }
   else{
    output.innerHTML = "<h3 style =' text-align:center; width:100%;' >Nothing in list</h3>"
   }


  Items.textContent = collection.length

}
function Update(id)
{
     [obj] = collection.filter(element=> element.id == id)
    title.value = obj.title;
    description.value = obj.description;
    document.getElementById("add").textContent = "Update"
}

function UpdateLocalStorage()
{
    localStorage.setItem("listItem",JSON.stringify(collection))
}

/* This Function is to find the Maximum ID Form the Object so that we can Create a new ID Dynamically*/
function MaxId(){
    if (!collection.length) return 0; 
   return  collection.reduce((acc,element)=>{
        return acc>element.id ? acc : element.id
    },0)
}

function validation()
{
    if(title.value && description.value)
    {
        Add();
    }
    else{
        title.classList.add("border-red")
        description.classList.add("border-red")
        alertBox.classList.toggle("d-none")

        setTimeout(()=>{
            title.classList.remove("border-red")
            description.classList.remove("border-red")
            alertBox.classList.toggle("d-none")
        },2000)
    }
}


function checkFiled(callback,id)
{
    if(title.value&&description.value)
    {
        alert("Please Clear the Filed First ")
    }
    else{
        callback(id)
    }
}


function clearField()
{
    title.value = "";
    description.value = ""
    obj={}
    document.getElementById("add").textContent = "Add"
}