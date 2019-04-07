import ScenesManage, { ScenesState } from "../ScenesManage";
import { mState, mDefaultState } from "../StateMachine/StateDec";
@mState("Default",ScenesManage)
@mDefaultState
export default class ScenesDefaultState extends ScenesState {
    loadScenes(name:string,time:number,callback:()=>null)
    {
        cc.director.preloadScene(name);
        setTimeout(()=>{
            cc.director.loadScene(name,()=>{if(callback)callback()})
        },time)
    }
}
