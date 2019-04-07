import StateMachine from "./StateMachine/StateMachine";
import { mStateMachine, mSyncFunc } from "./StateMachine/StateDec";
import EventCenter from "./EventCenter";
import { IInput } from "./InputManage";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
@mStateMachine
@ccclass
export default class testStateMachine extends StateMachine implements IInput {
    touch() {
        console.log("touch")
    }
    start()
    {
        super.start()
        setInterval(()=>{this.hh()},2000)
        
    }
    @mSyncFunc
    hh()
    {
        EventCenter.Instance.node.emit("hello")
    }
}
