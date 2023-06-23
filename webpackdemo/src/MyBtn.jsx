

import React, { Component } from 'react';
import './styles/style.scss'
import classnames from 'classnames'

class MyBtn extends Component {
    render() {
        const {
            type,
            className,
            style,
            onClick,
            disabled,
            text
        } = this.props;
        return (
            <button
                className={classnames('btn', className, { [type]: true })}
                disabled={disabled}
                onClick={onClick}
                style={style}>
                {text}
            </button>
        );
    }
}
MyBtn.defaultProps = {
    type: 'primary',  // primary danger success
    className: 'mybtn'
}

export default MyBtn;
