import  { MSM } from "./StateMachine/StateMachine";
import {  MSMDsc } from "./StateMachine/StateDec";


export interface IAnimationStateMachine
{

}

const {ccclass, property} = cc._decorator;
const { mStateMachine, mState }=MSMDsc
const {StateMachine,State} = MSM
@mStateMachine
@ccclass
@cc._decorator.requireComponent(dragonBones.ArmatureDisplay)
export default class AnimationStateMachine extends StateMachine implements IAnimationStateMachine {


    start () {
        
    }

    // update (dt) {}
}
export class AnimationState extends State implements IAnimationStateMachine
{

}