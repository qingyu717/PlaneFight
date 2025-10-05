import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
import { enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property
    enemy0SpawnRate: number = 1;
    @property(Prefab)
    enemy0: Prefab = null;

    @property
    enemy1SpawnRate: number = 4;
    @property(Prefab)
    enemy1: Prefab = null;

    @property
    enemy2SpawnRate: number = 9;
    @property(Prefab)
    enemy2: Prefab = null;

    //奖励类型：
    @property(Prefab)
    reward0Prefab: Prefab = null;
    @property
    reward0SpawnRate: number = 10.5;
    @property(Prefab)
    reward1Prefab: Prefab = null;
    @property
    reward1SpawnRate: number = 25;

    @property
    isPause: boolean = false;

    start() {
        this.schedule(this.enemy0Spawn, this.enemy0SpawnRate);
        this.schedule(this.enemy1Spawn, this.enemy1SpawnRate);
        this.schedule(this.enemy2Spawn, this.enemy2SpawnRate);
        this.schedule(this.reward0Spawn, this.reward0SpawnRate);
        this.schedule(this.reward1Spawn, this.reward1SpawnRate);
    }

    update(dt: number) {
        // if(this.node.position<)
    }

    protected onDestroy(): void {
        this.unschedule(this.enemy0Spawn);
        this.unschedule(this.enemy1Spawn);
        this.unschedule(this.enemy1Spawn);
        this.unschedule(this.reward0Spawn);
        this.unschedule(this.reward1Spawn);
    }
    // enemy0Spawn() {
    //     const x = math.randomRangeInt(-180, 180);
    //     const enemy0 = instantiate(this.enemy0);
    //     this.node.addChild(enemy0);
    //     enemy0.setPosition(x, 480, 0);
    // }
    // enemy1Spawn() {
    //     const x = math.randomRangeInt(-180, 180);
    //     const enemy1 = instantiate(this.enemy1);
    //     this.node.addChild(enemy1);
    //     enemy1.setPosition(x, 480, 0);
    // }
    // enemy2Spawn() {
    //     const x = math.randomRangeInt(-180, 180);
    //     const enemy2 = instantiate(this.enemy2);
    //     this.node.addChild(enemy2);
    //     enemy2.setPosition(x, 480, 0);
    // }
    enemy0Spawn() {
        this.enemySpawn(this.enemy0, -170, 170, 480);
    }
    enemy1Spawn() {
        this.enemySpawn(this.enemy1, -160, 160, 480);
    }
    enemy2Spawn() {
        this.enemySpawn(this.enemy2, -125, 125, 480)
    }

    reward0Spawn() {
        this.enemySpawn(this.reward0Prefab, -180, 180, 480);
    }
    reward1Spawn() {
        this.enemySpawn(this.reward1Prefab, -180, 180, 480);
    }
    enemySpawn(enemyPrefab: Prefab, minX: number, maxX: number, y: number) {
        const x = math.randomRangeInt(minX, maxX);
        const enemy = instantiate(enemyPrefab);
        this.node.addChild(enemy);
        enemy.setPosition(x, y, 0);
    }
}


