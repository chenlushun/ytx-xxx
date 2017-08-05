-- 订单支付表格新增第三方支付时间
alter table order_payment add column third_party_paid_at DATETIME DEFAULT null comment '第三方支付时间';
-- 买家订单表新增第三方支付时间
alter table purchase_order add column third_party_paid_at DATETIME DEFAULT null comment '第三方支付时间';
-- 售后支付表格，新增第三方支付时间
alter table order_refund add column third_party_refunded_at DATETIME DEFAULT null comment '第三方支付时间';
-- 订单商品项新增最后修改时间字段
alter table order_item add column updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 更新当前库中的数据
update order_payment set third_party_paid_at=paid_at where paid_at is not null;
update purchase_order set third_party_paid_at=paid_at where paid_at is not null;
update order_refund set third_party_refunded_at=create_at where create_at is not null;