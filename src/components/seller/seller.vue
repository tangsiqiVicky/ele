<template>
  <div class="seller" ref="seller">
    <div class="seller-content" >
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">（{{seller.ratingCount}}）</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="item in seller.supports" >
                <span class="icon" :class="classMap[item.type]">
                </span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120px" height="90px" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title">商家信息</div>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../../components/star/star'
  import split from '../../components/split/split'
  import {saveToLocal, loadFromLocal} from '../../common/js/store'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '收藏' : '未收藏'
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
      this._initScroll()
      this._initPicScroll()
    },
    updated() {
      this.scroll.refresh()
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initPicScroll()
        })
      }
    },

    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      },
      _initScroll() {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
      },
      _initPicScroll() {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = this.seller.pics.length * (picWidth + margin) - margin
          this.$refs.picList.style.width = width + 'px'
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        }
      }
    },
    components: {
      star,
      split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position : absolute
    top : 174px
    bottom : 0
    left : 0
    width : 100%
    overflow : hidden
    .overview
      padding : 18px
      position : relative
      .title
        margin-bottom : 8px
        font-size : 14px
        font-weight : 800
        color : rgb(7,17,27)
        line-height : 14px
      .desc
        font-size : 0
        line-height :18px
        padding : 8px 0 18px 0px
        border-1px(rgba(7,17,27,0.1))
        .star
          display : inline-block
          margin-right : 8px
        .text
          display : inline-block
          margin-right : 12px
          line-height : 18px
          vertical-align : top
          font-size : 10px
          color : rgb(77,85,93)
      .remark
         display : flex
         margin-top : 18px
         .block
           flex : 1
           text-align : center
           border-right : 1px solid rgba(7,17,27,0.1)
           &:last-child
            border : none
           .title
            margin-bottom : 4px
            font-size : 10px
            line-height : 10px
            color : rgb(157,153,159)
           .content
             font-size : 10px
             .stress
              line-height : 24px
              font-size : 24px
              color : rgb(7,17,27)
              font-weight : 400
      .favorite
        position :absolute
        right : 18px
        top: 18px
        width : 50px
        text-align : center
        .icon-favorite
          display : block
          margin-bottom : 4px
          line-height : 24px
          font-size : 24px
          color : #d4d6d9
          &.active
            color : rgb(240,20,20)
        .text
            line-height : 10px
            font-size : 10px
            color : rgb(77,85,93)
    .bulletin
      padding : 18px 18px 0 18px
      .title
        margin-bottom : 8px
        font-size : 14px
        font-weight : 800
        color : rgb(7,17,27)
        line-height : 14px
      .content-wrapper
        padding :0px 12px 16px 12px
        border-1px(rgba(7,17,27,0.1))
        .content
          line-height : 24px
          color : rgb(240,20,20)
          font-weight : 400
      .supports
        .support-item
          padding : 16px 12px
          font-size : 0
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .icon
            display : inline-block
            vertical-align top
            width : 16px
            height : 16px
            margin-right : 6px
            background-size : 16px 16px
            background-repeat : no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            line-height : 16px
            font-size : 12px
            color : rgb(7,17,27)


    .pics
      padding : 18px
      .title
        margin-bottom : 12px
        line-height : 14px
        color : rgb(7,17,27)
        font-size : 14px
      .pic-wrapper
        width : 100%
        overflow : hidden
        white-space : nowrap
        .pic-list
          font-size : 0px
          .pic-item
            display : inline-block
            margin-right : 6px
            width : 120px
            height : 90
            &.last-child
             margin-right : 0
    .info
      padding : 18px 18px 0 18px
      .title
        color: rgb(7,17,27)
        font-size : 14px
        line-height : 14px
        font-weight : 800
        padding-bottom : 8px
        border-1px(rgba(7,17,27,0.1))
      .info-item
        padding : 16px 12px
        font-size : 12px
        line-height : 16px
        font-weight : 200
        color : rgb(7,17,27)
        border-1px(rgna(7,17,27,0.1))
</style>
