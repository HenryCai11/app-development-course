// pages/components/cv-content/cv-li/cv-li.js
Component({
  /**
   * 组件间关系
   */
  relations: {
    "../cv-ul/cv-ul": {
      type: 'parent',
      linked: function(target) {
        //console.log(target);
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    nodetype: {
      type: String,
      value: "li"
    },
    class: {
      type: String,
      value:'cv-li'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  data: {
    linodes: [{
      name: 'li',
      children: [{
        type: 'text',
        text: ""
      }]
    }]
  },

  ready() {
    let getText = this.dataset.text;
    this.data.linodes[0].children[0].text = getText;
    this.setData({
      'linodes': this.data.linodes
    })
  }
})
