//The function called form GUI.html upon button click
async function getAllStudents(){
    //Fetch getAllStudents from the back end
    const response = await fetch(`http://localhost:3000/getAllStudents`);

    //Grab the returned data and set the new table to the new table data
    const data = await response.json();
    document.getElementById("table_text").innerHTML = JSON.stringify(data);
}

//The function called form GUI.html upon button click
async function addStudent(){
    //Grab the text from within the input tags
    const first_name = document.getElementById("addStudentFirstName").value;
    const last_name = document.getElementById("addStudentLastName").value;
    const email = document.getElementById("addStudentEmail").value;
    const enrollment_date = document.getElementById("addStudentEnrollmentDate").value;

    //Fetch addStudent from the back end with the arguments required
    await fetch(`http://localhost:3000/addStudent?first_name=${first_name}&last_name=${last_name}&email=${email}&enrollment_date=${enrollment_date}`);
}

//The function called form GUI.html upon button click
async function updateStudentEmail(){
     //Grab the text from within the input tags
    const student_id = document.getElementById("updateStudentEmailStudentId").value;
    const new_email = document.getElementById("updateStudentEmailNewEmail").value;

    //Fetch updateStudentEmail from the back end with the arguments required
    await fetch(`http://localhost:3000/updateStudentEmail?student_id=${student_id}&new_email=${new_email}`);
}

//The function called form GUI.html upon button click
async function deleteStudent(){
     //Grab the text from within the input tags
    const student_id = document.getElementById("deleteStudentStudentId").value;

    //Fetch deleteStudent from the back end with the arguments required
    await fetch(`http://localhost:3000/deleteStudent?student_id=${student_id}`);
}