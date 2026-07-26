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
    this.addTitle();
    startBtn.addEventListener("click", this.start.bind(this));
    resetBtn.addEventListener("click", this.reset.bind(this));
    addScreenButton.addEventListener("click", this.addScreenBlock.bind(this));
    rollbackRange.addEventListener("input", () => {
      rollbackValue.textContent = rollbackRange.value + "%";
      this.rollback = +rollbackRange.value;

      if (this.calculationDone) {
        totalCountRollback.value = Math.ceil(
          this.totalPrice - this.totalPrice * (this.rollback / 100),
        );
      }
    });
  },
  addTitle: function () {
    document.title = mainTitle.textContent;
  },
  start: function () {
    if (!this.isValue()) {
      return;
    }
    this.lockControls();
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.calculationDone = true;
  },
  reset: function () {
    this.unlockControls();
    this.screens = [];
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.totalPrice = 0;
    this.calculationDone = false;
    this.servicesPercent = {};
    this.servicesNumber = {};
    rollbackRange.value = 0;
    rollbackValue.textContent = "0%";
    const allScreens = document.querySelectorAll(".screen");
    for (let i = 1; i < allScreens.length; i++) {
      allScreens[i].remove();
    }
    const firstScreen = allScreens[0];
    if (firstScreen) {
      firstScreen.querySelector("select").value = "";
      firstScreen.querySelector("input").value = "";
    }
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    totalCountRollback.value = 0;
    fullTotalCount.value = 0;
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.totalPrice;
  },
  isValidText: function (str) {
    if (str === null) return false;
    const s = str.trim();
    return s !== "" && /[^0-9]/.test(s);
  },
  isValue: function () {
    const allFilled = Array.from(screenBlocks).every((block) => {
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
    screenBlocks.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addServices: function () {
    percentItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    numberItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
    console.log(this);
  },
  addScreenBlock: function () {
    const screenBlocks = document.querySelectorAll(".screen");
    const cloneScreen = screenBlocks[0].cloneNode(true);
    screenBlocks[screenBlocks.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    this.screenPrice = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

    let totalScreenCount = 0;

    for (let screen of this.screens) {
      this.screenPrice += +screen.price;

      totalScreenCount += +screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.totalPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    totalCount.value = totalScreenCount;

    totalCountRollback.value = Math.ceil(
      this.totalPrice - this.totalPrice * (this.rollback / 100),
    );
  },
  lockControls: function () {
    const mainControls = document.querySelectorAll(
      ".main-controls input, .main-controls select",
    );
    mainControls.forEach((control) => {
      control.disabled = true;
    });
    startBtn.style.display = "none";
    resetBtn.style.display = "";
  },
  unlockControls: function () {
    const mainControls = document.querySelectorAll(
      ".main-controls input, .main-controls select",
    );
    mainControls.forEach((control) => {
      control.disabled = false;
    });
    startBtn.style.display = "";
    resetBtn.style.display = "none";
  },
};

appData.init();
