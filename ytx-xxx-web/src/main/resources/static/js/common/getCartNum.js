/**
* Created by tyrant on 16/4/8.
* @author tyrant
*/
;(function(){
    /*
     * 获取购物车中的商品数量
     * */
    function getCartNum() {
        $.ajax({
            url:'/ajax/cart_item_count',
            type:'post',
            success:function(data){
                var number = 0;
                var point = 0;
                var letter = 0;
                if(data.success === 'true'){
                    number = parseInt(data.number);
                    if(number > 99){
                        number = '99+';
                    }
                    point = data.enablePoints;
                    letter = data.noReadLetter;
                }
                $("#cartValue").text(number);
                $('#enablePoints').text(point);
                $('#new').text(letter);
                $("#fixCartValue").text(number);
                $("#cartNum").text(number);
            }
        });
    }
    getCartNum();
}());