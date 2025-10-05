import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('BombUI')
export class BombUI extends Component {

    // @property(Label)
    // bombCount: Label = null;

    // start() {
    //     GameManager.getInstance().node.on("onBombAdd", this.onBombAdd,this);
    // }

    // onBombAdd() {

    //     this.bombCount.string = GameManager.getInstance().getBombCount().toString();
    // }
    // update(deltaTime: number) {

    // }

    @property(Label)
    countLabel: Label = null;

    addCount(cnt: number) {
        this.countLabel.string = cnt.toString();
    }
    protected start(): void {

    }
    protected update(dt: number): void {

    }
}


