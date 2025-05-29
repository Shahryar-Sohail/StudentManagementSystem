let students = [];
let attendanceData = [];

fetch('api/data.json')
  .then(response => response.json())
  .then(data => {
    students = data; // Store the fetched data in the students variable
    const container = document.getElementById('cardContainer');
    document.getElementById('studentCount').textContent = `Count: ${students.length}`;

    data.forEach(student => {
      const card = document.createElement('div');
      card.className = 'col-lg-4 col-md-6 mb-4 d-flex justify-content-center';

      card.innerHTML = `
        <div class="card" style="width: 20rem;">
          <img src="${student.image}" class="card-img-top" style="height: 300px; alt="Student image">
          <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${student.id}</li>
            <li class="list-group-item">Degree Name: ${student.degree}</li>
            <li class="list-group-item">Semester: ${student.semester}</li>
            <li class="list-group-item">CGPA: ${student.cgpa}</li>
            <li class="list-group-item">Gender: ${student.gender}</li>
            <li class="list-group-item">Email: ${student.email}</li>
            <li class="list-group-item">Contact: ${student.contact}</li>
          </ul>
          <div class="card-body d-flex justify-content-around">
            <button class="btn btn-primary px-4" onclick= "edit_click('${student.id}')">Edit</button>
            <button class="btn btn-danger px-4" onclick= delete_click()>Delete</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Failed to fetch student data:', err));

function edit_click(id) {
  // alert(` Edit button clicked ${id}`);
  document.getElementById('editOverlay').style.display = 'block';

  const student = students.find(s => s.id === id);
  if (!student) return;

  // Populate the form fields with student data
  document.getElementById('editId').value = student.id;
  document.getElementById('editName').value = student.name;
  document.getElementById('editDegree').value = student.degree;
  document.getElementById('editSemester').value = student.semester;
  document.getElementById('editCgpa').value = student.cgpa;
  document.getElementById('editGender').value = student.gender;
  document.getElementById('editEmail').value = student.email;
  document.getElementById('editContact').value = student.contact;
  document.getElementById('editImage').value = student.image;

}
function closeOverlay() {
  document.getElementById('editOverlay').style.display = 'none';
  document.body.style.opacity = 1;
}
function delete_click() {
  alert("Delete button clicked");
}

function searchStudent() {
  const input = document.getElementById('search').value.toLowerCase();
  const container = document.getElementById('cardContainer');
  container.innerHTML = ''; // Clear previous cards

  students.forEach(student => {
    if (student.name.toLowerCase().includes(input) || student.id.toLowerCase().includes(input)) {
      const card = document.createElement('div');
      card.className = 'col-lg-4 col-md-6 mb-4 d-flex justify-content-center';

      card.innerHTML = `
        <div class="card" style="width: 20rem;">
          <img src="${student.image}" class="card-img-top" style="height: 300px;" alt="Student image">
          <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${student.id}</li>
            <li class="list-group-item">Degree Name: ${student.degree}</li>
            <li class="list-group-item">Semester: ${student.semester}</li>
            <li class="list-group-item">CGPA: ${student.cgpa}</li>
            <li class="list-group-item">Gender: ${student.gender}</li>
            <li class="list-group-item">Email: ${student.email}</li>
            <li class="list-group-item">Contact: ${student.contact}</li>
          </ul>
          <div class="card-body d-flex justify-content-around">
            <button class="btn btn-primary px-4" onclick="edit_click('${student.id}')">Edit</button>
            <button class="btn btn-danger px-4" onclick="delete_click()">Delete</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  });
}

function toggleDarkMode() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-bs-theme');
  const btn = document.getElementById("btn_toggle");
  btn.classList.toggle("text-white");

  if (currentTheme === 'light') {
    body.setAttribute('data-bs-theme', 'dark');
  } else {
    body.setAttribute('data-bs-theme', 'light');
  }

}

// attendance 
function create(params) {
  const lectureDate = document.getElementById('calender').value;
  if (lectureDate != "") {
    fetch('api/data.json')
      .then(response => response.json())
      .then(data => {
        students = data; // Store the fetched data in the students variable
        const attendanceTable = document.getElementById('attendanceTable');
        document.getElementById('studentCount').textContent = `Count: ${students.length}`;
        document.getElementById('date').textContent = `${lectureDate}`

        data.forEach((student, index) => {
          const tr = document.createElement('tr');
          tr.setAttribute('data-id', student.id);
          // tr.className = '';

          tr.innerHTML = `
        <td class="p-2">${student.id}</td>
        <td class="p-2">${student.name}</td>
        <td class="p-2">
          <input class="form-check-input bg-secondary" type="checkbox" id="checkbox-${student.id}">
        </td>
      `;

          attendanceTable.appendChild(tr);
        });
      })
      .catch(err => console.error('Failed to fetch student data:', err));
  }
  else {
    alert("Please Enter Lecture Date");
  }

}

// attendance Save 
function save(params) {
  attendanceData.length = 0; // clear previous attendance records

  const lectureDate = document.getElementById('calender').value;

  const rows = document.querySelectorAll('#attendanceTable tr');
  rows.forEach(row => {
    const studentId = row.getAttribute('data-id');
    const studentName = row.children[1].textContent; // second column = name
    const checkbox = row.querySelector('input[type="checkbox"]');
    const status = checkbox.checked ? "Present" : "Absent";

    attendanceData.push({
      id: studentId,
      name: studentName,
      status: status,
      date: lectureDate
    });
  });

  // Print or store the result
  console.log(attendanceData);
  alert("Attendance Saved Successfully");
}

function view() {
  const lectureDate = document.getElementById('calender').value;
  if (attendanceData.length === 0) {
    alert("No attendance data available to view.");
    return;
  }
  else {
    // Hide the original attendance table container
    document.getElementById('attendanceTable').parentElement.style.display = 'none';
    document.getElementById('saveBtn').style.display = 'none';

    // Show the container of the view table
    document.getElementById('attendanceViewContainer').style.display = 'block';


    // Set the date in view table
    document.getElementById('viewDate').textContent = lectureDate;

    // Clear previous rows
    const viewTableBody = document.getElementById('viewAttendanceTable');
    viewTableBody.innerHTML = '';

    // Add rows
    attendanceData.forEach(student => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td class="p-2">${student.id}</td>
      <td class="p-2">${student.name}</td>
      <td class="p-2">${student.status}</td>
    `;
      viewTableBody.appendChild(tr);
    });
  }

}
