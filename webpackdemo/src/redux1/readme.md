## action中定义方法名称和参数 
## 在视图中使用 store.dispatch 进行分发 方法  进入reducer  
## 在reducer 中执行对应的方法和接收参数 
1.store 中使用 redux 的creatStore的方法  创建 store 实例 将 reducer引入进来 
2.action 中 定义一系列方法名以及参数  type   和  payload
3.reducer 中 通过 switch 判断执行的内容   
4.根组件中使用
```
store.subscribe(() => {
    root.render(
        <ReduxIndex></ReduxIndex>
    )
})
```

