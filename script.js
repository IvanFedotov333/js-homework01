"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой ещё дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
const totalPrice = screenPrice + servicePrice1 + servicePrice2;
let agentPercent = 10; // процент комиссии
let agentFee = (totalPrice * agentPercent) / 100; // откат посреднику
const servicePercentPrice = Math.ceil(totalPrice - agentFee);
console.log(`Общая цена услуги - ${servicePercentPrice} рублей`);

if (totalPrice > 30000) {
  console.log("Даем скидку в 10%");
} else if (15000 < totalPrice && totalPrice < 30000) {
  console.log("Даем скидку в 5%");
} else {
  console.log("Скидка не предусмотрена");
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);

console.log(
  `Стоимость вёрстки экранов ${screenPrice} рублей/ долларов/гривен/юани`,
);
