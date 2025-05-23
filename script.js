let students = [];
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

  if (currentTheme === 'light') {
    body.setAttribute('data-bs-theme', 'dark');
  } else {
    body.setAttribute('data-bs-theme', 'light');
  }

}