/* =========================================================
   script.js - Halaman Profil Daffa Alfany (Tugas 3)

   Pola kerja setiap fitur:  PILIH elemen -> DENGARKAN event -> UBAH halaman

   Daftar isi:
   1. Fitur Dark/Light Mode
   2. Fitur Galeri Sertifikat
   3. Fitur Accordion / FAQ
   4. Fitur Validasi Form
   5. Efek Jejak Kursor (bintang & garis)
   6. Menjalankan semua fitur
   ========================================================= */


/* ---------- 1. Fitur Dark/Light Mode ---------- */

function aturTema() {
    // PILIH tombol tema
    const tombolTema = document.querySelector("#tombol-tema");

    // DENGARKAN klik
    tombolTema.addEventListener("click", function () {
        // UBAH: tambah/hapus class "gelap" pada <body>
        document.body.classList.toggle("gelap");

        // Ganti tulisan tombol sesuai tema yang sedang aktif
        if (document.body.classList.contains("gelap")) {
            tombolTema.innerHTML = '<span class="ikon-tema">☀️</span> Mode Siang';
        } else {
            tombolTema.innerHTML = '<span class="ikon-tema">🌙</span> Mode Malam';
        }
    });
}


/* ---------- 2. Fitur Galeri Sertifikat ---------- */

function aturGaleri() {
    // PILIH gambar utama, keterangannya, dan SEMUA thumbnail
    const gambarUtama = document.querySelector("#gambar-utama");
    const keterangan = document.querySelector("#keterangan-gambar");
    const daftarThumb = document.querySelectorAll(".thumb");

    // Pasang event klik pada setiap thumbnail (perulangan for...of)
    for (const thumb of daftarThumb) {
        thumb.addEventListener("click", function () {
            const gambarKecil = thumb.querySelector("img");

            // Tandai thumbnail yang dipilih, hapus tanda dari yang lain
            for (const item of daftarThumb) {
                item.classList.remove("aktif");
            }
            thumb.classList.add("aktif");

            // Efek memudar: sembunyikan sebentar, ganti gambar, tampilkan lagi
            gambarUtama.classList.add("memudar");
            setTimeout(function () {
                gambarUtama.src = gambarKecil.src;
                gambarUtama.alt = gambarKecil.alt;
                keterangan.textContent = gambarKecil.alt;
                gambarUtama.classList.remove("memudar");
            }, 250);
        });
    }
}


/* ---------- 3. Fitur Accordion / FAQ ---------- */

function aturFaq() {
    // PILIH semua tombol pertanyaan
    const daftarTanya = document.querySelectorAll(".faq-tanya");

    for (const tanya of daftarTanya) {
        tanya.addEventListener("click", function () {
            // Jawaban adalah elemen tepat setelah tombol pertanyaan
            const jawab = tanya.nextElementSibling;

            // UBAH: tampilkan jika tersembunyi, sembunyikan jika tampil
            jawab.hidden = !jawab.hidden;

            // Putar ikon + menjadi x dan beri info untuk pembaca layar
            tanya.classList.toggle("terbuka", !jawab.hidden);
            tanya.setAttribute("aria-expanded", !jawab.hidden);
        });
    }
}


/* ---------- 4. Fitur Validasi Form ---------- */

// Menampilkan pesan error di bawah isian dan memberi garis merah
function tampilkanError(isian, idError, pesan) {
    const tempatError = document.querySelector(idError);
    tempatError.textContent = pesan;

    if (isian !== null) {
        isian.classList.add("is-invalid");
    }
}

// Menghapus semua pesan error sebelum pengecekan ulang
function hapusSemuaError() {
    const daftarError = document.querySelectorAll(".pesan-error");
    for (const tempatError of daftarError) {
        tempatError.textContent = "";
    }

    const daftarSalah = document.querySelectorAll(".is-invalid");
    for (const isian of daftarSalah) {
        isian.classList.remove("is-invalid");
    }
}

// Memeriksa format email sederhana: ada "@" dan ada "." setelahnya
function emailValid(email) {
    const posisiAt = email.indexOf("@");
    const posisiTitik = email.lastIndexOf(".");
    return posisiAt > 0 && posisiTitik > posisiAt + 1 && posisiTitik < email.length - 1;
}

// Memeriksa semua isian; hasilnya true jika semua benar
function validasiForm() {
    const nama = document.querySelector("#fnama");
    const email = document.querySelector("#femail");
    const pesan = document.querySelector("#fpesan");
    const keperluan = document.querySelector('input[name="fkeperluan"]:checked');

    let semuaBenar = true;
    hapusSemuaError();

    // .trim() membuang spasi di awal & akhir, supaya isian "   " dianggap kosong
    if (nama.value.trim() === "") {
        tampilkanError(nama, "#error-nama", "Nama wajib diisi.");
        semuaBenar = false;
    }

    if (email.value.trim() === "") {
        tampilkanError(email, "#error-email", "Email wajib diisi.");
        semuaBenar = false;
    } else if (!emailValid(email.value.trim())) {
        tampilkanError(email, "#error-email", "Format email belum benar, contoh: nama@gmail.com");
        semuaBenar = false;
    }

    if (keperluan === null) {
        tampilkanError(null, "#error-keperluan", "Pilih salah satu keperluan.");
        semuaBenar = false;
    }

    if (pesan.value.trim().length < 10) {
        tampilkanError(pesan, "#error-pesan", "Pesan minimal 10 karakter.");
        semuaBenar = false;
    }

    return semuaBenar;
}

function aturForm() {
    // PILIH form dan tempat pesan berhasil
    const form = document.querySelector("#form-kontak");
    const pesanForm = document.querySelector("#pesan-form");

    // DENGARKAN saat form dikirim
    form.addEventListener("submit", function (event) {
        // Hentikan pengiriman bawaan (halaman tidak reload)
        event.preventDefault();
        pesanForm.hidden = true;

        if (validasiForm()) {
            const nama = document.querySelector("#fnama").value.trim();

            // UBAH: tampilkan pesan berhasil, lalu kosongkan form
            pesanForm.textContent = "Terima kasih, " + nama + "! Pesan Anda sudah diterima.";
            pesanForm.hidden = false;
            form.reset();
        }
    });

    // Saat pengguna mulai mengetik lagi, garis merah pada isian itu dihapus
    const daftarIsian = document.querySelectorAll("#form-kontak .form-control");
    for (const isian of daftarIsian) {
        isian.addEventListener("input", function () {
            isian.classList.remove("is-invalid");
        });
    }
}


/* ---------- 5. Efek Jejak Kursor (bintang & garis) ---------- */

const wadahJejak = document.querySelector("#jejak-kursor");
let xTerakhir = -100;
let yTerakhir = -100;

// Membuat satu titik bercahaya; titik-titik yang rapat terlihat seperti garis
function buatTitik(x, y) {
    const titik = document.createElement("span");
    titik.className = "titik-jejak";
    titik.style.left = x + "px";
    titik.style.top = y + "px";
    wadahJejak.appendChild(titik);

    // Hapus elemen setelah animasinya selesai, supaya halaman tetap ringan
    titik.addEventListener("animationend", function () {
        titik.remove();
    });
}

// Membuat satu bintang kecil yang terlempar ke arah acak lalu memudar
function buatBintang(x, y) {
    const bintang = document.createElement("span");
    bintang.className = "bintang-jejak";
    bintang.textContent = "✦";

    // Warna bintang mengikuti tema yang sedang aktif
    let daftarWarna;
    if (document.body.classList.contains("gelap")) {
        daftarWarna = ["#fde68a", "#ffffff", "#5eead4", "#c4b5fd"];
    } else {
        daftarWarna = ["#a855f7", "#14b8a6", "#f59e0b", "#3b82f6"];
    }
    const nomorAcak = Math.floor(Math.random() * daftarWarna.length);

    bintang.style.left = x + "px";
    bintang.style.top = y + "px";
    bintang.style.color = daftarWarna[nomorAcak];
    bintang.style.fontSize = (8 + Math.random() * 10) + "px";
    bintang.style.setProperty("--geser-x", (Math.random() * 60 - 30) + "px");
    bintang.style.setProperty("--geser-y", (Math.random() * 60 + 10) + "px");
    wadahJejak.appendChild(bintang);

    bintang.addEventListener("animationend", function () {
        bintang.remove();
    });
}

function aturJejakKursor() {
    // Hanya untuk perangkat dengan mouse (bukan layar sentuh)
    // dan bila pengguna tidak meminta "kurangi gerakan"
    const pakaiMouse = window.matchMedia("(pointer: fine)").matches;
    const kurangiGerakan = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pakaiMouse || kurangiGerakan) {
        return;
    }

    document.addEventListener("mousemove", function (event) {
        const x = event.clientX;
        const y = event.clientY;
        const selisihX = x - xTerakhir;
        const selisihY = y - yTerakhir;
        const jarak = Math.sqrt(selisihX * selisihX + selisihY * selisihY);

        // Abaikan gerakan yang sangat kecil
        if (jarak < 6) {
            return;
        }

        // Saat kursor bergerak cepat, isi celah dengan beberapa titik
        // supaya garisnya tetap menyambung (maksimal 12 titik sekali gerak)
        let jumlahTitik = Math.floor(jarak / 6);
        if (jumlahTitik > 12 || xTerakhir < 0) {
            jumlahTitik = 1;
        }
        for (let i = 1; i <= jumlahTitik; i++) {
            buatTitik(xTerakhir + (selisihX * i) / jumlahTitik,
                      yTerakhir + (selisihY * i) / jumlahTitik);
        }

        // Sesekali lontarkan bintang kecil di sepanjang garis
        if (Math.random() < 0.35) {
            buatBintang(x, y);
        }

        xTerakhir = x;
        yTerakhir = y;
    });

    // Saat kursor keluar jendela, mulai garis baru (tidak menyambung jauh)
    document.addEventListener("mouseleave", function () {
        xTerakhir = -100;
        yTerakhir = -100;
    });
}


/* ---------- 6. Menjalankan semua fitur ---------- */

aturTema();
aturGaleri();
aturFaq();
aturForm();
aturJejakKursor();
