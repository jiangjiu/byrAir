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



    app.get('/getNotes', function (req, res, next) {
        var query = new AV.Query(Article);
        query.equalTo("categoryId", req.body.categoryId);
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

// 新增 Todo 项目
    app.post('/todos', function (req, res, next) {
        var title = req.body.title;
        var content = req.body.content;
        var category = req.body.category;
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
