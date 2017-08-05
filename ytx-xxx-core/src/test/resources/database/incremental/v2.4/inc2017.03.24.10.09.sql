-- 增加备用状态1,2,3,4
alter table order_item add backup_field1 VARCHAR(100) NULL COMMENT '备用字段1',
                       add backup_field2 VARCHAR(100) NULL COMMENT '备用字段2',
                       add backup_field3 VARCHAR(100) NULL COMMENT '备用字段3',
                       add backup_field4 VARCHAR(100) NULL COMMENT '备用字段4';
-- purchase_order 新增字段
-- 增加备用状态1,2
alter table purchase_order add backup_field1 VARCHAR(100) NULL COMMENT '备用字段1',
                       add backup_field2 VARCHAR(100) NULL COMMENT '备用字段2';