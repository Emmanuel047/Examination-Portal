document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser') || 'unknown';
    const welcomeMsg = document.getElementById('welcomeMsg');
    const studentForm = document.getElementById('studentForm');
    const subjectSelect = document.getElementById('subjectSelect');
    const studentsTableBody = document.querySelector('#studentsTable tbody');
    const logoutBtn = document.getElementById('logoutBtn');

    let editIndex = -1;

    // Hardcoded teacher-to-subject permissions for simulation
    const teacherSubjectsMap = {
        'teacher1': ['Maths', 'Physics', 'Biology'],
        'teacher2': ['English', 'History', 'Music'],
        'geography_teacher': ['Geography', 'Computer studies'],
        'music_teacher': ['Music'],
        'bio_teacher': ['Biology'],
        'comp_teacher': ['Computer studies']
        // Extend this mapping as needed
    };

    // Storage for marks records (student + subject)
    const marksData = [];

    // Display login name
    welcomeMsg.textContent = `Logged in as: ${loggedInUser}`;

    // Load permitted subjects based on logged-in user
    const allowedSubjects = teacherSubjectsMap[loggedInUser] || [];

    // Populate dropdown with permitted subjects
    function populateSubjects() {
        subjectSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
        allowedSubjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }

    populateSubjects();

    // Render the marks table
    function renderTable() {
        studentsTableBody.innerHTML = '';
        marksData.forEach((record, idx) => {
            const tr = document.createElement('tr');

            ['id', 'name', 'subject', 'marks'].forEach(field => {
                const td = document.createElement('td');
                td.textContent = record[field];
                tr.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'action-btn edit-btn';
            editBtn.onclick = () => fillFormForEdit(idx);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'action-btn delete-btn';
            deleteBtn.onclick = () => {
                marksData.splice(idx, 1);
                renderTable();
                resetForm();
            };

            actionsTd.appendChild(editBtn);
            actionsTd.appendChild(deleteBtn);
            tr.appendChild(actionsTd);

            studentsTableBody.appendChild(tr);
        });
    }

    // Fill form for editing
    function fillFormForEdit(idx) {
        const record = marksData[idx];
        document.getElementById('studentId').value = record.id;
        document.getElementById('studentName').value = record.name;
        document.getElementById('subjectSelect').value = record.subject;
        document.getElementById('studentMarks').value = record.marks;
        editIndex = idx;
        studentForm.querySelector('button').textContent = 'Update Student Marks';
    }

    // Reset form to default state
    function resetForm() {
        studentForm.reset();
        editIndex = -1;
        studentForm.querySelector('button').textContent = 'Add / Update Student Marks';
    }

    // Handle form submission
    document.getElementById('studentForm').addEventListener('submit', e => {
        e.preventDefault();

        const id = document.getElementById('studentId').value.trim();
        const name = document.getElementById('studentName').value.trim();
        const subject = document.getElementById('subjectSelect').value;
        const marksStr = document.getElementById('studentMarks').value.trim();

        if (!id || !name || !subject || marksStr === '') {
            alert('Please fill all fields!');
            return;
        }

        const marks = Number(marksStr);
        if (isNaN(marks) || marks < 0 || marks > 100) {
            alert('Marks must be a number between 0 and 100.');
            return;
        }

        // Enforce subject permission
        if (!allowedSubjects.includes(subject)) {
            alert(`You are not authorized to add marks for ${subject}.`);
            return;
        }

        const record = { id, name, subject, marks };

        if (editIndex === -1) {
            marksData.push(record);
        } else {
            marksData[editIndex] = record;
        }

        renderTable();
        resetForm();
    });

    // Logout clears localStorage and reloads login page
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
    });

    // Initial rendering
    renderTable();
});
