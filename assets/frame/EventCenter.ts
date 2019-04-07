
const {ccclass, property} = cc._decorator;
@ccclass
export default class EventCenter extends cc.Component {
    private static Ins:EventCenter = null
    public static get Instance()
    {
        if(!this.Ins)
        {
            var insNode= new cc.Node()
            cc.game.addPersistRootNode(insNode)
            this.Ins = insNode.addComponent(EventCenter)
        }
        return this.Ins
    }

}
