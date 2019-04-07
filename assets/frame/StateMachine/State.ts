import StateMachine from "./StateMachine";

export class OperatorStruct
{
    public canOperator:boolean = true;
    public operatorInformation:any = Object.create(null);
    public static cachesOperator:OperatorStruct = null;
    public static getinstance():OperatorStruct
    {
        //角色只有一个，所以只有一个Operator
        let op;
        if(!this.cachesOperator)op = new OperatorStruct();
        else
        {
            op = this.cachesOperator;
            this.cachesOperator = null;
        }
        return op;
    }
    constructor()
    {
        if(!OperatorStruct.cachesOperator)OperatorStruct.cachesOperator = this;
    }
    destroy()
    {
        this.canOperator = true;
        this.operatorInformation = Object.create(null);
        OperatorStruct.cachesOperator = this;
    }
}
export default class State  {
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
    update(dt:number,op:OperatorStruct)
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
