// Bugdet Controller
var budgetController = (function() {
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var calbudg = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };
  var data = {
    allItems: {
      drc: [],
      inc: []
    },
    totals: {
      drc: 0,
      inc: 0
    },
    balnce: 0,
    percen: -1
  };
  return {
    addItem: function(type, des, val) {
      var newItem,
        Id,
        msg = document.querySelector(".msg");

      if (data.allItems[type].length > 0) {
        Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        Id = 0;
      }
      if (type == "inc") {
        if(val==0){
          msg.innerHTML = "Enter Valid Amount";
        }else{
        msg.innerHTML = "";
        newItem = new Income(Id, des, val);
        data.allItems[type].push(newItem);
        }
      } 
      else if (type == "drc" && data.balnce >= 0 && val <= data.balnce) {
        if ( val ==0 ) {
          msg.innerHTML = "Enter Valid Amount";
        }else{
        newItem = new Expenses(Id, des, val);
        data.allItems[type].push(newItem);
        msg.innerHTML = "";
        }
      }
       else {
        msg.innerHTML = "Insufficient Balance";
      }
      
      
      return newItem;
    },
    calBudget: function() {
      calbudg("inc");
      calbudg("drc");

      if (data.totals.inc > 0) {
        data.balnce = data.totals.inc - data.totals.drc;
        data.percen = Math.round((data.totals.drc / data.totals.inc) * 100);
      } else {
        data.percen = -1;
      }
    },
    getBudget: function() {
      return {
        balnce: data.balnce,
        percentage: data.percen,
        income: data.totals.inc,
        withdraw: data.totals.drc
      };
    }
  };
})();

// UI controller
var UIController = (function() {
  var String = {
    inpType: document.querySelector(".add__type"),
    inpDesc: document.querySelector(".add__description"),
    inpValue: document.querySelector(".add__value"),
    inpBtn: document.querySelector(".add__btn"),
    balanceLevel: document.querySelector(".balance__amount"),
    incomeLevel: document.querySelector(".total-income--value"),
    withdrawLevel: document.querySelector(".total-withdrawal--value"),
    percentage: document.querySelector(".total-withdrawal--percentage"),
    inpinco: ".income__list",
    inpdrc: ".withdraw__list",
    displ: document.querySelector(".heading-name"),
    displ1: document.querySelector(".heading-acc")
  };
  return {
    getInput: function() {
      return {
        type: String.inpType.value,
        dscrib: String.inpDesc.value,
        value: parseFloat(String.inpValue.value)
      };
    },
    addName: function() {
      String.displ.innerHTML =
        "Welcome " +
        JSON.parse(sessionStorage.getItem(1)) +
        " " +
        JSON.parse(sessionStorage.getItem(2));
    },
    addAcc: function() {
      String.displ1.innerHTML =
        "Account No:  " +
        JSON.parse(sessionStorage.getItem(6)) 
        
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      if (type === "inc" ) {
        element = String.inpinco;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item_date">%date%</div></div></div>';
      } else if (type === "drc" && budgetController.getBudget().balnce > 0) {
        element = String.inpdrc;
        html =
          ' <div class="item clearfix" id="withdraw-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item_date">%date%</div></div></div>';
      }
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      newHtml = newHtml.replace("%date%", new Date().toLocaleString());
      newHtml = newHtml.replace("%percentage%", obj.value);
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: function() {
      var fieldArr = [];
      fieldArr.push(String.inpDesc);
      fieldArr.push(String.inpValue);
      fieldArr.forEach(function(current) {
        current.value = "";
      });
      fieldArr[0].focus();
    },
    displayBudget: function(obj) {
      String.balanceLevel.textContent = obj.balnce;
      String.incomeLevel.textContent = obj.income;
      if (obj.balnce > 0) {
        String.withdrawLevel.textContent = obj.withdraw;
      }
      if (obj.percentage > 0) {
        String.percentage.textContent = obj.percentage + "%";
      } else {
        String.percentage.textContent = "--";
      }
    },
    getString: function() {
      return String;
    }
  };
})();

// App Controller
var controller = (function(bdgCntrl, UIcntrl) {
  var setEventListener = function() {
    var Dom = UIcntrl.getString();
    Dom.inpBtn.addEventListener("click", cntrlAddItem);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode == 13 || event.which == 13) {
        cntrlAddItem();
      }
    });
  };
  var budgetCal = function() {
    bdgCntrl.calBudget();
    var bdgt = bdgCntrl.getBudget();
    UIcntrl.displayBudget(bdgt);
  };
  var cntrlAddItem = function() {
    var input, newItem;
    input = UIcntrl.getInput();
    if (input.dscrib !== "" && input.value >= 0) {
      newItem = bdgCntrl.addItem(input.type, input.dscrib, input.value);
      UIcntrl.addListItem(newItem, input.type);
      UIcntrl.clearFields();
      budgetCal();
    }
  };
  return {
    setEv: function() {
      UIcntrl.displayBudget({
        balnce: 0,
        percentage: -1,
        income: 0,
        withdraw: 0
      });
      UIcntrl.addName();
      UIcntrl.addAcc();
      setEventListener();
    }
  };
})(budgetController, UIController);
controller.setEv();
