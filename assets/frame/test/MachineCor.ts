import InputManage from "../InputManage";
import { AwaitNext, AwaitNextSecond } from "../StateMachine/StateMachine";

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

@ccclass
export default class MachineCor extends cc.Component {
    start () {
        if(CC_DEBUG)
        {
            console.log('start');
            InputManage.getInstance().startCoroutine_Auto((function*():Iterator<AwaitNext>{
                for(var i=0;i<10;i++)
                {
                    yield new AwaitNextSecond(1);
                    console.log(i);
                }
                
            })())
        }
    }

    // update (dt) {}
}
