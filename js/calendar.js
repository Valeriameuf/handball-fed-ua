document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-filters');
    const tourSelect = document.getElementById('tour');
    const seasonSelect = document.getElementById('season');

    [tourSelect, seasonSelect].forEach(select => {
        select.addEventListener('change', function () {
            form.submit();
        })
    })
});
