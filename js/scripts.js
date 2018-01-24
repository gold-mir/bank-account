var activeAccount;
var accounts = [];

function showErrorMessage(message){
  alert(message);
}

function displayAccountInfo(){
  if(activeAccount != undefined){
    $("#account-display h3:first-child").text(activeAccount.name);
    $(".balance-display").text(activeAccount.balance);
    $("#transaction-list").text("");

    activeAccount.transactions.forEach(function(transaction){
      var newLI = $("#transaction-prototype").clone();
      newLI.find("span[name=transaction-type]").text(transaction.getTypeString());
      newLI.find("span[name=transaction-amount]").text(Math.abs(transaction.value));
      newLI.find("span[name=transaction-date]").text(transaction.date);
      $("#transaction-list").prepend(newLI);
      newLI.show();
    });
    $("#account-display").show();
  }
}

function displayAccounts(){
  $("#account-list").text("");
  accounts.forEach(function(account){
    var activeClass = ""
    if(activeAccount === account){
      activeClass = "class='currently-active-account'";
    }
    $("#account-list").append("<li " + activeClass + " name='" + account.id + "'>" + account.name + "</li>");
    $("#account-list li:last-child").click(function(){
      var accountID = parseInt($(this).attr("name"));
      var accountToActivate = accounts.filter(function(item){
        return accountID === item.id;
      })[0];
      activeAccount = accountToActivate;
      // debugger;
      displayAccounts();
      displayAccountInfo();
    });
  });
}

$(document).ready(function(){

  $("#add-account-form").submit(function(event){
    event.preventDefault();
    var holder = $(this).find("input[name=account-holder]").val();
    var deposit = parseFloat($(this).find("input[name=transaction]").val());

    if(isNaN(deposit)){
      showErrorMessage("Inputted Value is not a number.");
      return;
    } else if (deposit < 0) {
      showErrorMessage("Initial deposit must be positive.");
      return;
    } else {
      var initialTransaction = new Transaction(deposit);
      var newAccount = new BankAccount(holder, initialTransaction);
      accounts.push(newAccount);
      activeAccount = newAccount;
      displayAccountInfo();
      displayAccounts();
      this.reset();
    }
  });

  $("#transaction-form").submit(function(event){
    event.preventDefault();
    if(activeAccount === undefined){
      showErrorMessage("Please select an account first.");
      return;
    }
    var input = $(this).find("input[name=transaction]")
    var transactionType = $(this).find("select").val();
    var value = parseFloat(input.val());
    if(isNaN(value)){
      showErrorMessage("Inputted value is not a number");
      return;
    } else {
      if(transactionType === "deposit"){
        activeAccount.deposit(value);
      } else if(transactionType === "withdrawal") {
        activeAccount.withdraw(value);
      } else {
        showErrorMessage("error");
      }
    }
    input.val("");
    displayAccountInfo();
  });

});
