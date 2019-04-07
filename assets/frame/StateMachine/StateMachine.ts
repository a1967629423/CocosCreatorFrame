import State, { OperatorStruct } from "./State";


const { ccclass, property } = cc._decorator;
@ccclass
export default class StateMachine extends cc.Component {
    nowState: State = null
    attachment: { ch: State[], construct: { prototype: State } }[] = [];
    sqs: State[] = [];
    stateIns:{Ins:State,Name:string}[]=[];
    strelation:SR[];
    LSMDB:SM;
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


    forEachAttach(functionName:string,os:OperatorStruct,...arg)
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

}
