import StateMachine from "./StateMachine/StateMachine";
import { mStateMachine, mState } from "./StateMachine/StateDec";
import State from "./StateMachine/State";

export interface IAnimationStateMachine
{

}

const {ccclass, property} = cc._decorator;
@mStateMachine
@ccclass
export default class AnimationStateMachine extends StateMachine implements IAnimationStateMachine {


    start () {

    }

    // update (dt) {}
}
export class AnimationState extends State implements IAnimationStateMachine
{

}