/**
 * Created by Administrator on 2015/7/27 0027.
 */
$(function() {
    var $content = $('.content-wrap');
    $content.html(marked('# Marked in browser\n\nRendered by **marked**.'));

    var categoryId = $('.nav-list').find('li:first-child').attr('class').substr(-1);
    var $noteList = $('.note-list');
    navInit();
    function navInit() {
        $.ajax({
            url: '/getNotes',
            dateType: 'json',
            type: 'get',
            data: {
                categoryId: categoryId
            },
            success: function (data) {
                //appendNotes(data);
            }
        });
    }

//    function appendNotes(data){
//        var html = ejs.render(temNotes,data);
//console.log(html)


        //data.forEach(function(item){
        //    html +=  new ejs({url:'note.ejs'}).render({
        //        title:item.title,
        //        content:item.content
        //    });
        //});
        //console.log(html)
        //$noteList.appendChild(html)
    //}
});