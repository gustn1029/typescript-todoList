import "./style.css";

interface TodoData {
  id?: number;
  todo: string;
}

const url = "http://localhost:3000/todos";

const fetchListData = async (): Promise<TodoData[] | undefined> => {
  try {
    const res = await fetch(url);

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchRemoveData = async (id: string) => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("삭제되었습니다.");
      const todos = await fetchListData();

      const $ul = document.getElementById("todo__list");

      if (!$ul) return;
      $ul.innerHTML = "";

      showTodoList($ul, todos!);
    }
  } catch (error) {
    console.error(error);
  }
};

const createTodoList = async () => {
  const $ul = document.createElement("ul");
  $ul.id = "todo__list";
  const data = await fetchListData();
  console.log(data);
  if (data && data.length !== 0) {
    showTodoList($ul, data);

    $ul.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target instanceof HTMLButtonElement) {
        const todoId = e.target.getAttribute("data-todoId");
        fetchRemoveData(todoId!);
      }
    });
  } else {
    $ul.innerHTML = `<li>아직 작성된 투두가 없습니다.</li>`;
  }

  return $ul;
};

const showTodoList = <T extends Element>(node: T, todos: TodoData[]) => {
  todos.forEach((el) => {
    node.insertAdjacentHTML(
      "beforeend",
      `<li id="${el.id}"><p>${el.todo}</p><button type="button" class="remove__btn" data-todoId="${el.id}">삭제</button></li>`
    );
  });
  return node;
};

const addTodoData = async (todoText: string) => {
  const todo = {
    todo: todoText,
  };
  try {
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (res.ok) {
      const json: TodoData = await res.json();

      const $ul = document.getElementById("todo__list");

      if (!$ul) return;

      $ul.insertAdjacentHTML(
        "beforeend",
        `<li id="${json.id}"><p>${json.todo}</p><button type="button" class="remove__btn" data-todoId="${json.id}">삭제</button></li>`
      );
    }
  } catch (error) {
    console.error(error);
  }
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

const renderTodoList = async () => {
  const todo = document.querySelector<HTMLDivElement>("#app");
  if (!todo) return;

  todo.innerHTML = "";
  todo.insertAdjacentHTML("beforeend", `<h1>투두 리스트</h1>`);
  todo.appendChild(inputAndAddTemplate());
  todo.appendChild(await createTodoList());
};

window.addEventListener("DOMContentLoaded", (e: Event) => {
  e.preventDefault();
  renderTodoList();
});
