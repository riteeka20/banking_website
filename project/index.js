var disply = (function() {
  var Dom = {
    signup: document.querySelector(".section_signup"),
    fn: document.querySelector("#fn"),
    ln: document.querySelector("#ln"),
    mob: document.querySelector("#mob"),
    email: document.querySelector("#email"),
    dob: document.querySelector("#dob"),
    acc: (() => {
      var str = "";
      for (let i = 0; i < 15; i++) {
        str += parseInt(Math.random() * 10);
      }
      return str;
    })(),
    user: document.querySelector("#uid"),
    psw: document.querySelector("#psw"),
    cpsd: document.querySelector("#cpsd")
  };
  Dom.signup.style.display = "block";
  return {
    getDet: function() {
      return Dom;
    }
  };
})();
function mainController() {
  var inputD = disply.getDet();
  if (!/^[a-zA-Z]{4,10}$/.test(inputD.fn.value)) {
    inputD.fn.style.borderBottom = "1.5px solid red";
    return false;
  } else {
    inputD.fn.style.borderBottom = "1.5px solid skyblue ";
  }
  if (!/^[a-zA-Z]{4,10}$/.test(inputD.ln.value)) {
    inputD.ln.style.borderBottom = "1.5px solid red";
    return false;
  } else {
    inputD.ln.style.borderBottom = "1.5px solid skyblue";
  }
  if (!/[a-z-A-Z0-9]{3,}@[a-z]+\.[a-z]+/.test(inputD.email.value)) {
    inputD.email.style.borderBottom = "1.5px solid red";
  } else {
    inputD.email.style.borderBottom = "1.5px solid skyblue";
  }
  if (!/^[7-9][0-9]{9}$/.test(inputD.mob.value)) {
    inputD.mob.style.borderBottom = "1.5px solid red";
    return false;
  } else {
    inputD.mob.style.borderBottom = "1.5px solid skyblue";
  }
  if (
    new Date().getFullYear() - new Date(inputD.dob.value).getFullYear() <=
    18
  ) {
    inputD.dob.style.borderBottom = "1.5px solid red";
    return false;
  } else {
    inputD.dob.style.borderBottom = "1.5px solid skyblue";
  }
  if (!/[A-Za-z0-9]{5,10}/.test(inputD.user.value)) {
    inputD.user.style.borderBottom = "1.5px solid red";
    return false;
  } else {
    inputD.user.style.borderBottom = "1.5px solid skyblue";
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(
      inputD.psw.value
    )
  ) {
    inputD.psw.style.borderBottom = "1.5px solid red";
    return false;
  } else {
    inputD.psw.style.borderBottom = "1.5px solid skyblue";
  }
  if (inputD.psw.value !== inputD.cpsd.value) {
    inputD.cpsd.style.borderBottom = "1.5px solid red";
    return false;
  } else {
    inputD.cpsd.style.borderBottom = "1.5px solid skyblue";
  }
  var vlues = Object.values(inputD);
  vlues.forEach((element, index) => {
    sessionStorage.setItem(index, JSON.stringify(element.value));
  });
  sessionStorage.setItem(6,inputD.acc)

}
function login() {
  var pswwd = document.querySelector("#pswd");
  var userId = document.querySelector("#userId");
  var msg = document.querySelector(".msg");
  if (userId.value != JSON.parse(sessionStorage.getItem(7))) {
    msg.innerHTML = " * Enter Correct UserId";
    return false;
  } else if (pswwd.value != JSON.parse(sessionStorage.getItem(8))) {
    msg.innerHTML = " * Enter Correct Password";
    return false;
  } else {
    msg.innerHTML = "";
  }
}
