import InputState from "./InputState";
import { mState, mDefaultState } from "../StateMachine/StateDec";
import InputManage from "../InputManage";
@mState("default",InputManage)
@mDefaultState
export default class InputDefaultState extends InputState {
    Start()
    {
        console.log("default");
    }
    touchEvent()
    {
        console.log("touch"+this.context.name);
    }
}
