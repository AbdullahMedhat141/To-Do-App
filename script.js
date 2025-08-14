"use strict";

const form = document.querySelector(".todo-form");
const btnAdd = document.querySelector(".btn-add");
const inputAdd = document.querySelector(".input-add");
const list = document.querySelector(".list");

function crateEl(text) {
  const task = document.createElement("li");
  task.classList.add("task");
  const taskCheckBox = document.createElement("input");
  taskCheckBox.setAttribute("type", "checkbox");
  const taskP = document.createElement("p");
  taskP.textContent = text;
  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.textContent = "❌";
  taskDeleteBtn.classList.add("delete-btn");
  task.append(taskCheckBox, taskP, taskDeleteBtn);
  return task;
}

function handleAdd() {
  const text = inputAdd.value.trim();
  if (!text) return;
  const task = crateEl(text);
  list.append(task);
  inputAdd.value = "";
  inputAdd.focus();
}

btnAdd.addEventListener("click", handleAdd);
inputAdd.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAdd();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});

list.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const taskItem = e.target.closest("li");
    if (e.target.checked) {
      taskItem.classList.add("checked");
    } else {
      taskItem.classList.remove("checked");
    }
  }
});
