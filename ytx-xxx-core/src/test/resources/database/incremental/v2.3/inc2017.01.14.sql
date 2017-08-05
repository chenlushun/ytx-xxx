-- 先更新老的数据的物流状态为空，然后在运行http://pay.ytx.com//orderItem/dataSupply接口进行旧数据的设置
-- 因为存在旧错误的数据
update order_item set delivery_status = NULL;