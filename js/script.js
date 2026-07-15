"use strict";

const mainTitle = document.getElementsByTagName("h1")[0];
const buttons = document.getElementsByClassName("handler_btn");
const calcButton = buttons[0];
const resetButton = buttons[1];
const addScreenButton = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");
const rollbackRange = document.querySelector(".rollback input[type='range']");
const rollbackValue = document.querySelector(".rollback .range-value");
const totalInputs = document.getElementsByClassName("total-input");
const totalLayout = totalInputs[0]; // Стоимость верстки
const totalScreens = totalInputs[1]; // Количество экранов
const totalServices = totalInputs[2]; // Стоимость доп. услуг
const totalFullprice = totalInputs[3]; // Итоговая стоимость
const totalRollback = totalInputs[4]; // Стоимость с учетом отката
let screenBlocks = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  agentFee: 10,
  allServicePrices: 0,
  totalPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.logger();
  },
  isNum: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isValidText: function (str) {
    if (str === null) return false;
    const s = str.trim();
    return s !== "" && /[^0-9]/.test(s);
  },
  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "Калькулятор вёрстки",
      );
    } while (!appData.isValidText(appData.title));
    appData.title = appData.title.trim();

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!appData.isValidText(name));
      name = name.trim();

      let price;
      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNum(price));
      price = price.trim();

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!appData.isValidText(name));
      name = name.trim();

      let price;
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNum(price));
      price = +price;

      let nameId = name;
      if (appData.services.hasOwnProperty(nameId)) {
        let counter = 1;
        do {
          nameId = name + " (" + counter + ")";
          counter++;
        } while (appData.services.hasOwnProperty(nameId));
      }
      appData.services[nameId] = price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (total, screen) {
      return total + +screen.price;
    }, 0);

    appData.allServicePrices = 0;

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice: function () {
    appData.totalPrice = appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.totalPrice - appData.totalPrice * (appData.agentFee / 100),
    );
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substring(1).toLowerCase();
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
  logger: function () {
    console.log(appData.totalPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.start();
