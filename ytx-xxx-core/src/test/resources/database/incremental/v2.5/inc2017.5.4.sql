ALTER TABLE `ytx_trade`.`sale_order`
ADD COLUMN `seller_type` INT NULL DEFAULT 'null' COMMENT '商家类型：1、特卖；2、商城' AFTER `status`;

ALTER TABLE `ytx_trade`.`sale_order`
ADD COLUMN `seller_sub_type` INT(11) NULL COMMENT '11:特卖店、21:旗舰店、22:专卖店、23:专营店' AFTER `tag`;
