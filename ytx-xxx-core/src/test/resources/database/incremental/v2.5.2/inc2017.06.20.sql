
-- 默认为未评价
alter table order_item add column comment_state INT DEFAULT 0 COMMENT '评价状态，0，未评价，1，已评价';
-- 默认为未评价
ALTER TABLE purchase_order ALTER COLUMN comment_status SET DEFAULT 0;

ALTER TABLE ytx_trade.order_item MODIFY bar_code VARCHAR(50) COMMENT '商品条形码';