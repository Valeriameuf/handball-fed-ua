export default class MobileMenu {
    constructor(
        openBtnSelector,
        closeBtnSelector,
        containerSelector
    ) {
        this.$openBtn = document.querySelector(openBtnSelector);
        this.$closeBtn = document.querySelector(closeBtnSelector);
        this.$container = document.querySelector(containerSelector);
    }

    init() {
        this.$openBtn.addEventListener('click', () => this.$container.classList.add('active'));
        this.$closeBtn.addEventListener('click', () => this.$container.classList.remove('active'));

        const $triggers = document.querySelectorAll('.mobile-nav__arrow');

        for (const $trigger of $triggers) {
            $trigger.addEventListener('click', () => {
                const $dropDown = $trigger
                    .closest('.mobile-nav__item')
                    .querySelector('.mobile-nav__sublist');

                const isClosed = !$trigger.hasAttribute('data-opened');

                if (isClosed) {
                    $trigger.setAttribute('data-opened', '');
                    $trigger.classList.replace('fa-chevron-down', 'fa-chevron-up');
                    $dropDown.classList.add('mobile-nav__sublist--open');
                } else {
                    $trigger.removeAttribute('data-opened');
                    $trigger.classList.replace('fa-chevron-up', 'fa-chevron-down');
                    $dropDown.classList.remove('mobile-nav__sublist--open');
                }
            })
        }
    }
}
