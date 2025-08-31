"use strict";

const form = document.querySelector(".todo-form");
const btnAdd = document.querySelector(".btn-add");
const inputAdd = document.querySelector(".input-add");
const list = document.querySelector(".list");

document.addEventListener("DOMContentLoaded", () => {
  const storedList = getList();
  storedList.forEach((item) => {
    const task = crateEl(item.id, item.text, item.checked);
    list.append(task);
  });
});

function getList() {
  const storedList = localStorage.getItem("list");
  return JSON.parse(storedList) || [];
}

function crateEl(id, text, checked) {
  const task = document.createElement("li");
  task.classList.add("task");
  task.classList.add(`${checked && "checked"}`);
  task.id = id;
  const taskCheckBox = document.createElement("input");
  taskCheckBox.setAttribute("type", "checkbox");
  taskCheckBox.checked = checked;
  const taskP = document.createElement("p");
  taskP.textContent = text;
  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.textContent = "❌";
  taskDeleteBtn.classList.add("delete-btn");
  task.append(taskCheckBox, taskP, taskDeleteBtn);
  return task;
}

function saveToStorage(id, text, checked = false) {
  const parsedList = getList();
  parsedList.push({ id, text, checked });
  const stringifiedList = JSON.stringify(parsedList);
  localStorage.setItem("list", stringifiedList);
}
function removeFromStorage(e) {
  const parsedList = getList();
  const filteredList = parsedList.filter(
    (item) => item.id != e.target.parentElement.id
  );
  const stringifiedList = JSON.stringify(filteredList);
  localStorage.setItem("list", stringifiedList);
}

function handleAdd() {
  const text = inputAdd.value.trim();
  if (!text) return;
  const id = Math.random();
  const task = crateEl(id, text);
  saveToStorage(id, text);
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
    removeFromStorage(e);
  }
});

list.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const taskEl = e.target.closest("li");
    if (e.target.checked) {
      taskEl.classList.add("checked");
    } else {
      taskEl.classList.remove("checked");
    }
    removeFromStorage(e);
    saveToStorage(
      taskEl.id,
      taskEl.querySelector("p").textContent,
      taskEl.classList.contains("checked")
    );
  }
});
