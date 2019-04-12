import { MSM } from "./StateMachine/StateMachine";
import { MSMDsc } from "./StateMachine/StateDec";

const {ccclass, property} = cc._decorator;
const {mStateMachine,mSyncFunc}=MSMDsc;
const {StateMachine,State}=MSM;
export interface IScenesManage
{
    loadScenes(scenesName:string,time:number,callback?:()=>void);
}
@mStateMachine
@ccclass
export default class ScenesManage extends StateMachine implements IScenesManage {
    @mSyncFunc
    loadScenes(scenesName: string, time: number, callback: () => void) {
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
    loadScenes(scenesName: string, time: number, callback: () => void) {

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
