// Deklarasi variabel
var x;
var beratIdeal;
var hasil;

// Function menghitung berat badan ideal laki-laki
function beratBadanLaki() {
    x = parseInt(document.forms["formInput"]["tinggiBadan"].value);
    if ( x >= 0 ) {
        beratIdeal = (x-100)-((x-100)*10/100);
        hasil = document.getElementById("hasil");
        hasil.innerHTML = "Tinggi badan anda "+x+" cm, dan berat badan yang ideal untuk anda adalah "+beratIdeal+" kg.\n";
    } else {
        alert("Tinggi badan yang adna input tidak valid!, Isi kembali");
    }
}

// Function menghitung berat badan ideal perempuan
function beratBadanPerempuan() {
    x = parseInt(document.forms["formInput"]["tinggiBadan"].value);
    if ( x >= 0 ) {
        beratIdeal = (x-100)-((x-100)*15/100);
        hasil = document.getElementById("hasil");
        hasil.innerHTML = "Tinggi badan anda "+x+" cm, dan berat badan yang ideal untuk anda adalah "+beratIdeal+" kg.\n";
    } else {
        alert("Tinggi badan yang adna input tidak valid!, Isi kembali");
    }
}