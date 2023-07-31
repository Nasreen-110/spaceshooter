import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Asteroid')
export class Asteroid extends Component {

    properties: {
        asteroid: {
            default: null,
            type: Node
        }
        spawnInterval: 2; 
        asteroidSpeed: 100; 
        asteroidSpeedIncrement: 10; 
    }
    spawnInterval: number;
    asteroid: any;
    asteroidSpeed: any;
    asteroidSpeedIncrement: any;

    onLoad() {
        this.schedule(this.spawnAsteroid, this.spawnInterval);
    }

    spawnAsteroid() {
        const asteroid = instantiate(this.asteroid);
        const randomX = randomMinus1To1() * winSize.width * 0.5; 
        const posY = winSize.height * 1.2; 
        asteroid.setPosition(v2(randomX, posY));
        this.node.addChild(asteroid);

        const moveAction = moveBy (3, v2(0, -posY * 1.5)); 
        asteroid.runAction(moveAction);
    }

    increaseAsteroidSpeed() {
        this.asteroidSpeed += this.asteroidSpeedIncrement;
    }
};
