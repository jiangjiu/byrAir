/**
 * Created by Administrator on 2015/7/27 0027.
 */
$(function() {
    var $content = $('.content-wrap');
    $content.html(marked('# Marked in browser\n\nRendered by **marked**.'));


    var $navList = $('.nav-list');
    var categoryId = $navList.find('li:first-child').attr('id').substr(-1);
    var $noteList = $('.note-list');
    getNotes(categoryId);

    $navList.on('click','li',function(){
        $navList.find('.nav-active').removeClass('nav-active');
        $(this).addClass('nav-active');
        $noteList.empty();
        getNotes($(this).attr('id'));
    });

    function getNotes(id) {

        $.ajax({
            url: '/getNotes',
            dateType: 'json',
            type: 'get',
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






});