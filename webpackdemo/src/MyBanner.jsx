import React, { Component } from 'react'
import MySwiper from "./MySwiper.jsx"
export default class MyBanner extends Component {
    state = {
        imgs: [
            require("../src/assets/images/404.png"),
            require("../src/assets/images/503.png"),
            require("../src/assets/images/logo.png"),
        ],
        options: {
            effect: 'cube',
            cubeEffect: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 100,
                shadowScale: 0.6
            },
            autoplay: true,
            speed: 1000,
            loop: true
        },
    }
    render() {
        const { imgs, options } = this.state
        return (
            <div>MyBanner
                <MySwiper id="demo1" options={options} >
                    {imgs.map((item, index) => {
                        return (
                            <MySwiper.Item key={index}>
                                <img src={item.default} alt="" style={{ width: "100%" }} />
                            </MySwiper.Item>
                        )
                    })}

                </MySwiper>
            </div>
        )
    }
}
