let tasks = [];

const task_list = document.getElementById('task-list');
const add_task_button = document.getElementById('add-task-button');
const new_task_input = document.getElementById('new-task-input');
const new_task_date = document.getElementById('new-task-date');
const search_input = document.getElementById('search-input');

window.addEventListener('load', () => {
  if(localStorage.getItem('tasks')) tasks = JSON.parse(localStorage.getItem('tasks'));
  show_tasks();
});

search_input.addEventListener('input', () => {
  show_tasks();
});

add_task_button.addEventListener('click', add_task);

new_task_input.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') add_task();
});


function add_task() {
  task_name = new_task_input.value.trim();
  task_date = new_task_date.value;

  if (task_name.length < 3 || task_name.length > 255) {
    alert("Nazwa zadania musi mieć od 3 do 255 znaków.");
    return;
  }

  const current_date = new Date();
  const date_to_check = task_date ? new Date(task_date) : null;

  if(date_to_check && date_to_check < current_date) {
    alert("Data zadania musi być pusta lub w przyszłości.");
    return;
  }

  tasks.push({
    name: task_name,
    date: task_date,
    completed: false
  });

  save_tasks();
  show_tasks();
  new_task_input.value = '';
  new_task_date.value = '';
}

function delete_task(index) {
  tasks.splice(index, 1);
  save_tasks();
  show_tasks();
}

function show_tasks() {
  task_list.innerHTML = '';

  let filtered_tasks = tasks;
  const search_term = search_input.value.trim().toLowerCase();

  if(search_term.length > 2) {
    filtered_tasks = tasks.filter(task => task.name.toLowerCase().includes(search_term));
  }

  filtered_tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    const task_content = document.createElement('div');
    task_content.classList.add('task-content');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      save_tasks();
      show_tasks();
    });
    task_content.appendChild(checkbox);

    const task_name = document.createElement('p');
    task_name.classList.add('task-name');
    if (task.completed) {
      task_name.classList.add('completed');
    }
    task_name.innerHTML = highlight_search_term(task.name, search_term);
    task_content.appendChild(task_name);

    const task_date = document.createElement('p');
    task_date.classList.add('task-date');
    task_date.textContent = task_date ? `Termin wykonania: ${task.date.replace('T', ' ')}` : '';
    task_content.appendChild(task_date);

    li.appendChild(task_content);

    const delete_button = document.createElement('button');
    delete_button.classList.add('delete-button');
    delete_button.innerHTML = 'X';
    delete_button.addEventListener('click', () => {
      delete_task(index);
    });

    li.appendChild(delete_button);

    task_name.addEventListener('click', () => {
      edit_task_name(task_name, index);
    });

    task_date.addEventListener('click', () => {
      edit_task_date(task_date, index);
    });

    task_list.appendChild(li);
  });
}

function save_tasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function edit_task_name(task_element, index) {
  const original_text = tasks[index].name;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = original_text;
  input.classList.add('edit-input');

  task_element.replaceWith(input);
  input.focus();

  input.addEventListener('blur', () => {
    const new_text = input.value.trim();
    if(new_text < 3 || new_text.length > 255) {
      alert("Nazwa zadania musi mieć od 3 do 255 znaków.");
      return;
    }
    tasks[index].name = new_text;
    save_tasks();
    show_tasks();
  });
}

function edit_task_date(task_element, index) {
  const original_date = tasks[index].date || '';
  const input = document.createElement('input');
  input.type = 'datetime-local';
  input.value = original_date;
  input.classList.add('edit-input');

  task_element.replaceWith(input);
  input.focus();

  input.addEventListener('blur', () => {
    const new_date = input.value;
    let taskDateObj;
    if (new_date) {
      taskDateObj = new Date(new_date);
      if (taskDateObj < new Date()) {
        alert('Data zadania musi być pusta albo w przyszłości.');
        input.focus();
        return;
      }
    }

    tasks[index].date = new_date;
    save_tasks();
    show_tasks();
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      input.blur();
    }
  });
}

function highlight_search_term(text, search_term) {
  if(search_term && search_term.length > 2) {
    const regexp = new RegExp(`(${search_term})`, 'gi');
    return text.replace(regexp, '<span class="highlight">$1</span>');
  } else {
    return text;
  }
}
