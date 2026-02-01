// API Base URL
const API_URL = 'http://localhost:3000/api/tasks';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const filterStatus = document.getElementById('filterStatus');
const editModal = document.getElementById('editModal');
const editTaskForm = document.getElementById('editTaskForm');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// State
let tasks = [];
let editingTaskId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    taskForm.addEventListener('submit', handleTaskSubmit);
    filterStatus.addEventListener('change', renderTasks);
    editTaskForm.addEventListener('submit', handleEditSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
    
    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === editModal) {
            closeEditModal();
        }
    };
}

// Load all tasks from API
async function loadTasks() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            tasks = result.data;
            renderTasks();
        } else {
            showError('Failed to load tasks');
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError('Failed to connect to server');
    }
}

// Render tasks based on filter
function renderTasks() {
    const filter = filterStatus.value;
    const filteredTasks = filter === 'all' 
        ? tasks 
        : tasks.filter(task => task.status === filter);

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No tasks found. Add your first task!</div>';
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => createTaskCard(task)).join('');
}

// Create task card HTML
function createTaskCard(task) {
    const date = new Date(task.created_at).toLocaleDateString();
    const statusClass = task.status.replace('-', '-');
    
    return `
        <div class="task-card status-${statusClass}">
            <div class="task-header">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
                <span class="task-status ${task.status}">${formatStatus(task.status)}</span>
            </div>
            <p class="task-description">${escapeHtml(task.description) || 'No description'}</p>
            <div class="task-meta">
                <span>Created: ${date}</span>
                <span>ID: #${task.id}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-edit" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `;
}

// Handle task form submission (Create)
async function handleTaskSubmit(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
    };

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Adding...';
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            taskForm.reset();
            await loadTasks();
            showSuccess('Task added successfully!');
        } else {
            showError(result.message || 'Failed to add task');
        }
    } catch (error) {
        console.error('Error adding task:', error);
        showError('Failed to add task');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Task';
    }
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description;
    document.getElementById('editStatus').value = task.status;

    editModal.style.display = 'block';
}

// Handle edit form submission
async function handleEditSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('editTaskId').value;
    const formData = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value,
        status: document.getElementById('editStatus').value
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            closeEditModal();
            await loadTasks();
            showSuccess('Task updated successfully!');
        } else {
            showError(result.message || 'Failed to update task');
        }
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Failed to update task');
    }
}

// Delete task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            await loadTasks();
            showSuccess('Task deleted successfully!');
        } else {
            showError(result.message || 'Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Failed to delete task');
    }
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    editTaskForm.reset();
}

// Cancel edit
function cancelEdit() {
    editingTaskId = null;
    taskForm.reset();
    submitBtn.textContent = 'Add Task';
    cancelBtn.style.display = 'none';
}

// Utility functions
function showLoading() {
    taskList.innerHTML = '<div class="loading">Loading tasks...</div>';
}

function showError(message) {
    alert('Error: ' + message);
}

function showSuccess(message) {
    // Simple success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
