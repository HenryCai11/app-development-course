// pages/components/cv-content/cv-ul/cv-ul.js
Component({
  /**
   * 组件的关系
   */
  relations: {
    "../cv-li/cv-li": {
      type: "child",
      linked: function(target) {
        let text = target.dataset.text;
        let nodeType = target.data.nodetype;
        let tempNode = {name: nodeType, children:[{type: 'text', text: text}]}
        this.data.nodes[0].children.push(tempNode);
        this.setData({
          "nodes": this.data.nodes
        })
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    nodetype: {
      type: String,
      value:"ul"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nodes:[{
      name: 'ul',
      children: []
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready() {
    // this.selectAllComponents().forEach((key, value) => {
    //   console.log(key, value);
    // })
  }
})
