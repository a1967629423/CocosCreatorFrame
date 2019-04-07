
export interface IInput
{
    touch()

}
const {ccclass, property} = cc._decorator;

@ccclass
export default class InputManage extends cc.Component {

    @property([cc.Component])
    targets: cc.Component[] = [];
    private _tar:IInput[] = []
    instanceofIInput(a:any):boolean
    {
        if(a['touch'])return true
        return false
    }
    start()
    {
        this.targets.forEach(value=>{
            var inter = <IInput><unknown>value
            if(this.instanceofIInput(value))
            {
                this._tar.push(inter)
            }
            else
            {
                console.warn("对象未实现接口IInput")
                console.warn(value)
            }
        })
        setInterval(()=>{this.touchEvent()},3000)
    }
    touchEvent()
    {
        this._tar.forEach(value=>{
            value.touch()
        })
    }

}
