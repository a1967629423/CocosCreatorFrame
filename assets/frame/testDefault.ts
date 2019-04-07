import testState from "./testState";
import { mState, mDefaultState, mLinkTo } from "./StateMachine/StateDec";
import testStateMachine from "./testStateMachine";
import EventCenter from "./EventCenter";
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
