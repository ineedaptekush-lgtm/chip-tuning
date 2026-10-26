"use strict";
const menuDialog = document.getElementById('menu-dialog');
const menuToggle = document.querySelector('.menu-toggle');
const form = document.getElementById('lead-form');
const carInput = document.getElementById('car');
const serviceSelect = document.getElementById('service');
menuToggle.addEventListener('click', () => {
  menuDialog.showModal();
  document.body.classList.add('modal-open');
  menuToggle.setAttribute('aria-expanded', 'true');
});
menuDialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  menuToggle.setAttribute('aria-expanded', 'false');
});
menuDialog.addEventListener('click', event => { if (event.target === menuDialog) menuDialog.close(); });
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
menuDialog.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menuDialog.close()));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { serviceSelect.value = link.dataset.service; }));
function composeWhatsAppUrl(car, service, details) {
  const lines = ['Здравствуйте, Chip Service!', 'Автомобиль: ' + car + '.', 'Задача: ' + service + '.'];
  if (details) lines.push('Детали: ' + details);
  lines.push('Хочу уточнить возможность работы, стоимость и время приезда.');
  return 'https://wa.me/79527180114?text=' + encodeURIComponent(lines.join('\n'));
}
form.addEventListener('submit', event => {
  event.preventDefault();
  carInput.setCustomValidity(carInput.value.trim().length < 2 ? 'Укажите марку и модель автомобиля.' : '');
  if (!form.reportValidity()) return;
  const link = document.createElement('a');
  link.href = composeWhatsAppUrl(carInput.value.trim(), serviceSelect.value, document.getElementById('message').value.trim());
  link.target = '_blank'; link.rel = 'noopener noreferrer';
  document.body.append(link); link.click(); link.remove();
  document.getElementById('form-status').textContent = 'Сообщение подготовлено. Добавьте фотографии и отправьте его в WhatsApp.';
});
carInput.addEventListener('input', () => carInput.setCustomValidity(''));
form.addEventListener('input', () => { document.getElementById('form-status').textContent = ''; });
const backtop = document.querySelector('.backtop');
window.addEventListener('scroll', () => { backtop.hidden = window.scrollY < 800; }, {passive:true});
backtop.addEventListener('click', () => {
  window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  document.querySelector('.brand').focus({preventScroll:true});
});
document.getElementById('year').textContent = new Date().getFullYear();
