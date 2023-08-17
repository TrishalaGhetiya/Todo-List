const myForm = document.getElementById("my-form");
const item = document.getElementById("item");
const description = document.getElementById("description");
const isChecked = document.getElementById("isChecked");
const todoRemaining = document.getElementById("todoRemaining");
const todoDone = document.getElementById("todoDone");
const todoItemList = [];

myForm.addEventListener("submit",onsubmit);
todoRemaining.addEventListener('click',removeItem);
window.addEventListener("DOMContentLoaded", loadPage);

async function loadPage(){
    try{
        const res = await axios.get('http://localhost:4000')
        console.log(res.data);
        for(let i=0;i<res.data.length;i++)
        {
            showTodoListOnScreen(res.data[i]);
            todoItemList.push(res.data[i]);
        }
    }
    catch(err){
         console.log(err);
    }
}


function showTodoListOnScreen(data){
    if(data.isChecked==='no')
    {
        const deleteBtn = document.createElement('button');
        deleteBtn.className='btn btn-sm btn-danger delete float-right';
        deleteBtn.appendChild(document.createTextNode('X'));

        const checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.className = 'form-check-input';
        checkbox.appendChild(document.createTextNode('check if done'));

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${data.item}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${data.description}`));
        li.appendChild(deleteBtn);
        li.appendChild(checkbox);

        todoRemaining.appendChild(li);
    }
    else
    {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${data.item}`));
        todoDone.appendChild(li);
    }
    
}

async function onsubmit(e)
{
    e.preventDefault();
    if(item.value==='' || item.value==='')
    {
        msg.innerHTML="Please enter all fields";
        setTimeout(() => msg.remove(),3000);
    }
    else
    {
        const checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");

        const deleteBtn = document.createElement('button');
        deleteBtn.className='btn btn-sm btn-danger delete float-right';
        deleteBtn.appendChild(document.createTextNode('X'));

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${item.value}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${description.value}`));
        li.appendChild(deleteBtn);
        li.appendChild(checkbox);

        todoRemaining.appendChild(li);

        let todo = {
            item : item.value,
            description : description.value,
            isChecked : isChecked.value
        };
        try{
            const res = await axios.post('http://localhost:4000/add-item', todo);
            console.log('Todo added');
        }
        catch(err) {
            console.log(err);
        }
        item.value='';
        description.value='';     
    }
}

async function removeItem(e)
    {
        if(e.target.classList.contains('delete'))
        {
            if(confirm('Sure??'))
            {
                const li = e.target.parentElement;
                const delItemName = li.firstChild.textContent;
                for(let i=0;i<todoItemList.length;i++)
                {
                    if(todoItemList[i].item === delItemName)
                    {
                        try{
                            const res = await axios.delete(`http://localhost:4000/delete-item/${todoItemList[i].id}`);
                            console.log(res);
                        }
                        catch(err){
                            console.log(err);
                        } 
                        break;
                    }        
                }
                todoRemaining.removeChild(li);
            }
        }
        if(e.target.classList.contains('form-check-input'))
        {
            const li = e.target.parentElement;
            const delItemName = li.firstChild.textContent;
            const liDone = document.createElement('li');
            liDone.appendChild(document.createTextNode(`${li.firstChild.textContent}`));
            todoDone.appendChild(liDone);
            
            for(let i=0;i<todoItemList.length;i++)
                {
                    if(todoItemList[i].item === delItemName)
                    {
                        let todo = {
                            todoName : todoItemList[i].item,
                            description : todoItemList[i].description,
                            isChecked : 'yes'
                        };
                        console.log(todo);
                        try{
                            const res = await axios.put(`http://localhost:4000/done-todo/${todoItemList[i].id}`, todo)
                            console.log(res);
                        }
                        catch(err){
                            console.log(err);
                        }
                        break;
                    }       
                }
            todoRemaining.removeChild(li);
        }
        
    }