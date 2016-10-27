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

  cacheDom: function() {
    this.$doc = $('#container');
    this.$inputForm = this.$doc.find('#transaction-input-form');
    this.$transAmount = this.$doc.find('#transaction-amount');
    this.$transDate = this.$doc.find('#transaction-date');
    this.$transNote = this.$doc.find('#note');
    this.$addButton = this.$doc.find('#add-transaction');
    this.template = this.$doc.find('#todoTemplate').html();
  },

  bindEvents: function() {
    this.$inputForm.on('submit', this.addTransaction.bind(this));
  },

  saveTransactions: function() {
    var ingoingData = JSON.stringify({ tasks: this.transactions });
    localStorage.setItem('finData', ingoingData);
  },

  render: function() {
    var data = this.filterTasks(),
      todaysDate = moment();
    this.$input.val('');
    this.$ul.html(Mustache.render(this.template, data));
    this.$displayDate.html(this.displayDate);
    if (moment(this.displayDate, 'ddd, Do MMM').isBefore(todaysDate, 'day')) {
      this.$input.prop('disabled', true);
      this.$ul.children('li').find('.editButton').hide();
    } else {
      this.$input.prop('disabled', false);
    }
    this.renderCheckboxes();
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

  renderEditBox: function(event) {
  },

  isInputValid: function() {

  },

  addTransaction: function(event) {
    if (this.isInputFormValid(event.target)) {
    	//prepare the input into appropriate format
    	//append to standing data
    	//save data
    }
  },

  updateTransaction: function(event) {},


  deleteTransaction: function() {},

  goBack: function() {},

  goForward: function() {},

};

financeApp.init();
