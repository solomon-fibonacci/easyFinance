var financeApp = {
  init: function() {
    this.loadData();
    this.cacheDom();
    this.bindEvents();
    this.render();
  },

  loadData: function() {
    if ($.trim(localStorage.getItem('finData')).length > 0) {
      this.transactions = $.parseJSON(localStorage.getItem('finData')).tasks;
    } else {
      this.transactions = [];
    }
    this.displayDate = moment().format("ddd, Do MMM");
  },

  filterTransactions: function() {

  },

  cacheDom: function() {
    this.$doc = $('#container');
    this.$inputForm = this.$doc.find('#transaction-input-form');
    this.$transAmount = this.$doc.find('#transaction-amount');
    this.$transDate = this.$doc.find('#transaction-date');
    this.$transNote = this.$doc.find('#note');
    this.$addButton = this.$doc.find('#add-transaction');
    this.$dataDiv = this.$doc.find('#transaction-listing-div');
    this.$transListing = this.$doc.find('#transaction-listing');
    this.template = this.$doc.find('#template').html();
  },

  bindEvents: function() {
    this.$inputForm.on('submit', this.addTransaction.bind(this));
  },

  saveTransactions: function() {
    var ingoingData = JSON.stringify({ transactions: this.transactions });
    localStorage.setItem('finData', ingoingData);
  },

  render: function() {
    var data = this.filterTransactions(),
      todaysDate = moment();
    // this.$input.val(''); // find a jquery way to reset form values
    this.$transListing.html(Mustache.render(this.template, data));
  },


  renderError: function(errorType) {
    console.log('Hey there!');
    var errorMsg = errorType == 'longer' ? 'Please limit your entry to 140 characters.' : 'Entry cannot be empty.';
    console.log(errorMsg);
    this.$errorSpan.html(errorMsg);
    console.log(this.$errorSpan);
    this.$errorSpan.fadeIn(1000);
    this.$errorSpan.delay(10000).fadeOut(1000);
  },

  renderEditBox: function(event) {},

  isInputValid: function() {

  },

  isInputFormValid: function($transInputForm) {
    var $formFields = $transInputForm.children(),
      amount = $formFields.find('#transaction-amount'),
      note = $formFields.find('#note'),
      date = $formFields.find('#transaction-date'),
      category = $formFields.find('#transaction-category');
      console.log($formFields);
    console.log(amount);
    console.log(note.val());
    console.log(date.val());
    return amount.length && note.length && date.length;
  },

  addTransaction: function(event) {
  	event.preventDefault();
    if (this.isInputFormValid($(event.target))) {
      $transInputForm = event.target;
      var amount = $transInputForm.children('#transaction-amount'),
        note = $transInputForm.children('#note'),
        date = $transInputForm.children('#transaction-date'),
        category = $transInputForm.children('#transaction-category');
      var newTransaction = { amount, note, category, date };
      this.transactions.push(newTransaction);
      this.saveTransactions();
    } else {
      console.log("What have you done?");
    }
  },

  updateTransaction: function(event) {},


  deleteTransaction: function() {},

  goBack: function() {},

  goForward: function() {},

};

financeApp.init();
