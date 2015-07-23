/**
 * Created by zhaojin on 15/7/22.
 */

storageInit();
Init();
//鐐瑰嚮鎺у埗瀛愪换鍔℃樉绀哄垽鏂幇鍦ㄥ湪閭ｄ釜鍒嗙被鐢╟urrent琛ㄧず锛岃繕鏈変竴閮ㄥ垎娌℃湁瀹屾垚锛屽搴旀樉绀哄彸渚ote
$(".cate-box .name").click(function () {
    var parent = $(this).parent();
    var name = $(".name");
    for (var i = 0; i < name.length; i++) {
        name.attr("class", "name");
    }
    $(this).addClass("current");

});
$(".type-create").click(function () {
    var currentItem = $(".current");
    var parentItem = currentItem.parent();
    var index;
    indexInit();
    console.log(parentItem);
    console.log(parentItem.index);//currentItem.index 涓嶈兘杩欎箞璋冪敤锛?
//蛤蛤蛤蛤蛤   主席最棒
    //我们只想昂要空调
    if (parentItem.attr("class") == "main-list") {
        var name = prompt("璇疯緭鍏ュ垎绫诲悕绉?", "鏈懡鍚?");
        var parent = parentItem.attr("data-id");
        var index = parentItem.index;
        var newCate = new Category(name, parent, true);
        cateArr.push(newCate);
        localStorage.setItem("categories", JSON.stringify(cateArr));
        console.log(newCate);
        creatChildItem(newCate.name, newCate.id, index);
    }

});
