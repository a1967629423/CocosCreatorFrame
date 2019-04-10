import StateMachine from "./StateMachine";
import ObjectPool, { IObpool } from "../ObjectPool/ObjectPool";

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
export default class State   {
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
