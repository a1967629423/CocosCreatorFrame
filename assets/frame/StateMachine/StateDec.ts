import StateMachine from "./StateMachine";
import State, { OperatorStruct } from "./State";
var SMDB: SM[] = [];
/**
 * 
 * 状态机装饰器
 */
export function mStateMachine<T extends StateMachine>(target: { prototype: T }) {
    if (!SMDB.find(value => { return value.sm == target })) {
        var p = { sm: target, sts: [], stateRelation: [] ,eventsName:[]};
        SMDB.push(p);
        target.prototype.strelation = p.stateRelation;
        target.prototype.LSMDB = p;
    }
}
/**
 * 状态装饰器
 * @param name 状态名
 * @param su 所依附的状态机
 */
export function mState<T extends StateMachine, P extends State>(name: string, su: { new():T }) {
    return (target: { new(ctx:T):P }) => {
        var gsu = SMDB.find(value => { return value.sm == su });
        if (gsu)
            gsu.sts.push({ st: target, name: name });
        else {
            var p = { sm: su, sts: [{ st: target, name: name }], stateRelation: [],eventsName:[]};
            SMDB.push(p);
            su.prototype.strelation = p.stateRelation;
            su.prototype.LSMDB = p;
        }
        target.prototype.stateName=name;
        target.prototype['_su_'] = su;
    }
}
/**
 * 默认状态装饰器
 * 
 */
export function mDefaultState<T extends StateMachine,P extends State>(target:{new(cxt:StateMachine):P})
{
    function initDefault()
    {
        var su:{prototype:T}=target.prototype['_su_'];
        if(su)
        {
            
            if(su.prototype.strelation.find(value=>{return value.eventname==='start'}))
            {
                console.log("DefaultState only one");
                return;
            }
            su.prototype.strelation.push({eventname:'start',source:null,target:target});
        }
    }
    if(!target.prototype['_su_'])
    {
        setTimeout(()=>{initDefault()})
    }
    else
    {
        initDefault()
    }
}
/**
 * 使用或创建一个过渡事件
 * @param targenamet 目标状态名
 * @param eventname 触发事件名
 */
export function mLinkTo<T extends State, P extends StateMachine>(targenamet: string, eventname: string) {
    function initLink(tar: { new(cxt:P):T}) {
        var gsu: SM;
        var su: { prototype: P } = tar.prototype['_su_'];
        if (!su) {
            console.error("su is undefind");
            return;
        }
        if (gsu = SMDB.find(value => { return value.sm == su })) {
            var linkc = gsu.sts.find(value => { return value.name == targenamet });
            if (linkc) {
                gsu.stateRelation.push({ source: tar, target: linkc.st, eventname: eventname });
                if(!gsu.eventsName.find(value=>{return value===eventname}))gsu.eventsName.push(eventname)
            }
        }
    }
    return (target: { new(cxt:P):T }) => {
        if (!target.prototype['_su_']) {
            setTimeout(() => { initLink(target) });
        }
        else {
            initLink(target);
        }
    }
}
export function mSyncFunc<P extends StateMachine>(target:P,methodName:string,descriptor:TypedPropertyDescriptor<any>)
{
    setTimeout(()=>{
        var m = target[methodName]
        target[methodName]=function (){
            var sm = this.nowState[methodName]
            if(sm)sm.apply(this.nowState,arguments)
            m.apply(this,arguments)
        }
    })

}
export function mSyncAttachFunc<P extends StateMachine>(target:P,methodName:string,descriptor:TypedPropertyDescriptor<any>)
{
    setTimeout(()=>{
        var m = target[methodName]
        target[methodName]=function(...arg){
            var op = OperatorStruct.getinstance()
            this.forEachAttach(methodName,op,arg)
            m.apply(this,arg.push(op))
        }
    })
}
