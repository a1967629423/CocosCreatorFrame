import StateMachine from "./StateMachine/StateMachine";
import { mStateMachine, mSyncFunc } from "./StateMachine/StateDec";
import setToFullScene from "../utility/setToFullScene";

export interface IInput
{
    touch()

}
const {ccclass, property} = cc._decorator;
@mStateMachine
@ccclass
export default class InputManage extends StateMachine {

    @property([cc.Component])
    targets: cc.Component[] = [];
    static g_InputManage:{Camera:cc.Camera,Manage:InputManage}[] = [];
    /**
     * 0=local
     * 1=global
     */
    exState:number = 0;
    _tar:IInput[] = [];
    private instanceofIInput(a:any):boolean
    {
        if(a['touch'])return true
        return false
    }
    static getInstance(tg:cc.Component = null):InputManage
    {
        var ins:InputManage = null;
        if(tg)
        {
            ins = tg.getComponent(InputManage);
            if(!ins)
            {
                ins = tg.addComponent(InputManage);
                ins.exState = 0;
            }
        }
        else
        {
            if(!this.g_InputManage)
            {
                cc.Camera.cameras.forEach(value=>{
                    var newNode = new cc.Node("inputManage");
                    ins = newNode.addComponent(InputManage);
                    newNode.addComponent(setToFullScene);
                    newNode.setParent(value.node);
                    ins.exState = 1;
                    this.g_InputManage.push({Camera:value,Manage:ins});
                })
            }
            else
            {
                ins = this.g_InputManage.find(value=>{return value.Camera==cc.Camera.main}).Manage;
            }
        }
        return ins;
    }
    start()
    {
        super.start();
        this.targets.forEach(value=>{
            var inter = <IInput><unknown>value
            if(this.instanceofIInput(value))
            {
                this._tar.push(inter)
            }
            else
            {
                console.warn("对象未实现接口IInput")
                console.warn(value)
            }
        })
        this.node.on(cc.Node.EventType.TOUCH_START,(t)=>{this.touchEvent(t)},this);
        
    }
    @mSyncFunc
    touchEvent(localtion:cc.Vec2)
    {
        if(this.exState==1)
        {
        }
    }

}
