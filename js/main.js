class Menu {
  constructor(
    triggersSelector,
    openedIconClass,
    closedIconClass,
    eventCallback,
  ) {
    this.triggersSelector = triggersSelector;
    this.openedIconClass = openedIconClass;
    this.closedIconClass = closedIconClass;
    this.eventCallback = eventCallback;
    this.currentEvent;
  }

  init() {
    this.registerListeners();
  }

  getOpenedTriggers() {
    return Array.from(
        document.querySelectorAll(`${this.triggersSelector} [data-open]`)
    );
  }

  closeOpenedTriggers() {
    for (const triggerNode of this.getOpenedTriggers()) {
      if (triggerNode === this.currentEvent.target) {
        continue;
      }
      triggerNode.dispatchEvent(new Event('click'));
    }
  }

  registerListeners() {
    const triggers = Array.from(document.querySelectorAll(this.triggersSelector));

    for (const trigger of triggers) {
      trigger.addEventListener('click', event => {
        this.currentEvent = event;

        this.closeOpenedTriggers();

        const isClosed = !trigger.hasAttribute('data-opened')

        if (isClosed) {
          trigger.setAttribute('data-opened', '');
          trigger.classList.replace(this.closedIconClass, this.openedIconClass)
        } else {
          trigger.removeAttribute('data-opened');
          trigger.classList.replace(this.openedIconClass, this.closedIconClass)
        }

        this.eventCallback(trigger);
      })
    }
  }
}

class BottomMenu extends Menu {
}

class Submenu extends Menu {
  getOpenedTriggers() {
    return Array.from(
        this.currentEvent.target.closest('ul').querySelectorAll('li > i[data-opened]')
    );
  }
}

function toggleMenu() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.toggle('active');
}
function closeMenu() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.remove('active');
}

const bottomMenu = new BottomMenu(
    'li.header__item i',
    'fa-chevron-up',
    'fa-chevron-down',
    trigger => {
      const targetNode = document.querySelector(
          trigger.getAttribute('data-target-node-id')
      );
      targetNode.classList.toggle('d-block');
    }
);
const submenu = new Submenu(
    '.submenu-real__menu li > i',
    'fa-arrow-left',
    'fa-arrow-right',
    trigger => {
      const innerMenu = trigger.parentNode.querySelector('ul');
      innerMenu.classList.toggle('d-inline-block');
    }
);

bottomMenu.init();
submenu.init();

// document.getElementById("searchButton").addEventListener("click", function () {
//   const searchIcon = document.getElementById("searchIcon");
//
//   if (this.classList.contains("active")) {
//     searchIcon.src = "img/search.svg";
//     this.classList.remove("active");
//   } else {
//     searchIcon.src = "img/close.svg";
//     this.classList.add("active");
//   }
// });
