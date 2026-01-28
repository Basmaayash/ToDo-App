// ==================== Elements ====================
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const tasksLeftElem = document.getElementById("tasks-left");

// ==================== Add New Task ====================
function AddTask() {
    const taskText = inputBox.value.trim();

    // منع إضافة مهام فارغة
    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    // إنشاء عنصر المهمة
    const li = document.createElement("li");

    // نص المهمة
    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;

    // تاريخ الإضافة
    const date = new Date();
    const options = { day: "numeric", month: "short" };
    const addedOn = date.toLocaleDateString("en-US", options);/*toLocaleDateString تحول كائن التاريخ إلى سلسلة نصية قابلة للعرض للمستخدم.
                                                              "en-US" → يحدد لغة العرض (الإنجليزية الأمريكية هنا)
                                                               options → يستخدم الخيارات التي حددناها.*/

    const dateSpan = document.createElement("span");
    dateSpan.className = "date";
    dateSpan.textContent = `Added on: ${addedOn}`;

    // زر الحذف
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "\u00d7";

    deleteBtn.onclick = () => {
        li.remove();
        updateTasksLeft();
        saveData();
    };

    // عند الضغط على المهمة (تم / غير تم)
    li.onclick = (e) => {
        if (!e.target.classList.contains("delete")) {
            li.classList.toggle("checked");
            updateTasksLeft();
            saveData();
        }
    };

    // إضافة العناصر للمهمة
    li.appendChild(taskSpan);
    li.appendChild(dateSpan);
    li.appendChild(deleteBtn);

    // إضافة المهمة للقائمة
    listContainer.appendChild(li);

    // تنظيف حقل الإدخال
    inputBox.value = "";

    updateTasksLeft();
    saveData();
}

// ==================== Tasks Counter ====================
function updateTasksLeft() {
    const tasksLeft = listContainer.querySelectorAll("li:not(.checked)").length;
    tasksLeftElem.textContent = `Tasks left: ${tasksLeft}`;

    // تأثير بصري عند انتهاء كل المهام
    if (tasksLeft === 0) {
        tasksLeftElem.style.opacity = "0.4";
        tasksLeftElem.style.fontStyle = "italic";
    } else {
        tasksLeftElem.style.opacity = "1";
        tasksLeftElem.style.fontStyle = "normal";
    }
}

// ==================== Clear All Tasks ====================
function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = "";
        updateTasksLeft();
        saveData();
    }
}

// ==================== Local Storage ====================
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    updateTasksLeft();
}

// ==================== Keyboard Support ====================
inputBox.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        AddTask();
    }
});

// ==================== Load Tasks on Page Load ====================
showTask();

