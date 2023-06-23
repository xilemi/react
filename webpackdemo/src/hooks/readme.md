## usecallBack
用于缓存函数,返回的是函数,在依赖更新才会进行更新,减少不必要的更新.当父组件传递一个函数到子组件,父组件更新,每次都会重新传递函数到子组件,引起子组件更新,但是子组件不需要这么频繁的更新,就可以在父组件中使用usecallBack进行缓存这个函数.
```
function Parent() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
 
    const getNum = useCallback(() => {
        return Array.from({length: count * 100}, (v, i) => i).reduce((a, b) => a+b)
    }, [count])
 
    return <div>
        <Child getNum={getNum} />
        <div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

const Child = React.memo(function ({ getNum }: any) {
    return <h4>总和：{getNum()}</h4>
})
```
## useMemo
缓存一个值,返回值,当依赖更新才会更新值,有点像计算属性
```
function Example() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
 
    const getNum = useMemo(() => {
        return Array.from({length: count * 100}, (v, i) => i).reduce((a, b) => a+b)
    }, [count])
 
    return <div>
        <h4>总和：{getNum()}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}
```



