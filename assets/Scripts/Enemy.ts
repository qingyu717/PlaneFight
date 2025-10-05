import { _decorator, Animation, animation, CCString, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('enemy')
export class enemy extends Component {

    @property
    speed: number = 300;

    @property(Animation)
    anim: Animation = null;

    @property
    hp: number = 1;

    @property
    score: number = 10;

    //动画类型
    @property(CCString)
    animHit: string = "";
    @property(CCString)
    animDown: string = "";

    collider: Collider2D = null;
    start() {
        // this.anim.play();
        //注册碰撞体回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(dt: number) {
        if (this.hp > 0) {
            const p = this.node.position;
            this.node.setPosition(p.x, p.y - this.speed * dt, p.z);
        }

        if (this.node.position.y < -450) {
            this.node.destroy();
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.hp -= 1;
        //判断碰撞目标为子弹则销毁
        if (otherCollider.node.name == "Bullet1" || otherCollider.node.name == "Bullet2") {
            console.log(otherCollider.node.name);
            otherCollider.node.destroy();
        }

        if (this.hp > 0) {
            this.anim.play(this.animHit);
        } else {
            this.anim.play(this.animDown);
        }
        // this.anim.play();
        if (this.hp <= 0) {
            GameManager.getInstance().AddScore(this.score);
            if (this.collider) {
                this.collider.enabled = false;
            }
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 1);
        }

    }

    protected onDestroy(): void {
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
}


