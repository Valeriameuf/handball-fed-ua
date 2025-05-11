export default function tab() {
    const tabButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>('.tabs__button')
    );
    const tabContents = Array.from(document.querySelectorAll('.content'));

    tabButtons.forEach((tabButton: HTMLButtonElement) => {
        tabButton.addEventListener('click', () => {
            activateTabButton(tabButton, tabButtons);
            activateTabContent(tabButton, tabContents);
        });
    });
}

function activateTabButton(targetTabButton: HTMLButtonElement, tabButtons: HTMLButtonElement[]) {
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    targetTabButton.classList.add('active');
}

function activateTabContent(targetTabButton: HTMLButtonElement, tabContents: Element[]) {
    const tabName = targetTabButton.getAttribute('data-tab-name');

    tabContents.forEach(tabContent => {
        tabContent.classList.contains(tabName)
            ? tabContent.classList.add('active')
            : tabContent.classList.remove('active');
    });
}
