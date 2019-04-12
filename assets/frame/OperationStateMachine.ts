import { MSMDsc } from "./StateMachine/StateDec";
import { MSM } from "./StateMachine/StateMachine";

const {ccclass, property} = cc._decorator;
const {mStateMachine,mSyncAttachFunc,mSyncFunc} = MSMDsc
const {StateMachine,State,OperatorStruct}=MSM;
export interface IOSM
{
    hit(val:MSM.OperatorStruct<number>,owner:OperationStateMachine);
    attack(damage:MSM.OperatorStruct<number>,owner:OperationStateMachine);
}
@mStateMachine
@ccclass
export default class OperationStateMachine extends StateMachine implements IOSM {

    health:number = 100;
    @mSyncFunc
    @mSyncAttachFunc
    hit(val: MSM.OperatorStruct<number>, owner: OperationStateMachine) {
    }

    @mSyncFunc
    @mSyncAttachFunc
    attack(damage: MSM.OperatorStruct<number>, owner: OperationStateMachine) {
        
    }

    
}
export class OperationState extends State implements IOSM
{
    attack(damage: MSM.OperatorStruct<number>, owner: OperationStateMachine) {
        
    }
    hit(val: MSM.OperatorStruct<number>, owner: OperationStateMachine) {
    }    



}
