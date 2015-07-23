/**
 * Created by zhaojin on 15/7/22.
 */

storageInit();
Init();
//点击控制子任务显示判断现在在那个分类用current表示，还有一部分没有完成，对应显示右侧note
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
    console.log(parentItem.index);//currentItem.index 不能这么调用�?
//������   ��ϯ���
    if (parentItem.attr("class") == "main-list") {
        var name = prompt("请输入分类名�?", "未命�?");
        var parent = parentItem.attr("data-id");
        var index = parentItem.index;
        var newCate = new Category(name, parent, true);
        cateArr.push(newCate);
        localStorage.setItem("categories", JSON.stringify(cateArr));
        console.log(newCate);
        creatChildItem(newCate.name, newCate.id, index);
    }

});
