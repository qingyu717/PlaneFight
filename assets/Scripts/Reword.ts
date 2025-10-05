import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Reword')
export class Reword extends Component {

    @property
    speed: number = 100;

    collider: Collider2D = null;
    start() {

    }

    protected onLoad(): void {
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.node.destroy();
    }
    update(deltaTime: number) {
        const p = this.node.position;

        this.node.setPosition(p.x, p.y - this.speed * deltaTime, p.z);

        if (p.y < -450) {
            this.node.destroy();
        }
    }

}


