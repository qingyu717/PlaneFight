import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreUI')
export class ScoreUI extends Component {

    @property(Label)
    ScoreLabel: Label = null;
    start() {

    }

    update(deltaTime: number) {

    }

    addScore(score: number) {
        this.ScoreLabel.string = score.toString();
    }
}


