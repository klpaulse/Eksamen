
function getEmployeeHTML(index) {
    if (index < 0 || index >= employees.length) {
        return `<p>Ingen ansatt funnet på indeks ${index}</p>`;
    }

    const emp = employees[index];
    let coursesHTML = "";
    if (["rektor", "dekan", "vaktmester"].includes(emp.position.toLowerCase())) {
        coursesHTML = `<p class="kursiv">Ingen kursansvar</p>`;// #OPPD3
        //Lagt til  class="kursiv" slik at det er mulig å gjøre teksten "Ingen kursansvar" kursiv. 
        
    } else {
        if (Array.isArray(emp.courses)) {
            coursesHTML = `<p><strong>Kursansvar:</strong> ${emp.courses.join(", ")}</p>`;
        } else {
            coursesHTML = `<p><strong>Kursansvar:</strong> ${emp.courses}</p>`;
        }
    }

    // Bygg kortet
    let cardHTML = `
        <div class="employee-card">
            <h2>${emp.firstname} ${emp.lastname}</h2>
            <p><strong>Stilling:</strong> ${emp.position}</p>
            <p><strong>Kontor:</strong> ${emp.office}</p>
            <p><strong>E-post:</strong> <a href="mailto:${emp.email}">${emp.email}</a></p>
            <div>${coursesHTML}</div>
    `;



    //#OPPD3 lagt til en betingelse som gjør det mulig å ha slett ansatt knapp kun i admin.html. 
    if (window.location.pathname.includes("admin.html")) {
        cardHTML += `<button class="knapp" onclick="deleteEmployee(${index})">Slett ansatt</button>`;
    }

    cardHTML += `</div>`;
    return cardHTML;

}
            


function renderAllEmployees() {

    let employeesHTML = employees.map((emp, index) => getEmployeeHTML(index)).join("");

  
    document.getElementById("allemployees").innerHTML = employeesHTML;
}
renderAllEmployees();


function renderEmployeesByPosition(position) {
    
    const filtered = employees.filter(emp => emp.position.toLowerCase() === position.toLowerCase());

    
    let employeesHTML = filtered.map((emp, index) => {
       
        const originalIndex = employees.indexOf(emp);
        return getEmployeeHTML(originalIndex);
    }).join("");

    
    document.getElementById("allemployees").innerHTML = employeesHTML;
}


function renderAllEmployees() {
    let employeesHTML = employees.map((emp, index) => getEmployeeHTML(index)).join("");
    document.getElementById("allemployees").innerHTML = employeesHTML;
}




function renderUndervisere() {
    const undervisere = employees.filter(emp => 
        emp.position.toLowerCase() === "professor" || emp.position.toLowerCase() === "lektor"
    );

    let employeesHTML = undervisere.map(emp => {
        const index = employees.indexOf(emp);
        return getEmployeeHTML(index);
    }).join("");

    document.getElementById("allemployees").innerHTML = employeesHTML;
}


function getAllCourses() {
    let allCourses = [];
    employees.forEach(emp => {
        if (Array.isArray(emp.courses)) {
            allCourses.push(...emp.courses);
        } else if (typeof emp.courses === "string" && emp.courses.toLowerCase() !== "ingen kursansvar") {
            allCourses.push(emp.courses);
        }
    });
    
    let uniqueCourses = [...new Set(allCourses)].sort();
    
    return `<ul>` + uniqueCourses.map(course => `<li>${course}</li>`).join("") + `</ul>`;
}
document.getElementById("allecourses").innerHTML = getAllCourses();

function renderAdministrasjon() {
    const administrasjon = employees.filter(emp => 
        emp.position.toLowerCase() === "rektor" || 
        emp.position.toLowerCase() === "dekan" || 
        emp.position.toLowerCase() === "vaktmester"
    );

    let employeesHTML = administrasjon.map(emp => {
        const index = employees.indexOf(emp);
        return getEmployeeHTML(index);
    }).join("");

    document.getElementById("allemployees").innerHTML = employeesHTML;
}

function addEmployee(firstname, lastname, position, office, email, courses) {
    
    //#OPPD3
    //Lagt til dett oppsettet for å hente ut verdier fra inputfeltet i HTML-skjemaet ved hjelp av document.getElementById().value
    const printFname = document.getElementById("firstname").value
    const printLname = document.getElementById("lastname").value
    const printEpost = document.getElementById("epost").value
    const printOffice = document.getElementById("office").value
    const printStilling = document.getElementById("role").value

     let coursesValue;
   
    if (["Rektor", "Dekan", "Vaktmester"].includes(position)) {
        coursesValue = "ingen kursansvar";
    } else {
        
        coursesValue = Array.isArray(courses) ? courses : [courses];
    }
   
    const newEmployee = {
        firstname: printFname, //#OPPD3 fra firstname,
        lastname: printLname, //#OPPD3 fra lastname,
        position: printStilling, //#OPPD3 fra position,
        office: printOffice,//#OPPD3 fra office,
        email: printEpost, //#OPPD3 fra email,
        courses: coursesValue
    };
    
    employees.push(newEmployee);
  
   const index = employees.length-1
   userList.innerHTML += getEmployeeHTML(index)
}

function deleteEmployee(index) {
    if (index < 0 || index >= employees.length) {
        console.error("Ugyldig indeks:", index);
        return;
    }

    
    employees.splice(index, 1);
   
    renderAllEmployees();

    document.getElementById("allecourses").innerHTML = getAllCourses();
}



const btn = document.getElementById("nyansatt")
const userList = document.getElementById("allemployees")

btn.addEventListener("click", addEmployee)

