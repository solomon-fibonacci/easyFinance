var financeApp = {
  init: function() {
    this.loadData();
    this.computeTotals();
    this.cacheDom();
    this.bindEvents();
    this.render();
  },

  loadData: function() {
    if ($.trim(localStorage.getItem('finData')).length > 0) {
      this.data = $.parseJSON(localStorage.getItem('finData'));
    } else {
      this.data = { transactions: [], categories: [] };
    }
    this.displayDate = moment().format("ddd, Do MMM");
  },

  computeTotals: function() {
    var indexedCategories = this.indexCategories();
    this.data.incomeTotal = _.sumBy(this.data.transactions, function(t) {
      var amt = indexedCategories[t.category].type == "income" ? parseFloat(t.amount) : 0;
      return amt;
    });
    this.data.expenseTotal = _.sumBy(this.data.transactions, function(t) {
      var amt = indexedCategories[t.category].type == "expense" ? parseFloat(t.amount) : 0;
      return amt;
    });
    this.data.balance = this.data.incomeTotal - this.data.expenseTotal;
  },

  indexCategories: function() {
    var indexedCat = _.keyBy(this.data.categories, 'catID');
    return indexedCat;
  },


  filterTransactions: function() {
    //do filtering here
    return this.data;
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
    this.$transCategories = this.$doc.find('#transaction-category');
    this.$summary = this.$doc.find('#financeSummary');
    this.categoriesTemplate = this.$doc.find('#cat-template').html();
    this.summaryTemplate = this.$doc.find('#summary-template').html();
    this.transTemplate = this.$doc.find('#transactions-template').html();
  },

  bindEvents: function() {
    this.$inputForm.on('submit', this.addTransaction.bind(this));
  },

  saveTransactions: function() {
    var ingoingData = JSON.stringify({ transactions: this.data.transactions, categories: this.data.categories });
    localStorage.setItem('finData', ingoingData);
  },

  render: function() {
    var data = this.filterTransactions(),
      todaysDate = moment();
    this.$summary.html(Mustache.render(this.summaryTemplate, data));
    this.$transCategories.html(Mustache.render(this.categoriesTemplate, data));
    this.$transListing.html(Mustache.render(this.transTemplate, data));
  },


  renderError: function(errorType) {

  },

  renderEditBox: function(event) {},

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
      this.computeTotals();
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
