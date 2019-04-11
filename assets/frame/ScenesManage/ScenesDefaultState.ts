import ScenesManage, { ScenesState } from "../ScenesManage";
import { mState, mDefaultState } from "../StateMachine/StateDec";
@mState("Default",ScenesManage)
@mDefaultState
export default class ScenesDefaultState extends ScenesState {
    loadScenes(name:string,time:number,callback:()=>void)
    {
        cc.director.preloadScene(name);
        setTimeout(()=>{
            cc.director.loadScene(name,()=>{if(callback)callback()})
        },time)
    }
    ctx:ScenesManage
    get context():ScenesManage
    {
        return this.ctx;
    }
    set context(val)
    {
        this.ctx = val;
    }
}
