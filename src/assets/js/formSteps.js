//your javascript goes here
var currentTab = 0;
document.addEventListener("DOMContentLoaded", function (event) {

    showTab(currentTab);

});


function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 2)) {
        document.getElementById("nextBtn").innerHTML = '<img src = "/assets/img/submit.png" alt = "" > ';
    } else {
        document.getElementById("nextBtn").innerHTML = '<img src = "/assets/img/NEXT.png" alt = "" > ';
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("nextBtn").style.display = "block";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        // document.getElementById("regForm").submit();
        // return false;

        document.getElementById("nextprevious").style.display = "none";
        document.getElementById("all-steps").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("text-message").style.display = "block";
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if ((y[i].id?.includes('terms-check-box') && !y[i].checked) ||
            (y[i].id?.includes('artist-name') ||
                y[i].id?.includes('first-name') ||
                y[i].id?.includes('last-name') ||
                y[i].id?.includes('age') ||
                y[i].id?.includes('email') ||
                y[i].id?.includes('confirm-email')) &&
            y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) { document.getElementsByClassName("step")[currentTab].className += " finish"; }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); }
    x[n].className += " active";
}
