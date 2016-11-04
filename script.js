var financeApp = {
  init: function() {
  	console.log("Starting ...");
    this.loadData();
    this.cacheDom();
    this.bindEvents();
    this.render();
  },

  loadData: function() {
  	console.log("We made it here");
    if ($.trim(localStorage.getItem('finData')).length > 0) {
      this.data = $.parseJSON(localStorage.getItem('finData'));
    } else {
      this.data = {transactions:[]};
    }
    this.displayDate = moment().format("ddd, Do MMM");
  },

  filterTransactions: function() {
  	//do filtering here
  	return this.data;
  },

  cacheDom: function() {
  	console.log("And here");
    this.$doc = $('#container');
    this.$inputForm = this.$doc.find('#transaction-input-form');
    this.$transAmount = this.$doc.find('#transaction-amount');
    this.$transDate = this.$doc.find('#transaction-date');
    this.$transNote = this.$doc.find('#note');
    this.$addButton = this.$doc.find('#add-transaction');
    this.$dataDiv = this.$doc.find('#transaction-listing-div');
    this.$transListing = this.$doc.find('#transaction-listing');
    this.$transCategories = this.$doc.find('#transaction-category');
    this.categoriesTemplate = this.$doc.find('#cat-template').html();
    this.transTemplate = this.$doc.find('#transactions-template').html();
  },

  bindEvents: function() {
    this.$inputForm.on('submit', this.addTransaction.bind(this));
  },

  saveTransactions: function() {
    var ingoingData = JSON.stringify({ transactions: this.data.transactions });
    localStorage.setItem('finData', ingoingData);
  },

  render: function() {
    var data = this.filterTransactions(),
      todaysDate = moment();
    this.$transCategories.html(Mustache.render(this.categoriesTemplate, data));
    this.$transListing.html(Mustache.render(this.transTemplate, data));
  },


  renderError: function(errorType) {

  },

  renderEditBox: function(event) {},

  isInputValid: function() {

  },

  isInputFormValid: function($form) {
    var amount = $form.find('input#transaction-amount').val(),
      note = $form.find('#note').val(),
      date = $form.find('#transaction-date').val(),
      category = $form.find('#transaction-category').val();
    if (amount.length, note.length && date.length && category.length) {
      return { amount, note, category, date };
    } else {
      return false;
    }
  },

  addTransaction: function(event) {
    var $form = $(event.target),
      newTransaction = this.isInputFormValid($form);

    if (newTransaction) {
      this.data.transactions.push(newTransaction);
      this.saveTransactions();
      this.render();
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
