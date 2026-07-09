"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  agentFee: 10,
  allServicePrices: 0,
  totalPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор вёрстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные",
    );

    let userInput;

    do {
      userInput = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNum(userInput));
    appData.screenPrice = Number(userInput.trim());

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNum: function (num) {
    if (num === null || String(num).trim() === "") {
      return false;
    }

    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой ещё дополнительный тип услуги нужен?");
      }

      let userPrice;

      do {
        userPrice = prompt("Сколько это будет стоить?");
      } while (!appData.isNum(userPrice));

      let price = Number(userPrice.trim());
      sum += price;
    }
    return sum;
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    return Math.ceil(
      appData.totalPrice - appData.totalPrice * (appData.agentFee / 100),
    );
  },
  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substring(1).toLowerCase()
    );
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else {
      return "Скидка не предусмотрена";
    }
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.totalPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      console.log(key + ": " + appData[key]);
    }
  },
};

appData.start();
