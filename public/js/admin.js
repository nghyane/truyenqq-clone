// #file on change (multiple)
const fileInput = document.getElementById("file");
const imageContent = document.getElementById("image");

fileInput.addEventListener("change", async (event) => {
  const files = event.target.files;
  console.log(files);

  const addImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("https://cn.manga1001.workers.dev/https://telegra.ph/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        imageContent.value += `${data[0].src}\n`;
      });
  };

  for (const file of files) {
    await addImage(file);
  }

  fileInput.value = "";
});
