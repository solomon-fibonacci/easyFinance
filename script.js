var financeApp = {
  init: function() {
    this.loadData();
    this.computeTotals();
    this.cacheDom();
    this.bindEvents();
    this.render();
    this.computeSummaryByCategory();
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
    this.data.indexedCategories = this.indexCategories();
    var self = this;
    this.data.incomeTotal = _.sumBy(this.data.transactions, function(t) {
      var amt = self.data.indexedCategories[t.categoryID].type == "income" ? parseFloat(t.amount) : 0;
      return amt;
    });
    this.data.expenseTotal = _.sumBy(this.data.transactions, function(t) {
      var amt = self.data.indexedCategories[t.categoryID].type == "expense" ? parseFloat(t.amount) : 0;
      return amt;
    });
    this.data.balance = this.data.incomeTotal - this.data.expenseTotal;
  },

  indexCategories: function() {
    var indexedCat = _.keyBy(this.data.categories, 'catID');
    return indexedCat;
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
    //todo: event handler for detailed summary click.
  },


  render: function() {
    var data = this.filterTransactions(),
      todaysDate = moment();
    this.getTransactionCategories();
    this.$summary.html(Mustache.render(this.summaryTemplate, data));
    this.$transCategories.html(Mustache.render(this.categoriesTemplate, data));
    this.$transListing.html(Mustache.render(this.transTemplate, data));
  },


  renderError: function(errorType) {
    //render errors here;
  },

  renderEditBox: function(event) {},
  saveTransactions: function() {
    var ingoingData = JSON.stringify({ transactions: this.data.transactions, categories: this.data.categories });
    localStorage.setItem('finData', ingoingData);
  },

  getTransactionCategories: function() {
    var self = this;
    this.data.transactions = _.map(this.data.transactions, function(t) {
      t.category = self.data.indexedCategories[t.categoryID].category;
      return t;
    });
  },

  computeSummaryByCategory: function() {
    var self = this;
    _.forEach(this.data.indexedCategories, function(cat) {
      cat.total = _.sumBy(self.data.transactions, function(t) {
        var amt = self.data.indexedCategories[t.categoryID].catID == cat.catID ? parseFloat(t.amount) : 0;
        return amt;
      });
    });
  },

  filterTransactions: function() {
    //do filtering here
    return this.data;
  },
  isInputFormValid: function($form) {
    console.log($form);
    var amount = $form.find('input#transaction-amount').val(),
      note = $form.find('#note').val(),
      date = $form.find('#transaction-date').val(),
      categoryID = $form.find('#transaction-category').val();
    if (amount.length, note.length && date.length && categoryID.length) {
      return { amount, note, categoryID, date };
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
