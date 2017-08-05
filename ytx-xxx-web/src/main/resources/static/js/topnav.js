/**
 * Created by zh on 16/10/11.
 */
;(function(){
    $(document).ready(function(){
        //顶部导航手机APP二维码显示隐藏
        $(".topbar-cmobile").hover(function(){
            if($(".app-code1").is(":hidden")){
                $(".app-code1").show();
            }
            else
            {
                $(".app-code1").hide();
            }
        });
    });
}());