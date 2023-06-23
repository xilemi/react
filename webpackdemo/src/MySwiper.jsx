import React, { Component } from 'react'
import Swiper, { prototype } from 'swiper'
import 'swiper/dist/css/swiper.css'
import PropTypes from 'prop-types'

export default class MySwiper extends Component {
    render() {
        // 动态传入id 插槽children
        const { id, children } = this.props
        return (
            // 基本结构
            <div className='swiper-container' id={id} style={{}}>
                <div className='swiper-wrapper'>
                    {children}
                    {/* 这里是放<div class="swiper-slide">img</div> 可以再做个静态属性*/}
                </div>
            </div>
        )
    }
    componentDidMount() {
        const { id, options } = this.props
        let Myswiper = new Swiper(document.querySelector(`#${id}`), {
            ...options,
            preventClicks: false,
            observer: true
        })
    }
}
MySwiper.defaultProps = {
    id: "box",
    options: {
        autoplay: true,
        speed: 1000,
    }
}
MySwiper.propTypes = {
    id: PropTypes.string,
    options: PropTypes.object
}
// 类组件的静态属性 也作为组件?
MySwiper.Item = (props) => {
    const { children } = props
    return (
        <div className="swiper-slide">
            {children}
        </div>
    )
}
