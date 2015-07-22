/**
 * Created by zhaojin on 15/7/22.
 */
var noteArr = new Array();
var cateArr = new Array();
var configurable = false;

//分类构造函数
function Category(name, parent, configurable) {
    var id;
    id = Data.parse(new Data);
    if (parent == null) {
        this.id = "main" + id;
    } else {
        this.id = "child" + id;
    }
    this.name = name;
    this.parent = parent;
    this.number = 0;
    this.configurable = configurable;

}
//笔记构造函数
function Note(title, date, content, belongTo) {
    var id;
    id = Data.parse(new Data);
    this.id = "note" + id;
    this.title = title;
    this.date = date;
    this.content = content;
    this.belongTo = belongTo;
}


/********系统初始化*********/
//localstorage初始化
function storageInit() {
    console.log(cateArr.length);
    if (cateArr.length == 0) {
        cateArr.push({
            id: "index",
            name: "默认分类",
            configurable: false,
            parent: null,
            number: 0
        });
        console.log(cateArr);
        localStorage.setItem("categories", JSON.stringify(cateArr));
    }

    var cateObj = JSON.parse(localStorage.getItem("categories"));
    var noteObj = JSON.parse(localStorage.getItem("notes"));
    cateArr = [];
    noteArr = [];
    var length1 = 0;
    var length2 = 0;
    //可能会有一些问题
    for (var cate in cateObj) {
        length1++;
    }
    for (var note in noteObj) {
        length2++;
    }
    for (var i = 0; i < length1; i++) {
        cateArr[i] = cateObj[i];
    }
    for (var j = 0; j < length2; j++) {
        noteArr[j] = noteObj[j];
    }


}
//左侧分类初始化
function Init() {
    var length = cateArr.length;

    var i, j;
    for (i = 0; i < length; i++) {
        if (cateArr[i].parent == null) {
            creatMainItem(cateArr[i].name, cateArr[i].id);
        }
    }
    var mainItem = $(".nav-list");
    for (i = 0; i < mainItem.length; i++) {
        mainItem[i].index = i;
    }
    for (i = 0; i < length; i++) {
        if (cateArr[i].parent != null) {
            for (j = 0; j < mainItem.length; j++) {
                if (cateArr[i].parent == mainItem[j].getAttribute("data-id")) {
                    creatChildItem(cateArr.name, cateArr[i].id, mainItem[j].index);
                }
            }
        }
    }
}



//创建主分类
function creatMainItem(name, id) {
    var ele = $(".cate-box");
    var mainItem = "<div></div>";
    mainItem.attr("data-id", id);
    //mainItem.attr("class","main-list");
    var name = "<div>" + name + "</div>";
    name.attr("class", "name");
    var number = 0;
    var span = $("<span>(" + number + ")</span>");
    name.append(span);
    var drawDown = "<div></div>";
    drawDown.attr("class", "drawDown");
    mainItem.append(name);
    mainItem.append(drawDown);
    ele.append(mainItem);
}
//创建子分类
function creatChildItem(name, id, mainindex) {
    //不知道这种写法对不对
    var ele = $(".cate-box").eq(mainindex).children(".drawDown");
    var childItem = "<div></div>";
    childItem.attr("data-id", id);
    //childItem.attr("class","child-list");
    var name = "<div>" + name + "</div>";
    name.attr("class", "name");
    var number = 0;
    var span = $("<span>(" + number + ")</span>");
    name.append(span);
    childItem.append(name);
    ele.append(childItem);

}