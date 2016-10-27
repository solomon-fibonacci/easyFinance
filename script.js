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
    this.$inputForm = this.$doc.find('#tras');
    this.$transAmount = this.$doc.find('#transaction-amount');
    this.$transDate = this.$doc.find('#transaction-date');
    this.$transNote = this.$doc.find('#note');
    this.$addButton = this.$doc.find('#add-transaction');
    this.template = this.$doc.find('#todoTemplate').html();
  },

  bindEvents: function() {
    this.$forwardButton.on('click', this.goForward.bind(this));
    this.$backButton.on('click', this.goBack.bind(this));
    this.$inputForm.on('submit', this.addItem.bind(this));
    this.$input.on('focus', this.render.bind(this));
    this.$listDiv.on('change', '.todoCheckbox', this.tickItem.bind(this));
    this.$listDiv.on('click', '.delButton', this.deleteItem.bind(this));
    this.$listDiv.on('click', '.editButton', this.renderEditBox.bind(this));
    this.$listDiv.on('submit', '.editBox', this.updateItem.bind(this));
  },

  saveTransactions: function() {
    var ingoingData = JSON.stringify({ tasks: this.transactions});
    localStorage.setItem('finData', ingoingData);
  },

  filterTransactions: function() {
    var today = moment();
    var filterDate = moment(this.displayDate, 'ddd, Do MMM');
    var filteredTasks = this.tasks.filter(function(t) {
      var taskDate = moment(t.date, 'DDMMYYYY');
      return (
        taskDate.isSame(filterDate, 'day') && t.ischecked ||
        filterDate.isSame(today, 'day') && !t.ischecked && today.isSameOrAfter(taskDate, 'day') ||
        taskDate.isSame(filterDate, 'day')  && filterDate.isAfter(today, 'day')
      );
    });
    var data = {
      tasks: filteredTasks,
    };
    return data;
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
    var $items = $(event.target).closest('ul').find('.todoItemText');
    var $boxes = $(event.target).closest('ul').find('.editBox');
    $boxes.hide();
    $items.fadeIn(150);
    var $text = $(event.target).closest('li').find('.todoItemText');
    $text.fadeOut(50, function() {
      var $box = $(event.target).closest('li').find('.editBox');
      $box.children('input').val($.trim($text.contents().text()));
      $box.addClass('visibleEditBox').fadeIn(150);
    });
  },
  
  addTransaction: function(event) {
  },

  updateTransaction: function(event) {
  },


  deleteTransaction: function() {
  },

  goBack: function() {
  },

  goForward: function() {
  },

};

financeApp.init();
