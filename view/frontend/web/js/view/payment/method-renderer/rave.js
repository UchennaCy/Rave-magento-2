/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
// define(
//     [
//         'Magento_Checkout/js/view/payment/default'
//     ],
//     function (Component) {
//         'use strict';

//         return Component.extend({
//             defaults: {
//                 template: 'Magento_SamplePaymentGateway/payment/form',
//                 transactionResult: ''
//             },

//             initObservable: function () {

//                 this._super()
//                     .observe([
//                         'transactionResult'
//                     ]);
//                 return this;
//             },

//             getCode: function() {
//                 return 'sample_gateway';
//             },

//             getData: function() {
//                 return {
//                     'method': this.item.method,
//                     'additional_data': {
//                         'transaction_result': this.transactionResult()
//                     }
//                 };
//             },

//             getTransactionResults: function() {
//                 return _.map(window.checkoutConfig.payment.sample_gateway.transactionResults, function(value, key) {
//                     return {
//                         'value': key,
//                         'transaction_result': value
//                     }
//                 });
//             }
//         });
//     }
// );

define(
  [
    'Magento_Checkout/js/view/payment/default',
    'Magento_Checkout/js/model/quote',
  ],
  function (Component, quote) {
    'use strict';

    return Component.extend({
      config: window.checkoutConfig,

      defaults: {
        template: 'Rave/payment/rave'
      },
      getCustomerEmail: function () {
        return quote.guestEmail || this.config.customerData.email;
      },

      getQuoteAmount: function () {
        return this.config.quoteData.base_grand_total;
      },

      getQuoteCurrency: function () {
        return this.config.quoteData.quote_currency_code;

      },

      quoteRef: function () {
        return 'MAGE_' + quote.getQuoteId() + '_' + new Date().valueOf();
      },

      getRaveConfigValue: function (key) {
        return this.config.payment.rave[key] || '';
      },

      callback: function (res) {
        this.processPaymentResponse(res);
      },

      /** Returns send check to info */
      buildConfig: function () {
        var rave_country;
        switch (this.getQuoteCurrency()) {
          case 'GHS':
            rave_country = 'GH';
            break;
          case 'KES':
            rave_country = 'KE';
            break;
          case 'ZAR':
            rave_country = 'ZA';
            break;

          default:
            rave_country = 'NG';
            break;
        }
        return {
          amount: this.getQuoteAmount(),
          currency: this.getQuoteCurrency(),
          country: rave_country,
          custom_description: this.getRaveConfigValue('modal_desc'),
          custom_logo: this.getRaveConfigValue('logo'),
          custom_title: this.getRaveConfigValue('modal_title'),
          customer_email: this.getCustomerEmail(),
          PBFPubKey: this.getRaveConfigValue('public_key'),
          txref: this.quoteRef(),
          callback: this.callback.bind(this)
        };
      },

      /** Place Order action */
      makePayment: function () {
        var test = this.getRaveConfigValue('test_mode')
        if (test) {
          var script = document.createElement('script');
          script.src = '//ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js';
          script.src_type = 'url';

          document.getElementsByTagName('head')[0].appendChild(script);
          getpaidSetup(this.buildConfig());
        } else {
          var script = document.createElement('script');
          script.src = '//api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js';
          script.src_type = 'url';

          document.getElementsByTagName('head')[0].appendChild(script);
          getpaidSetup(this.buildConfig());
        }

      },

      setErrorMessage: function (message) {
        this.messageContainer.addErrorMessage({
          message: 'Payment could not be made. Please try again. (' + message + ')'
        });
      },

      processPaymentResponse: function (res) {
        var result = res.tx;
        var statusCode = result.paymentType == 'account' ? result.acctvalrespcode : result.vbvrespcode;

        if (statusCode !== '00') {
          var responseMsg = (result.paymentType === 'account') ? result.acctvalrespmsg : result.vbvrespmessage;
          this.setErrorMessage(responseMsg);
        } else {
          this.placeOrder();
        }
      }
    });
  }
);
