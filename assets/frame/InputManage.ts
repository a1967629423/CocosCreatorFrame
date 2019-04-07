import StateMachine from "./StateMachine/StateMachine";
import { mStateMachine, mSyncFunc } from "./StateMachine/StateDec";
import setToFullScene from "../utility/setToFullScene";

export interface IInput
{
    touch(touchEvent:cc.Touch);
    touchStart(touchEvent:cc.Touch);
    touchEnd(touchEvent:cc.Touch);
    touchCancel(touchEvent:cc.Touch);

}
/**
 * 输入管理器
 * 全局输入管理器会生成在Camera下，所以需要保持Camera始终在游戏物体上方
 */
const {ccclass, property} = cc._decorator;
@mStateMachine
@ccclass
export default class InputManage extends StateMachine implements IInput {
    @mSyncFunc
    touchStart(touchEvent: cc.Touch) {
    }
    @mSyncFunc
    touchEnd(touchEvent: cc.Touch) {

    }
    @mSyncFunc
    touchCancel(touchEvent: cc.Touch) {

    }
    @mSyncFunc
    touch(touchEvent: cc.Touch) {
        
    }

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
    static getInstance(tg?:cc.Component):InputManage
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
            var store = this.g_InputManage.find(value=>{return value.Camera==cc.Camera.main});

            if(!store)
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
                ins = store.Manage;
            }
        }
        return ins;
    }
    addInput(inp:IInput)
    {
        this._tar.push(inp);
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
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touch,this);
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this);
        
    }
    onDisable()
    {
        super.onDisable();
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.touch,this);
        this.node.off(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this);
    }
}
