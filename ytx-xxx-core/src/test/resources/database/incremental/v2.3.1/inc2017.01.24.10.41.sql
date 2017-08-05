--  1. order_item表格，新增字段：
--  订单商品售后入口关闭时间点（customer_service_flag_disable_time），默认为null
--  订单商品售后过期标记（0 售后未过期，1 售后已过期）
--  订单商品售后过期时间，默认为null
alter table order_item add customer_service_time INT DEFAULT 15 COMMENT '售后服务期限',
                       add customer_service_flag_disable_time DATETIME DEFAULT null COMMENT '售后入口关闭时间点',
                       add customer_service_overdue_flag INT DEFAULT 0 COMMENT '售后是否过期（0 未过期，1 已过期）',
                       add customer_service_overdue_time DATETIME DEFAULT null COMMENT '售后过期时间点';
-- purchase_order 新增字段
-- comment_status 评论状态(0未评论,1已评论)
alter table purchase_order add comment_status INT DEFAULT 0 COMMENT '评论状态（0 未评论，1 已评论)';

-- 2. 将所有订单商品项的售后过期时间设置为null
update order_item set customer_service_flag_disable_time=null;
-- 3. 将状态为取消的订单下的所有商品修改为售后已过期
update order_item oi set oi.customer_service_overdue_flag=1 where EXISTS (select id from purchase_order po where po.serial_number=oi.purchase_order_serial_number and po.status=0);
-- 4. 将状态为关闭的订单下的所有商品修改为售后已过期
update order_item oi set oi.customer_service_overdue_flag=1 where EXISTS (select id from purchase_order po where po.serial_number=oi.purchase_order_serial_number and po.status=6);
-- 5. 将已经关闭的商品修改为售后已过期
update order_item oi set oi.customer_service_overdue_flag=1 where oi.customer_service_overdue_flag=0 and oi.delivery_status=4;
-- 6. 将已经取消的商品修改为售后已过期
update order_item oi set oi.customer_service_overdue_flag=1 where oi.customer_service_overdue_flag=0 and oi.delivery_status=5;
-- 7. 将订单商品项确认收货超过15天的修改为售后已过期
update order_item oi set oi.customer_service_overdue_flag=1 where date_add(oi.confirm_at, INTERVAL 15 DAY)<now() and oi.confirm_at is not null and oi.customer_service_overdue_flag=0;
