module.exports = function(app) {
    app.get('/', function (req, res) {
        var data = [];
        var article = {
            name:'设计',
            category:{}
            title: '图片排版与字体排版',
            content: '# Marked in browser\n\nRendered by **marked**.'
        };
        for(var i = 0;i<20;i++) {
            data.push(article);
        }
        res.render('index', { data: data });
    });
};