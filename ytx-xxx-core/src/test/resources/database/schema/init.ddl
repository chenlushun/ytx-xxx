-- 购买订单
DROP TABLE IF EXISTS purchase_order;
CREATE TABLE purchase_order (
  id               BIGINT(20)   NOT NULL   AUTO_INCREMENT COMMENT 'id',
  serial_number    VARCHAR(80) COMMENT '订单流水号',
  user_account_id  BIGINT(20) COMMENT '买家账户ID',
  order_address_id BIGINT(20) COMMENT '收货地址ID',
  total_price      DOUBLE COMMENT '商品总价',
  delivery_fee     DECIMAL(10, 2) COMMENT '总运费',
  discount_amount   DECIMAL(10, 2) COMMENT '优惠金额',
  trade_amount   DECIMAL(10, 2) COMMENT '订单总金额',
  order_amount     DECIMAL(10, 2) COMMENT '订单总额',
  red_bag_amount   DECIMAL(10, 2) COMMENT '红包抵扣金额',
  credit          BIGINT(20) COMMENT '积分消耗',
  credit_amount   DECIMAL(10, 2) COMMENT '积分抵扣金额',
  transaction_fee DECIMAL(10, 2) COMMENT '佣金',
  status           INT COMMENT '订单状态',
  refund_status     INT DEFAULT 100 COMMENT '售后状态',
  paid_at          DATETIME DEFAULT NULL COMMENT '付款时间',
  third_party_paid_at       DATETIME DEFAULT NULL COMMENT '第三方支付时间',
  paid_times        INT COMMENT '支付次数',
  paid_status       INT COMMENT '支付状态',
  flag             BIGINT(20) COMMENT '打标标志位',
  cancel_reason     VARCHAR(255) COMMENT '取消原因',
  remark          VARCHAR(255) COMMENT '订单备注',
  comment          VARCHAR(255) COMMENT '订单评论',
  created_at       DATETIME COMMENT '创建时间',
  updated_at       DATETIME COMMENT '更新时间',
  confirm_at       DATETIME COMMENT '确认订单时间',
  settlement_time  DATETIME COMMENT '结算时间',
  settlement_status INT(11) COMMENT '结算状态',
  comment_status INT(11) COMMENT '评论状态',
  order_from       INT COMMENT '下订渠道:1 web, 2 mobile',
  vender           INT(11) COMMENT '运送方式：包邮(0)、普通快递(1)、EMS(2)、顺丰(3)' DEFAULT 0,
  delete_state     INT(1) COMMENT '删除状态 : 未删除(0),已删除(1),彻底删除(2)',
  backup_field1  INT(11) COMMENT '备用字段1',
  backup_field2  INT(11) COMMENT '备用字段2',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '购买订单';

-- 订单收货地址
DROP TABLE IF EXISTS order_address;
CREATE TABLE order_address (
  id            BIGINT(20)  NOT NULL  AUTO_INCREMENT
  COMMENT 'id',
  country_code  VARCHAR(80)
  COMMENT '国家编码',
  country_name  VARCHAR(80)
  COMMENT '国家名称',
  province_code VARCHAR(80)
  COMMENT '省级编码',
  province_name VARCHAR(80)
  COMMENT '省级名称',
  city_code     VARCHAR(80)
  COMMENT '城市编码',
  city_name     VARCHAR(80)
  COMMENT '城市名称',
  area_code     VARCHAR(80)
  COMMENT '区域编码',
  area_name     VARCHAR(80)
  COMMENT '区域名',
  town_code     VARCHAR(80) COMMENT '乡镇编码',
  town_name     VARCHAR(80) COMMENT '乡镇名称',
  address       VARCHAR(255)
  COMMENT '地址',
  phone         VARCHAR(50) COMMENT '固定电话',
  mobile        VARCHAR(50) COMMENT '手机号码',
  zip           VARCHAR(80)
  COMMENT '邮编',
  email         VARCHAR(80) COMMENT '邮箱',
  consignee     VARCHAR(30) COMMENT '收货人名称',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单收货地址';

-- 订单折扣
DROP TABLE IF EXISTS order_discount;
CREATE TABLE order_discount (
  id               BIGINT(20)   NOT NULL   AUTO_INCREMENT COMMENT 'id',
  purchase_order_id BIGINT(20) COMMENT '买家订单ID',
  promotion_id     BIGINT(20) COMMENT '营销规则ID',
  promotion_title  VARCHAR(80) COMMENT '营销规则标题',
  discount_amount  DECIMAL(10, 2) COMMENT '折扣金额',
  coupon_code      VARCHAR(100) COMMENT '优惠规则输入代码',
  effect_code      VARCHAR(100) COMMENT '优惠规则作用代码',

  purchase_order_serial_number VARCHAR(100) COMMENT '卖家订单号',
  type INTEGER COMMENT '优惠方式',
  value DECIMAL(10, 2) COMMENT '优惠值',
  amount DECIMAL (10, 2) COMMENT '优惠对应的金额',

  create_at TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单折扣';

-- 订单优惠返利
DROP TABLE IF EXISTS order_rebate;
CREATE TABLE order_rebate (
  id               BIGINT(20)   NOT NULL   AUTO_INCREMENT COMMENT 'id',
  purchase_order_serial_number VARCHAR(100) COMMENT '卖家订单号',
  type INTEGER COMMENT '优惠方式',
  code VARCHAR(100) COMMENT '优惠编码',
  need_dispatched INT COMMENT '是否需要拆分到ITEM上面',
  value DECIMAL(10, 2) COMMENT '优惠值',
  amount DECIMAL (10, 2) COMMENT '优惠对应的金额',
  create_at TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单优惠返利';

-- 订单项
DROP TABLE IF EXISTS order_item;
CREATE TABLE order_item (
  id                BIGINT(20)  NOT NULL  AUTO_INCREMENT COMMENT 'id',
  purchase_order_id  BIGINT(20) COMMENT '买家订单ID',
  purchase_order_serial_number  VARCHAR(80) COMMENT '买家订单编号',
  seller_account_id BIGINT(20) COMMENT '卖家账户ID',
  item_id           BIGINT(20) COMMENT '商品ID',
  active_id           BIGINT(20) COMMENT '订单活动id',
  item_sku_id       BIGINT(20) COMMENT '商品SKU ID',
  item_snapshot_id  BIGINT(20) COMMENT '商品快照ID',
  number            INT COMMENT '数量',
  unit_price        DECIMAL(10, 2) COMMENT '单价',
  original_price    DECIMAL(10, 2) COMMENT '原始价格',
  single_unit_price DECIMAL(10, 2) COMMENT '单价(非最后一件)',
  last_unit_price DECIMAL(10, 2) COMMENT '单价(最后一件)',
  item_name         VARCHAR(80) COMMENT '商品名称',
  brief             VARCHAR(255) COMMENT '商品副标题',
  item_image_key    VARCHAR(200) COMMENT '商品图片KEY',
  item_sku_name     VARCHAR(80) COMMENT '商品SKU名称',
  transaction_fee_percent DOUBLE COMMENT '佣金比例',
  transaction_fee    DECIMAL(10, 2) COMMENT '佣金',
  redbag_amount    DECIMAL(10, 2) COMMENT '分摊到得红包金额',
  single_redbag_amount    DECIMAL(10, 2) COMMENT '单件商品分摊到得红包金额(非最后一件)',
  last_redbag_amount    DECIMAL(10, 2) COMMENT '单件商品分摊到得红包金额(最后一件)',
  credit_amount    DECIMAL(10, 2) COMMENT '积分分摊到得金额',
  single_credit_amount    DECIMAL(10, 2) COMMENT '单件商品分摊到得积分金额(非最后一件)',
  last_credit_amount    DECIMAL(10, 2) COMMENT '单件商品分摊到得积分金额(最后一件)',
  refund_status    INT DEFAULT 100 COMMENT '售后状态',
  customer_service_time INT DEFAULT 15 COMMENT '售后服务期限',
  customer_service_flag INT DEFAULT 1 COMMENT '售后服务申请入口是否开启:0 未开启,1 已开启',
  customer_service_flag_disable_time DATETIME DEFAULT null COMMENT '售后入口关闭时间点',
  customer_service_overdue_flag INT DEFAULT 0 COMMENT '售后是否过期（0 未过期，1 已过期）',
  customer_service_overdue_time DATETIME DEFAULT null COMMENT '售后过期时间点',
  comment_state INT COMMENT '评价状态',
  confirm_at       DATETIME COMMENT '确认订单时间',
  bar_code         VARCHAR(32) COMMENT '商品条形码',
  back_point       DECIMAL(6,2)  COMMENT '返点积分比例',
  item_code        VARCHAR(32) COMMENT '主商品编码',
  sku_code         VARCHAR(32) COMMENT 'sku编码',
  delivery_status  INT(11) COMMENT '发货状态',
  backup_field1  INT(11) COMMENT '备用字段1',
  backup_field2  INT(11) COMMENT '备用字段2',
  backup_field3  DATETIME COMMENT '备用时间1',
  backup_field4  DATETIME COMMENT '备用时间2',
  dispute_state    INT(11) COMMENT '售后状态',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单项';

-- 订单商品项优惠
DROP TABLE IF EXISTS order_item_discount;
CREATE TABLE order_item_discount (
  id                BIGINT(20)  NOT NULL  AUTO_INCREMENT COMMENT 'id',
  purchase_order_serial_number  VARCHAR(80) COMMENT '买家订单编号',
  order_item_id            INT COMMENT '订单商品项ID',
  type            INT COMMENT '优惠形式',
  value        DECIMAL(10, 2) COMMENT '优惠值',
  amount    DECIMAL(10, 2) COMMENT '优惠值对应金额',
  single_value DECIMAL(10, 2) COMMENT '单件商品优惠值(非最后一件)',
  single_amount DECIMAL(10, 2) COMMENT '单件商品优惠值(最后一件)',
  last_value         DECIMAL(10, 2) COMMENT '单件商品优惠值(非最后一件)',
  last_amount    DECIMAL(10, 2) COMMENT '单件商品优惠值对应金额(最后一件)',
  create_at       DATETIME COMMENT '确认订单时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单商品项优惠';

-- 订单商品项优惠返利
DROP TABLE IF EXISTS order_item_rebate;
CREATE TABLE order_item_rebate (
  id                BIGINT(20)  NOT NULL  AUTO_INCREMENT COMMENT 'id',
  purchase_order_serial_number  VARCHAR(80) COMMENT '买家订单编号',
  order_item_id            INT COMMENT '订单商品项ID',
  type            INT COMMENT '优惠形式',
  value        DECIMAL(10, 2) COMMENT '优惠值',
  amount    DECIMAL(10, 2) COMMENT '优惠值对应金额',
  single_value DECIMAL(10, 2) COMMENT '单件商品优惠值(非最后一件)',
  single_amount DECIMAL(10, 2) COMMENT '单件商品优惠值(最后一件)',
  last_value         DECIMAL(10, 2) COMMENT '单件商品优惠值(非最后一件)',
  last_amount    DECIMAL(10, 2) COMMENT '单件商品优惠值对应金额(最后一件)',
  create_at       DATETIME COMMENT '确认订单时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单商品项优惠返利';

-- 订单付款
DROP TABLE IF EXISTS order_payment;
CREATE TABLE order_payment (
  id               BIGINT(20)   NOT NULL   AUTO_INCREMENT COMMENT 'id',
  purchase_order_id BIGINT(20) COMMENT '买家订单ID',
  payment_type_id  BIGINT(20) COMMENT '订单支付方式ID',
  payment_sn       VARCHAR(200) COMMENT '订单支付流水号',
  total_amount     DECIMAL(10, 2) COMMENT '待支付总额',
  paid_amount      DECIMAL(10, 2) COMMENT '已支付金额',
  out_trade_no     VARCHAR(80) COMMENT '外部支付交易号',
  source_type      INT         COMMENT '发起方标识:1 订单, 2 保证金',
  source_serial_no VARCHAR(80) COMMENT '发起方单号',
  created_at       DATETIME COMMENT '创建时间',
  paid_at       DATETIME COMMENT '支付时间',
  third_party_paid_at       DATETIME DEFAULT NULL COMMENT '第三方支付时间',
  status          INT COMMENT '支付状态',
  description      VARCHAR(200) COMMENT '支付描述',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单付款';

  -- 订单付款历史记录,检验支付
DROP TABLE IF EXISTS order_payment_history;
CREATE TABLE order_payment_history (
  id                BIGINT(20)   NOT NULL   AUTO_INCREMENT COMMENT 'id',
  purchase_order_id BIGINT(20)   COMMENT '买家订单ID',
  payment_type_id   BIGINT(20)   COMMENT '订单支付方式ID',
  payment_sn        VARCHAR(200) COMMENT '订单支付流水号',
  pay_amount        DECIMAL(10, 2) COMMENT '支付金额',
  out_trade_no      VARCHAR(80)    COMMENT '外部支付交易号',
  source_type       INT         COMMENT '发起方标识:1 订单, 2 保证金',
  source_serial_no  VARCHAR(80) COMMENT '发起方单号',
  pay_status        INT COMMENT '支付状态',
  check_status      INT DEFAULT 0 COMMENT '校验状态 0:未校验,1已校验',
  refund_status     INT DEFAULT 0 COMMENT '退款成功状态 0:未退款,1退款成功',
  create_at         DATETIME COMMENT '创建时间',
  update_at         DATETIME COMMENT '更新时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单付款历史记录';

    -- 售后退款记录
DROP TABLE IF EXISTS order_refund;
CREATE TABLE order_refund (
  id                BIGINT(20)   NOT NULL   AUTO_INCREMENT COMMENT 'id',
  purchase_serial_number VARCHAR(80) COMMENT '买家订单编号',
  dispute_no        VARCHAR(80) COMMENT '退款编号',
  payment_type_id   BIGINT(20)   COMMENT '订单支付方式ID',
  payment_sn        VARCHAR(200) COMMENT '订单支付流水号',
  total_amount      DECIMAL(10, 2) COMMENT '订单总金额',
  out_refund_no     VARCHAR(80) COMMENT '商户退款单号',
  refund_fee        DECIMAL(10, 2) COMMENT '退款金额',
  third_party_refunded_at DATETIME COMMENT '第三方退款时间',
  create_at         DATETIME COMMENT '创建时间',
  update_at         DATETIME COMMENT '更新时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '售后退款记录';

-- 付款方式
DROP TABLE IF EXISTS payment_type;
CREATE TABLE payment_type (
  id          BIGINT(20)      AUTO_INCREMENT
  COMMENT 'id',
  name        VARCHAR(20)
  COMMENT '支付方式名称',
  config      VARCHAR(80)
  COMMENT '支付方式配置信息',
  description VARCHAR(200)
  COMMENT '支付方式描述',
  fee_type    DECIMAL(10, 2)
  COMMENT '手续费类型',
  is_active   DECIMAL(10, 2)
  COMMENT '是否激活',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '付款方式';

-- 卖家订单
DROP TABLE IF EXISTS sale_order;
CREATE TABLE sale_order (
  id                BIGINT(20)   NOT NULL   AUTO_INCREMENT
  COMMENT 'id',
  purchase_order_id BIGINT(20)
  COMMENT '买家订单ID',
  seller_account_id BIGINT(20)
  COMMENT '卖家账户ID',
  serial_number     VARCHAR(200)
  COMMENT '订单流水号',
  order_amount      DECIMAL(10, 2)
  COMMENT '订单总额',
  payment_type_id   BIGINT(20)
  COMMENT '付款方式ID',
  status            INT
  COMMENT '订单状态',
  refund_status     INT DEFAULT 100 COMMENT '售后状态',
  is_need_invoice   INT
  COMMENT '是否需要发票',
  seller_type   INT
  COMMENT '商家类型',
  seller_sub_type   INT
  COMMENT '商家子类型',
  invoice_type INT
  DEFAULT NULL COMMENT '发票类型',
  invoice VARCHAR(200)
  DEFAULT NULL COMMENT '发票信息',
  remark            VARCHAR(200) COMMENT '备注',
  created_at        DATETIME
  COMMENT '创建时间',
  updated_at        DATETIME COMMENT '更新时间',
  delivery_at  DATETIME  COMMENT '发货时间，以最后一件商品发货时间为准',
  tag  INT  COMMENT '商家订单标记',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '卖家订单';

-- 订单导出历史
DROP TABLE IF EXISTS file_export_log;
CREATE TABLE file_export_log (
  id            BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  account_id    BIGINT(20)                         COMMENT '账户ID',
  path          VARCHAR(200)                       COMMENT '文件路径含文件名',
  query_content VARCHAR(800)                       COMMENT '查询条件',
  create_at     TIMESTAMP DEFAULT NOW()            COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单导出历史';

  -- 订单活动表
DROP TABLE IF EXISTS purchase_order_active;
CREATE TABLE purchase_order_active (
  id            BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  name VARCHAR(100) COMMENT '活动名称',
  out_trade_no VARCHAR(80) COMMENT '外部编号',
  active_type INT DEFAULT NULL COMMENT '活动类型',
  amount DECIMAL(10, 2) COMMENT '活动金额',
  create_at     TIMESTAMP DEFAULT NOW()            COMMENT '创建时间',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '订单活动表';