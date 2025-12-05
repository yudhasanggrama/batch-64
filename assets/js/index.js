// Ambil data dari localStorage atau buat array kosong
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let userId = parseInt(localStorage.getItem("userId")) || 1;

// Elemen HTML
const form = document.getElementById("form");
const cardContainer = document.getElementById("cardContainer");

// jalankan ketika load
loadProjects();
renderProjects();

// =========== FUNCTION LOAD DATA ================
function loadProjects() {
    const storedData = localStorage.getItem("projects");
    projects = storedData ? JSON.parse(storedData) : [];
}

// =========== FUNCTION SAVE DATA =================
function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

// =========== FUNCTION ADD PROJECT ===============
function addProject(e) {
    e.preventDefault();

    // melakukan pengecekan jika sudah ada projek maka akan mengambil id dari projek terakhir, jika tidak ada maka id = 1
    userId = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;

    // mengambil element form berdasarkan idnya
    const project = document.getElementById("project").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const description = document.getElementById("description").value;
    const imgFile = document.getElementById("img").files[0];

    // mengubah string tanggal dan input menjadi objek date
    const startDate = new Date(start);
    const endDate = new Date(end);

    // menghitung selisih tahun yang di konversi menjadi bulan
    const monthDuration =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        // menambahkan selisih bulan yang menghasilkan total durasi program/project
        (endDate.getMonth() - startDate.getMonth());

    // mengambil semua checkbox yang telah di centang dan mengubahnya menjadi array string yang berisi daftar teknologi yang dipilih 
    const checkedTech = Array.from(document.querySelectorAll("input.tech:checked"))
    // ambil id dari tiap checkbox
        .map(item => item.id);

    // jika user mengupload gambar buat url sementara untuk preview, jika tidak akan mengambil gambar default dari asset
    const imageURL = imgFile ? URL.createObjectURL(imgFile) : "../img/brandred.png";

    // mengambil tahun untuk di tampilkan
    const year = new Date(start).getFullYear();

    // membuat objek dari project dengan nama variabel user
    const user = {
        id: userId,
        project,
        start,
        end,
        year,
        monthDuration,
        description,
        checkedTech,
        imageURL,
    };

    // tambah baru ke array
    projects.push(user);

    // simpah array ke localstorage
    saveProjects();
    // render card project di halaman
    renderProjects();
    // reset form supaya kosong setelah submit
    form.reset();
}

// fungsi menampilkan ke halaman 
function renderProjects() {
    cardContainer.innerHTML = "";
    // perulangan untuk menambahkan tampilan card di html setiap submit
    for (let i = 0; i < projects.length; i++) {
        const item = projects[i]; 

        cardContainer.innerHTML += `
        <div class="col-md-4 card-container">
            <div class="card" style="width: 18rem;">
                <img src="${item.imageURL}" class="card-img-top " alt="${item.project} - ${item.year}">
                <div class="card-body">
                    <a href="detail.html?id=${item.id}" class="text-decoration-none text-black">
                        <h6 class="card-title fw-bold">${item.project} - ${item.year}</h6>
                    </a>
                    <p class="card-text small text-muted">Durasi : ${item.monthDuration} bulan</p>
                    <p class="card-text">${item.description}</p>
                    ${generateTechIcons(item.checkedTech)}
                    <div class="d-flex gap-2 justify-content-center mt-2">
                        <button class="button" onclick="editProject(${i})">Edit</button>
                        <button class="button" onclick="deleteProject(${i})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

// =========== GENERATE ICONS =====================
function generateTechIcons(techs) {
    const icons = {
        nodejs: `<i class="fa-brands fa-node-js"></i>`,
        nextjs: `<i class="fa-brands fa-react"></i>`,
        reactjs: `<i class="fa-solid fa-code"></i>`,
        ts: `<i class="fa-solid fa-code"></i>`
    };

    return techs.map(t => icons[t] || "").join(" ");
}

// =========== DELETE PROJECT =====================
function deleteProject(index) {
    projects.splice(index, 1);
    saveProjects();
    renderProjects();
}

// Pasang event listener submit
form.addEventListener("submit", addProject);

