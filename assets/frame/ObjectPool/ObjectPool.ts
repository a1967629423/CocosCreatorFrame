import OPool from "./OPool";

export default class ObjectPool<T extends OPool> {
    __pool:T[]=[]
    /**
     * false为弹出第一个true为弹出最后一个
     */
    dir:boolean = false
    /**
     * 
     * @param dir 弹出方向
     */
    constructor(dir:boolean)
    {
        this.dir=dir
    }
    public push(v:T)
    {
        if(v._isOnLoadCalled)
        {
            v.unuse()
        }
        v.node.removeFromParent()
        this.__pool.push(v)
    }
    public pop():T
    {
        if(this.__pool.length)
        {
            return this.dir?this.__pool.pop():this.__pool.shift()
        }
        return null
    }
    public clear()
    {
        this.__pool.forEach(value=>{
            value.destroy()
        })
        this.__pool=[]
    }
}
