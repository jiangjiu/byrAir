/**
 * Created by Administrator on 2015/7/27 0027.
 */
$(function () {
    var $content = $('.content-wrap');
    $content.html(marked('# Marked in browser\n\nRendered by **marked**.'));


    var $navList = $('.nav-list');
    var categoryId = $navList.find('li:first-child').attr('id');
    var $noteList = $('.note-list');
    getNotes(categoryId);

    $navList.on('click', 'li', function () {
        $navList.find('.nav-active').removeClass('nav-active');
        $(this).addClass('nav-active');
        $noteList.empty();
        getNotes($(this).attr('id'));
    });

    $noteList.on('click', 'li', function () {
        $noteList.find('.note-active').removeClass('note-active');
        $(this).addClass('note-active');
        $('.content-wrap').empty();
        var html = '';
        var html = $(this).find('.note-title').html() + '<br>' + $(this).find('.note-content').html();
        $('.content-wrap').append(html);
    });
    function getNotes(id) {
        $.ajax({
            url: '/getNotes',
            dateType: 'json',
            type: 'post',
            data: {
                categoryId: id
            },
            success: function (data) {
                appendNotes(data);
            }
        });
    }

    function appendNotes(data) {
        var html = '';
        data.forEach(function (item) {
            html += '<li class="note-wrap"><p class="note-title">' + item.title +
                '</p><p class="note-content">' + item.content + '</p></li>';
        });
        $noteList.append(html);
    }
/*****************************添加笔记本**********************************/
    $(".type-create").on("click", function () {
        var name = prompt("请输入分类名", "未分类");
        if (name == null) return;//null和“”的区别在哪里？？？？？
        if (name == '') {
            alert('名字咋能是空的呢');
            return;
        }
        addNav(name);

    });

    //新建笔记本的请求，传入title值   string类型
    function addNav(name) {
        $.ajax({
            url: '/addNav',
            dateType: 'json',
            type: 'post',
            data: {
                name: name
            },
            success: function (data) {
                console.log(data);
                appendBook(data);
            }
        });
    }

    function appendBook(data) {
        var html = '';
        html = '<li id="' + data.categoryId + '">' + data.name + '(<span class="number">' + data.count + '</span>)</li>';
        $navList.append(html);
    }
/****************************删除笔记本********************************/
    $(".type-del").on("click", function () {
        $cur = $navList.find('.nav-active');
        confirm("确认删除当前笔记本");
        $cur.remove();
        $noteList.empty();
        delNav($cur.attr('id'));
    });

    //删除笔记本和旗下所有笔记的请求，传入id   string类型
    function delNav(id) {
        $.ajax({
            url: '/delNav',
            dateType: 'json',
            type: 'post',
            data: {
                categoryId: id
            },
            success: function (data) {
                console.log(data)
            }
        });
    }

    //删除单个笔记的请求，传入title值   string类型
    function delNote(title) {
        $.ajax({
            url: '/delNote',
            dateType: 'json',
            type: 'post',
            data: {
                title: title,
                categoryId:categoryId
            },
            success: function (data) {
                console.log(data)
            }
        });
    }


    $('.note-create').on('click', function () {

        delNote('发生地方')
    });


});