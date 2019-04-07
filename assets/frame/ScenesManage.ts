import StateMachine from "./StateMachine/StateMachine";
import State from "./StateMachine/State";
import { mSyncFunc, mStateMachine } from "./StateMachine/StateDec";
const {ccclass, property} = cc._decorator;
export interface IScenesManage
{
    loadScenes(scenesName:string,time:number,callback?:()=>null);
}
@mStateMachine
@ccclass
export default class ScenesManage extends StateMachine implements IScenesManage {
    @mSyncFunc
    loadScenes(scenesName: string, time: number, callback: () => null) {
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private static _instance:ScenesManage = null;
    public static get Instance():ScenesManage
    {
        if(!this._instance)
        {
            var node = new cc.Node("ScenesManange");
            this._instance = node.addComponent(ScenesManage);
            cc.game.addPersistRootNode(node);
        }
        return this._instance;
    }
    start () {
        super.start();
    }

    // update (dt) {}
}
export class  ScenesState extends State implements IScenesManage
{
    loadScenes(scenesName: string, time: number, callback: () => null) {

    }
    get context():ScenesManage
    {
        return <ScenesManage>super.context;
    }
    set context(ctx:ScenesManage)
    {
        super.context = ctx;
    }

}
