import { IPSM, IInput } from "../InputManage";


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
const {InputManage}=IPSM
@ccclass
export default class InputManageTest extends cc.Component implements IInput {
    touchStart(touchEvent: cc.Touch) {
    }
    touchEnd(touchEvent: cc.Touch) {
    }
    touchCancel(touchEvent: cc.Touch) {
    }
    touch(touchEvent:cc.Touch) {
        console.log(touchEvent.getLocation());
    }

    start () {
        if(CC_DEBUG)
        {
            InputManage.getInstance().addInput(this)
            var play = this.getComponent(dragonBones.ArmatureDisplay);
        }  
    }

    // update (dt) {}
}
