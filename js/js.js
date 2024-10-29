var task;
const target = { count: 0 };
const container1 = document.getElementById("content1");//用于存放带时间的任务
const container2 = document.getElementById("content2");//不带时间的任务
const input = document.getElementById("todo");

//进行输入的函数处理
const insert = () => {
    task = input.value;
    if (task == "") return;
    const newtask = document.createElement("div");//新任务的大框框
    newtask.classList.add("task");
    newtask.classList.add("visible"); // 添加visible
    
    const lable = document.createElement("label");//任务内容
    lable.innerHTML = task;
    lable.classList.add("lablespan");

    const taskcheck = document.createElement("div");//圆形勾选框
    taskcheck.classList.add("check");
    const tick = document.createElement("div");//钩
    tick.classList.add("tick");
    taskcheck.appendChild(tick);
    taskcheck.addEventListener("click", function () {
        this.classList.toggle("checked");
        if (lable.style.textDecoration === 'line-through') {
            lable.style.textDecoration = 'none'; // 去除删除线
            lable.style.opacity=1;
            target.count--;
            newtask.classList.add("visible"); // 添加visible
            newtask.classList.remove("invisible"); // 移除invisible
            
        } else {
            lable.style.textDecoration = 'line-through'; // 添加删除线
            lable.style.opacity=0.5;
            target.count++;
            newtask.classList.add("invisible"); // 添加invisible
            newtask.classList.remove("visible"); // 移除visible
            
        }
        
    }
    )

    const cross=document.createElement("span");//叉叉
    cross.classList.add("cross");
    cross.innerText="x";
    cross.addEventListener("click",function(){
        newtask.classList.add("delete");
    })

    newtask.appendChild(taskcheck);
    newtask.appendChild(lable);
    newtask.appendChild(cross);

    if (container2.firstChild) {
        container2.insertBefore(newtask, container2.firstChild);
    } else {
        container2.appendChild(newtask);
    }
    input.value = "";
    target.count++;
    // console.log(target.count);
}


//停止输入（失去焦点）
input.addEventListener("blur", function () {
    insert();

})
//停止输入（按下enter）
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        insert();
    }
})


//状态栏
function setDisplay(selectors, displayValue) {
    const elements = document.querySelectorAll(selectors);
    elements.forEach(element => {
        element.style.display = displayValue;
    });
}

const all = document.getElementById("all");
all.addEventListener("click", () => {
    setDisplay(".visible", "flex");
    setDisplay(".invisible", "flex");
});

const active = document.getElementById("active");
active.addEventListener("click", () => {
    setDisplay(".visible", "flex");
    setDisplay(".invisible", "none");
});

const completed = document.getElementById("completed");
completed.addEventListener("click", () => {
    setDisplay(".visible", "none");
    setDisplay(".invisible", "flex");
});
