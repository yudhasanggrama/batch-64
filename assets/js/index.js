// membuat variabel dengan memanggil id form
const form = document.getElementById("form");

// membuat variabel dengan memanggil id cardContainer
const cardContainer = document.getElementById("cardContainer");

// membuat event ketika di submit menjalankan fungsi event
form.addEventListener("submit", function (e) {

    // Mencegah perilaku default form yaitu reload halaman dan mengirim data ke server. Jadi proses submit ditangani JavaScript tanpa refresh.
    e.preventDefault();

    // mengambil nilai input dari form (isi text yang di input) berdasarkan id
    const project = document.getElementById("project").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const description = document.getElementById("description").value;
    const imgFile = document.getElementById("img").files[0];

    // converting string tanggal atau menghitung durasi
    const startDate = new Date(start);
    const endDate = new Date(end);
    const monthDuration = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

    // mengambil semua nilai yang di centang dengan menconvert nodelist to array
    const checkedTech = Array.from(document.querySelectorAll("input.tech:checked"))
    // mengambil dari masing masing checkbox
        .map(item => item.id);

    // jika upload gambar akan membuat url sementara untuk preview, jika tidak upload akan mengambil dari folder asset
    const imageURL = imgFile ? URL.createObjectURL(imgFile) : "assets/img/profile.jpg";

    // mengambil tahun dari tanggal start dan membuat judulnya
    const year = new Date(start).getFullYear();
    const projectTitle = `${project} - ${year}`;

    // menyimpan semua project ke array sebagai object baru
    const ProjectData = {
        projectTitle,
        monthDuration,
        description,
        imageURL,
        checkedTech
    };

    alert("Data berhasil di tambahkan!");

    console.log(ProjectData);

    form.reset();
    
});
