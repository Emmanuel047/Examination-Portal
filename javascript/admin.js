document.addEventListener('DOMContentLoaded', () => {
    // Data arrays
    const teachers = [];
    const students = [];

    // Teacher DOM refs
    const addTeacherForm = document.getElementById('addTeacherForm');
    const teacherTableBody = document.querySelector('#teacherTable tbody');

    // Student DOM refs
    const addStudentForm = document.getElementById('addStudentForm');
    const studentTableBody = document.querySelector('#studentTable tbody');

    // Track indexes for editing
    let teacherEditIndex = -1;
    let studentEditIndex = -1;

    // Render table helper
    function renderTable(tbody, items, isTeacher = true) {
        tbody.innerHTML = '';
        items.forEach((item, idx) => {
            const tr = document.createElement('tr');

            for (const key in item) {
                const td = document.createElement('td');
                td.textContent = item[key];
                tr.appendChild(td);
            }

            // Actions td
            const actionTd = document.createElement('td');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'action-btn edit-btn';
            editBtn.addEventListener('click', () => {
                if (isTeacher) {
                    fillTeacherForm(idx);
                } else {
                    fillStudentForm(idx);
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'action-btn delete-btn';
            deleteBtn.addEventListener('click', () => {
                if (isTeacher) {
                    if (teacherEditIndex === idx) resetTeacherForm();
                    teachers.splice(idx, 1);
                    renderTable(teacherTableBody, teachers, true);
                } else {
                    if (studentEditIndex === idx) resetStudentForm();
                    students.splice(idx, 1);
                    renderTable(studentTableBody, students, false);
                }
            });

            actionTd.appendChild(editBtn);
            actionTd.appendChild(deleteBtn);
            tr.appendChild(actionTd);

            tbody.appendChild(tr);
        });
    }

    // Fill teacher form for edit
    function fillTeacherForm(idx) {
        const teacher = teachers[idx];
        document.getElementById('teacherId').value = teacher.id;
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherEmail').value = teacher.email;
        document.getElementById('teacherPhone').value = teacher.phone;
        document.getElementById('teacherDepartment').value = teacher.department;
        teacherEditIndex = idx;
        addTeacherForm.querySelector('button').textContent = 'Update Teacher';
    }

    // Reset teacher form state
    function resetTeacherForm() {
        addTeacherForm.reset();
        teacherEditIndex = -1;
        addTeacherForm.querySelector('button').textContent = 'Add / Update Teacher';
    }

    // Fill student form for edit
    function fillStudentForm(idx) {
        const student = students[idx];
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        document.getElementById('studentClass').value = student.classLevel;
        studentEditIndex = idx;
        addStudentForm.querySelector('button').textContent = 'Update Student';
    }

    // Reset student form state
    function resetStudentForm() {
        addStudentForm.reset();
        studentEditIndex = -1;
        addStudentForm.querySelector('button').textContent = 'Add / Update Student';
    }

    // Teacher form submit
    addTeacherForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('teacherId').value.trim();
        const name = document.getElementById('teacherName').value.trim();
        const email = document.getElementById('teacherEmail').value.trim();
        const phone = document.getElementById('teacherPhone').value.trim();
        const department = document.getElementById('teacherDepartment').value.trim();

        if (!id || !name || !email) {
            alert('Teacher ID, Name, and Email are required.');
            return;
        }

        // Check ID uniqueness except the one being edited
        if (teachers.some((t, i) => t.id === id && i !== teacherEditIndex)) {
            alert('Teacher ID must be unique.');
            return;
        }

        const teacherData = { id, name, email, phone, department };

        if (teacherEditIndex === -1) {
            teachers.push(teacherData);
        } else {
            teachers[teacherEditIndex] = teacherData;
        }

        renderTable(teacherTableBody, teachers, true);
        resetTeacherForm();
    });

    // Student form submit
    addStudentForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('studentId').value.trim();
        const name = document.getElementById('studentName').value.trim();
        const email = document.getElementById('studentEmail').value.trim();
        const phone = document.getElementById('studentPhone').value.trim();
        const classLevel = document.getElementById('studentClass').value.trim();

        if (!id || !name || !email) {
            alert('Student ID, Name, and Email are required.');
            return;
        }

        if (students.some((s, i) => s.id === id && i !== studentEditIndex)) {
            alert('Student ID must be unique.');
            return;
        }

        const studentData = { id, name, email, phone, classLevel };

        if (studentEditIndex === -1) {
            students.push(studentData);
        } else {
            students[studentEditIndex] = studentData;
        }

        renderTable(studentTableBody, students, false);
        resetStudentForm();
    });

    // Initial empty rendering
    renderTable(teacherTableBody, teachers, true);
    renderTable(studentTableBody, students, false);
});
