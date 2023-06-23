
## UI组件 容器组件
### UI组件 
1.不带逻辑,不带状态
2.所有数据都由props 提供 
3.不使用redux api
### 容器组件 
1.负责管理数据和业务逻辑
2.内部状态
3.使用redux api

## 关键点  
使用  connect将  ui组件 容器组件连接起来   
mapStateToProps  mapDispatchToProps  进行传递内容
## @connect 装饰器  
直接在装饰器内写 @connect(
    state=>{

    }
    dispatch=>{

    }
)

