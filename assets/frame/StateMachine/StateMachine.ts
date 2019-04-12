import ObjectPool, { IObpool } from "../ObjectPool/ObjectPool";
export module MSM
{
    export class OperatorStruct<Q> implements IObpool
{
    unuse() {
        this.canOperator = true;
        this.operatorInformation = Object.create(null);
    }
    reuse() {
    }
    public canOperator:boolean = true;
    public operatorValue:Q = null;
    public operatorInformation:any = Object.create(null);
    public static OP:ObjectPool<OperatorStruct<any>> = new ObjectPool<OperatorStruct<any>>(false);
    public static getinstance<T>(value?:T):OperatorStruct<T>
    {
        var os:OperatorStruct<T> = this.OP.pop();
        if(!os)
        {
            os = new OperatorStruct(value);
            this.OP.push(os);
        }
        return os;
    }
    constructor(value?:Q)
    {
        this.operatorValue = value;
        //if(!OperatorStruct.cachesOperator)OperatorStruct.cachesOperator = this;
    }
    destroy()
    {
    }
}
export  class State   {
    stateName:string =''
    quitEvent:Function = null;
    context:StateMachine = null;
    _isAttach:boolean =false;
    constructor(cxt:StateMachine)
    {
        this.context = cxt;
    }
    Start () {

    }
    update(dt:number,op:OperatorStruct<any>)
    {

    }
    disable()
    {
        
    }
    Quit()
    {
        if(this.quitEvent)this.quitEvent(this);
    }
    done()
    {
        if(this._isAttach)this.context.attachQuit(this);
        this.context.emit("done");
    }
}
export class AwaitNext
{
    count:number =1;
    type:number =1;
}
export class AwaitNextUpdate extends AwaitNext
{
    constructor(count:number=1)
    {
        super();
        this.type = 1;
        this.count = count;
    }
}
export class AwaitNextSecond extends AwaitNext
{
    time:number;
    constructor(sec:number)
    {
        super()
        this.type = 2;
        this.time = sec;
    }
}
class DCoroutine
{
    time:number=0;
    count:number=0;
    type:number=0;
    NIter:Iterator<AwaitNext>;
    timmer:number=0;
    countor:number=0;
    callback:(dc:DCoroutine)=>void;
    constructor(Iter:Iterator<AwaitNext>,callback?:(dc:DCoroutine)=>void)
    {
        this.NIter = Iter;
        this.setAttr(0);
        this.callback = callback;
    }
    setAttr(dt:number)
    {
        var result = this.NIter.next(dt);
        if(!result.done)
        {
            this.setValue(result.value?result.value:new AwaitNextUpdate(1));
        }
        else
        {
            if(this.callback)this.callback(this);
        }
    }
    setValue(value:AwaitNext)
    {
        this.type = value.type;
        switch (this.type) {
            case 1:
            this.count = (<AwaitNextUpdate>value).count;
            break;
            case 2:
            this.time = (<AwaitNextSecond>value).time;
            break;
            default:
                break;
        }
    }
    Update(dt:number)
    {
        switch(this.type)
        {
            case 1:
            this.countor++;
            if(this.countor>=this.count)
            {
                this.countor == 0;
                this.setAttr(dt);
            }
            break;
            case 2:
            if(this.timmer<this.time)
            {
                this.timmer+=dt;
            }
            else
            {
                this.timmer = 0;
                this.setAttr(dt);
            }
            break;
        }
    }
}
const { ccclass, property } = cc._decorator;
@ccclass
export class StateMachine extends cc.Component {
    nowState: State = null
    attachment: { ch: State[], construct: { prototype: State } }[] = [];
    sqs: State[] = [];
    stateIns:{Ins:State,Name:string}[]=[];
    strelation:SR[];
    LSMDB:SM;
    Coroutines:DCoroutine[] = [];
    protected listenlist:{eventName:string,callback:(eventName:string)=>void}[] = [];
    changeState(cs: State) {
        if (this.nowState) this.nowState.Quit();
        this.nowState = cs;
        cs.Start();
    }
    start()
    {
        this.LSMDB.sts.forEach(value=>{
            var st:State= new value.st(this)
            this.stateIns.push({Ins:st,Name:value.name})
        })
        this.emit('start')
    }
    startCoroutine(iter:DCoroutine)
    {
        iter.callback=value=>{
            this.Coroutines.splice(this.Coroutines.findIndex(cor=>{return cor===value }),1); 
        }
        this.Coroutines.push(iter);
    }
    startCoroutine_Auto(iter:Iterator<AwaitNext>)
    {
        this.startCoroutine(new DCoroutine(iter));
    }
    update(dt:number)
    {
        if(this.Coroutines.length!=0)
        {
            for(var i =this.Coroutines.length-1;i>=0;i--)
            {
                this.Coroutines[i].Update(dt);
            }
        }
        var op = OperatorStruct.getinstance();
        if(this.nowState)this.nowState.update(dt,op);
    }
    attachState<T extends State>(type: { prototype: T, apply: Function }): T {
        //创建实例
        var cs: T = type.apply({ __proto__: type.prototype }, [this])
        cs.quitEvent = this.attachQuit.bind(this);
        var fch = this.attachment.find((value)=>{
            if(value.construct === type)return true;
        });
        if(fch)
        {
            fch.ch.push(cs);
        }
        else
        {
            this.attachment.push({ch:new Array(cs),construct:type});
        }
        this.sqs.push(cs);
        cs._isAttach = true;
        setTimeout(() => {
            cs.Start();
        })
        return cs;
    }
    attachQuit(CS: State) {
        let typestr = typeof CS;
        var chindex = 0;
        let index = this.attachment.findIndex((value) => {
            if (value.ch.find((v2,index:number)=>{
                if(v2===CS)
                {
                    chindex = index;
                    return true;
                }
            })) return true;
        });
        let index2 = this.sqs.findIndex((value: State) => {
            if (value === CS) return true;
        });
        this.attachment[index].ch.splice(chindex, 1);
        this.sqs.splice(index2, 1);
        if (this.attachment[index].ch.length < 1) delete this.attachment[typestr];
    }
    getAttachs<T extends State>(type: {prototype: T,apply:Function}):T[]
    {
        for(let val in this.attachment)
        {
            if(this.attachment[val].construct === type)return <T[]>this.attachment[val].ch;
        }
        return null;
    }
    getAttach<T extends State>(type: {prototype: T,apply:Function}):T
    {
        let ats = this.getAttachs(type);
        return <T>(ats?ats[0]:ats);
    }


    forEachAttach(functionName:string,os:OperatorStruct<any>,...arg)
    {
        if(this.sqs.length>0)
        {
            for(var i = this.sqs.length-1;i>=0;i--)
            {
                arg.push(os);
                this.sqs[i][functionName].apply(this.sqs[i],arg);
            }
        }
    }
    /**
     * 修改一个附加状态的执行顺序
     */
    changAttachStateOrder(cs:State,order:number)
    {
        var idx = this.sqs.findIndex((value)=>{if(value===cs)return true});
        var newArr = this.sqs.splice(idx,1);
        newArr.splice(order,0,this.sqs[idx]);
        this.sqs = newArr;
    }
    getStatesLength():number
    {
        return this.sqs.length;
    }
    /**
     * 引发一个事件
     * @param eventName 事件名
     */
    emit(eventName:string)
    {
        var st=this.strelation.find(value=>{
            if(!this.nowState)
            {
                return value.eventname==eventName
            }
            else
            {
                return value.eventname==eventName&&value.source==this.nowState['constructor']
            }
        })
        if(st)
        {
            var tarIns= this.stateIns.find(value=>{return value.Ins['constructor']===st.target})
            if(tarIns)
            {
                this.changeState(tarIns.Ins)
            }
        }
        
    }
    private listenToemit(eventName:string)
    {
        this.emit(eventName);
    }
    protected listen(eventName:string)
    {
        if(!this.listenlist.find(value=>value.eventName===eventName))
        {
            var callback = (function(eventName){
                return ()=>{
                    this.listenToemit(eventName)
                } 
            })(eventName)
            this.listenlist.push({eventName:eventName,callback:callback})
            this.node.on(eventName,callback,this);
        }
    }
    onDestroy()
    {
        super.onDisable();
        this.nowState.Quit();
        this.sqs.forEach(value=>{value.Quit()});
    }
    onDisable()
    {
        super.onDisable();
        this.nowState.disable();
        this.sqs.forEach(value=>{value.disable()});
    }

}
}

