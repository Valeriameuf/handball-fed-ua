document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-filters');
    const seasonSelect = document.getElementById('season');

    [seasonSelect].forEach(select => {
        select.addEventListener('change', function () {
            form.submit();
        })
    })
});
