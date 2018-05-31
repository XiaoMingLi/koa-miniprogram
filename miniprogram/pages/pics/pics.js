import SERVER from "../../server/index"
import connect from "../../utils/connect"

const mapStateToProps = (state) => {
  return {
    pics: state.pics
  }
}
Page(connect(mapStateToProps)({
  data: {
    hidden: true,
    Host: SERVER.HOST,
    fm: SERVER.FM
  },
  onLoad() {

    this.getPics()

  },
  getPics() {

    SERVER.getPics().then(res => {
      const _data = res.data

      if (_data.status == 0) {
        this.__dispatch({
          type: "MODIFY_PICS",
          data: _data.data || []
        })
      }
    })

  },
  create() {
    this.setData({ hidden: false })
  },
  onAddPics(e) {
    const { name } = e.detail

    wx.showLoading({ title: '网络连接中', mask: true })

    SERVER.addPics(name).then(res => {

      if (res.data.status == 0) this.getPics()

    }).finally(() => {

      wx.hideLoading()
      this.setData({ hidden: true })

    })
  },
  onGoBack() {

    wx.hideLoading()
    this.setData({ hidden: true })

  },
  toDetail(evt) {

    let { id, name } = evt.currentTarget.dataset

    wx.navigateTo({ url: `../pic/pic?id=${id}&name=${name}` })
  }
}))