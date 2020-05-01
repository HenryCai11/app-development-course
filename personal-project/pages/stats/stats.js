
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

        ctx.font = "20px"
        ctx.fillText('金额', 25, 30)
        ctx.fillText('日', 320, 215)
        ctx.moveTo(50, 30)
        ctx.lineTo(50, 200)
        ctx.lineTo(325.2, 200)
        for (let i = 47; i < 200; i += 17) {
          ctx.moveTo(50, i)
          ctx.lineTo(55, i)
        }
        for (let i = 75; i < 325; i += 25) {
          ctx.moveTo(i, 200)
          ctx.lineTo(i, 195)
        }

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

        ctx.font = "20px"
        ctx.fillText('金额', 25, 30)
        ctx.fillText('月', 320, 215)
        ctx.moveTo(50, 30)
        ctx.lineTo(50, 200)
        ctx.lineTo(325.2, 200)
        for (let i = 47; i < 200; i += 17) {
          ctx.moveTo(50, i)
          ctx.lineTo(55, i)
        }
        for (let i = 75; i < 325; i += 25) {
          ctx.moveTo(i, 200)
          ctx.lineTo(i, 195)
        }
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

        ctx.font = "20px"
        ctx.fillText('金额', 25, 30)
        ctx.fillText('年', 320, 215)
        ctx.moveTo(50, 30)
        ctx.lineTo(50, 200)
        ctx.lineTo(325.2, 200)
        for (let i = 47; i < 200; i += 17) {
          ctx.moveTo(50, i)
          ctx.lineTo(55, i)
        }
        for (let i = 75; i < 325; i += 25) {
          ctx.moveTo(i, 200)
          ctx.lineTo(i, 195)
        }

        ctx.stroke()
    })
  }
})
