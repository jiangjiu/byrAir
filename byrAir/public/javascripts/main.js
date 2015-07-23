/**
 * Created by zhaojin on 15/7/22.
 */

storageInit();
Init();
//点击控制子任务显示判断现在在那个分类用current表示，还有一部分没有完成，对应显示右侧note
$(".cate-box").on("click", ".name", function () {
    //var parent = $(this).parent();
    var name = $(".name");
    for (var i = 0; i < name.length; i++) {
        name.attr("class", "name");
    }
    $(this).addClass("current");

});
$(".type-create").on("click", function () {
    var currentItem = $(".current");
    var parentItem = currentItem.parent();
    var mainItem = $(".main-list");
    for (var i = 0; i < mainItem.length; i++) {
        if (parentItem.attr("data-id") == mainItem[i].getAttribute("data-id")) {
            parentItem.index = i;
        }

    }
    console.log(parentItem);
    console.log(parentItem.index);
    if (parentItem.attr("class") == "main-list") {
        var name = prompt("请输入分类名", "未命名");
        var parent = parentItem.attr("data-id");
        var newCate = new Category(name, parent, true);
        cateArr.push(newCate);
        localStorage.setItem("categories", JSON.stringify(cateArr));
        console.log(newCate);
        creatChildItem(newCate.name, newCate.id, parentItem.index);
    }

});
