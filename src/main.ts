import { Todo } from "./models/Todo";

const todo1 = new Todo("städa", true, "20/10", "medium");
const todo2 = new Todo("tvätta", false, "23/10", "high");
const todo3 = new Todo("handla medicin", false, "22/10", "high");
const todo4 = new Todo("köpa present", false, "26/10", "medium");
const todo5 = new Todo("handla mat", true, "21/10", "low");

const todos: Todo[] = [];

todos.push(todo1);
todos.push(todo2);
todos.push(todo3);
todos.push(todo4);
todos.push(todo5);

function listTodos(todos: Todo[]) {
  const todoSection = document.getElementById("todo-section");

  if (!todoSection) {
    console.log("todoSection finns inte");
    return;
  }

  todoSection.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    console.log(todos);
    const todo = todos[i];

    const todoContainer = document.createElement("li");
    const title = document.createElement("h2");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");

    title.innerHTML = todo.title;
    dueDate.innerHTML = `Due Date: ${todo.dueDate}`;
    priority.innerHTML = `Priority: ${todo.priority}`;

    if (todo.completed === true) {
      title.style.textDecoration = "line-through";
      priority.style.textDecoration = "line-through";
      dueDate.style.textDecoration = "line-through";
    }

    todoContainer.addEventListener("click", () => {
      todo.completed = !todo.completed;

      console.log(todo);

      listTodos(todos);
    });

    todoContainer.appendChild(title);
    todoContainer.appendChild(dueDate);
    todoContainer.appendChild(priority);

    todoSection.appendChild(todoContainer);
  }
}
listTodos(todos);

function addTodo() {
  const titleInput = document.getElementById("todo-title") as HTMLInputElement;
  const dueDateInput = document.getElementById(
    "todo-due-date"
  ) as HTMLInputElement;
  const prioritySelect = document.getElementById(
    "todo-priority"
  ) as HTMLSelectElement;

  const title = titleInput.value;
  const dueDate = dueDateInput.value || "No due date";
  const priority = prioritySelect.value as "low" | "medium" | "high";

  // Skapa en ny todo och lägg till den i listan
  const newTodo = new Todo(title, false, dueDate, priority);
  todos.push(newTodo);

  // Rensa formuläret efter att todo har lagts till
  titleInput.value = "";
  dueDateInput.value = "";
  prioritySelect.value = "low";

  // Uppdatera listan
  listTodos(todos);
}

// Event listener för att lyssna på knappen som lägger till nya todos
const addTodoButton = document.getElementById("add-todo-btn");
addTodoButton?.addEventListener("click", (event) => {
  event.preventDefault(); // Förhindrar att sidan laddas om
  addTodo(); // Lägg till ny todo
});

// Sortera efter förfallodatum (earliest -> latest)
function sortTodosByDueDate(todos: Todo[]): Todo[] {
  return todos.sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    const dateA = new Date(a.dueDate.split("/").reverse().join("-")).getTime();
    const dateB = new Date(b.dueDate.split("/").reverse().join("-")).getTime();

    return dateA - dateB;
  });
}

// Sortera efter prioritet (high -> low)
function sortTodosByPriority(todos: Todo[]): Todo[] {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return todos.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

// Sortera efter completed status (false -> true)
function sortTodosByCompleted(todos: Todo[]): Todo[] {
  return todos.sort((a, b) => Number(a.completed) - Number(b.completed));
}

// Lägg till sorteringsknappar
// const sortCompletedBtn = document.getElementById("sort-completed-btn");
// const sortDueDateBtn = document.getElementById("sort-due-date-btn");
// const sortPriorityBtn = document.getElementById("sort-priority-btn");

// Hämta dropdown-menyn från DOM
const sortDropdown = document.getElementById("sort-todos");

sortDropdown?.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;
  const sortOption = target.value;

  let sortedTodos: Todo[] = [];

  switch (sortOption) {
    case "dueDate":
      sortedTodos = sortTodosByDueDate(todos);
      break;
    case "priority":
      sortedTodos = sortTodosByPriority(todos);
      break;
    case "completed":
      sortedTodos = sortTodosByCompleted(todos);
      break;
    default:
      sortedTodos = todos;
      break;
  }

  listTodos(sortedTodos);
});
