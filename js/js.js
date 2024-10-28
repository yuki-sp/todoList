var task;
const target={count:0};
const container1=document.getElementById("content1");
const container2=document.getElementById("content2");
const input=document.getElementById("todo");
const insert=()=>{
    task=input.value;
    if(task=="") return;
    const newtask=document.createElement("div")
    newtask.classList.add("task");
    newtask.innerHTML=task;
    if(container2.firstChild){
       container2.insertBefore(newtask,container2.firstChild);
    }else{
       container2.appendChild(newtask);
    }
    input.value="";
    target.count++;
    // console.log(target.count);
}
input.addEventListener("blur",function(){
   insert();
   
})
input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        event.preventDefault();
        insert();
    }
})