interface TodoData {
  id?: number;
  todo: string;
}

const todoDatas: TodoData[] = [
  {
    id: 1,
    todo: "아침먹기",
  },
  {
    id: 2,
    todo: "점심먹기",
  },
];

const addTodoData = async (todoText:string): Promise<TodoData[]> =>{
    const newTodo:Partial<TodoData> = {
        todo:todoText
    }
    const res = await fetch("http://localhost:3000/todos",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newTodo)
    })
    const newTodoDatas = await res.json()
    return newTodoDatas
}

const addTodoList = () => {
  const $todoInput = document.querySelector<HTMLInputElement>("#todo-input");
  if (!$todoInput) return;

  const todoText = $todoInput.value;
  $todoInput.value = "";
  const todoDatas = addTodoData(todoText);
  todoListRender(todoDatas);
};

const $todoInputButton =
  document.querySelector<HTMLButtonElement>("#todo-button");
$todoInputButton?.addEventListener("click", addTodoList);

// 데이터를 넣어주면 todoList를 만들어주는애
const todoListRender = (todoDatas: TodoData[]) => {
  const $todoContainer = document.querySelector<HTMLUListElement>("#todo-container");
  if(!$todoContainer) return;

  $todoContainer.innerHTML = "";
  todoDatas.forEach((todoData) => {
    const $todoLi = document.createElement("li");
    const $todoP = document.createElement("p");
    $todoP.innerText = todoData.todo;
    $todoLi.append($todoP);
    $todoContainer.append($todoLi);
  });
};

todoListRender(todoDatas);
