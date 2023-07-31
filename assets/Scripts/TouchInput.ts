import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TouchInput')
export class TouchInput extends Component {

    properties: {
        player: {
            default: null,
            type:Node
        },
        swipeThreshold: 50, 
    }
touchStartPos: math.Vec2;
touchEndPos: math.Vec2;
isSwiping: boolean;
swipeThreshold: any;
player: any;
onTouchEnd: Function;

    onLoad() {
        this.touchStartPos = v2(0, 0);
        this.touchEndPos = v2(0, 0);
        this.isSwiping = false;

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
        const distance = this.touchEndPos.sub(this.touchStartPos);
        this.isSwiping = distance > this.swipeThreshold;

        if (this.isSwiping) {
            const swipeDirection = this.touchEndPos.sub(this.touchStartPos);
            const movementSpeed = 10;

            this.player.x += (swipeDirection.x * movementSpeed);
            this.player.y += (swipeDirection.y * movementSpeed);
        }
    }

};
