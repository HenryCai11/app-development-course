
let wxCharts = require("../../utils/wxcharts.js")

Page({
  onReady() {
    const query1 = wx.createSelectorQuery()
    const query2 = wx.createSelectorQuery()
    const query3 = wx.createSelectorQuery()
    query1.select('#myCanvasDay')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        ctx.moveTo(50, 30)
        ctx.lineTo(50, 200)
        ctx.lineTo(325.2, 200)

        ctx.stroke()
    })
    query2.select('#myCanvasMonth')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        ctx.moveTo(50, 30)
        ctx.lineTo(50, 200)
        ctx.lineTo(325.2, 200)

        ctx.stroke()
    })
    query3.select('#myCanvasYear')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        ctx.moveTo(50, 30)
        ctx.lineTo(50, 200)
        ctx.lineTo(325.2, 200)

        ctx.stroke()
    })
  }
})
