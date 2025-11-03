/* ==============================
   🌼 Основные скрипты сайта
   ============================== */

// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Валидация формы обратной связи
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("input[name='name']").value.trim();
    const message = form.querySelector("textarea[name='message']").value.trim();

    if (!name || !message) {
      alert("Пожалуйста, заполните все поля перед отправкой.");
      return;
    }

    // Временно — просто сообщение. Можно подключить Formspree.
    alert("Спасибо за ваш отзыв! Ваше сообщение успешно отправлено.");
    form.reset();
  });
}

// Анимация появления блоков при прокрутке
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
