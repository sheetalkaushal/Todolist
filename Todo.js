let addtaskInput = document.getElementById("addtaskInput"); /*addvalue*/
let addtaskbtn = document.getElementById("addtaskbtn");
showtask();
addtaskbtn.addEventListener("click", () => {
  const InputVal = addtaskInput.value;
  if (InputVal.trim() != 0) {
    let webtask = localStorage.getItem("localtask");
    let taskobj = [];
    taskobj = JSON.parse(webtask);
    taskobj.push({ task_name: InputVal, Status: "Not Started" });
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    showtask();
  }
});
//   call function
//   create  new function for showing some value
function showtask() {
  let webtask = localStorage.getItem("localtask");
  taskobj = [];
  taskobj = JSON.parse(webtask);
  //   create blank array
  let data = "";
  let addtasklist = document.getElementById("addtasklist");
  taskobj.forEach((item, index) => {
    data += `<tr class="table" draggable="true" ondragstart="start()" ondragover="dragover()" >
         <th>${index + 1}</th>
         <td>${item.task_name}</td>
         <td>${item.Status}</td>
         <td id="btnStart"onclick="Startitem (${index})">Start</button></td>
         <td id="btnpause" onclick="Pauseitem (${index})">Pause</button></td>
         <td id="btnComplete"  onclick="Completeditem(${index})">Completed</button></td>
         <td><button id="btndelete" type="button" onclick="deleteitem(${index})">Delete</button></td>
         </tr>
         `;
  });
  //   table inner html
  addtasklist.innerHTML = data;
}
// Startitem function
function Startitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  taskobj[index].Status = "Started";
  localStorage.setItem("localtask", JSON.stringify(taskobj));
  showtask();
}
//Pauseitem function
function Pauseitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  console.log((taskobj[index].Status = "Pause"));
  localStorage.setItem("localtask", JSON.stringify(taskobj));
  showtask();
}
// Completeditem function
function Completeditem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  taskobj[index].Status = "Completed";
  localStorage.setItem("localtask", JSON.stringify(taskobj));
  showtask();
}
// delete function
function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  taskobj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskobj));
  showtask();
}
// drag and drop
function start() {
  row = event.target;
}
function dragover() {
  var e = event;
  e.preventDefault(); //dragover
  let newplace = Array.from(e.target.parentNode.parentNode.children);
  let table = document.getElementById("addtasklist");
  let rowindex = newplace.indexOf(row);
  table.rows[rowindex].cells[0].innerHTML = rowindex + 1; //table row syntax
  if (newplace.indexOf(e.target.parentNode) > newplace.indexOf(row)) {
    e.target.parentNode.after(row);
    table.rows[rowindex].cells[0].innerHTML = rowindex + 1;
  } else {
    e.target.parentNode.before(row);
    table.rows[rowindex].cells[0].innerHTML = rowindex + 1;
  }
}
