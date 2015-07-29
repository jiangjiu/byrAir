module.exports = function (app) {

    var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
    var Category = AV.Object.extend('category');
    var Article = AV.Object.extend('article');
// 首页加载
    app.get('/', function (req, res, next) {
        var query = new AV.Query(Category);
        query.descending('createdAt');
        query.find({
            success: function (results) {
                res.render('index', {data: results});
            },
            error: function (err) {
                if (err.code === 101) {
                    // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
                    res.render('index', {
                        data: []
                    });
                } else {
                    next(err);
                }
            }
        });
    });


//通过categoryId取得笔记
    app.post('/getNotes', function (req, res, next) {
        var cate = req.body.categoryId;
        cate = parseInt(cate);
        var query = new AV.Query(Article);
        query.equalTo("categoryId",cate);
        query.find({
            success: function (results) {
                res.json(results);
            },
            error: function (err) {
                if (err.code === 101) {
                    // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
                    res.render('index', {
                        data: []
                    });
                } else {
                    next(err);
                }
            }
        });
    });

    //通过categoryId删除笔记本,同时笔记本内相应的笔记也会全部删除
    app.post('/delNav', function (req, res, next) {
        var cate = req.body.categoryId;
        cate = parseInt(cate);
        var query = new AV.Query(Category);
        var queryArt = new AV.Query(Article);
        queryArt.equalTo("categoryId",cate);
        query.equalTo("categoryId",cate);
        queryArt.destroyAll();
        query.destroyAll({
            success: function () {
                res.json({data:'删除成功'});
            },
            error: function(todo, err) {
                res.redirect('/todos?status=' + status + '&errMsg=' + JSON.stringify(err))
            }
        })
    });

    //通过title删除笔记
    app.post('/delNote', function (req, res, next) {
        var title = req.body.title;
        var queryArt = new AV.Query(Article);
        queryArt.equalTo("title",title);
        queryArt.destroyAll({
            success: function () {
                res.json({data:'删除成功'});
            },
            error: function(todo, err) {
                res.redirect('/todos?status=' + status + '&errMsg=' + JSON.stringify(err))
            }
        })
    });











// 新增 Todo 项目
    app.post('/todos', function (req, res, next) {
        var title = req.body.title;
        var content = req.body.content;
        var category = req.params.category;
        var todo = new Data();
        todo.set('content', content);
        todo.set('title', title);
        todo.set('category', category);
        todo.save(null, {
            success: function (todo) {
                res.redirect('/todos');
            },
            error: function (err) {
                next(err);
            }
        })
    })
};
