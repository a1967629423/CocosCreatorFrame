import State from "../StateMachine/State";
import InputManage, { IInput } from "../InputManage";

export default class InputState extends State implements IInput {
    touchStart(touchEvent: cc.Touch) {
    }
    touchEnd(touchEvent: cc.Touch) {
    }
    touchCancel(touchEvent: cc.Touch) {
    }
    touch(touchEvent: cc.Touch) {
    }
    ctx:InputManage
    get context():InputManage
    {
        return <InputManage>this.ctx
    }
    set context(value)
    {
        this.ctx  = value;
    }
}
