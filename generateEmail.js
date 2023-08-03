function generateEmail() {
  const namaInput = document.getElementById("nama");
  const emailInput = document.getElementById("email");

  const nama = namaInput.value.trim();
  const domain = "@shanrise.id";

  const email = nama.toLowerCase().replace(/\s+/g, "") + domain;

  emailInput.value = email;
}
