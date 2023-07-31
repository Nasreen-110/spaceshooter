import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollisionDetection')
export class CollisionDetection extends Component {

    properties: {
        player: {
            default: null,
            type: Node
        },
        asteroidGroup: {
            default: null,
            type: Node
        },
        coinGroup: {
            default: null,
            type: Node
        },
        scoreLabel: {
            default: null,
            type: Label
        },
        gameOverPrefab: {
            default: null,
            type: Node
        },
        playerExplosionAudio: {
            default: null,
            type: AudioClip
        },
        coinPickupAudio: {
            default: null,
            type: AudioClip
        },
    }

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;

        this.score = 0;
    }

    onCollisionEnter(other, self) {
        if (self.node === this.player && other.node.group === "asteroid") {
            this.gameOver();
        }

        if (self.node === this.player && other.node.group === "coin") {
            this.collectCoin(other.node);
        }
    }

    gameOver() {
        if (this.playerExplosionAudio) {
            audioEngine.playEffect(this.playerExplosionAudio, false);
        }

        const gameOverPanel = cc.instantiate(this.gameOverPrefab);
        this.node.addChild(gameOverPanel);

        this.player.getComponent("Player").enabled = false;
        this.asteroidGroup.getComponent("Asteroid").enabled = false;
        this.coinGroup.getComponent("Coin").enabled = false;
    }

    collectCoin(coinNode) {
        if (this.coinPickupAudio) {
            cc.audioEngine.playEffect(this.coinPickupAudio, false);
        }


        this.score += 10;
        this.scoreLabel.string = "Score: " + this.score;

        coinNode.destroy();
    }
};
