"use strict";

const mainTitle = document.getElementsByTagName("h1")[0];
const addScreenButton = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");

const rollbackRange = document.querySelector(".rollback input");
const rollbackValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screenBlocks = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  calculationDone: false,
  agentFee: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  totalPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    addScreenButton.addEventListener("click", appData.addScreenBlock);
    rollbackRange.addEventListener("input", function () {
      rollbackValue.textContent = rollbackRange.value + "%";
      appData.rollback = +rollbackRange.value;

      if (appData.calculationDone) {
        totalCountRollback.value = Math.ceil(
          appData.totalPrice - appData.totalPrice * (appData.rollback / 100),
        );
      }
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    if (!appData.isValue()) {
      return;
    }
    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    // appData.logger();
    appData.showResult();
    appData.calculationDone = true;
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.totalPrice;
  },
  isValidText: function (str) {
    if (str === null) return false;
    const s = str.trim();
    return s !== "" && /[^0-9]/.test(s);
  },
  isValue: function () {
    const allFilled = Array.from(screenBlocks).every(function (block) {
      const select = block.querySelector("select");
      const input = block.querySelector("input");
      const selectFilled = select.value !== "";
      const inputFilled = input.value.trim() !== "";
      return selectFilled && inputFilled;
    });
    return allFilled;
  },
  addScreens: function () {
    let screenBlocks = document.querySelectorAll(".screen");
    screenBlocks.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addServices: function () {
    percentItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    numberItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
    console.log(appData);
  },
  addScreenBlock: function () {
    const cloneScreen = screenBlocks[0].cloneNode(true);
    screenBlocks[screenBlocks.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;

    let totalScreenCount = 0;

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;

      totalScreenCount += +screen.count;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.totalPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    totalCount.value = totalScreenCount;

    totalCountRollback.value = Math.ceil(
      appData.totalPrice - appData.totalPrice * (appData.rollback / 100),
    );
  },
  logger: function () {
    console.log(appData.totalPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.init();
