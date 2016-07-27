// // Type definitions for shopify-buy
// // Project: Shopify Buy Client
// // Definitions by: Martin Köhn <[https://github.com/openminder]>
// // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * The JS Buy SDK is a lightweight library that allows you to build ecommerce into any website. 
 * It is based on Shopify’s API and provides the ability to retrieve products and collections from your shop, 
 * add products to a cart, and checkout.
 */
declare namespace ShopifyBuy {
    /**
     * Create a ShopClient. This is the main entry point to the SDK.
     */
    export function buildClient(configAttrs : Shopify.Config) : Shopify.ShopClient

    /**
     * Internal Image description 
     */
    interface Image {
        id : string|number
        src : string
        position : number
        product_id : string
        variant_ids : Array<string>    
        created_at : string
        updated_at : string
    }

    /**
     * Cart item, that should be added to the card
     */
    interface CartModelItem {
        variant : Shopify.ProductVariantModel
        quantity : number
    }

    /**
     * Internal BaseModel class
     */
    class BaseModel {
        constructor( attrs: any, metaAttrs: any )

        attrs : any
        serializer: any
        adapter: any
        shopClient: any
    }

    /**
     * This namespace contains all globally accessible classes
     */
    export namespace Shopify {

        /**
         * Base Shopify Client config object 
         */
        interface Config
        {
            /**
             *  Your api client's public token.
             */
            apiKey: string

            /** The app whose listings the client will be using. 
             * If you are just modifying a buy button, the buy-button's app id is. 
             * Otherwise, obtain the app id of the app you're modifying or extending.
             */
            appId: string

            /** You shop's myshopify.com domain. */
            domain: string
        }

        /**
         * Shopify-Buy-SDK Client to handle products and cart
         */
        class ShopClient {

            /**
             * Config data to be used throughout all API interaction 
             */
            constructor( config? : Config )
            /**
             * Creates a CartModel instance, optionally including attrs.
             */
            createCart(attrs? : any) : Promise<CartModel>

            /**
             * Updates an existing CartModel instance and persists it to localStorage.
             */
            updateCart(attrs? : any) : Promise<CartModel>

            /**
             * Retrieve a previously created cart by its key.
             */
            fetchCart(id : string) : Promise<CartModel>

            /**
             * Fetch one collection by its ID.
             */
            fetchCollection(id : string|number) : Promise<any> //TODO: Find declaration for Collection

            /**
             * Fetch one product by its ID.
             */
            fetchProduct(id: string|number) : Promise<ProductModel>

            /**
             * Fetches a list of collections matching a specified query.
             */
            fetchQueryCollections(query? : any) : Promise<Array<any>>

            /**
             * Fetches a list of products matching a specified query.
             */
            fetchQueryProducts(query? : any) : Promise<Array<ProductModel>>    

        }

        /**
         * Class for cart model
         */
        class CartModel extends BaseModel {

            constructor()

            /**
             * Get checkout URL for current cart
             */
            checkoutUrl : string

            /**
             * get ID for current cart
             */
            id : string|number

            /**
             * Get current line items for cart
             */
            lineItems : Array<CartModelItem>

            /**
             * Get current subtotal price for all line items
             */
            subtotal: string

            /**
             * Add items to cart. Updates cart's lineItems
             */
            addVariants(item : CartModelItem, nextItem? : Array<CartModelItem>) : Promise<CartModel>

            /**
             * Remove all line items from cart
             */
            clearLineItems() : Promise<CartModel>

            /**
             * Remove line item from cart
             */
            removeLineItem(id : string|number) : Promise<CartModel>

            /**
             * Update line item quantity
             */
            updateLineItem(id : string|number, quantitiy : number ) : Promise<CartModel>

        }

        /**
         * Class for products returned by fetch('product')
         */
        class ProductModel extends BaseModel {

            constructor()

            /**
             * Product unique ID
             */
            id : string|number

            /**
             * All images associated with product.
             */
            images : Array<Image>

            /**
             * Product title
             */
            title: string

            /**
             * All variants of a product.
             */
            variants: Array<ProductVariantModel>

            /**
             * Get array of options with nested values. Useful for creating UI for selecting options.
             */
            options : Array<Option>

            /**
             * Retrieve variant for currently selected options
             */
            selectedVariant : ProductVariantModel

            /**
             * Retrieve image for currently selected variantImage
             */
            selectedVariantImage : Image

            /**
             * Retrieve currently selected option values.
             */
            selections : Option
        }

        /**
         * Model for product variant
         */
        class ProductVariantModel extends BaseModel {

            constructor()

            /*
             * Checkout URL for purchasing variant with quantity.
             */
            checkoutUrl( quantitiy : number ) : string

            /**
             * Compare at price for variant formatted as currency.
             */
            compareAtPrice : string

            /**
             * Variant weight in grams
             */
            grams : number

            /**
             * Variant unique ID
             */
            id : string|number

            /**
             * Image for variant
             */
            image : Image

            /** 
             * Option values associated with this variant, ex {name: "color", value: "Blue"}
            */
            optionValues : Array<Option>

            /**
             * Price of variant, formatted as currency
             */
            price : string

            /**
             * ID of product variant belongs to
             */
            productId : string|number

            /**
             * Title of product variant belongs to
             */
            productTitle : string

            /**
             * Title of variant
             */
            title: string
        }

        /**
         * Class for product option
         */
        class Option extends BaseModel {

            constructor()

            /**
             * name of option (ex. "Size", "Color")
             */
            name: string

            /**
             * get/set selected option value (ex. "Large"). 
             * Setting this will update the selected value on the model. 
             * Throws {Error} if setting selected to value that does not exist for option
             */
            selected : string

            /**
             * possible values for selection
             */
            values : Array<any>
            
        }
        
    }    

}

declare module "ShopifyBuy" {
    export = ShopifyBuy
}