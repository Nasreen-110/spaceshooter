import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class LevelManager extends Component {

    properties: {
        levels: {
            default: [],
            type: [Prefab]
        },
        initialLevelIndex: 0,
    }
    currentLevelIndex: any;
    initialLevelIndex: any;
    levels: any;

    onLoad() {
        this.currentLevelIndex = this.initialLevelIndex;
        this.spawnCurrentLevel();
    }

    spawnCurrentLevel() {
        if (this.currentLevelIndex < this.levels.length) {
            const levelPrefab = this.levels[this.currentLevelIndex];
            const levelNode = instantiate(levelPrefab);
            this.node.addChild(levelNode);
        } else {
            console.log("All levels completed!");
        }
    }

    moveToNextLevel() {
        this.currentLevelIndex++;
        this.spawnCurrentLevel();
    }

    levelCompleted() {
       this.moveToNextLevel();
    }
};

