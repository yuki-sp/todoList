let task;
const input = document.getElementById("todo");//input输入框
const target = { count: 0, finishedcount: 0 };// 计数器
const tasksbox=document.getElementById("mainbox");
let _count = target.count;
let _finishedcount = target.finishedcount;
const clear = document.getElementById("clear");//clear completed的相关实现
Object.defineProperties(target, {
    count: {
        get: function () {
            return _count;
        },
        // 利用对象对计数器监听，实现items left
        set: function (value) {

            _count = value;
            // console.log(_count);

            const tab = document.getElementById("tab");
            tab.style.visibility = "visible";//开始看见多少task剩下
            const num = document.getElementById("num");
            num.innerHTML = _count;
            const letter = document.getElementById("letter");
            if (_count == 1) {
                letter.innerText = "item left";
            } else {
                letter.innerText = "items left";
            }


        }
    },
    finishedcount: {
        get: function () {
            return _finishedcount;
        },
        // 监听已完成的任务，实现clear completed
        set: function (value) {
            _finishedcount = value;

            if (_finishedcount > 0) {
                clear.style.visibility = "visible";
            } else {
                clear.style.visibility = "hidden";
            }
        }
    }
})
const container1 = document.getElementById("content1");//用于存放带时间的任务
const sortArray=[];//用于正则表达式的排序
const container2 = document.getElementById("content2");//不带时间的任务




//进行输入的函数处理
const insertTask = (txt) => {
    task = txt;
    if (task == "") return;
    const newtask = document.createElement("div");//新任务的大框框
    newtask.classList.add("task");
    newtask.classList.add("visible"); // 添加visible

    const lable = document.createElement("label");//任务内容
    lable.innerHTML = task;
    lable.style.textDecoration = 'none';
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
            lable.style.opacity = 1;
            target.count++;
            target.finishedcount--;
            newtask.classList.add("visible"); // 添加visible
            newtask.classList.remove("invisible"); // 移除invisible

        } else {
            lable.style.textDecoration = 'line-through'; // 添加删除线
            lable.style.opacity = 0.5;
            target.count--;
            target.finishedcount++;
            newtask.classList.add("invisible"); // 添加invisible
            newtask.classList.remove("visible"); // 移除visible

        }

    }
    )

    const cross = document.createElement("span");//叉叉
    cross.classList.add("cross");
    cross.innerText = "x";
    cross.addEventListener("click", function () {
        newtask.remove();
        if (lable.style.textDecoration === 'none') {
            target.count--;
        }else{
            target.finishedcount--;
        }
    })

    newtask.appendChild(taskcheck);
    newtask.appendChild(lable);
    newtask.appendChild(cross);

    //正则匹配
    const timeRegex=/(?:[0-9]|0[0-9]|1[0-9]|2[0-3])[: ：][0-5][0-9]/;
    const matchResult=lable.innerText.match(timeRegex);
    if(matchResult){
        console.log("match");
        let specificTime=convert(matchResult[0]);
        if(specificTime){console.log("matchwin");newtask.dataset.ddl=specificTime;}
        if (container1.firstChild) {
            // container1.insertBefore(newtask, container1.firstChild);
            // const sort=
            // container1.children.forEach(childTask=>{
               
            // })
        } else {
            container1.appendChild(newtask);
        }
    }else{
    if (container2.firstChild) {
        container2.insertBefore(newtask, container2.firstChild);
    } else {
        container2.appendChild(newtask);
    }}
    input.value = "";
    target.count++;
    // console.log(target.count);
}









//停止输入（失去焦点）
input.addEventListener("blur", function () {
    insertTask(input.value);

})
//停止输入（按下enter）
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        insertTask(input.value);
    }
})










//状态栏
function setDisplay(selectors, displayValue) {
    const elements = document.querySelectorAll(selectors);
    elements.forEach(element => {
        element.style.display = displayValue;
    });
}// 定义：根据完成与否改变任务可见性的函数
const all = document.getElementById("all");
all.classList.add("presentStatus");
all.addEventListener("click", () => {
    setDisplay(".visible", "flex");
    setDisplay(".invisible", "flex");
    all.classList.add("presentStatus");
    active.classList.remove("presentStatus");
    completed.classList.remove("presentStatus");
});// all状态栏
const active = document.getElementById("active");
active.addEventListener("click", () => {
    setDisplay(".visible", "flex");
    setDisplay(".invisible", "none");
    all.classList.remove("presentStatus");
    active.classList.add("presentStatus");
    completed.classList.remove("presentStatus");
});// active状态栏
const completed = document.getElementById("completed");
completed.addEventListener("click", () => {
    setDisplay(".visible", "none");
    setDisplay(".invisible", "flex");
    completed.classList.add("presentStatus");
    all.classList.remove("presentStatus");
    active.classList.remove("presentStatus");
});// completed状态栏


//实现clear completed点击的效果
clear.addEventListener("click", function () {
    console.log("yes");
    const toBedelete = document.querySelectorAll(".invisible");
    toBedelete.forEach(item => {
        item.remove();
        target.finishedcount--;
        console.log(target.finishedcount);
    })
})




//封装class
class todoList{
    addTask(txt){
      insertTask(txt);
    }//添加任务

    deleteTask(txt){
        let ensure=0;
        tasksbox.querySelectorAll(".visible,.invisible").forEach(item=>{
            const text = item.children[1].innerText;
            console.log(text);
            if(text==txt){
                item.children[2].click();
                ensure++;
            }
            if(ensure==0){
                alert("no such named task")
            }
        })
        if(ensure==0){
            alert('no such named task');
        }
    }//删除任务

    completeTask(txt){
        let ensure=0;
        tasksbox.querySelectorAll(".visible,.invisible").forEach(item=>{
            const text = item.children[1].innerText;
            console.log(text);
            if(text==txt){
                item.children[0].click();
                ensure++;
                console.log("win");
            }
        })
        if(ensure==0){
            alert('no such named task');
        }
    }//完成任务
}



//储存数据
window.addEventListener("beforeunload",()=>{
    const storageArray=[];
    const tasksToBeStorage=document.querySelectorAll(".visible,.invisible");
    tasksToBeStorage.forEach(workToBeStorage=>{
        if(workToBeStorage.classList.contains('visible')){
            storageArray.unshift([workToBeStorage.children[1].innerText,0]);//1表示已完成
            // alert("yes");
        }else{
            storageArray.unshift([workToBeStorage.children[1].innerText,1]);//0表示未完成
        }
    })
    localStorage.setItem('storageArray', JSON.stringify(storageArray));
    localStorage.setItem("theCountStorage",JSON.stringify(target));
})


//读取数据
const todolist=new todoList;
const getStorage=localStorage.getItem("storageArray");
if(getStorage){
    var taskArrayToRender = JSON.parse(getStorage);
    console.log(taskArrayToRender);
    // console.log(taskArrayToRender[0]);
    // console.log(taskArrayToRender[0][0]);
    taskArrayToRender.forEach(tasks=>{
        // console.log(tasks);
        todolist.addTask(tasks[0]);
        // if(tasks[1]){
        //     todolist.completeTask(tasks[0]);
        // }
        if(tasks[1]==1){
            // console.log("yes");
            todolist.completeTask(tasks[0]);
        }
    })
}else{
    console.log("failed to load storage");
}
const getCount=localStorage.getItem("theCountStorage");

//熬测时的时间转换函数，照例放最后（
function convert(timestamp) {
    const matchColon=timestamp.match(/[: ：]/);
    const [minutes, seconds] = timestamp.split(matchColon[0]).map(Number);
    return minutes * 60 + seconds;
}