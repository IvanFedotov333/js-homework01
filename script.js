"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let agentFee = 10;
let allServicePrices;
let totalPrice;
let servicePercentPrice;
let service1;
let service2;

const isNum = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор вёрстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

  screenPrice = prompt("Сколько будет стоить данная работа?");

  while (!isNum(screenPrice)) {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  }

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой ещё дополнительный тип услуги нужен?");
    }
    sum += +prompt("Сколько это будет стоить?");
  }
  return sum;
  // return servicePrice1 + servicePrice2;
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getFullPrice = function () {
  return screenPrice + allServicePrices;
};

const getServicePercentPrices = function () {
  return Math.ceil(totalPrice - totalPrice * (agentFee / 100));
};

const getTitle = function () {
  return (
    title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase()
  );
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else {
    return "Скидка не предусмотрена";
  }
};

asking();
allServicePrices = getAllServicePrices();
totalPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(getRollbackMessage(totalPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);

console.log(
  "Стоимость вёрстки экранов " +
    screenPrice +
    " юани" +
    " Стоимость разработки сайта " +
    totalPrice +
    " юани",
);
