  // getting all required elements
  const inputBox = document.querySelector(".inputField input");
  const addBtn = document.querySelector(".inputField button");
  const todoList = document.querySelector(".todoList");
  const deleteAllBtn = document.querySelector(".footer button");

    window.onbeforeunload=()=>{
      localStorage.clear();
    }

    // onkeyup event
    inputBox.onkeyup = ()=>{
      let userEnteredValue = inputBox.value; //getting user entered value
      if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
        addBtn.classList.add("active"); //active the add button
      }else{
        addBtn.classList.remove("active"); //unactive the add button
      }
  }
  showTasks(); //calling showTask function
  showCompletedTasks() // it will show completed task list
  addBtn.onclick = ()=>{ //when user click on plus icon button
            let userEnteredValue = inputBox.value; //getting input field value
            let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
            if(getLocalStorageData == null){ //if localstorage has no data
              listArray = []; //create a blank array
            }else{
              listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
            }
            listArray.push(userEnteredValue); //pushing or adding new value in array
            localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
            showTasks(); //calling showTask function
            addBtn.classList.remove("active"); //unactive the add button once the task added
  }


  function showTasks(){
          let getLocalStorageData = localStorage.getItem("New Todo");
          if(getLocalStorageData == null){
            listArray = [];
          }else{
            listArray = JSON.parse(getLocalStorageData); 
          }
          const pendingTasksNumb = document.querySelector(".pendingTasks");
          pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
          if(listArray.length > 0){ //if array length is greater than 0
            deleteAllBtn.classList.add("active"); //active the delete button
          }else{
            deleteAllBtn.classList.remove("active"); //unactive the delete button
          }
          let newLiTag = "";
          listArray.forEach((element, index) => {
            newLiTag += `<li  class ="task-list"  id=${index}><input onchange="showCompleted()"  type="checkbox" id=${index}> <span class ="task" id= ${index}>${element}</span><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
          });
          todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
          inputBox.value = ""; //once task added leave the input field blank
  }


  // delete task function
  function deleteTask(index){
        let getLocalStorageData = localStorage.getItem("New Todo");
        listArray = JSON.parse(getLocalStorageData);
        listArray.splice(index, 1); //delete or remove the li
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTasks(); //call the showTasks function
  }



  // delete all tasks function
  deleteAllBtn.onclick = ()=>{
        listArray = []; //empty the array
        localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
        listCompArray = []; 
        localStorage.setItem("copmletedTask", JSON.stringify(listCompArray)); 
        showTasks(); //call the showTasks function
        showCompletedTasks()//for complted task

        
  }


  // this function will differentiate the completed task
  function showCompleted() {

    let eachItem = $(".task-list");
            eachItem.each(function (i) {
                if (eachItem[i].firstElementChild.checked === true) {
                  let id = eachItem[i].firstElementChild.id;
                  updateStorage(id)
                  deleteTask(id);
              }
            });   
    };


    //we are taking out inner text of completed task and sending it to local storage
    function updateStorage(id){
            let eachTask = $(".task");

            for(let i = 0 ; i < eachTask.length; i++){ 

              console.log(eachTask[i].innerText);
              if(eachTask[i].id === id){
                addToCompletedTaskList(eachTask[i].innerText); 
              }    
      }
  }

  //new array is created for completed task in local storage
  function  addToCompletedTaskList(element){
              let userEnteredValue = element;
              
              let getLocalStorageData = localStorage.getItem("copmletedTask"); //getting localstorage
              if(getLocalStorageData == null){ //if localstorage has no data
                listArray = []; //create a blank array
              }else{
                listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
              }
              console.log("hiii",userEnteredValue);
              listArray.push(userEnteredValue); //pushing or adding new value in array
              localStorage.setItem("copmletedTask", JSON.stringify(listArray)); //transforming js object into a json string
              showCompletedTasks(); //calling showTask function
  }

  // this will show complted task on list with some diffrent color
  function showCompletedTasks(){
          
            let getLocalStorageData = localStorage.getItem("copmletedTask");
            if(getLocalStorageData == null){
              listArray = [];
            }else{
              listArray = JSON.parse(getLocalStorageData); 
            }
            if(listArray.length > 0){ //if array length is greater than 0
              deleteAllBtn.classList.add("active"); //active the delete button
            }else{
              deleteAllBtn.classList.remove("active"); //unactive the delete button
            }
            let newLiTag = "";
            listArray.forEach((element, index) => {
              newLiTag += `<li  class ="task-list"  id=${index}> <i id= "checked" class="fas fa-check-square"></i> <span class ="task" id= ${index}>${element}</span><span class="icon" onclick="deleteCompletedTask(${index})"><i class="fas fa-trash"></i></span></li>`;
            });
            document.getElementById("completed-task-list").innerHTML = newLiTag; //adding new li tag inside ul tag
  }

  // this function is used to delete completed task from list
  function deleteCompletedTask(index){
          let getLocalStorageData = localStorage.getItem("copmletedTask");
          listArray = JSON.parse(getLocalStorageData);
          listArray.splice(index, 1); //delete or remove the li
          localStorage.setItem("copmletedTask", JSON.stringify(listArray));
          
          showCompletedTasks(); //call the showTasks function
  }