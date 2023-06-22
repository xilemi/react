const getLocalToken = (): null | string => {
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).userInfo).Authorization
}

export default getLocalToken