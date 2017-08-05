
 -- 2.2版本发布SQL脚本
ALTER TABLE purchase_order
ADD COLUMN `delete_state` INT(11) NULL ,ADD COLUMN `vender` INT(11) NULL;

ALTER TABLE sale_order   
ADD COLUMN `delivery_at` TIMESTAMP NULL;

ALTER TABLE order_item 
ADD COLUMN `bar_code` VARCHAR(32) NULL ,
ADD COLUMN `back_point` DECIMAL(6,2) NULL ,
ADD COLUMN `item_code` VARCHAR(32) NULL ,
ADD COLUMN `sku_code` VARCHAR(32) NULL ,
ADD COLUMN `delivery_status` INT(11) NULL ,
ADD COLUMN `dispute_state` INT(11) NULL ,
ADD COLUMN `active_id` BIGINT(20) NULL;