<?php
/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\SamplePaymentGateway\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;

/**
 * Class ConfigProvider
 */
final class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'rave';

    protected $method;

    public function __construct(ScopeConfigInterface $ScopeConfigInterface, scopeConfig $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
        $this->scopeStore = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
    }

    /**
     * Retrieve assoc array of checkout configuration
     *
     * @return array
     */
    public function getConfig()
    {
    if ($this->scopeConfig->getValue('payment/rave/test_mode', $this->scopeStore)) {
      $public_key = $this->scopeConfig->getValue('payment/rave/test_public_key', $this->scopeStore);
      
    } else {
      $public_key = $this->scopeConfig->getValue('payment/rave/live_public_key', $this->scopeStore);
    }
    return [
      'payment' => [
        'rave' => [
          'public_key' => $public_key,
          'modal_title' => $this->scopeConfig->getValue('payment/rave/modal_title', $this->scopeStore),
          'modal_desc' => $this->scopeConfig->getValue('payment/rave/modal_desc', $this->scopeStore),
          'test_mode' => $this->scopeConfig->getValue('payment/rave/test_mode', $this->scopeStore),
        ]
      ]
    ];
  }
}
