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





/**
 找到current类名的对象，移除类名current，找不到会返回空，执行下一步
 增加current类名
 **/
$(".cate-box").on("click", ".name", function () {
    $('.cate-box').find('.current').removeClass('current');
    $(this).addClass("current");

});


/**
 * 新建笔记本按钮   开始绑定事件
 * **/

$(".type-c3reate").on("click", function () {
    var name = prompt("请输入分类名", "空调在哪里");
    if(name == null) return;
    if(name == '') {
        alert('名字咋能是空的呢');
        return;
    }
    var parIndex = hasParent();
    if(!parIndex){
        var parent = $('.cate-box .main-list:last').attr('data-id');
        var newCate = new Category(name, parent, true);
        cateArr.push(newCate);
        localStorage.setItem("categories", JSON.stringify(cateArr));


    }



});

/**
 * 判断是否点中子笔记，是的话返回子笔记父索引值，不是子笔记直接返回false
 *     主笔记被选中，或者什么都没被选中，默认都新建主笔记
 *     子笔记被选中，默认在当前主笔记下新建子笔记
 * **/
function hasParent(){
    var $cur =  $('.cate-box').find('.current');
    if($cur.length == 0) return false;
    if($cur.parent().attr('data-id') == 'childitem') {
        var parIndex = $cur.parent().parent().parent().attr('data-id');
        return  parIndex.substr(-1);
    }else{
        return false;
    }
}




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
