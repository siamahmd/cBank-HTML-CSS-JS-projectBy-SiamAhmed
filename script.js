"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// cBank APP

const sideBar = document.querySelector(".sidebar");
const mainBody = document.querySelector(".main-body");
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const profile = document.querySelector(".sidebar .profile");
const brandName = document.querySelectorAll(".brand_name");
const profileName = document.querySelector(".profile-name");
const profileMail = document.querySelector(".mail");
const userName = document.querySelector(".user");
const containerMovements = document.querySelector(".movements");
const labelBalance = document.querySelector(".c-blanace-unit");
const btnTransfer = document.querySelector(".transfar-btn");
const inputTransferTo = document.querySelector(".transfer-to");
const inputTransferAmount = document.querySelector(".transfer-amount");
const btnLoan = document.querySelector(".loan-btn");
const inputLoanAmount = document.querySelector(".loan-amount");
const labelSumIn = document.querySelector(".income-value");
const labelSumOut = document.querySelector(".outcome-value");
const labelSumInterest = document.querySelector(".bonus-value");

///LOG IN
const loginContainer = document.querySelector(".login");
const loginBtn = document.querySelector(".login-btn");
const loginUsername = document.querySelector(".login-user");
const loginPin = document.querySelector(".login-pin");

///LOG OUT
const logoutBtn = document.querySelector(".logout-btn");

// TOGGLE SIDEBAR

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

const menuBar = document.querySelector("#navbar .form-input .toggler");
const sidebar = document.getElementById("sidebar");

const hideSidebar = function () {
  sidebar.classList.toggle("hide");
  profile.classList.toggle("hide");
  brandName.forEach((i) => i.classList.toggle("hide"));
};
const showSidebar = function () {
  sidebar.classList.remove("hide");
  profile.classList.remove("hide");
  brandName.forEach((i) => i.classList.remove("hide"));
};

menuBar.addEventListener("click", hideSidebar);

const toggleWithResize = function (x) {
  if (x.matches) {
    // If media query matches
    hideSidebar();
  } else {
    showSidebar();
  }
};

const x = window.matchMedia("(max-width: 768px)");
toggleWithResize(x);
x.addListener(toggleWithResize);

/////////////////////////////////////////////////
////////////////////// Data ///////////////////////////
/////////////////////////////////////////////////
const account1 = {
  owner: "Hobert Williams",
  imgSrc: "https://source.unsplash.com/c_GmwfHBDzk",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Terry Torres",
  imgSrc: "https://source.unsplash.com/rDEOVtE7vOs",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Erin Williams",
  imgSrc: "https://source.unsplash.com/khV4fTy6-D8",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Adam Jones",
  imgSrc: "https://source.unsplash.com/jzz_3jWMzHA",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: "Annie Kendig",
  imgSrc: "https://source.unsplash.com/jzz_3jWMzHA",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
////////////////////// Functions ///////////////////////////
/////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  const movs = [...movements];

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__div"></div>
        <div class="movements__type movements__type--${type}">${
      i + 1
    } . ${type}</div>
        <div class="movements-value">${mov} 💰</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}💰`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}💰`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}💰`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}💰`;
};

//////////// Generate UserName

const generateUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
generateUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Show user details
  showUserDetails(acc);

  // Display summary
  calcDisplaySummary(acc);
};

////////////  Show Name and email

const showUserDetails = function (acc) {
  const accTemp = { ...acc };
  const firstName = accTemp.owner.split(" ")[0];

  profileName.textContent = accTemp.owner;
  profileMail.textContent =
    accTemp.owner.toLowerCase().split(" ")[0] + "@mail.com";

  userName.textContent = "🎃 Wellcome Back, " + firstName;

  document.getElementById("profile-image").src = accTemp.imgSrc;
};

////////// Loan Functionality

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    selectedAcount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    selectedAcount.movements.push(amount);

    // Update UI
    updateUI(selectedAcount);
  }
  inputLoanAmount.value = "";
});

//////////// Login Functionality

let selectedAcount;

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  selectedAcount = accounts.find((acc) => acc.username === loginUsername.value);

  if (selectedAcount?.pin === Number(loginPin.value)) {
    sideBar.style.opacity = 1;
    mainBody.style.opacity = 1;
    loginContainer.style.opacity = 0;

    // showUserDetails(selectedAcount);
    // displayMovements(selectedAcount.movements);

    updateUI(selectedAcount);
  }
});

//////////// Logout Functionality

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();

  sideBar.style.opacity = 0;
  mainBody.style.opacity = 0;
  loginContainer.style.opacity = 1;
  document.querySelector("body").style.background = "#edae49";

  loginUsername.value = "";
  loginPin.value = "";
});

//////////// Transfer Functionality

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Clicked");
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    selectedAcount.balance >= amount &&
    receiverAcc?.username !== selectedAcount.username
  ) {
    // Doing the transfer
    selectedAcount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(selectedAcount);
  }
});
