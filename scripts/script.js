let studentList = JSON.parse(sessionStorage.getItem('students')) || [];

// Salvar novo aluno
function saveStudent() {
  const studentName = document.getElementById('studentName').value.trim();
  if (!studentName) {
    alert("Por favor, insira o nome do aluno.");
    return;
  }
  studentList.push({ name: studentName });
  sessionStorage.setItem('students', JSON.stringify(studentList));
  document.getElementById('studentName').value = '';
  renderStudents();
}

// Renderizar a lista de alunos
function renderStudents() {
  const studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';
  studentList.forEach(student => {
    const studentCard = document.createElement('div');
    studentCard.innerHTML = `<p><strong>Nome:</strong> ${student.name}</p>`;
    studentListDiv.appendChild(studentCard);
  });
}

// Exportar para Excel
function exportToExcel() {
  const data = studentList.map(student => [student.name]);
  const worksheet = XLSX.utils.aoa_to_sheet([["Nome"]].concat(data));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Alunos");
  XLSX.writeFile(workbook, "alunos.xlsx");
}

document.getElementById('saveStudentBtn').addEventListener('click', saveStudent);
document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);

// Renderizar na inicialização
renderStudents();
