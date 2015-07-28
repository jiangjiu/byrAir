/**
 * Created by zhaojin on 15/7/22.
 */

storageInit();
Init();
/**激活绑定事件：
 找到current类名的对象，移除类名current，找不到会返回空，执行下一步
 增加current类名
 **/
$(".cate-box").on("click", ".name", function () {
    $('.cate-box').find('.current').removeClass('current');
    $(this).addClass("current");

});

/**
 * 新建笔记本按钮   开始绑定事件 思路如下：
 * 1.点击后弹框，没输入名字或者点了取消就给个提示返回
 * 2.输入有效名字后，保存名字，判断有没有父笔记本，无论是父笔记本还是子笔记本都找到父笔记本索引值并返回
 * 3.通过拿到的name和父返回值，保存数据至localStorage
 * 4.传入newcate，html中插入子对象
 * **/

$(".type-create").on("click", function () {
    //var mainItem = $(".main-list");
    //for (var i = 0; i < mainItem.length; i++) {
    //    if (parentItem.attr("data-id") == mainItem[i].getAttribute("data-id")) {
    //        parentItem.index = i;
    //    }
    //
    //}
    var name = prompt("请输入分类名", "未分类");
    if (name == null) return;//null和“”的区别在哪里？？？？？
    if (name == '') {
        alert('名字咋能是空的呢');
        return;
    }
    var currentItem = $(".current");
    var parentItem = (currentItem.parent().attr('class') == 'child-list') ? currentItem.parent().parent().parent() : currentItem.parent();
    var parentId = parentItem.attr('data-id');
    var parIndex = parentItem.attr('data-id').substr(-1) - 1;
    if (parentItem == '') {
        alert("在主笔记本下创建子笔记本");
    } else {
        var newCate = new Category(name, parentId, true);
        cateArr.push(newCate);
        localStorage.setItem("categories", JSON.stringify(cateArr));
        creatChildItem(newCate.name, newCate.id, parIndex);
    }
});
/**
 * 判断是否点中了主笔记和子笔记，是的话返回子笔记父索引值，未选中直接返回false
 * **/
//function hasParent() {
//    var $cur = $('.cate-box').find('.current');
//    if ($cur.length == 0) return false;
//    var className = $cur.parent().attr('class');
//    return isParent($cur, className);
//}
//
//function isParent($cur, className) {
//    var parIndex;
//    parIndex = (className == 'child-list') ? $cur.parent().parent().parent().attr('data-id') : $cur.parent().attr('data-id');
//    return parIndex.substr(-1) - 1;
//}

$(".type-del").on("click", function () {
    var $cur = $(".cate-box").find(".current");
    var className = $cur.parent().attr('class');
    if( className == "main-list"){
        confirm("确认删除当前主分类");
        $cur.parent().remove();
        $(".note-list").html("");
        var id = $cur.parent().attr("data-id");
        deleteMain(id);
    }else{
        confirm("确认删除当前子分类");
        $cur.parent().remove();
        $(".note-list").html("");
        var id = $cur.parent().attr("data-id");
        deleteChild(id);
    }
});

//创建新笔记
$(".note-create").on("click",function(){

});

