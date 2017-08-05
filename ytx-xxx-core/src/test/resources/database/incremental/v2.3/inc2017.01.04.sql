-- 添加一个商家标记
ALTER TABLE sale_order
ADD COLUMN `tag` INT NULL DEFAULT 0 COMMENT '商家订单标记' AFTER `delivery_at`;
-- 初始化运送方式
alter table purchase_order  alter column vender set default 0;
-- 修改为空的运送方式
update purchase_order set vender = 0 where vender is NULL;