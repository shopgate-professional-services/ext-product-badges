# Shopgate Connect - Extension product-badges

This extension will add or replace additional badges to product list entries and PDP.
It depends on the [@shopgate-project/products-properties](https://github.com/shopgate-professional-services/ext-products-properties) extension to extend product entities with the required data.

## Features
- Add custom badges to products. Those can be based on product discounts or products properties
- Configure a custom order to the desired badges
- Change badge styling based on global configuration or per badge

## Demo & Examples
[See here](demo/index.md)
## Configuration

### badges
The badges configuration contains all rules for the badges to display. Default:

```json
{
  "badges": [
    {
      "type": "discount"
    }
  ]
}
```

#### Type: `discount`
A badge to display product discounts. When `label` is set, its value will be used for the badge instead of the percentage. When `min` or `max` are not set, it will display any discount from 1%. In combination with `min`, `max` and `style` multiple badges can be configured to highlight different levels of discounts with different stylings. Styling will be merged with the global styling.
```json
{
  "type": "discount",
  "label": "SALE", // optional
  "min": 10, // optional (default 1)
  "max": 50, // optional (default 100)
  "style": { // optional
    "background": "red"
  }
}
```
#### Type: `property`
A badge to display product properties based badges. When `label` is configured, the product properties will be searched for an exact match of property `label` and `value` configured within the badge `properties`. When the badge `label` is omitted, the product property `value` will be used for the badge label.

```json
{
  "type": "property",
  "label": "CUSTOM", // optional
  "properties": [{
    "label": "CustomText",
    "value": "Custom", // optional
  }],
  "style": { // optional
    "background": "yellow"
  }
}
```

### maxDisplayCount
The maximum amount of badges to display. Default:
```json
  "maxDisplayCount": 3
```

### showOnPdp
Whether badges are displayed on the product details page (PDP). Default:
```json
  "showOnPdp": true
```
### showOnSliders
Whether badges are displayed on product sliders. Default:
```json
  "showOnSliders": true
```
### showOnLists
Whether badges are displayed on product lists (for now only support for product grid). Default:
```json
  "showOnLists": true
```
### showOnLiveshopping
Whether badges are displayed on liveshopping widgets. Default:
```json
  "showOnLiveshopping": true
```
### badgeStyle
Global styling for the badges rendered by the component. Default:
```json
  "badgeStyle": {}
```
## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Connect - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
