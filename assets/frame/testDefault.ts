import testState from "./testState";
import { mState, mDefaultState, mLinkTo } from "./StateMachine/StateDec";
import testStateMachine from "./testStateMachine";
import EventCenter from "./EventCenter";

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

@ccclass
@mState("default",testStateMachine)
@mLinkTo("run","run")
@mDefaultState
export default class testDefault extends testState{
    Start()
    {
        super.Start()
        console.log("默认启动")
        EventCenter.Instance.node.once('hello',()=>{
            console.log("I'm ok")
        })
        //setTimeout(()=>{this.context.emit("run")},2000)
    }
    hh()
    {
        this.context.emit("run")
    }
}
