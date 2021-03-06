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
        if(cate == '') return;
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
        if(cate == '') return;
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

    //通过title删除笔记 同时笔记本count-1
    app.post('/delNote', function (req, res, next) {
        var title = req.body.title;
        var cate = req.body.categoryId;
        if(cate == '' && title == '') return;
        cate = parseInt(cate);
        var queryArt = new AV.Query(Article);
        queryArt.equalTo("title",title);
        var query = new AV.Query(Category);
        query.equalTo("categoryId",cate);
        queryArt.destroyAll({
            success: function () {
                res.json({data:'删除成功'});
            },
            error: function(todo, err) {
                res.redirect('/todos?status=' + status + '&errMsg=' + JSON.stringify(err))
            }
        }).then(function(){
            query.find({
                success:function(category){
                    var count = category[0].get('count');
                    category[0].set('count',count-1);
                    category[0].save();
                },
                error:function(){
                }
            })
        })
    });


// 新增笔记本
    app.post('/addNav', function (req, res, next) {
        var name = req.body.name;
        if(name == '') return;
        var post = new Category();
        post.set('name', name);
        post.set('count', 0);
        post.save(null, {
            success: function () {
                res.json({data:'新建成功'});
            },
            error: function (err) {
                next(err);
            }
        })
    });


    // 新建笔记   拿到title,content,categoryId 三个值 同时主笔记本count+1
    app.post('/addNote', function (req, res, next) {
        var title = req.body.title;
        var content = req.body.content;
        var cate = req.body.categoryId;
        if(cate == '' && title == '') return;
        cate = parseInt(cate);
        var post = new Article();
        var query = new AV.Query(Category);
        query.equalTo("categoryId",cate);
        post.set('title', title);
        post.set('content', content);
        post.set('categoryId', cate);
        post.save(null, {
            success: function () {
                res.json({data:'新建成功'});
            },
            error: function (err) {
                next(err);
            }
        }).then(function(){
            query.find({
                success:function(category){
                    var count = category[0].get('count');
                    category[0].set('count',count+1);
                    category[0].save();
                },
                error:function(){
                }
            })
        })
    });

    // 更新笔记   拿到title,content,categoryId 三个值
    app.post('/updateNote', function (req, res, next) {
        var title = req.body.title;
        var newTitle = req.body.newTitle;
        var content = req.body.content;
        var cate = req.body.categoryId;
        if (title == '' && newTitle == '' && cate == '') return;
        cate = parseInt(cate);
        var queryArt = new AV.Query(Article);
        queryArt.equalTo("categoryId",cate);
        queryArt.equalTo("title",title);
        queryArt.find({
            success: function (data) {
                data[0].set('title',newTitle);
                data[0].set('content',content);
                data[0].save();
                res.json({data:'更新成功！'})
            }
        })
    });
};
