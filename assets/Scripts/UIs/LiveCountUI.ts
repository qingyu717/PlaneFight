import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LiveCountUI')
export class LiveCountUI extends Component {

    @property
    liveCount: number = 3;

    @property(Label)
    liveCountLabel: Label = null;
    start() {

    }

    updateUI(cnt: number) {
        this.liveCountLabel.string = cnt.toString();
    }
}


