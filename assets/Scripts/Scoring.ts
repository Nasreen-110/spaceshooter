import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Scoring')
export class Scoring extends Component {

    properties: {
        scoreLabel: {
            default: null,
            type: Label
        },
        asteroidPoints: 10,
        coinPoints: 10,
    }
    score: any;
    scoreLabel: any;

    onLoad() {
        this.score = 0;
        this.updateScoreLabel();
    }

    updateScoreLabel() {
        this.scoreLabel.string = "Score: " + this.score;
    }

    addAsteroidPoints() {
        this.score += this.addAsteroidPoints;
        this.updateScoreLabel();
    }

    addCoinPoints() {
        this.score += this.addCoinPoints;
        this.updateScoreLabel();
    }
};
