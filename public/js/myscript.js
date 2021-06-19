window.addEventListener("DOMContentLoaded", event => {
    img = document.getElementById("prev")
    icon = document.getElementById("icon-default")
    inputImg = document.getElementById("image")
    btnSubmit = document.getElementById("submit")

    inputImg.addEventListener('change', preview)


    function preview(){
        const [file] = inputImg.files
        if (file){
            icon.style.display = "none";
            img.src = URL.createObjectURL(file);
            img.hidden=false;
            btnSubmit.disabled=false
        }
        
    }
});