//homePage.js
var ApiUrl = "http://wx.blcumappdev.xyz/demo/"
//新闻类型接口
var typeUrl = ApiUrl + "news/type"
//新闻列表接口
var newsUrl = ApiUrl + "news/list"

Page({
  data: {
    tArray: ["经济", "文化", "艺术"], //新闻类型数组
    loading: true, //是否显示加载
    ishidden: true,
    curpage: 0, //新闻列表坐标
    listpage: 0, //列表当前页码
    detaildata: [], //新闻列表
    category: "all", //当前分类
    viewHeight: 500 //scroll-view 高度
  },
  onReady: function() {
    //创建动画实例
    this.animation = wx.createAnimation({
      //动画持续时间
      duration: 2000,
      //* linear 动画一直较为均匀
      //* ease 从匀速到加速再到匀速
      //* ease-in 缓慢到匀速
      //* ease-in-out 从缓慢到匀速再到缓慢
      timingFunction: "ease",
    });
    //读取屏幕高度
    var res = wx.getSystemInfoSync();
    var width = res.screenHeight - 40 - 50;
    //设置scroll-view 高度
    this.setData({
      viewHeight: width
    });
  },
  onLoad: function() {
    //导航栏显示加载状态
    wx.showNavigationBarLoading();
    //定义this代理，处理网络返回数据，不能直接使用this
    var that = this;
    //请求网络，获取type
    wx.request({
      url: typeUrl,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        //获取返回的数组
        let dataArr = [];
        dataArr = res.data.data.data;
        //打印输出
        console.log(dataArr);
        //变量赋值
        that.setData({
          tArray: dataArr
        });
      },
      fail: function(res) {},
      complete: function(res) {
        //取消导航栏加载
        wx.hideNavigationBarLoading();
      }
    })
    //初始化页码从0开始
    this.setData({
      listpage: 0
    });
    //默认显示所有新闻
    this.readList("all")
  },
  typeClick: function(e) {
    var idx = e.currentTarget.dataset.idx;
    console.log(idx);
    var that = this;
    that.setData({
      curpage: e.target.id
    });
    //初始化页码从0开始
    this.setData({
      listpage: 0
    });
    console.log("curpage=", this.data.curpage);
    console.log("listpage==", this.data.listpage);
    //设置分类
    this.setData({
      category: idx
    });
    //获取新闻
    this.readList()
  },
  //加载更多， scroll-view bindscrolltolower事件
  addMoreData: function(e) {
    //页码+1，继续获取新闻
    var that = this;
    var pageTemp = (this.data.listpage + 1)
    that.setData({
      listpage: pageTemp
    });
    //获取新闻
    this.readList()
  },
  readList:function() {
    //显示加载状态
    this.setData({ loading: false });
    //请求网络，获取type
    var that = this;
    wx.request({
      url: newsUrl,
      method: "POST", //默认GET
      data: { "category": this.data.category, "page": this.data.curpage },
      header: {
        "content-type": "application/x-www-form-urlencoded" //以表单形式提交
        //"content-type": "application/json" //以json形式提交
      },
      success: function(res) {
        //如果是第1页，坐标是0，数组先清空
        if (that.data.listpage == 0) {
          that.setData({
            detaildata: []
          });
        }
        //解析数据
        var arr = res.data.data;
        console.log(arr);
        var dataArr = [];
        for (var index of arr) {
          //转换Json字符串=>Json对象
          dataArr.push(JSON.parse(index.content));
        }
        that.setData({ detaildata: dataArr }); //修改数组
      },
      fail: function(res) {},
      complete: function(res) {
        that.setData({ loading: true }) //取消加载
      }
    });
  }
});
