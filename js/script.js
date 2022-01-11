document.addEventListener('DOMContentLoaded', function(event) {
    const body = document.body;

    const form = body.querySelector("form");
    const textarea = form["birthday-data"];
    const data = JSON.parse(textarea.innerHTML);
    console.log(data);
});