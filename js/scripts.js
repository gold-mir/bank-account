function Transaction (amount){
  if(typeof amount === "number"){
    this.value = amount;
    this.date = new Date();
  } else {
    throw "Error: Transactions must be initialized with a number";
  }
}

Transaction.prototype.isWithdrawl = function (){
  return this.value < 0;
}

Transaction.prototype.isDeposit = function(){
  return this.value > 0;
}

function BankAccount(initialDeposit){
  if(initialDeposit.isWithdrawl()){
    throw "Error: Bank Accounts must be initialized with a deposit."
  }
  this.total = initialDeposit.value;
  this.transactions = [];
  this.transactions.push(initialDeposit);
}

BankAccount.prototype.addTransaction = function(transaction){
  this.total += transaction.value;
  this.transactions.push(transaction);
  return this;
}

BankAccount.prototype.deposit = function(amount){
  var newTransaction = new Transaction(amount);
  this.total += newTransaction.value;
  this.transactions.push(newTransaction);
  return this;
}

BankAccount.prototype.withdraw = function(amount){
  this.deposit(-amount);
  return this;
}
