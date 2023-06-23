

export const addCount = {
    type: 'addCount'
}

export const descCount = (payload) => {
    return {
        type: "descCount",
        payload
    }
}
export const changeMsg = (payload) => {
    return {
        type: 'changeMsg',
        payload
    }
}