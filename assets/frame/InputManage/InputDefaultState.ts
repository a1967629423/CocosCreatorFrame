import InputState from "./InputState";
import { mState, mDefaultState } from "../StateMachine/StateDec";
import InputManage from "../InputManage";
@mState("default",InputManage)
@mDefaultState
export default class InputDefaultState extends InputState {
    Start()
    {
        if(CC_DEBUG)
        console.log("default");
    }
    touch(touchEvent:cc.Touch)
    {
        if(CC_DEBUG)
        console.log("touch"+this.context.name);
        this.context._tar.forEach(value=>{
            value.touch(touchEvent);
        })
    }
    touchStart(touchEvent:cc.Touch)
    {
        if(CC_DEBUG)
        console.log("touchStart"+this.context.name);
        this.context._tar.forEach(value=>{
            value.touchStart(touchEvent);
        })
    }
    touchCancel(touchEvent:cc.Touch)
    {
        if(CC_DEBUG)
        console.log("touchCancel"+this.context.name);
        this.context._tar.forEach(value=>{
            value.touchCancel(touchEvent);
        })
    }
    touchEnd(touchEvent:cc.Touch)
    {
        if(CC_DEBUG)
        console.log("touchEnd"+this.context.name);
        this.context._tar.forEach(value=>{
            value.touchEnd(touchEvent);
        })
    }
}
