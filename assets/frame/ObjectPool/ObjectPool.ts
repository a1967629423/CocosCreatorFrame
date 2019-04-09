export interface IObpool
{
    unuse();
    reuse();
    destroy();
}
export default class ObjectPool<T> {
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
        if(v['_poolisload'])
        {
            if(v['unuse'])v['unuse']();
        }
        else
        {
            v['_poolisload']=true;
        }
        if(v['node'])(<cc.Node>v['node']).removeFromParent();
        else
        if(v['removeFromParent'])v['removeFromParent']();
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
            if(value['destroy'])value['destroy']();
        })
        this.__pool=[]
    }
}
