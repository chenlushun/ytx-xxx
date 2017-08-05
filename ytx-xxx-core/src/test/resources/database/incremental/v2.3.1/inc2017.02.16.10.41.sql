-- 订单商品售后状态检查存储过程创建(用于支持OrderItemMapper文件里面的closeCustomerServiceIfOverdue方法)
DROP PROCEDURE IF EXISTS proc_order_customer_service_checking;
-- 将语句分隔符由“;”修改为“//”
DELIMITER //
CREATE PROCEDURE proc_order_customer_service_checking (n int)
BEGIN
    update order_item set customer_service_overdue_flag=1 where now()>customer_service_overdue_time and customer_service_overdue_flag=0;
    update order_item set customer_service_flag=0 where customer_service_flag_disable_time is null and customer_service_flag=1 and customer_service_overdue_flag=1;
    update order_item set customer_service_flag=0 where now()>customer_service_flag_disable_time;
END //
DELIMITER ;