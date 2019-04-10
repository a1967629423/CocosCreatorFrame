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
    Nodefactory(pre:cc.Prefab)
    {
        var node = cc.instantiate(pre);
        node['__factoryName']=pre.name;
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
    pop(name:string):cc.Node
    {
        var rePool = this.PrefabPool.find(value=>value.name===name);
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
