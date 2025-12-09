function getEmployeeHTML(index) {
    if (index < 0 || index >= employees.length) {
        return `<p>Ingen ansatt funnet på indeks ${index}</p>`;
    }

    const emp = employees[index];

    let coursesHTML = "";
    if (["rektor", "dekan", "vaktmester"].includes(emp.position.toLowerCase())) {
        coursesHTML = `<p class="kursiv">Ingen kursansvar</p>`;
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

    // Legg til slett-knapp hvis vi er på admin-siden
    if (window.location.pathname.includes("admin.html")) {
        cardHTML += `<button class="knapp" onclick="deleteEmployee(${index})">Slett ansatt</button>`;
    }

    cardHTML += `</div>`;
    return cardHTML;
}

            

   

// Funksjon som skriver ut ALLE ansatte
function renderAllEmployees() {
    // Bruker getEmployeeHTML for hver ansatt
    let employeesHTML = employees.map((emp, index) => getEmployeeHTML(index)).join("");

    // Setter inn i containeren med id "allemployees"
    document.getElementById("allemployees").innerHTML = employeesHTML;
}
renderAllEmployees();

// Funksjon som viser alle ansatte med gitt stilling
function renderEmployeesByPosition(position) {
    // Filtrer ansatte basert på stilling
    const filtered = employees.filter(emp => emp.position.toLowerCase() === position.toLowerCase());

    // Bygg HTML med getEmployeeHTML
    let employeesHTML = filtered.map((emp, index) => {
        // Vi må finne indeksen til emp i original-arrayen
        const originalIndex = employees.indexOf(emp);
        return getEmployeeHTML(originalIndex);
    }).join("");

    // Sett inn i containeren
    document.getElementById("allemployees").innerHTML = employeesHTML;
}

// Funksjon som viser alle ansatte
function renderAllEmployees() {
    let employeesHTML = employees.map((emp, index) => getEmployeeHTML(index)).join("");
    document.getElementById("allemployees").innerHTML = employeesHTML;
}



// Funksjon som viser alle undervisere (professor + lektor)
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
    // Fjern duplikater og sorter alfabetisk
    let uniqueCourses = [...new Set(allCourses)].sort();
    // Returner som HTML-liste
    return `<ul>` + uniqueCourses.map(course => `<li>${course}</li>`).join("") + `</ul>`;
}
document.getElementById("allecourses").innerHTML = getAllCourses();


// Funksjon som viser administrasjonen (rektor, dekaner, vaktmester)
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

// Legg til ny ansatt uavhengig av stilling
function addEmployee() {
    let coursesValue;
    const printFname = document.getElementById("firstname").value;
    const printLname = document.getElementById("lastname").value;
    const printEpost = document.getElementById("epost").value;
    const printOffice = document.getElementById("office").value;
    const printStilling = document.getElementById("role").value;
    const printCourse = document.getElementById("course").value;

    // Hvis stillingen er Rektor, Dekan eller Vaktmester → ingen kursansvar
    if (["Rektor", "Dekan", "Vaktmester"].includes(printStilling)) {
        coursesValue = "ingen kursansvar";
    } else {
        coursesValue = [printCourse]; // lagres som array
    }

    const newEmployee = {
        firstname: printFname,
        lastname: printLname,
        position: printStilling,
        office: printOffice,
        email: printEpost,
        courses: coursesValue
    };

    employees.push(newEmployee);

    const index = employees.length - 1;
    userList.innerHTML += getEmployeeHTML(index);
}

function deleteEmployee(index) {
    if (index < 0 || index >= employees.length) {
        console.error("Ugyldig indeks:", index);
        return;
    }

    // Fjern ansatt fra arrayen
    employees.splice(index, 1);

    // Oppdater visningen
    renderAllEmployees();

    // Oppdater kurslisten også (hvis du vil at den skal oppdatere automatisk)
    document.getElementById("allecourses").innerHTML = getAllCourses();
}



const btn = document.getElementById("nyansatt")
const userList = document.getElementById("allemployees")

btn.addEventListener("click", addEmployee)


  


