import { loadStage } from './stage.js';

export const getSuccessScreen = (width, height, stage) => {
    //REPLAY button properties
    const btnHeight = 60, btnWidth = 120;

    //Success text
    let text = new PIXI.Text('Success');
    text.anchor.set(0.5);

    text.x = width / 2;
    text.y = height / 3;

    text.style = new PIXI.TextStyle({
        fill: 0xEEEEEE,
        fontSize: 30,
        fontFamily: 'Arial',
        fontStyle: 'bold'
    });

    //Replay button
    let btn = new PIXI.Graphics();
    btn.beginFill(0xFFD54F);
    btn.drawRect(0, 0, btnWidth, btnHeight);

    btn.pivot.x = btnWidth / 2;
    btn.x = width / 2;
    btn.y = height / 3 * 2;

    btn.buttonMode = true;
    btn.interactive = true;
    btn.buttonMode = true;

    btn.on('pointerdown', () => {
        stage.destroy({children: true, texture: true, baseTexture: false});
        loadStage();
    });

    //Replay button text
    let btnText = new PIXI.Text('REPLAY');
    btnText.anchor.set(0.5);

    btnText.x = btnWidth / 2;
    btnText.y = btnHeight / 2;

    btnText.style = new PIXI.TextStyle({
        fill: 0xEEEEEE,
        fontSize: 15,
        fontFamily: 'Arial',
        fontStyle: 'bold'
    });

    btn.addChild(btnText);

    //Screen container
    let successScreen = new PIXI.Container();

    successScreen.addChild(text, btn);

    return successScreen;
}