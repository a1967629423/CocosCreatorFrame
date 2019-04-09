import StateMachine from "./StateMachine/StateMachine";
import { mStateMachine, mSyncFunc, mSyncAttachFunc } from "./StateMachine/StateDec";
import State, { OperatorStruct } from "./StateMachine/State";
const {ccclass, property} = cc._decorator;
export interface IOSM
{
    hit(val:OperatorStruct<number>,owner:OperationStateMachine);
    attack(damage:OperatorStruct<number>,owner:OperationStateMachine);
}
@mStateMachine
@ccclass
export default class OperationStateMachine extends StateMachine implements IOSM {

    health:number = 100;
    @mSyncFunc
    @mSyncAttachFunc
    hit(val: OperatorStruct<number>, owner: OperationStateMachine) {
    }

    @mSyncFunc
    @mSyncAttachFunc
    attack(damage: OperatorStruct<number>, owner: OperationStateMachine) {
        
    }

    
}
export class OperationState extends State implements IOSM
{
    attack(damage: OperatorStruct<number>, owner: OperationStateMachine) {
        
    }
    hit(val: OperatorStruct<number>, owner: OperationStateMachine) {
    }    



}
