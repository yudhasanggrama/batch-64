// Ambil data dari localStorage atau buat array kosong
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let userId = parseInt(localStorage.getItem("userId")) || 1;
let editId = null;

// Elemen HTML
const form = document.getElementById("form");
const cardContainer = document.getElementById("cardContainer");
const modalForm = document.getElementById("modalForm");

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

// =========== HOF dan Callback untuk addProject atau push object projects ===========
function callFunction(callback) {
    callback(projects);
    saveProjects();
    renderProjects();
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
     // termasuk hof karena map menerima fungsi callback dari item
    // yang berfungsi mengembalikan property id dari setiap checkbox, lalu map() mengumpulkannya menjadi array baru.
    const checkedTech = Array.from(document.querySelectorAll("input.tech:checked"))
    // ambil id dari tiap checkbox
        .map(item => item.id);

    // jika user mengupload gambar buat url sementara untuk preview, jika tidak akan mengambil gambar default dari asset
    const imageURL = imgFile ? URL.createObjectURL(imgFile) : "../img/brandred.png";

    // mengambil tahun untuk di tampilkan
    const year = new Date(start).getFullYear();

    // membuat objek dari project dengan nama variabel user
    const user = {
        id: editId === null ? userId : editId,
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
    function useProject (data) {
        data.push(user);
    }

    callFunction(useProject)
    form.reset();

}

// function editProject
function editProject(id) {
    editId = id;
    const data = projects.find(item => item.id === id);

    const modal = document.getElementById("projectModal"); // pastikan modal punya id ini

    modal.querySelector("#project").value = data.project;
    modal.querySelector("#start").value = data.start;
    modal.querySelector("#end").value = data.end;
    modal.querySelector("#description").value = data.description;

    modal.querySelectorAll("input.tech").forEach(input => {
        input.checked = data.checkedTech.includes(input.id);
    });
}

function updateProject(e) {
    e.preventDefault();

    const update = {
        id: editId,
        project: modalForm.querySelector("#project").value,
        start: modalForm.querySelector("#start").value,
        end: modalForm.querySelector("#end").value,
        description: modalForm.querySelector("#description").value,
        checkedTech: Array.from(modalForm.querySelectorAll("input.tech:checked")).map(el => el.id),
        year: new Date(modalForm.querySelector("#start").value).getFullYear(),
        monthDuration: (() => {
            const startDate = new Date(modalForm.querySelector("#start").value);
            const endDate = new Date(modalForm.querySelector("#end").value);
            return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
        })(),
        imageURL: modalForm.querySelector("#img").files[0]
            ? URL.createObjectURL(modalForm.querySelector("#img").files[0])
            : projects.find(p => p.id === editId).imageURL 
    };

    function useProjectUpdate(data) {
        const index = data.findIndex(item => item.id === editId);
        if (index !== -1) data[index] = update;
    }

    callFunction(useProjectUpdate);
    modalForm.reset();
    editId = null;

    const bsModal = bootstrap.Modal.getInstance(document.getElementById("projectModal"));
    bsModal.hide();
}



// fungsi menampilkan ke halaman 
function renderProjects() {
    cardContainer.innerHTML = "";
    // perulangan untuk menambahkan tampilan card di html setiap submit
        projects.map((item) => {
        cardContainer.innerHTML += `
        <div class="col-md-4 mt-4 d-flex justify-content-center">
            <div class="card" style="width: 18rem;">
                <img src="${item.imageURL}" class="card-img-top" alt="${item.project}">
                <div class="card-body">
                    <a href="detail.html?id=${item.id}" class="text-decoration-none text-black">
                        <h6 class="card-title fw-bold">${item.project} - ${item.year}</h6>
                    </a>
                    <p class="card-text small text-muted">Durasi : ${item.monthDuration} bulan</p>
                    <p class="card-text">${item.description}</p>
                    ${generateTechIcons(item.checkedTech)}
                    <div class="d-flex gap-2 justify-content-center mt-2">
                        <button class="button" onclick="editProject(${item.id})" data-bs-toggle="modal" data-bs-target="#projectModal">Edit</button>
                        <button class="button"onclick="deleteProject(${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        });
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
function handleDelete(id, onAfterDelete) {
    projects = projects.filter(item => item.id !== id);
    saveProjects();

    if (typeof onAfterDelete === "function") {
        onAfterDelete();
    }
}

const deleteProject = (id) => {
    handleDelete(id, function () {
        renderProjects();
        alert("Project berhasil dihapus!");
    });
}


// Pasang event listener submit
form.addEventListener("submit", addProject);

modalForm.addEventListener("submit", updateProject);


