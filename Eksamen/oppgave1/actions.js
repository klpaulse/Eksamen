function getEmployeeHTML(index) {
    if (index < 0 || index >= employees.length) {
        return `<p>Ingen ansatt funnet på indeks ${index}</p>`;
    }

    const emp = employees[index];

    let coursesHTML = "";
    // Sjekk stilling: Rektor, Dekan, Vaktmester
    if (["rektor", "dekan", "vaktmester"].includes(emp.position.toLowerCase())) {
        coursesHTML = `<p>ingen kursansvar</p>`;
    } else {
        // Undervisere: professor og lektor
        if (Array.isArray(emp.courses)) {
            coursesHTML = `<p><strong>Kursansvar:</strong> ${emp.courses.join(", ")}</p>`;
        } else {
            coursesHTML = `<p><strong>Kursansvar:</strong> ${emp.courses}</p>`;
        }
    }

    return `
        <div class="employee-card">
            <h2>${emp.firstname} ${emp.lastname}</h2>
            <p><strong>Stilling:</strong> ${emp.position}</p>
            <p><strong>Kontor:</strong> ${emp.office}</p>
            <p><strong>E-post:</strong> <a href="mailto:${emp.email}">${emp.email}</a></p>
            <div>${coursesHTML}</div>
        </div>
    `;
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

// Funksjon som viser administrasjonen (rektor, dekaner, vaktmester)
function renderAdministrasjon() {
    const administrasjon = employees.filter(emp => 
        emp.position.toLowerCase() === "rektor" || 
        emp.position.toLowerCase() === "dekaner" || 
        emp.position.toLowerCase() === "vaktmester"
    );

    let employeesHTML = administrasjon.map(emp => {
        const index = employees.indexOf(emp);
        return getEmployeeHTML(index);
    }).join("");

    document.getElementById("allemployees").innerHTML = employeesHTML;
}

// Legg til ny ansatt uavhengig av stilling
function addEmployee(firstname, lastname, position, office, email, courses) {
    let coursesValue;

    // Hvis stillingen er Rektor, Dekan eller Vaktmester → ingen kursansvar
    if (["Rektor", "Dekan", "Vaktmester"].includes(position)) {
        coursesValue = "ingen kursansvar";
    } else {
        // Sørg for at kurs alltid lagres som array
        coursesValue = Array.isArray(courses) ? courses : [courses];
    }

    // Opprett nytt objekt med samme struktur som employees-arrayen
    const newEmployee = {
        firstname: firstname,
        lastname: lastname,
        position: position,
        office: office,
        email: email,
        courses: coursesValue
    };

    // Legg til i registeret
    employees.push(newEmployee);

    // Bekreftelse i konsollen
    console.log(`${firstname} ${lastname} er lagt til som ${position}.`);
}

function deleteEmployee(identifier) {
    // Finn indeksen til den ansatte basert på navn eller e-post
    const index = employees.findIndex(emp => 
        emp.name.toLowerCase() === identifier.toLowerCase() ||
        emp.email.toLowerCase() === identifier.toLowerCase()
    );

    if (index !== -1) {
        // Fjern den ansatte fra arrayen
        const removed = employees.splice(index, 1)[0];
        console.log(`${removed.name} er slettet fra registeret.`);
        return true;
    } else {
        console.log(`Fant ingen ansatt med identifikator: ${identifier}`);
        return false;
    }
}

const btn = document.getElementById("nyansatt")
let userRegister = []
btn.addEventListener("click", printEmployee)

function printEmployee (){
    const printFname = document.getElementById("firstname").value
    const printLname = document.getElementById("lastname").value
    const printepost = document.getElementById("epost").value
    const printOffice = document.getElementById("office").value
    const printStilling = document.getElementById("role").value

}