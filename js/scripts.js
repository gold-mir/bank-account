var mainAccount;

function showErrorMessage(message){
  alert(message);
}

function displayAccount(account){
  $(".balance-display").text(account.balance);
  $("#transaction-list").text("");
  account.transactions.forEach(function(transaction){
    var newLI = $("#transaction-prototype").clone();
    newLI.find("span[name=transaction-type]").text(transaction.getTypeString());
    newLI.find("span[name=transaction-amount]").text(Math.abs(transaction.value));
    newLI.find("span[name=transaction-date]").text(transaction.date);
    $("#transaction-list").prepend(newLI);
    newLI.show();
  });
}

$(document).ready(function(){
  mainAccount = new BankAccount(new Transaction(4000));
  displayAccount(mainAccount);
  $("#transaction-form").submit(function(event){
    event.preventDefault();
    var input = $(this).find("input[name=transaction]")
    var transactionType = $(this).find("select").val();
    console.log(transactionType);
    var value = parseFloat(input.val());
    if(isNaN(value)){
      showErrorMessage("Inputted value is not a number");
      return;
    } else {
      if(transactionType === "deposit"){
        mainAccount.deposit(value);
      } else if(transactionType === "withdrawal") {
        mainAccount.withdraw(value);
      } else {
        showErrorMessage("error");
      }
    }
    input.val("");
    displayAccount(mainAccount);
  });
});
