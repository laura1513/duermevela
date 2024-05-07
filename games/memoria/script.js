var idImg = "";
var imgAbierta = "";
var count = 0;
var found =  0;
//info del juego: https://codepen.io/adansuku/pen/RWZWRd
//ahe cogido el código de aquí, sinceridad siempre
var timerId = 0;$(document).ready(function() {
    $(".imagen").show(0).delay(750).hide(0);
    $(".im").click(abrirImagen);

    function abrirImagen() {

        id = $(this).attr("id");

        if ($("#"+id+" img").is(":hidden")) {

            $("#"+id+" img").show();

            if (imgAbierta == "") {
                idImg = id;
                imgAbierta = $("#"+id+" img").attr("src");
                setTimeout(function() {
                    $(".im").bind("click", abrirImagen)
                }, 300);
            } else {
                actual = $("#"+id+" img").attr("src");
                if (imgAbierta != actual) {
                    setTimeout(function() {
                        $("#"+id+" img").hide();
                        $("#"+idImg+" img").hide();
                        idImg = "";
                        imgAbierta = "";
                    }, 300);
                } else {
                    $("#"+id+" img").addClass("opacity");
                    $("#"+idImg+" img").addClass("opacity");
                    found++;
                    idImg = "";
                    imgAbierta = "";
                }

                setTimeout(function() {
                    $(".im").bind("click", abrirImagen)
                }, 300);
            }

            count++;
        }
    }
});
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}