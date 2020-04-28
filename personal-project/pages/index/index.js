//index.js
const date = new Date()
let datePointer = date
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}


Page({
  data: {
    currentDate: date.getTime(),
    minDate: new Date("2018"),
    years: years,
    months: months,
    days: days,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    show: false,
    bottomShow: false,
    arrowRightColor: "blue",
    arrowLeftColor: "blue",
    inputNumber: "",
    dotFlag: false,
    fractionNum: 0,
    categoryList: {
      "food": {
        "title": "饮食",
        "icon": "shopfill",
        "emoji": '🍕',
        "pick": true
      },
      "clothes": {
        "title": "服饰",
        "icon": "clothesfill",
        "emoji": '🧦',
        "pick": false
      },
      "digital": {
        "title": "数码产品",
        "icon": "mobilefill",
        "emoji": '🎧',
        "pick": false
      },
      "transportation": {
        "title": "交通出行",
        "icon": "deliver_fill",
        "emoji": '🚗',
        "pick": false
      },
      "study": {
        "title": "学习娱乐",
        "icon": "creativefill",
        "emoji": '🎮',
        "pick": false
      }
    },
    pickedCtg: "food",
    interface: [],
    hasContent: false
  },
  onLoad() {
    let key = String(this.data.year) + String(this.data.month) + String(this.data.day);
    let _this = this;
    wx.getStorage({
      key: key,
      success(res) {
        _this.setData({
          interface: res.data,
          hasContent: true
        })
      }
    })
    console.log(this.data.interface)
  },
  showPopup() {
    this.setData({ show: true })
  },
  onClose() {
    this.setData({ show: false })
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    })
  },
  confirmDate(event) {
    let newDate = new Date(event.detail)
    this.setDate(newDate)
  },
  cancelPicker() {
    this.setData({
      show:false
    })
  },
  leftTouchStart() {
    this.setData({
      arrowLeftColor: "darkblue"
    })
  },
  leftTouchEnd() {
    this.setData({
      arrowLeftColor: "blue"
    })
  },
  rightTouchStart() {
    this.setData({
      arrowRightColor: "darkblue"
    })
  },
  rightTouchEnd() {
    this.setData({
      arrowRightColor: "blue"
    })
  },
  dateBack() {
    let newDate = new Date(datePointer - 86400000)
    this.setDate(newDate)
  },
  dateForward() {
    let newDate = new Date(datePointer - (-86400000))
    this.setDate(newDate)
  },
  bottomOnClose() {
    this.setData({ bottomShow: false })
  },
  showBottom() {
    this.setData({ bottomShow: true })
  },
  operateOnNumber(e) {
    let val = e.currentTarget.dataset['num'];
    let num = this.data.inputNumber;
    let dotFlag = this.data.dotFlag;
    let fractionNum = this.data.fractionNum;
    if (val == -1) {  //删除/回退
      if (num.length === 0) return;
      if (num[num.length - 1] == '.') dotFlag = false;
      if (dotFlag && num[num.length - 1] != '.') fractionNum--;
      num = num.slice(0, num.length - 1)
    }
    else if (val == -2) { //小数点
      if (num[num.length - 1] == ".") return;
      if (num.length === 0) {
        num += "0.";
        dotFlag = true;
      }
      if (!dotFlag) {
        dotFlag = true;
        num += ".";
      }
    }
    else if (val == 0) {
      if (num[num.length - 1] == '0' && num.length == 1) return;
      if (dotFlag && fractionNum == 2) return;
      num += '0';
      if (dotFlag) fractionNum++;
    }
    else {
      if (dotFlag && fractionNum == 2) return;
      num += String(val);
      if (dotFlag) fractionNum++;
    }
    this.setData({
      inputNumber: num,
      dotFlag: dotFlag,
      fractionNum: fractionNum
    })
  },
  pickCategory(e) {
    let ctg = e.currentTarget.dataset["ctg"];
    let pickedCtg = this.data.pickedCtg;
    let changedCtg = "categoryList." + ctg + ".pick";
    let cancelPickCtg = "categoryList." + pickedCtg + ".pick";
    this.setData({
      [changedCtg]: true,
      [cancelPickCtg]: false,
      pickedCtg: ctg
    })
  },
  addItem() {
    let number = Number(this.data.inputNumber);
    let category = this.data.categoryList[this.data.pickedCtg].title;
    let emoji = this.data.categoryList[this.data.pickedCtg].emoji;
    let key = String(this.data.year) + String(this.data.month) + String(this.data.day);
    let data = this.data.interface;
    let id = (new Date()).getTime();
    data.push({number: number, category: category, emoji: emoji, id: id});
    wx.setStorage({
      key: key,
      data: data
    })
    this.setData({
      bottomShow: false,
      inputNumber: "",
      interface: data,
      hasContent: true
    })
  },
  deleteItem(e) {
    let id = e.currentTarget.dataset["id"];
    let key = String(this.data.year) + String(this.data.month) + String(this.data.day);
    let data = this.data.interface;
    let temp = [];
    data.forEach((el) => {
      if (el.id != id) {
        temp.push(el)
      }
    });
    if (temp.length) {
      wx.setStorage({
        key: key,
        data: temp
      })
    }
    else {
      wx.removeStorage({
        key: key
      })
    }
    this.setData({
      interface: temp,
      hasContent: temp.length?true:false
    })
  },
  setDate(newDate) {
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let day = newDate.getDate()
    let key = String(year) + String(month) + String(day)
    let _this = this;
    wx.getStorage({
      key: key,
      success(res) {
        _this.setData({
          interface: res.data,
          hasContent: true
        })
      },
      fail() {
        _this.setData({
          interface: [],
          hasContent: false
        })
      }
    })
    this.setData({
      year: year,
      month: month,
      day: day,
      currentDate: newDate.getTime(),
      show: false
    })
    datePointer = newDate
  }
})
