"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой ещё дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let totalPrice = screenPrice + servicePrice1 + servicePrice2;
let agentPercent = 10; // процент комиссии
let agentFee = (totalPrice * agentPercent) / 100; // откат посреднику
let servicePercentPrice = getServicePercentPrices();
console.log(`Общая цена услуги - ${servicePercentPrice} рублей`);
const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};
const getRollbackMessage = function (price) {
  if (price > 30000) {
    return "Даем скидку в 10%";
  } else if (price > 15000 && price <= 30000) {
    return "Даем скидку в 5%";
  } else {
    return "Скидка не предусмотрена";
  }
};

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};

const allServicePrices = getAllServicePrices();
const fullPrice = getFullPrice();

function getFullPrice() {
  return screenPrice + allServicePrices;
}

function getTitle() {
  const trimmed = title.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

function getServicePercentPrices() {
  return Math.ceil(totalPrice - agentFee);
}

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(String(screens));

console.log(getRollbackMessage(totalPrice));
console.log(getServicePercentPrices());



