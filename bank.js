"use strict";
//APP LEFT
const movementsUI = document.querySelector(".movements");
const row = document.querySelector(".row");
const app = document.querySelector(".app");
const summary = document.querySelector(".summary");
const ballance = document.querySelector(".current-right");
const inValue = document.querySelector(".s-in-value");
const outValue = document.querySelector(".s-out-value");
const intValue = document.querySelector(".interest-value");

const welcome = document.querySelector(".h-wel");
const transBtn = document.querySelector(".trans-btn");
const loanBtn = document.querySelector(".loan-btn");
const closeBtn = document.querySelector(".btn-close");
const closeTxt = document.querySelector(".close-txt");
const closePin = document.querySelector(".close-num");
const loanNum = document.querySelector(".loan-num");
const transTxt = document.querySelector(".trans-txt");
const transNum = document.querySelector(".trans-num");
const btnLogin = document.querySelector(".h-btn");
const txtLogin = document.querySelector(".h-txt");
const pinLogin = document.querySelector(".h-pass");
const timerInput = document.querySelector(".timer");
const btnSort = document.querySelector(".btn--sort");
const balanceDate = document.querySelector(".c-left-para");

//DATA
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2021-05-12T14:11:59.604Z",
    "2021-05-14T17:01:17.194Z",
    "2021-05-16T23:36:17.929Z",
    "2021-05-17T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2021-05-12T14:11:59.604Z",
    "2021-05-14T17:01:17.194Z",
    "2021-05-16T23:36:17.929Z",
    "2021-05-17T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//format dates

const formateMovDate = (date, locale) => {
  const days = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = days(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return "today";
  if (daysPassed === 1) return "yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};
//logOut
const toTimer = function () {
  let seconds = 300;
  const parts = function () {
    const min = String(Math.trunc(seconds / 60)).padStart(2, 0);
    const sec = String(seconds % 60).padStart(2, 0);
    const timerString = (timerInput.textContent = `${min}:${sec}`);
    if (seconds === 0) {
      clearInterval(timeDisplay);
      app.style.opacity = "0";
      welcome.textContent = "Log In to get Started";
    }
    seconds--;

    return timerString;
  };
  parts();
  const timeDisplay = setInterval(parts, 1000);

  return timeDisplay;
};
// toTimer()

//login
let currentAccount, timer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === txtLogin.value);
  if (currentAccount?.pin === +pinLogin.value) {
    balanceDate.innerHTML = new Intl.DateTimeFormat(currentAccount.locale, {
      dateStyle: "long",
    }).format(new Date());
    app.style.opacity = "1";
    welcome.innerHTML = `Welcome, ${currentAccount.owner}`;
    if (timer) clearInterval(timer);
    timer = toTimer();
    updateUI(currentAccount);
  } else {
    welcome.innerHTML = "Error, please try again";
  }
});
const createUserNames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
const updateUI = function (acc) {
  displayMovements(acc);

  displaySummary(acc);
};
createUserNames(accounts);

const displayMovements = (acc, sort = false) => {
  movementsUI.textContent = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const convMov = convCurr(mov, currentAccount);
    const formatDate = formateMovDate(date, acc.locale);
    const html = `
       <div class="row">
       <div class="movements__type movements__type--${type}">
         ${i + 1} ${type}
       </div>
       <div class="movements__date">${formatDate}</div>
       <div class="movements__value">${convMov}</div>
     </div>
       `;

    movementsUI.insertAdjacentHTML("afterBegin", html);
    //  console.log(mov, i)
  });
};

const convCurr = (coin, acc) => {
  console.log(coin);
  const convCoin = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(coin);
  return convCoin;
};
let positive;
let negative;
const displaySummary = (acc) => {
  positive = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acu, mov) => acu + mov, 0);
  inValue.textContent = positive + "€";
  negative = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  outValue.textContent = Math.abs(negative) + "€";
  const rate = acc.interestRate / 100;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit, i, arr) => deposit * rate)
    .filter((int, i, arr) => int > 0)
    .reduce((acc, int) => acc + int);
  // console.log(interest)
  intValue.textContent = interest + "€";
  //balance
  const calcBallance = positive + negative;
  ballance.textContent = convCurr(calcBallance, currentAccount);
};
// displaySummary(account1)

//RIGHT-APP
//transfer
transBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //  console.log(transTxt.value)

  const toAcc = accounts.find((acc) => acc.username === transTxt.value);
  //  console.log(toAcc)

  if (toAcc && +transNum.value <= positive + negative) {
    currentAccount.movements.push(-Number(transNum.value));
    toAcc.movements.push(+Number(transNum.value));
    currentAccount.movementsDates.push(new Date().toISOString());
    toAcc.movementsDates.push(new Date().toISOString());
    if (timer) clearInterval(timer);
    timer = toTimer();
    updateUI(currentAccount);
  }
});

//loan
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(loanNum.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    if (timer) clearInterval(timer);
    timer = toTimer();
    updateUI(currentAccount);
  }
  loanNum.value = "";
});

//close
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    closeTxt?.value === currentAccount?.username &&
    Number(closePin?.value) === currentAccount?.pin &&
    accounts.some((acc) => acc.username === closeTxt.value)
  ) {
    const theAcc = accounts.find((acc) => acc.username === closeTxt.value);
    // console.log(theAcc)
    const index = accounts.indexOf(theAcc);
    // console.log(index)
    accounts.splice(index, 1);
    // console.log(accounts)
    app.style.opacity = "0";
    alert(`Account of ${currentAccount.owner} closed sucessfuly`);
    welcome.innerHTML = "Login to get started";
  }
});

//sort
let sort = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
});
