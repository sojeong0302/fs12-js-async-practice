const BASE_URL = "http://localhost:4000/todos";

// ============================================
// index.html과 style.css를 참고해서
// 할 일 목록 앱을 완성하세요.
//
// 요구사항:
// - 페이지 로드 시 서버에서 할 일 목록을 불러와 화면에 표시
// - 폼 제출 시 새 할 일을 서버에 추가
// - 토글 버튼 클릭 시 완료 상태를 서버에서 변경
// - 삭제 버튼 클릭 시 서버에서 할 일을 삭제
// ============================================

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// HTML 구조 참고:
//   <li class="todo-item completed">
//     <span class="title">제목</span>
//     <button class="btn-toggle">완료됨</button>
//     <button class="btn-delete">삭제</button>
//   </li>
// - completed인 항목은 li에 "completed" 클래스 추가
// - 토글 버튼 텍스트: completed면 "완료됨", 아니면 "미완료"

function rendering(todos) {
  todoList.innerHTML = "";
  todos.forEach(function (todo) {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item" + (todo.completed ? " completed" : "");

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = todo.title;

    const btnToggle = document.createElement("button");
    btnToggle.className = "btn-toggle";
    btnToggle.textContent = todo.completed ? "완료됨" : "미완료";
    btnToggle.addEventListener("click", function () {
      PatchTodos(todo.id, todo.completed);
    });

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn-delete";
    btnDelete.textContent = "삭제";
    btnDelete.addEventListener("click", function () {
      DeleteTodos(todo.id);
    });

    todoItem.appendChild(title);
    todoItem.appendChild(btnToggle);
    todoItem.appendChild(btnDelete);
    todoList.appendChild(todoItem);
  });
}

// 목록 가져오기
async function getTodos() {
  const response = await fetch(`${BASE_URL}`);
  const todos = await response.json();
  rendering(todos);
}

//추가
async function addTodos(title) {
  await fetch(`${BASE_URL}`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });
}

//수정
async function PatchTodos(id, completed) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: true,
    }),
  });
}

//삭제
async function DeleteTodos(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//이벤트 연결
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = todoInput.value.trim();
  if (title) {
    addTodos(title);
    todoInput.value = "";
  }
});

// 페이지 로드 시 할 일 목록 불러오기
getTodos();
