class TradeTable {
  constructor(app) {
    this.app = app;
    this.maxActiveButtons = 3;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const containers = this.app.querySelectorAll('.table__row-item.hashtags');
      containers.forEach(container => {
        container.addEventListener('click', (event) => this.handleButtonClick(event, container));
      });

      const starItems = this.app.querySelectorAll('.table__row-item-star');
      starItems.forEach(item => {
        item.addEventListener('click', (event) => this.toggleStarClass(event, item));
      });

      this.setupSpanToggle();
    });
  }

  handleButtonClick(event, container) {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('isActive') && clickedButton.classList.contains('disable')) {
      return;
    }

    if (!clickedButton.classList.contains('table__row-item-btn')) return;

    const activeButtons = container.querySelectorAll('.table__row-item-btn.active');

    if (clickedButton.classList.contains('active')) {
      this.deactivateButton(clickedButton, container);
      return;
    }

    if (activeButtons.length < this.maxActiveButtons) {
      this.activateButton(clickedButton);
    }

    if (container.querySelectorAll('.table__row-item-btn.active').length === this.maxActiveButtons) {
      this.deactivateOtherButtons(container);
    }

    container.prepend(clickedButton);
  }

  activateButton(button) {
    const currentColor = window.getComputedStyle(button).color;
    button.classList.add('active');
    button.style.backgroundColor = currentColor;
    button.style.color = 'black';
  }

  deactivateButton(button, container) {
    button.classList.remove('active');
    const originalColor = button.style.borderColor;
    button.style.backgroundColor = 'transparent';
    button.style.color = originalColor;
    this.enableInactiveButtons(container);
  }

  deactivateOtherButtons(container) {
    container.querySelectorAll('.table__row-item-btn:not(.active)').forEach(button => {
      button.classList.add('isActive', 'disable');
    });
  }

  enableInactiveButtons(container) {
    const activeButtons = container.querySelectorAll('.table__row-item-btn.active');
    if (activeButtons.length < this.maxActiveButtons) {
      container.querySelectorAll('.table__row-item-btn.isActive.disable').forEach(button => {
        button.classList.remove('isActive', 'disable');
      });
    }
  }
  toggleStarClass(event, item) {
    item.classList.toggle('active-star');
  }

  setupSpanToggle() {
    const spans = this.app.querySelectorAll('.switch-and-search-wrapper__select-toggle span');
    spans.forEach(span => {
      span.addEventListener('click', () => {
        spans.forEach(s => s.classList.remove('active'));
        span.classList.add('active');
      });
    });
  }
}

const app = document.getElementById('init__trade');
const tradeTable = new TradeTable(app);




// Обработчик кликов по элементам с классом `table__row-item-missile`
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('table__row-item-missile')) {
      const missileElement = event.target;

      // Если у элемента есть класс 'active-missile', открываем ссылку
      if (missileElement.classList.contains('active-missile')) {
          const link = missileElement.getAttribute('data-link-missile');
          if (link) {
              window.open(link, '_blank'); // Открыть ссылку в новом окне
          }
          return; // Не открываем попап
      }

      const popup = missileElement.nextElementSibling;

      if (popup) {
          const isVisible = popup.style.display === 'block';

          // Закрыть все попапы перед выполнением действия
          const allPopups = document.querySelectorAll('.popup');
          allPopups.forEach(p => (p.style.display = 'none'));

          // Если попап текущего элемента был закрыт — открыть его
          if (!isVisible) {
              popup.style.display = 'block';
              const inputField = popup.querySelector('.inputField');
              if (inputField) {
                  inputField.focus(); // Установить фокус на input
              }
          }
      }
  }
});

// Обработчик контекстного меню (ПКМ)
document.addEventListener('contextmenu', function (event) {
  if (event.target.classList.contains('table__row-item-missile')) {
      const missileElement = event.target;

      // Если у элемента нет класса 'active-missile', предотвращаем ПКМ
      if (!missileElement.classList.contains('active-missile')) {
          event.preventDefault(); // Останавливаем действие правого клика
          return;
      }

      event.preventDefault(); // Если есть класс 'active-missile', продолжаем обработку ПКМ
      const popup = missileElement.nextElementSibling;

      if (popup) {
          const isVisible = popup.style.display === 'block';

          // Закрыть все попапы перед выполнением действия
          const allPopups = document.querySelectorAll('.popup');
          allPopups.forEach(p => (p.style.display = 'none'));

          // Если попап текущего элемента был закрыт — открыть его
          if (!isVisible) {
              popup.style.display = 'block';
              const inputField = popup.querySelector('.inputField');
              if (inputField) {
                  inputField.focus(); // Установить фокус на input
              }
          }
      }
  }
});

// Обработчик ввода в поле
document.addEventListener('input', function (event) {
  if (event.target.classList.contains('inputField')) {
      const input = event.target;
      const button = input.closest('.popup-missile__control').querySelector('.submitButton');
      button.disabled = input.value.trim() === '';
  }
});

// Обработчик кнопки сохранения
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('submitButton')) {
      const button = event.target;
      const popup = button.closest('.popup');
      const inputField = popup.querySelector('.inputField');
      const missileElement = popup.previousElementSibling;

      if (missileElement && missileElement.classList.contains('table__row-item-missile')) {
          const link = inputField.value.trim();
          if (link) {
              missileElement.setAttribute('data-link-missile', link);
              missileElement.classList.add('active-missile');
          }
      }

      popup.style.display = 'none'; // Закрыть попап после сохранения
  }
});

// Закрытие попапов при клике вне их области
document.addEventListener('click', function (event) {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
      if (!popup.contains(event.target) && popup.previousElementSibling !== event.target) {
          popup.style.display = 'none';
      }
  });
});



// ------------------------------


const buttons = document.querySelectorAll('[data-open-notes-popup]');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector('.notes-wrapper__popup');
        
        if (popup) {
            popup.classList.toggle('active-popup');
        } else {
            console.warn('Элемент .notes-wrapper__popup не найден на странице');
        }
    });
});


