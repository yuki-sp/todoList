var task;
const target = { count: 0 };
const container1 = document.getElementById("content1");
const container2 = document.getElementById("content2");
const input = document.getElementById("todo");
const insert = () => {
    task = input.value;
    if (task == "") return;
    const newtask = document.createElement("div");//新任务的大框框
    newtask.classList.add("task");
    const lable = document.createElement("label");//任务内容
    lable.innerHTML = task;
    lable.classList.add("lablespan")
    const taskcheck = document.createElement("div");//圆形勾选框
    taskcheck.classList.add("check");
    const tick = document.createElement("div");
    tick.classList.add("tick");
    taskcheck.appendChild(tick);
    taskcheck.addEventListener("click", function () {
        this.classList.toggle("checked");
        if (lable.style.textDecoration === 'line-through') {
            lable.style.textDecoration = 'none'; // 去除删除线
            lable.style.opacity=1;
        } else {
            lable.style.textDecoration = 'line-through'; // 添加删除线
            lable.style.opacity=0.5;
        }
        
    }
    )
    newtask.appendChild(taskcheck);
    newtask.appendChild(lable);
    // newtask.innerHTML=task;
    if (container2.firstChild) {
        container2.insertBefore(newtask, container2.firstChild);
    } else {
        container2.appendChild(newtask);
    }
    input.value = "";
    target.count++;
    // console.log(target.count);
}
input.addEventListener("blur", function () {
    insert();

})
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        insert();
    }
})