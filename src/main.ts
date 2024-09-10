import "./style.css";

interface TodoData {
  id: number;
  todo: string;
}

const todos: TodoData[] = [];

const createTodoList = () => {
  const $ul = document.createElement("ul");
  $ul.id = "todo__list";
  $ul.innerHTML = `<li>아직 작성된 투두가 없습니다.</li>`;

  return $ul;
};

const addTodoData = (todoText: string) => {
  const todo: TodoData = {
    id: todos.length + 1,
    todo: todoText,
  };

  todos.push(todo);

  const $ul = document.getElementById("todo__list");

  if (!$ul) return;

  $ul.innerHTML = "";

  todos.forEach((el) => {
    $ul.insertAdjacentHTML("beforeend", `<li id="${el.id}">${el.todo}</li>`);
  });
};

const inputAndAddTemplate = () => {
  const form = document.createElement("form");

  form.classList.add("todo__form");

  const formTemp = `
    <label for="todo__input">
      <input type="text" id="todo__input" placeholder="투두를 입력해주세요." />
    </label>
    <button type="submit" class="add__btn">투두 추가</button>
  `;
  form.insertAdjacentHTML("beforeend", formTemp);

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    
    const $input = document.querySelector<HTMLInputElement>("#todo__input");

    if ($input && $input.value.trim() !== "") {
      addTodoData($input.value.trim());
      $input.value = "";
    } else {
      alert("todo를 입력해주세요.");
    }
  });

  return form;
};

const renderTodoList = () => {
  const todo = document.querySelector<HTMLDivElement>("#app");
  if (!todo) return;

  todo.innerHTML = "";
  todo.insertAdjacentHTML("beforeend", `<h1>투두 리스트</h1>`);
  todo.appendChild(inputAndAddTemplate());
  todo.appendChild(createTodoList());
};

window.addEventListener("DOMContentLoaded", (e: Event) => {
  e.preventDefault();
  renderTodoList();
});
