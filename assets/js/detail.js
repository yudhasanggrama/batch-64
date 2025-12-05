// Function untuk generate tech badge
function generateTechBadges(techs) {
    const icons = {
        nodejs: { icon: `<i class="fa-brands fa-node-js"></i>`, label: "Node Js" },
        nextjs: { icon: `<i class="fa-brands fa-react"></i>`, label: "Next Js" },
        reactjs: { icon: `<i class="fa-brands fa-react"></i>`, label: "React Js" },
        ts: { icon: `<i class="fa-solid fa-code"></i>`, label: "TypeScript" }
    };

    return techs
        .map(t => `
            <div class="tech-item d-flex align-items-center gap-2">
                ${icons[t]?.icon || ""}
                <span>${icons[t]?.label || ""}</span>
            </div>
        `)
        .join("");
}

function formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}


// Ambil ID dari URL query
const params = new URLSearchParams(window.location.search);
const selectedId = parseInt(params.get("id"));

// Ambil semua projects dari localStorage
const projectList = JSON.parse(localStorage.getItem("projects")) || [];

// Cari project berdasarkan id
const selectedProject = projectList.find(item => item.id === selectedId);

// Ambil container untuk render
const detailContainer = document.getElementById("detailContainer");


function renderDetail(projectData) {
    detailContainer.innerHTML = `
        <h1 class="text-center fw-bold mt-5">${projectData.project} - ${projectData.year}</h1>
        <div class="row mt-5">
            <div class="col-md-8">
                <img src="${projectData.imageURL}" class="img-fluid" alt="${projectData.project}">
            </div>
            <div class="col-md-4">
                <section>
                    <h5 class="fw-bold">Duration</h5>
                    <p>${formatDate(projectData.start)} - ${formatDate(projectData.end)}</p>
                </section>
                <section class="mt-2">
                    <h5 class="fw-bold">Technologies</h5>
                    <div class="tech-grid">
                    ${generateTechBadges(projectData.checkedTech)}
                    </div>
                </section>
            </div>
        </div>
        <div class="mt-3">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum explicabo ipsa voluptatibus dolorum similique vel facilis distinctio dignissimos sequi totam saepe itaque reprehenderit culpa odit delectus blanditiis, ex est nulla optio perferendis exercitationem accusamus ab aspernatur! Officia a odio quasi. Totam sunt accusamus molestias distinctio. Nobis, sit expedita ea minus at facilis asperiores nihil dolor ut deserunt tenetur voluptatum illum voluptatem libero dicta exercitationem dignissimos quae alias ab? Enim dolores praesentium expedita numquam cumque. Est ea harum deserunt consectetur, aperiam dolor, natus fuga suscipit aliquid non iusto ipsam odio cupiditate quod eligendi in. Ea itaque vero praesentium aperiam nobis possimus optio libero minima, doloribus inventore quo provident cumque officiis deleniti nostrum earum dolores ipsa, blanditiis incidunt delectus dicta necessitatibus? Ea aliquid molestiae incidunt soluta, a sed molestias et illo harum! Doloribus non modi eligendi, accusantium, tempore placeat eum accusamus similique quidem, quisquam sed nobis nemo eveniet. Eveniet enim quisquam veritatis. Deserunt numquam corporis sequi placeat id illum incidunt, animi dolor rerum aut, quos laboriosam in porro aspernatur, eaque impedit modi! Itaque a reprehenderit nobis autem nulla dolorem, reiciendis porro dolore quo voluptates laborum ducimus quibusdam consequatur nostrum quod voluptate quidem nemo excepturi cupiditate dicta! Sunt consequatur necessitatibus ex illum voluptates.</p>
        </div>
    `;
}

// Jalankan render jika data project ada
if (selectedProject) {
    renderDetail(selectedProject);
} else {
    detailContainer.innerHTML = `
        <h2 class="text-center text-danger mt-5">Project not found</h2>
    `;
}

