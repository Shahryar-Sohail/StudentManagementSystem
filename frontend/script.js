let students = [];
let attendanceData = [];

fetch('http://localhost:3000/api/students')
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
            
            <input type="hidden" class="mongo-id" value="${student._id}" />
            
            <li class="list-group-item">ID: ${student.id}</li>
            <li class="list-group-item">Degree Name: ${student.degree}</li>
            <li class="list-group-item">Semester: ${student.semester}</li>
            <li class="list-group-item">CGPA: ${student.cgpa}</li>
            <li class="list-group-item">Gender: ${student.gender}</li>
            <li class="list-group-item">Email: ${student.email}</li>
            <li class="list-group-item">Contact: ${student.contact}</li>
          </ul>
          <div class="card-body d-flex justify-content-around">
            <button class="btn btn-primary px-4" onclick= "edit_click('${student._id}')">Edit</button>
            <button class="btn btn-danger px-4" onclick= delete_click('${student._id}')>Delete</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Failed to fetch student data:', err));

function edit_click(mongoId) {
  // alert(` Edit button clicked ${mongoId}`);
  const student = students.find(s => s._id === mongoId); // note _id from MongoDB
  if (!student) return;

  // Store real MongoDB _id in a hidden field
  document.getElementById('editMongoId').value = student._id;
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
  document.getElementById('editOverlay').style.display = 'block';

}

function updateStudent() {
  const mongoId = document.getElementById('editMongoId').value;

  const updatedData = {
    id: document.getElementById('editId').value,
    name: document.getElementById('editName').value,
    degree: document.getElementById('editDegree').value,
    semester: document.getElementById('editSemester').value,
    cgpa: document.getElementById('editCgpa').value,
    gender: document.getElementById('editGender').value,
    email: document.getElementById('editEmail').value,
    contact: document.getElementById('editContact').value,
    image: document.getElementById('editImage').value
  };

  fetch(`http://localhost:3000/api/students/${mongoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
  .then(res => res.json())
  .then(data => {
    // alert("✅ Student updated successfully!");
    document.getElementById('editOverlay').style.display = 'none';
    // location.reload(); // or re-fetch student data and update UI
  })
  .catch(err => {
    console.error('❌ Update failed:', err);
    alert("❌ Update failed");
  });
}

function closeOverlay() {
  document.getElementById('editOverlay').style.display = 'none';
  document.body.style.opacity = 1;
}


function delete_click(id) {
    const student = students.find(s => s._id === id);
    if (!student) return;

    if (!confirm(`❗ Are you sure you want to delete ${student.name}?`)) return;

  fetch(`http://localhost:3000/api/students/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      // alert("✅ Student deleted");
      location.reload(); // Refresh the UI after delete
    })
    .catch(err => {
      console.error('❌ Delete failed:', err);
      alert("❌ Delete failed");
    });
}

function addStudent(e) {
  e.preventDefault(); // prevent form reload

  const studentData = {
    name: document.getElementById('studentName').value,
    id: document.getElementById('studentId').value,
    degree: document.getElementById('degreeName').value,
    semester: document.getElementById('semester').value,
    cgpa: document.getElementById('cgpa').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value,
    contact: document.getElementById('contact').value,
    image: document.getElementById('imageUrl').value
  };

  fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
  })
  .then(res => res.json())
  .then(data => {
    alert("✅ Student added!");
    location.reload(); // optional
  })
  .catch(err => {
    console.error("❌ Failed to add student:", err);
    alert("❌ Failed to add student");
  });
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

  if (lectureDate === "") {
    alert("Please Enter Lecture Date");
    return;
  }

  fetch('http://localhost:3000/api/students')
    .then(response => response.json())
    .then(data => {
      const attendanceTable = document.getElementById('attendanceTable');
      attendanceTable.innerHTML = ""; // clear old rows

      document.getElementById('studentCount').textContent = `Count: ${data.length}`;
      document.getElementById('date').textContent = ` ${lectureDate}`;

      data.forEach(student => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', student._id);

        tr.innerHTML = `
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>
            <input class="form-check-input" type="checkbox" id="checkbox-${student._id}" />
          </td>
        `;

        attendanceTable.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('❌ Failed to fetch student data:', err);
      alert("❌ Failed to load students");
    });


  }

// attendance Save 
function save(params) {
const date = document.getElementById('calender').value;
  const rows = document.querySelectorAll('#attendanceTable tr');

  rows.forEach(row => {
    const studentId = row.children[0].textContent;
    const name = row.children[1].textContent;
    const checkbox = row.querySelector('input[type="checkbox"]');
    const isPresent = checkbox.checked;

    const attendanceData = {
      studentId,
      name,
      date,
      isPresent
    };

    // 🔹 Save each attendance record
    fetch('http://localhost:3000/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attendanceData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(`✅ Saved: ${data.name}`);
    })
    .catch(err => {
      console.error('❌ Error saving attendance:', err);
    });
  });

  alert("✅ Attendance saved for all students");
  location.reload();
}

function view() {

    // 🔸 Hide default rows
  document.querySelectorAll('.tr-default').forEach(row => row.style.display = 'none');

  fetch('http://localhost:3000/api/attendance')
    .then(res => res.json())
    .then(records => {
      const table = document.getElementById('attendanceTable');
      table.innerHTML = "";

      // Group by studentId → name mapping and date-based attendance
      const studentMap = {};  // { id: { name, dates: { '2025-06-17': true/false } } }
      const allDates = new Set();

      records.forEach(record => {
        allDates.add(record.date);

        if (!studentMap[record.studentId]) {
          studentMap[record.studentId] = {
            name: record.name,
            dates: {}
          };
        }

        studentMap[record.studentId].dates[record.date] = record.isPresent;
      });

      const sortedDates = Array.from(allDates).sort(); // Optional: sort chronologically

      // Build table header
      let headerRow = `
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          ${sortedDates.map(date => `<th>${date}</th>`).join('')}
        </tr>
      `;

      table.innerHTML += headerRow;

      // Build table body
      Object.entries(studentMap).forEach(([studentId, info]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${studentId}</td>
          <td>${info.name}</td>
          ${sortedDates.map(date => {
            const isPresent = info.dates[date];
            if (isPresent === undefined) return `<td>-</td>`;
            return `<td class="${isPresent ? 'text-success' : 'text-danger'}">
                      ${isPresent ? '✅' : '❌'}
                    </td>`;
          }).join('')}
        `;
        table.appendChild(tr);
      });

      document.getElementById('studentCount').textContent = `🧾 Total Students: ${Object.keys(studentMap).length}`;
      // document.getElementById('date').textContent = `🗓 Columns = Dates`;
    })
    .catch(err => {
      console.error('❌ Failed to fetch attendance:', err);
      alert("❌ Cannot fetch attendance");
    });

}
