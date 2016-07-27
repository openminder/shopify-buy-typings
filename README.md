# shopify-buy-typings
Type definitions for Shopify Buy Javascript SDK. Tested with version 0.2.1.
Link to Shopify Buy SDK API: http://shopify.github.io/js-buy-sdk/api/

## How to use
``` shell
npm install shopify-buy --save
typings install github:openminder/shopify-buy-typings --global --save
```
Import with initializer and public classes:
``` typescript
import { buildClient, Shopify} from 'ShopifyBuy';
```
## Public classes are:
* CartModel
* Config
* Option
* ProductModel
* ProductVariantModel
* ShopClient
* ShopifyBuy
