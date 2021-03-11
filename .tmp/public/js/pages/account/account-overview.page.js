'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

parasails.registerPage('account-overview', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    isBillingEnabled: false,

    hasBillingCard: false,

    // Syncing/loading states for this page.
    syncingOpenCheckout: false,
    syncingUpdateCard: false,
    syncingRemoveCard: false,

    // For <ajax-form>
    formData: {/* … */},
    formRules: {/* … */},
    formErrors: {/* … */},
    cloudError: '',
    syncing: '',

    // For <modal>:
    modal: ''

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function beforeMount() {
    _.extend(this, window.SAILS_LOCALS);

    this.isBillingEnabled = !!this.stripePublishableKey;

    // Determine whether there is billing info for this user.
    this.me.hasBillingCard = this.me.billingCardBrand && this.me.billingCardLast4 && this.me.billingCardExpMonth && this.me.billingCardExpYear;
  },
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickUpdateBillingCardButton: function clickUpdateBillingCardButton() {
      this.modal = 'update-billing-card';
      this.formData = { newPaymentSource: undefined };
      this.formRules = { newPaymentSource: { required: true } };
    },

    closeModal: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Dismiss modal
                this.modal = '';
                _context2.next = 3;
                return this._resetForms();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function closeModal() {
        return _ref2.apply(this, arguments);
      }

      return closeModal;
    }(),

    handleSubmittingUpdateBillingCard: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(argins) {
        var newPaymentSource;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                newPaymentSource = argins.newPaymentSource;
                _context3.next = 3;
                return Cloud.updateBillingCard.with(newPaymentSource);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleSubmittingUpdateBillingCard(_x) {
        return _ref3.apply(this, arguments);
      }

      return handleSubmittingUpdateBillingCard;
    }(),

    submittedUpdateBillingCard: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                Object.assign(this.me, _.pick(this.formData.newPaymentSource, ['billingCardLast4', 'billingCardBrand', 'billingCardExpMonth', 'billingCardExpYear']));
                this.me.hasBillingCard = true;

                // Dismiss modal
                this.modal = '';
                _context4.next = 5;
                return this._resetForms();

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function submittedUpdateBillingCard() {
        return _ref4.apply(this, arguments);
      }

      return submittedUpdateBillingCard;
    }(),

    _resetForms: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.cloudError = '';
                this.formData = {};
                this.formRules = {};
                this.formErrors = {};
                _context5.next = 6;
                return this.forceRender();

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _resetForms() {
        return _ref5.apply(this, arguments);
      }

      return _resetForms;
    }(),

    clickRemoveCardButton: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.modal = 'remove-billing-card';
                this.formData.stripeToken = '';

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function clickRemoveCardButton() {
        return _ref6.apply(this, arguments);
      }

      return clickRemoveCardButton;
    }(),

    submittedRemoveCardForm: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:

                // Update billing info on success.
                this.me.billingCardLast4 = undefined;
                this.me.billingCardBrand = undefined;
                this.me.billingCardExpMonth = undefined;
                this.me.billingCardExpYear = undefined;
                this.me.hasBillingCard = false;

                // Close the modal and clear it out.
                this.closeModal();

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function submittedRemoveCardForm() {
        return _ref7.apply(this, arguments);
      }

      return submittedRemoveCardForm;
    }()

  }
});
