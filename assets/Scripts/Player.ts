import { _decorator, Animation, CCString, Collider2D, Component, Contact2DType, director, EventTouch, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { Reword } from './Reword';
import { LiveCountUI } from './UIs/LiveCountUI';
const { ccclass, property } = _decorator;

enum ShootType {
    NoneShoot,
    OneShoot,
    TwoShoot
}

@ccclass('Player')
export class Player extends Component {

    @property
    liveCount: number = 3;

    @property //子弹发射间隔时间（发射速率）
    shootRate: number = 0.35;

    //子弹类型1：单发
    @property(Prefab)
    bullet1Prefab: Prefab = null;
    //子弹类型2：双发
    @property(Prefab)
    bullet2Prefab: Prefab = null;

    @property(Node)
    bulletParent: Node = null;

    //子弹1发射位置
    @property(Node)
    bullet1Position: Node = null;
    @property(Node)
    bullet2Position: Node = null;
    @property(Node)
    bullet3Position: Node = null;

    @property(Animation)
    anim: Animation = null;
    //动画类型
    @property(CCString)
    animHit: string = "";
    @property(CCString)
    animDown: string = "";
    //子弹发射类型
    @property
    shootType: ShootType = ShootType.OneShoot;

    //无敌时间：
    @property
    invicibleTime: number = 1;
    @property
    invicibleTimer: number = 0;
    isInvicible: boolean = false;

    towShootTimer: number = 0;
    towShootContinue: number = 5;
    //子弹发射计时器
    shootTimer: number = 0.5;

    collider: Collider2D = null;

    lastReword: Reword = null;

    start() {
        GameManager.getInstance().ChangeLiveCount(this.liveCount);
    }

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }


    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        //判断触碰到了什么：
        //敌人：
        if (otherCollider.node.name == "Enemy0" || otherCollider.node.name == "Enemy1" || otherCollider.node.name == "Enemy2") {
            if (this.isInvicible) {
                return;
            }
            this.isInvicible = true;
            this.liveCount -= 1;
            GameManager.getInstance().ChangeLiveCount(this.liveCount);
            if (this.liveCount > 0) {
                this.anim.play(this.animHit);
            } else {
                this.anim.play(this.animDown);
                this.anim.on(Animation.EventType.FINISHED, () => {
                    this.node.destroy();
                }, this);
            }
            // if (this.liveCount <= 0) {
            //     this.node.destroy();
            // }
        }
        if (otherCollider.node.name == "Reword0") {
            this.shootType = ShootType.TwoShoot;
        }
        if (otherCollider.node.name == "Reword1") {
            if (this.lastReword == otherCollider.getComponent(Reword)) {
                return;
            }
            this.lastReword = otherCollider.getComponent(Reword);
            GameManager.getInstance().AddBomb();
        }

    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    protected onTouchMove(event: EventTouch): void {
        if (GameManager.getInstance().isPause) return;

        const p = this.node.position;

        const targetPosition = new Vec3(p.x + event.getDeltaX(), p.y + event.getDeltaY(), p.z);

        if (targetPosition.x > 210) {
            targetPosition.x = 210;
        }
        if (targetPosition.x < -210) {
            targetPosition.x = -210;
        }
        if (targetPosition.y > 400) {
            targetPosition.y = 400;
        }
        if (targetPosition.y < -360) {
            targetPosition.y = -360;
        }
        this.node.setPosition(targetPosition);
    }
    protected update(dt: number): void {

        // if (this.liveCount <= 0) {
        //     //************************* */
        //     this.scheduleOnce(() => {
        //         this.anim.play(this.animDown);
        //     }, 3);
        //     // this.node.destroy();
        //     // return;
        // }

        if (this.liveCount <= 0) {
            return;
        }
        switch (this.shootType) {
            case ShootType.OneShoot:
                this.OneShoot(dt);
                break;
            case ShootType.TwoShoot:
                this.towShootTimer += dt;
                this.shootRate = 0.2;
                if (this.towShootTimer >= this.towShootContinue) {
                    this.towShootTimer = 0;
                    this.shootRate = 0.35;
                    this.shootType = ShootType.OneShoot;
                }
                this.TwoShoot(dt);
                break;
        }
        if (this.isInvicible) {
            this.invicibleTimer += dt;
            if (this.invicibleTimer >= this.invicibleTime) {
                this.isInvicible = false;
                this.invicibleTimer = 0;
            }
        }

    }
    OneShoot(dt: number) {
        this.shootTimer += dt;

        if (this.shootRate <= this.shootTimer) {
            this.shootTimer = 0;
            const bullet1 = instantiate(this.bullet1Prefab);
            this.bulletParent.addChild(bullet1);
            bullet1.setWorldPosition(this.bullet1Position.worldPosition);

        }
    }
    TwoShoot(dt: number) {
        this.shootTimer += dt;
        if (this.shootRate <= this.shootTimer) {
            this.shootTimer = 0;

            const bullet2 = instantiate(this.bullet2Prefab);
            const bullet3 = instantiate(this.bullet2Prefab);
            this.bulletParent.addChild(bullet2);
            this.bulletParent.addChild(bullet3);
            bullet2.setWorldPosition(this.bullet2Position.worldPosition);
            bullet3.setWorldPosition(this.bullet3Position.worldPosition);
        }
    }
}


