import EventEmitter from "events"
export const eventBus = new EventEmitter()
// 事件总线的方式  使用 eventBus.emit("事件名") 激发事件 携带数据
// event.on("事件名",()=>{}) 监听事件使用数据