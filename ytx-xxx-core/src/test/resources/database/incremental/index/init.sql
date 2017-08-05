/**购物车项**/
CREATE index ytx_trade_cart_line_user_id on cart_line(user_account_id);
CREATE index ytx_trade_cart_line_shopping_cart_id on cart_line(shopping_cart_id);
/**购物车**/
CREATE index ytx_trade_shopping_cart_user_account_id on shopping_cart(user_account_id);
/**order discount**/
CREATE index ytx_trade_order_discount_purchase_order_id on order_discount(purchase_order_id);
CREATE index ytx_trade_order_discount_serial_number on order_discount(purchase_order_serial_number);
/**order item**/
CREATE index ytx_trade_order_item_purchase_order_id on order_item(purchase_order_id);
CREATE index ytx_trade_order_item_purchase_order_serial_number on order_item(purchase_order_serial_number);
/**order item discount**/
CREATE index ytx_trade_order_item_discount_order_item_id on order_item_discount(order_item_id);
CREATE index ytx_trade_order_item_discount_purchase_order_serial_number on order_item_discount(purchase_order_serial_number);
/**order payment**/
CREATE index ytx_trade_order_payment_purchase_order_id on order_payment(purchase_order_id);
CREATE index ytx_trade_order_payment_payment_sn on order_payment(payment_sn);
/**order payment history**/
CREATE index ytx_trade_order_payment_history_purchase_order_id on order_payment(purchase_order_id);
CREATE index ytx_trade_order_payment_history_payment_sn on order_payment(payment_sn);
/**order rebate**/
CREATE index ytx_trade_order_rebate_purchase_order_serial_number on order_rebate(purchase_order_serial_number);
/**order refund**/
CREATE index ytx_order_refund_purchase_serial_number on order_refund(purchase_serial_number);
CREATE index ytx_order_refund_dispute_no on order_refund(dispute_no);
CREATE index ytx_order_refund_payment_sn on order_refund(payment_sn);
/**purchase_order**/
CREATE index ytx_purchase_order_serial_number on purchase_order(serial_number);
CREATE index ytx_purchase_order_user_account_id on purchase_order(user_account_id);
CREATE index ytx_purchase_order_order_address_id on purchase_order(order_address_id);
CREATE index ytx_purchase_order_order_from on purchase_order(order_from);
CREATE index ytx_purchase_order_status on purchase_order(status);
CREATE index ytx_purchase_delete_state on purchase_order(delete_state);
/**sale order**/
CREATE index ytx_sale_order_purchase_order_id on sale_order(purchase_order_id);
CREATE index ytx_sale_order_seller_account_id on sale_order(seller_account_id);
CREATE index ytx_sale_order_serial_number on sale_order(serial_number);
CREATE index ytx_sale_order_status on sale_order(status);






