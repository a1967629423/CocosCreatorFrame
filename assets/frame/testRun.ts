import testState from "./testState";
import { mState, mLinkTo } from "./StateMachine/StateDec";
import testStateMachine from "./testStateMachine";
import EventCenter from "./EventCenter";

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
