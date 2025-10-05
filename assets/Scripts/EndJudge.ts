import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EndJudge')
export class EndJudge extends Component {
    start() {

    }

    update(deltaTime: number) {
        if (this.node.getChildByName("Player") == null) {
            this.scheduleOnce(() => {
                director.loadScene("03-GameOver");
            }, 3);

        }
    }
}


