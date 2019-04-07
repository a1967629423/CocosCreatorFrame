import testState from "./testState";
import { mState, mLinkTo } from "./StateMachine/StateDec";
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
@mState("run",testStateMachine)
@mLinkTo("default",'stop')
export default class testRun extends testState {
    Start()
    {
        super.Start()
        console.log("run is begin")
        EventCenter.Instance.node.once('hello',()=>{
            console.log("have fun")
        })
        //setTimeout(()=>{this.context.emit("stop")},2000)
    }
    hh()
    {
        this.context.emit("stop")
    }

    // update (dt) {}
}
