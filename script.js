const title = "Лендинг для стоматологической клиники";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 10000;
const rollback = 50;
const fullPrice = 40000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(
  `Стоимость вёрстки экранов ${screenPrice} рублей/ долларов/гривен/юани`,
);
console.log(
  `Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`,
);
const array = screens.toLowerCase();
console.log(array.split(", "));

const rollbackCount = fullPrice * (rollback / 100);
console.log(rollbackCount);
