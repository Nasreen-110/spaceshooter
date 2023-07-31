import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {


    properties: {
        coin: {
            default: null,
            type: Coin
        },
    }
    coin: any;

    spawnCoin(position) {
        const coin = instantiate(this.coin);
        coin.parent = director.getScene();
        coin.setPosition(position);
        this.node.addChild(coin);

        const moveAction = moveBy(3, v2(0, -cc.winSize.height * 1.2)); 
        coin.runAction(moveAction);
    }
};
