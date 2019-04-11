import ObjectPool from "../ObjectPool/ObjectPool";

const {ccclass, property} = cc._decorator;
/**
 * Prefab工厂类，将此类放置在node上并填入需要使用的Prefab就会自动实例化
 */
@ccclass
export default class PrefabFactor extends cc.Component {
    @property([cc.Prefab])
    Prefabs:cc.Prefab[] = []
    @property
    InitValue:number = 10;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    PrefabPool:{name:string,pool:ObjectPool<cc.Node>,prefab:cc.Prefab}[] = []
    static NodePush(node:cc.Node)
    {
        var factory:PrefabFactor =node['__factory']
        if(factory)
        {
            factory.push(node);
        }
        else
        {
            if(CC_DEBUG)
            {
                console.log('node not have factory');
                console.log(node);
            }
        }
    }
    Nodefactory(pre:cc.Prefab)
    {
        var node = cc.instantiate(pre);
        node['__factoryName']=pre.name;
        node['__factory']=this;
        return node;
    }
    start () {
        if(this.PrefabPool.length!=this.Prefabs.length)
        {
            this.Prefabs.forEach(value=>{
                var pool = new ObjectPool<cc.Node>(true);
                for(var i=0;i<this.InitValue;i++)
                {
                    pool.push(this.Nodefactory(value));
                }
                this.PrefabPool.push({name:value.name,pool,prefab:value})
            })
        }
    }
    pop(name:string|number):cc.Node
    {
        var rePool = null;
        if(typeof name === 'string')
        {
            rePool = this.PrefabPool.find(value=>value.name===name);
        }
        else if(typeof name === 'number')
        [
            rePool = this.PrefabPool.length>name?this.PrefabPool[name]:null
        ]
        if(rePool)
        {
            var renode = rePool.pool.pop();
            if(!renode)
            {
                renode = this.Nodefactory(rePool.prefab)
                rePool.pool.push(renode); 
            }
            return renode;
        }
    }
    push(node:cc.Node,name?:string)
    {
        var prefabName = name?name:node['__factoryName'];
        if(!prefabName)
        {
            if(CC_DEBUG)
            {
                console.warn('node not have name');
            }
        }
        var rePool = this.PrefabPool.find(value=>value.name===prefabName);
        if(rePool)
        {
            rePool.pool.push(node);
        }
        else
        {
            if(CC_DEBUG)
            {
                console.warn("Pool not find name:%s",prefabName)
            }
        }
    }


    // update (dt) {}
}
