/**
* Created by tyrant on 16/8/20.
*/
;(function() {
    function Controller() {
        this.addressOuter = $("#addressOuter");
        this.showAddressBtn = $("#allAddress");
        this.hideAddressBtn = $("#hiddenAddress");
        this.createAddressCon = $("#createAddressCon");
        this.ajaxFlag = true;
        this.orderMain = $("#orderMain");
        this.total = $("#J_disTotal");
        this.rbOptions = this.orderMain.find('.RB-select').find('option');
        this.layerTipIndex = null;
        this.addressEditId = '';
        this.totalPrice = $("#J_total");
        this.point = $("#J_point");
        this.ajaxTime = null;
        this.areaDesc = $("#areaDesc");
        this.townDesc = $("#townDesc");
        this.redbag = $("#redbag");
        this.redbagDiscount = $("#redbagDiscount");
        this.redbagDiscountOuter = $("#redbagDiscountOuter");
        this.itemTotalPrice = document.getElementById('itemTotalPrice');
        this.couponSelect = $('.J_couponSelect');
        this.scrollTop = $('#scrollTop');
        this.areaNumber =$("#areaNumber");
        this.phoneNumber =$("#phoneNumber");
        this.extensionNumber =$("#extensionNumber");
        this.mphonerror =$("#mphone-error");
        this.mPhone = $(".m-phone");
        this.addressParent = $('#addressParent');
    }

    Controller.prototype = {
        bind_events: function() {
            var scope = this;
            scope.showAddressBtn.bind('click', function() {
                scope.address_show();
            });
            scope.hideAddressBtn.bind('click', function() {
                scope.address_hide();
            });
            scope.addressOuter.delegate('.J_address', 'click', function() {
                $("#addressInput").val(this.getAttribute('data-id'));
                document.getElementById('hiddenForm').submit();
            }).delegate('.J_edit', 'click', function(event) {
                event.stopPropagation();
                scope.edit_address($(this));
            });
            $("#createAddress").bind('click', function() {
                scope.show_address();
            });
            $("#createAddr_cancel").bind('click', function() {
                scope.addressEditId = '';
                scope.createAddressCon.hide();
            });
            scope.couponSelect.bind('change', function () {
                scope.select_coupon($(this));
            });
            scope.redbag.bind('change', function () {
                scope.select_redbag(this);
            });
            $("#confirmOrder").bind('click', function() {
                scope.confirm_order();
            });
            $(".J_invoice").bind('click', function() {
                scope.invoice_controller(this);
            });
            $(".J_invoiceType").bind('click', function() {
                scope.invoice_type($(this));
            });
            $(".J_saveInvoice").bind('click', function() {
                scope.save_invoice($(this));
            });
            $(".J_cancelInvoice").bind('click', function() {
                $(this).parents(".J_hiddenInvoice").hide();
                $(this).parents(".J_hiddenInvoice").siblings('.J_invoiceCheck').find(".J_invoice").removeAttr("checked");
            });
            $(".J_invoice-edit").bind('click', function() {
                scope.edit_invoice($(this));
            });
            $(".J_companyName").bind('blur', function(){
                scope.check_company_name($(this).val(), $(this).siblings('.J_invoiceAlert'));
            });
            $(".J_question").bind('mouseover', function() {
                scope.layerTipIndex = layer.tips('<div> ' +
                    '<p class="tal">1  发票类型：目前只支持开具普通发票</p> ' +
                    '<p class="tal">2  发票金额：以实付金额为准，不包含运费金额以及优惠券、满减、红包等。</p> ' +
                    '<p class="tal">3  发票内容：发票内容根据购买商品所属分类确定。</p> ' +
                    '</div>', $(this), {
                    tips: [1, '#f9f9f9'],
                    time: 9999999,
                    area: ['310px', '100px'],
                    skin: 'tip-skin'
                });
            }).bind('mouseout', function() {
                 layer.close(scope.layerTipIndex);
            });
            $("#usePoint").bind("change", function() {
                scope.usePoint(this);
            });
            $(".J_expressCost").bind('change', function() {
                var self = $(this);
                self.siblings('.J_expressText').text(self.val().split(',')[0]);
                scope.calculate();
            });
            $(document).delegate('.J-getAddress','change',function () {
                var code = $(this).val(),
                    treeDepth = $(this).attr('data-tree');
                if(+treeDepth === 3){
                    return false;
                }
                scope.getAddress(code,++treeDepth);
            });
            $(window).scroll(function(){
                var top = $(document).scrollTop();
                scope.scrollTop.val(top);
            });
            setTimeout(function () {
                scope.redbag.trigger('change');
            }, 0);
            return scope;
        },
        init: function() {
            var scope = this;
            $("#createAddressForm").validate({
                debug: true,
                errorClass: 'addressError',
                rules:{
                    street:{
                        required: true,
                        minlength: 5,
                        maxlength: 100,
                        checkSpace: true
                    },
                    zipCode: {
                        digits: true,
                        rangelength: [6,6]
                    },
                    name:{
                        required:true,
                        maxlength:25,
                        checkSpace: true
                    },
                    phone:{
                        required:true,
                        cPhone: true
                    }
                },
                messages:{
                    street:{
                        required:"请填写您的详细地址",
                        minlength:"详细地址不得少于5个字",
                        maxlength:"详细地址不得多于100个字",
                        checkSpace:"地址不能全为空格"
                    },
                    zipCode: {
                        digits: "请输入正确的邮编",
                        rangelength: "请输入正确的邮编"
                    },
                    name:{
                        required:"请填写收货人姓名",
                        maxlength:"收货人姓名不得多于25字",
                        checkSpace:"姓名不能全为空格"
                    },
                    phone:{
                        required:"请填写收件人手机号码",
                        cPhone:"请填写11位正确格式的手机号码"
                    }
                },
                submitHandler: function(){
                    if(scope.ajaxFlag){
                        scope.ajaxFlag = false;
                        scope.save_address();
                    }
                }
            });

            scope.scrollTop.val(getQueryString('scrollTop'));

            $('html,body').animate({scrollTop: scope.scrollTop.val()}, 100);
            return scope;
        },
        address_hide: function() {
            var scope = this,
                addresses = scope.addressOuter.find('li');
                if(addresses.length > 3){
                    addresses.each(function(i, e) {
                        if(i > 2){
                            e.style.display = 'none';
                        }
                    });
                    scope.showAddressBtn.show();
                }else{
                    scope.showAddressBtn.hide();
                }
            scope.hideAddressBtn.hide();
            return scope;
        },
        address_show: function() {
            var scope = this;
            scope.addressOuter.find('li').each(function(i, e) {
                e.style.display = 'block';
            });
            scope.showAddressBtn.hide();
            scope.hideAddressBtn.show();
        },
        autoAddress:function () {
            var code = 'CN',
                treeDepth = 0,
                scope = this;
            scope.getAddress(code,treeDepth);
            treeDepth++;
            for(var i = 0 ; i < 3 ; i++){
                scope.getAddress(thymeleafData.address[i],treeDepth);
                thymeleafData.address[i] = null;
                treeDepth ++;
            }
        },
        getAddress:function (code,treeDepth) {
            var obj = [],
                scope = this;
            if(!code){
                scope.createAddress(obj,treeDepth);
                return false;
            }
            $.ajax({
                type:'get',
                async:false,
                url:'/'+code+'/parent',
                success:function (data) {
                    obj = data.regionList;
                    if(code === '' || data.regionList.length === 0){
                        return false;
                    }
                    scope.createAddress(obj,treeDepth);
                }
            });
        },
        createAddress:function (obj,treeDepth) {
            var scope = this;
            var treeName = ['provinceCode','cityCode','areaCode','townCode'];
            var treeLabelName = ['省：','市：','区：','县：'];
            var treeOptionName = ['请选择省份','请选择城市','请选择县区','请选择街道'];
            var labelModel = $('<span>'+treeLabelName[treeDepth]+'</span>');
            var model = $(' <select name="'+treeName[treeDepth]+'" class="mr10 J-getAddress" id="'+treeName[treeDepth]+'" data-tree="'+treeDepth+'"><option value="">'+treeOptionName[treeDepth]+'</option></select> ');
            var option = '';
            //说明存在
            for(var _treeDepth = treeDepth;_treeDepth<4;_treeDepth++){
                var nowSelect = $('#'+treeName[_treeDepth]+'Parent');
                if(nowSelect.length>0){
                    nowSelect.remove();
                }
            }
            if(obj.length>0){
                for(var i = 0, j = obj.length; i < j; i++){
                    if(obj[i].code === thymeleafData.address[treeDepth]){
                        option = '<option selected="selected" value="'+obj[i].code+'">'+obj[i].name+'</option>';
                    }else{
                        option = '<option value="'+obj[i].code+'">'+obj[i].name+'</option>';
                    }
                    $(model).append(option);
                }
                var treeParent = $('<span id="'+treeName[treeDepth]+'Parent"></span>');
                treeParent.append(labelModel).append(model);
                scope.addressParent.append(treeParent);
            }
        },
        edit_address: function(self) {
            var scope = this,
                addressId = self.attr('data-id');
            if(addressId === scope.addressEditId){
                return;
            }
            scope.show_address();
            scope.addressEditId = addressId;
            $.post("/buy_directly/getAddressById", {id: addressId}, function(data) {
                if(data.success === 'true'){
                    var addressDetail = data.address;
                    thymeleafData.address[0] = addressDetail.provinceCode;
                    thymeleafData.address[1] = addressDetail.cityCode;
                    thymeleafData.address[2] = addressDetail.areaCode;
                    thymeleafData.address[3] = addressDetail.townCode;
                    scope.autoAddress();
                    //邮编
                    $("#zipCode").val(addressDetail.zip);
                    //地址
                    $("#street").val(addressDetail.address);
                    /** @namespace addressDetail.consignee */
                    $("#name").val(addressDetail.consignee);
                    /** @namespace addressDetail.mobile */
                    $("#phone").val(addressDetail.mobile);
                    //座机号码
                    if(addressDetail.phone!==null && addressDetail.phone!=='null'&& addressDetail.phone!==''){
                        var phone = addressDetail.phone.split('-');
                        scope.areaNumber.val(phone[0]);
                        scope.phoneNumber.val(phone[1]);
                        if(phone[2]!=null&&phone[2]!='undefined'){
                            scope.extensionNumber.val(phone[2]);
                        }
                    }
                }
            });

        },
        show_address: function() {
            var scope = this;
            scope.addressEditId = '';
            scope.createAddressCon.find('input,textarea').each(function(i, e) {
                e.value = '';
            });
            for(var i = 0 ;i<4;i++){
                thymeleafData.address[i] = null;
            }
            scope.autoAddress();
            scope.createAddressCon.find('label.addressError').hide();
            if(scope.createAddressCon.is(':hidden')){
                scope.createAddressCon.slideDown();
                $('html,body').animate({scrollTop: scope.createAddressCon.offset().top}, 100);
            }
        },
        save_address: function() {
            var scope = this,
                defaultFlag = false,
                $province = $("#provinceCode"),
                $city = $("#cityCode"),
                $area = $("#areaCode"),
                $town = $('#townCode'),
                _province = $province.val(),
                _city = $city.val(),
                _area = $area.val(),
                _town = $town.val(),
                _provinceName = $province.find(':selected').text(),
                _cityName = $city.find(':selected').text(),
                _areaName = $area.find(':selected').text(),
                _townName = $town.find(':selected').text(),
                zipCode = $("#zipCode").val(),
                telephoneRule = /^(0[0-9]{2,3}\-)?([1-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
                mPhone,
                addressData = {
                "provinceCode": _province,
                "province": _provinceName,
                "cityCode": _city,
                "city": _cityName,
                "areaCode": _area,
                "area": _areaName,
                "townCode": _town,
                "town": _townName,
                "zip": zipCode ? zipCode : '000000',
                "address": $("#street").val(),
                "consignee": $("#name").val(),
                "mobile": $("#phone").val(),
                "phone":mPhone
            };
            if($province && _province !== '' && _province !== null && $city && _city !== '' && _city !== null){
                if($area.length > 0 ){
                    if(_area){
                        scope.addressParent.next().text('');
                    }else{
                        scope.addressParent.next().text('选择地址不正确');
                        scope.addressParent.next().show();
                        scope.ajaxFlag = true;
                        return false;
                    }
                }
                if($town.length > 0){
                    if(_town){
                        scope.addressParent.next().text('');
                    }else{
                        scope.addressParent.next().text('选择地址不正确');
                        scope.addressParent.next().show();
                        scope.ajaxFlag = true;
                        return false;
                    }
                }
            }else{
                scope.addressParent.next().text('选择地址不正确');
                scope.addressParent.show();
                scope.ajaxFlag = true;
                return false;
            }
            if(scope.extensionNumber.val()!==''){
                mPhone=scope.areaNumber.val()+'-'+scope.phoneNumber.val()+'-'+scope.extensionNumber.val();
            }else{
                mPhone=scope.areaNumber.val()+'-'+scope.phoneNumber.val();
            }
            if(scope.addressEditId !== ''){
                addressData.id = scope.addressEditId;
            }
            if(scope.areaNumber.val()!==""||scope.phoneNumber.val()!== ''||scope.extensionNumber.val()!== ''){
                if(!telephoneRule.test(mPhone)){
                    scope.mphonerror.css("display","block");
                    scope.ajaxFlag =  true;
                    return false;
                }
            }else{
                mPhone='';
            }
            addressData.phone=mPhone;
            $.ajax({
                type: "post",
                url:"/buy_directly/updateAddress",
                data: addressData,
                dataType: "json",
                success: function(data) {
                    scope.ajaxFlag = true;
                    if(data.success === 'true'){
                        if(scope.addressEditId !== ''){
                            $("#addressInput").val(scope.addressEditId);
                            document.getElementById('hiddenForm').submit();
                        }else{
                            window.location.reload();
                        }
                    }
                }
            });
        },
        usePoint: function() {
            var scope = this,
                self = document.getElementById('usePoint');
            try{
                if(self.checked){
                    scope.point.text((self.value/100).toFixed(2)).attr('data-value', self.value);
                }else{
                    scope.point.text('0.00');
                }

                document.getElementById('selectedPoints').checked = self.checked;

            }catch(e){

            }
            scope.calculate();
        },
        calculate: function() {
            var scope = this,
                sellers = scope.orderMain.find('.J_seller'),
                itemTotalPrice = 0,//订单中除了运费的价格
                totalDisSum = 0;//所有订单须支付价格
            for (var sellerAccount = 0, sellersLength = sellers.length; sellerAccount < sellersLength; sellerAccount++){
                //计算每个商家下的商品价格
                var seller = sellers.eq(sellerAccount);
                var items = seller.find('.J_orderItem'),
                    sellerSum = 0;
                for(var itemAccount = 0, itemLength = items.length; itemAccount < itemLength; itemAccount++){
                    var item = items.eq(itemAccount);
                    sellerSum += parseFloat(item.find('.J_itemSum').text());
                }
                //将店铺总价增加到所有店铺总价中
                // totalSum += sellerSum;
                //单个订单商品总价(不计算折扣和运费)
                seller.find('.J_orderAmount').text(sellerSum.toFixed(2));
                //满减价格
                var discountPrice = parseFloat(seller.find('.J_discountPrice').text());
                discountPrice = discountPrice ? discountPrice : 0;
                //运费
                var expressCost = parseFloat(seller.find('.J_expressCost').val().split(',')[0]);
                seller.find('.J_expressText').text(' ¥ ' + expressCost.toFixed(2));
                //优惠卷
                var couponDenomination = parseFloat(seller.find('.J_couponSelect option:selected').attr('data-denomination'));
                couponDenomination = couponDenomination ? couponDenomination : 0;
                seller.find('.J_couponText').text('- ¥ ' + couponDenomination.toFixed(2));
                //订单须支付价格 *100计算
                var sellerDisSum = sellerSum * 100 - discountPrice * 100 - couponDenomination * 100;
                //小于0元的订单价格按0元计
                sellerDisSum = sellerDisSum > 0 ? sellerDisSum : 0;
                itemTotalPrice = itemTotalPrice + sellerDisSum / 100;
                //在商品价格基础上加上运费价格
                sellerDisSum = (sellerDisSum + expressCost * 100)/100;
                //记录订单应支付价格
                seller.find('.J_orderDisTotal').text(sellerDisSum.toFixed(2));
                //将店铺支付价增加到所有店铺支付价中
                totalDisSum += sellerDisSum;
            }
            scope.totalPrice.text(totalDisSum.toFixed(2));

            //减去红包抵扣价
            var redbagDiscount = scope.redbagDiscount.text();
            if (redbagDiscount) {
                totalDisSum -= parseFloat(scope.redbagDiscount.text());
            }
            scope.itemTotalPrice.value = itemTotalPrice;
            //减去积分抵扣价
            if(scope.point.length){
                totalDisSum -= parseFloat(scope.point.text());
            }
            totalDisSum = totalDisSum < 0 ? 0.00 : totalDisSum;
            //记录所有订单总价
            scope.total.text(totalDisSum.toFixed(2));
            return scope;
        },
        select_coupon:function(self){
            var valArray = self.val().split('.');

            $('#coupon'+ valArray[0]).val(valArray[1]);
            document.getElementById('hiddenForm').submit();
        },
        select_redbag: function (self) {
            var scope = this,
                _this = $(self),
                redbagDiscount = _this.val(),
                needToPay = parseFloat(scope.itemTotalPrice.value) - (redbagDiscount ? parseFloat(redbagDiscount.split(',')[1]) : 0);

            if (redbagDiscount) {
                scope.redbagDiscountOuter.show();
                if (parseFloat(scope.itemTotalPrice.value) < parseFloat(redbagDiscount.split(',')[1])) {
                    scope.redbagDiscount.text(parseFloat(scope.itemTotalPrice.value).toFixed(2));
                } else {
                    scope.redbagDiscount.text(parseFloat(redbagDiscount.split(',')[1]).toFixed(2));
                }
            } else {
                scope.redbagDiscountOuter.hide();
                scope.redbagDiscount.text(0);
            }

            $('#defaultRedbagId').val(redbagDiscount?redbagDiscount.split(',')[0]:'');
            needToPay = needToPay < 0 ? 0 : needToPay;

            $.post("/buy_directly/getPointVO", {totalPrice: needToPay}, function (data) {
                /** @namespace data.thisEnable */
                $("#usePoint").val(data.thisEnable);
                /** @namespace data.exchangeAmount */
                $("#pointText").html('￥<span>'+data.exchangeAmount+'</span><span class="ml10">你有<span>'+data.points+'</span>个，本次可用<span>'+data.thisEnable+'</span>个</span>');
                scope.usePoint();
            });
        },
        confirm_order: function() {
            var scope = this;
            var user = $("#addressList").find('.active');
            if(!user.length){
                layer.msg('请选择一个收货地址或者添加一个收货地址');
                return;
            }
            var sellers = scope.orderMain.find('.J_seller');
            var sellersData = [];//所有订单的json
            for (var sellerAccount = 0, sellerLength = sellers.length; sellerAccount < sellerLength; sellerAccount++){
                var seller = sellers.eq(sellerAccount),
                    items = seller.find('.J_orderItem'),
                    itemsData = [];//店铺下所有商品的skuid和value
                for (var itemAccount = 0, itemLength = items.length; itemAccount < itemLength; itemAccount++){
                    var item = items.eq(itemAccount),
                        skuTag = item.find('.J_itemAccount').eq(0);
                    //itemData 单个商品的sku 和 value
                    var itemData = {
                        "itemskuid": skuTag.attr('data-itemskuid'),
                        "value":skuTag.attr('data-value'),
                        "marketPrice": skuTag.attr('data-marketprice'),
                        "onSalePrice": skuTag.attr('data-onsaleprice')
                    };
                    //itemsData 为单个订单中商品的 sku 和 value json
                    itemsData.push(itemData);
                }
                //sellerData 为单个订单的 json
                var expressCost = seller.find('.J_expressCost').val().split(',');
                var sellerData = {
                    "sellerId": seller.attr('data-selleracountid'),
                    "remark": seller.find('.J_remark').val(),
                    "items":itemsData,
                    "deliveryFee": expressCost[0],
                    "vendor":$("#deliveryFreeFee").val() === '1' ? 0 :  expressCost[1],
                    "discountList": {
                        activityId:seller.attr('data-activityId'),
                        updatedA:seller.attr('data-updatedAt')
                    },
                    "couponId":seller.find('.J_couponSelect').val()?seller.find('.J_couponSelect').val().split('.')[1]:0
                };
                if(seller.find('.J_invoice')[0].checked && seller.find('.J_saveInvoice').is(':visible')){
                    layer.msg('请先保存发票信息');
                    return;
                }
                if(seller.find('.J_invoiceChooszen')[0].style.display === 'block'){
                    //需要发票
                    var invoiceType = seller.find('.J_invoiceType:checked').val(),
                        invoiceData;
                    if(parseInt(invoiceType) === 1){
                        invoiceData = {
                            "type": invoiceType
                        };
                    }else{
                        invoiceData = {
                            "type": invoiceType,
                            "name": seller.find('.J_companyName').val()
                        };
                    }
                    sellerData.invoice = invoiceData;
                }
                var needSellerData = {
                    "seller": sellerData
                };
                sellersData.push(needSellerData);
            }
            var submitData = {
                "id": user.attr('data-id'),
                "buyDirectly": $("#J_buyWay").val(),
                "sellers": sellersData,
                "RPid": scope.redbag.val() ? scope.redbag.val().split(',')[0] : null
            };
            try{
                if(document.getElementById('usePoint').checked){
                    submitData.points = parseFloat(scope.point.attr('data-value'));
                }
            }catch(e){

            }
            if(scope.ajaxFlag){
                scope.ajaxFlag = false;
                $.ajax({
                    type: "post",
                    url: "/ajax/order_submit",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data:JSON.stringify(submitData),
                    success: function(data){
                        scope.ajaxFlag = true;
                        switch (data.success){
                            case 'true':
                                /** @namespace data.redirectUrl */
                                window.location.href = data.redirectUrl;
                                break;
                            case 'false':
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)购买的商品已失效<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'area_limit_sale':
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)当前区域限购<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'invalidate_delivery_fee':
                                //提交订单时，运费有误
                                layer.open({
                                    title: "提示",
                                    content: "~（>_<)~亲，运费信息有更新<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function () {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'invalidate_redbag':
                                //红包失效
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~使用了失效的红包<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'invalidate_item':
                                //商品失效
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~部分商品信息发生变化<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'invalidate_stocklimit':
                                //商品库存量不够
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~商品库存不足<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'address_invalid':
                                //收货地址不存在
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~收货地址不存在<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'failed':
                                //数据不合法
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~商品不存在<br/>点击确认刷新当前页面重新确定订单",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'unlogin':
                                window.location.href = data.redirectUrl + '?redirect=' + encodeURIComponent(window.location.href);
                                break;
                            case 'invalidate_item_canbylimit':
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~订单生成失败<br/>订单中的部分商品已经达到限购数,无法购买",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'invalid_coupon':
                                layer.open({
                                    title: "提示",
                                    content: "~（>_<)~订单生成失败<br/>" + data.msg,
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function () {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'invalidate_points':
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~订单生成失败<br/>积分失效,购买失败",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                            case 'bigDiscount_invalid':
                                layer.open({
                                    title:"提示",
                                    content: "~（>_<)~满减信息有更新<br/>请点击确认更新数据",
                                    skin: 'confirm-skin',
                                    btn: '确定',
                                    move: 0,
                                    area: ['434px'],
                                    end: function() {
                                        window.location.reload();
                                    }
                                });
                                break;
                        }

                    },
                    error: function () {
                        scope.ajaxFlag = true;
                    }
                });
            }
        },
        invoice_controller: function(self) {
            var $J_hiddenInvoice;
            if($(self).hasClass("J_invoice")){
                $J_hiddenInvoice = $(self).parent().siblings('.J_hiddenInvoice');
            }else{
                $J_hiddenInvoice = $(self).parents('.J_hiddenInvoice');
            }

            if(self.checked){
                $J_hiddenInvoice.show();
            }else{
                $J_hiddenInvoice.find('.invoice-radio').each(function(i,e){
                    e.checked =false;
                });
                $J_hiddenInvoice.find('.J_companyName').val('');
                $J_hiddenInvoice.hide();
            }
        },
        invoice_type: function(self) {
            if(parseInt(self.val())===1){
                self.siblings('.J_companyName').val('');
                self.siblings('.J_invoiceAlert').text('');
                self.siblings('.J_companyName').hide();
            }else{
                self.siblings('.J_companyName').show();
            }
        },
        save_invoice: function(self) {
            var scope = this,
                invoiceValue = self.parents('.J_hiddenInvoice').find(".J_invoiceType:checked").val(),
                invoiceType = '';
            switch (invoiceValue){
                case '1':
                    invoiceType = '个人';
                    scope.write_invoice(invoiceType, self);
                    break;
                case '2':
                    var company = self.parents('.J_hiddenInvoice').find(".J_companyName");
                    if(scope.check_company_name(company.val(), self.parents('.J_hiddenInvoice').find('.J_invoiceAlert'))){
                        invoiceType = '公司/'+ company.val();
                        scope.write_invoice(invoiceType, self);
                    }
                    break;
                default:
                    layer.msg('请先选择发票类型!');
                    break;
            }
        },
        check_company_name: function(name, that) {
            var regExp = /\s/;
            if(regExp.test(name) || name === ''){
                that.text('请正确输入公司名称');
                return false;
            }else{
                that.text('');
                return true;
            }
        },
        write_invoice: function(text, self) {
            var $J_hiddenInvoice = self.parents('.J_hiddenInvoice');
            $J_hiddenInvoice.siblings('.J_invoiceCheck').hide();
            $J_hiddenInvoice.hide();
            $J_hiddenInvoice.parents('.J_invoiceCon').find('.J_invoiceChooszen').show().find('.J_invoice-chooszen').text(text);
        },
        edit_invoice: function(self) {
            var outer = self.parents('.J_invoiceCon');
            outer.find('.J_hiddenInvoice').show();
            outer.find('.J_invoiceCheck').show();
            self.parent().hide();
        },
        check_item_status: function() {
            var scope = this,
                $userAlert = $("#userAlert").val(),
                $needRedirect = $("#needRedirect").val();
            if($userAlert !== ''){
                layer.open({
                    title:"提示",
                    content: "~（>_<)~部分商品信息发生变化<br/>点击确认刷新当前页面重新确定订单",
                    skin: 'confirm-skin',
                    btn: '确定',
                    move: 0,
                    area: ['434px'],
                    end: function() {
                        window.location.href = $needRedirect;
                    }
                });
            }
            return scope;
        }
    };

    /*
     * 获取url携带的值
     * */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {return decodeURIComponent(r[2]);} return null;
    }
    var controller = new Controller();

    controller.bind_events().address_hide().init().calculate();

    
})();