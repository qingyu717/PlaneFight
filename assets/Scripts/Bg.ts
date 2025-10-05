import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bg')
export class Bg extends Component {
    @property(Node)
    Bg01: Node = null;
    @property(Node)
    Bg02: Node = null;

    @property
    speed: number = 100;
    start() {

    }

    update(deltaTime: number) {
        let position1 = this.Bg01.position;
        this.Bg01.setPosition(position1.x, position1.y - this.speed * deltaTime, position1.z);
        let position2 = this.Bg02.position;
        this.Bg02.setPosition(position2.x, position2.y - this.speed * deltaTime, position2.z);

        let p1 = this.Bg01.getPosition();
        let p2 = this.Bg02.getPosition();
        if (p1.y < -852) {
            this.Bg01.setPosition(p1.x, p1.y + 852 * 2, p1.z);
        }
        if (p2.y < -852) {
            this.Bg02.setPosition(p2.x, p2.y + 852 * 2, p2.z);
        }
    }
}


