/**
 * Created by zhaojin on 15/7/22.
 */

storageInit();
Init();
//点击控制子任务显示判断现在在那个分类用current表示，还有一部分没有完成，对应显示右侧note
//$(".cate-box").on("click", ".name", function () {
//    //var parent = $(this).parent();
//    var name = $(".name");
//    for (var i = 0; i < name.length; i++) {
//        name.attr("class", "name");
//    }
//    $(this).addClass("current");
//
//});





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
 * 2.输入有效名字后，保存名字，判断有没有父笔记本，无论是副笔记本还是子笔记本都找到副笔记本索引值并返回
 * 3.通过拿到的name和父返回值，保存数据至localStorage
 * 4.传入newcate，html中插入子对象
 * **/

$(".type-create").on("click", function () {
    var name = prompt("请输入分类名", "空调在哪里");
    if(name == null) return;
    if(name == '') {
        alert('名字咋能是空的呢');
        return;
    }
    var parIndex = hasParent();
    if (parIndex === false) {
        alert('先装空调，再写创建主笔记功能！！！')
    } else {
        var parent = $(".cate-box .main-list:last").attr('data-id');
        var newCate = new Category(name, parent, true);
        cateArr.push(newCate);
        localStorage.setItem("categories", JSON.stringify(cateArr));
        creatChildItem(newCate.name, newCate.id, parIndex);
    }
});

/**
 * 判断是否点中了主笔记和子笔记，是的话返回子笔记父索引值，未选中直接返回false
 * **/
function hasParent(){
    var $cur =  $('.cate-box').find('.current');
    if($cur.length == 0) return false;
    var dataId =  $cur.parent().attr('data-id');
    return isParent($cur,dataId);
}

function isParent($cur,dataId){
    var parIndex;
    parIndex = (dataId == 'childitem')? $cur.parent().parent().parent().attr('data-id'):$cur.parent().attr('data-id');
    return parIndex.substr(-1)-1;
}

//
//$(".type-c4reate").on("click", function () {
//    var currentItem = $(".current");
//    var parentItem = currentItem.parent();
//    var mainItem = $(".main-list");
//    for (var i = 0; i < mainItem.length; i++) {
//        if (parentItem.attr("data-id") == mainItem[i].getAttribute("data-id")) {
//            parentItem.index = i;
//        }
//
//    }
//    console.log(parentItem);
//    console.log(parentItem.index);
//    if (parentItem.attr("class") == "main-list") {
//        var name = prompt("请输入分类名", "未命名");
//        var parent = parentItem.attr("data-id");
//        var newCate = new Category(name, parent, true);
//        cateArr.push(newCate);
//        localStorage.setItem("categories", JSON.stringify(cateArr));
//        console.log(newCate);
//        creatChildItem(newCate.name, newCate.id, parentItem.index);
//        console.log(parentItem.index)
//    }
//
//});
