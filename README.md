# Magento 2 Rave Payment Gateway

 - **Contributors:** Nnamadim Uchenna

 - **Tags:** rave, magento 2, payment gateway, bank account, credit card, debit card, nigeria, kenya, ghana, usa
 - **Tested with:** PHP 7.0.2, PHP 7.2
 - **License:** GPL-3

Rave payment gateway for accepting payments via credit/debit cards, bank accounts, Mpesa, Ghana Mobile Money and Barter on your Magento-2 store.

Support for:

 - Credit card
 - Debit card
 - Bank account
 - Mpesa
 - Mobile money
 - Barter


## Description

Accept Credit card, Debit card and Bank account payment directly on your store with the Rave payment gateway for Magento 2.

#### Take Credit card payments easily and directly on your store

Signup for an account [here](https://rave.flutterwave.com)

Rave is available in:

* __Nigeria__
* __Ghana__
* __Kenya__
* __South Africa__
* __Tanzania__
* __Uganda__
* __USA__


## Installation

* Go to Magento2 root folder

* Enter following command to install module:

```bash
composer require rave/module-payment
```

* Wait while dependencies are updated.

*  Enable the Rave Payments module by running this command,
   From your commandline, in your magento root directory:

   ```php bin/magento module:enable Rave --clear-static-content && php bin/magento setup:upgrade && php bin/magento setup:di:compile```

Once the `setup:upgrade` completes the module will be available in the Store Admin.



### Configure the plugin

Configuration can be done using the Administrator section of your Magento store.

* From the admin dashboard, using the left menu navigate to __Stores__ > __Configuration__ > __Sales__ > __Payment Methods__.
* Select __Rave Payments__ from the list of recommended modules.
* Set __Enable__ to __Yes__ and fill the rest of the config form accordingly, then click the orange __Save Config__ to save and activate.
  Note: Public Key is required to activate this module for cart checkout.

## Screenshots

![Configuration Screenshot](https://cloud.githubusercontent.com/assets/8383666/21956754/e5605eca-da87-11e6-855a-eddac6d33961.png)


### Suggestions / Contributions

For issues and feature request, [click here](https://github.com/wisecyril/rave-magento-2/issues).
To contribute, fork the repo, add your changes and modifications then create a pull request.

