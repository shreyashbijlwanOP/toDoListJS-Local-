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
    collection.splice(obj.id,1,obj);
    alert("Updated Successfully")
   }
   else{
    obj.id =  collection.length     
    obj.date = new Date().toDateString();
    collection.push(obj);
    alert("Task Added Successfully")
   }

   title.value = "";
   description.value = "";
   UpdateLocalStorage();
   Display();
   obj = {};

}

function Delete(id)
{
    collection.splice(id,1);
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
        <div class ="btn-col"><button class="btn btn-danger" onclick="Delete(${index})" >Delete</button> 
        <button class= "btn btn-warning" onclick=Update(${index})> Update</button> </div> 
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
    obj = {...collection[id]}
    title.value = obj.title;
    description.value = obj.description;
    console.log(obj)
}

function UpdateLocalStorage()
{
    localStorage.setItem("listItem",JSON.stringify(collection))
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
