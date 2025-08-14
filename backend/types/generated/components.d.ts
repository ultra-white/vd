import type { Schema, Struct } from '@strapi/strapi';

export interface OrderProduct extends Struct.ComponentSchema {
  collectionName: 'components_order_products';
  info: {
    displayName: '\u0422\u043E\u0432\u0430\u0440';
    icon: 'archive';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer & Schema.Attribute.Required;
    size: Schema.Attribute.Enumeration<['s', 'm', 'l']> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.product': OrderProduct;
    }
  }
}
