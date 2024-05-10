const timeNow = new Date();

if (timeNow.getHours() < 19 && timeNow.getHours() > 7) {
    $("html[data-bs-theme|='dark']").attr("data-bs-theme", "light");
}