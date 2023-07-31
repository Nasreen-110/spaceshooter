import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText, v2 } from 'cc';
const { ccclass, property } = _decorator;
import { AudioSource } from "cc";
import { TouchInput } from './TouchInput';

@ccclass('Player')
export class Player extends Component {

    properties: {
        swipeThreshold: 50,
        movementSpeed: 200, 
        shootInterval: 0.5, 
        bulletPrefab: {
            default: null,
            type: MouseEvent
        },
        shootingAudio: {
            default: null,
            type: AudioSource
        }
    }
    touchStartPos: any;
    touchEndPos: any;
    isSwiping: boolean;
    canShoot: boolean;
    swipeThreshold: any;
    movementSpeed: any;


    onLoad() {
        this.touchStartPos = v2(0, 0);
        this.touchEndPos = v2(0, 0);
        this.isSwiping = false;
        this.canShoot = true;

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event) {
        this.touchStartPos = event.getLocation();
        this.touchEndPos = this.touchStartPos;
        this.isSwiping = false;
    }

    onTouchMove(event) {
        this.touchEndPos = event.getLocation();
        const distance = this.touchEndPos.sub(this.touchStartPos).mag();
        this.isSwiping = distance > this.swipeThreshold;

        if (this.isSwiping) {
            const swipeDirection = this.touchEndPos.sub(this.touchStartPos).normalize();

            this.node.x += swipeDirection.x * this.movementSpeed * director.getDeltaTime();
            this.node.y += swipeDirection.y * this.movementSpeed * director.getDeltaTime();
        }
    }

    onTouchEnd(event) {
        if (!this.isSwiping) {
            if (this.canShoot) {
                this.shoot();
            }
        }
    }

    shoot() {
      
        const bullet= instantiate();
        bullet.instantiate(this.bulletPrefab);
        bullet.setPosition(this.node.position);
        this.node.parent.addChild(bullet);

        if (this.shootingAudio) {
            audioEngine.playEffect(this.shootingAudio, false);
        }

        this.canShoot = false;
        this.scheduleOnce(() => {
            this.canShoot = true;
        }, this.shootInterval);
    }
};
