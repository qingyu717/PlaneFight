import { _decorator, Component, director, Node } from 'cc';
import { BombUI } from './UIs/BombUI';
import { ScoreUI } from './UIs/ScoreUI';
import { LiveCountUI } from './UIs/LiveCountUI';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(BombUI)
    bombUI: BombUI = null;

    @property(ScoreUI)
    scoreUI: ScoreUI = null;

    @property(LiveCountUI)
    liveCountUI: LiveCountUI = null;

    @property
    private bombCount: number = 0;

    @property
    private score: number = 0;

    @property(Node)
    pauseBotton: Node = null;
    @property(Node)
    resumeBotton: Node = null;

    // @property
    // private liveCount: number = 0;
    @property
    isPause: boolean = false;

    private static instance: GameManager;
    public static getInstance(): GameManager {
        if (!this.instance) {
            this.instance = new GameManager();
        }
        return this.instance;
    }


    public getBombCount(): number {
        return this.bombCount;
    }
    protected onLoad(): void {
        GameManager.instance = this;
    }
    start() {
        this.resumeBotton.active = false;
    }

    update(deltaTime: number) {

    }

    public AddBomb() {
        this.bombCount++;
        // this.node.emit("onBombAdd");
        this.bombUI.addCount(this.bombCount);
    }

    public AddScore(s: number) {
        this.score += s;
        this.scoreUI.addScore(this.score);
    }

    public ChangeLiveCount(cnt: number) {
        this.liveCountUI.updateUI(cnt);
    }


    onPauseButtonClick() {
        director.pause();
        this.isPause = true;
        this.pauseBotton.active = false;
        this.resumeBotton.active = true;
    }
    onResumeButtonClick() {
        director.resume();
        this.isPause = false;
        this.pauseBotton.active = true;
        this.resumeBotton.active = false;
    }
}


