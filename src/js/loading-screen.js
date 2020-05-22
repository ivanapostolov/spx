//Generate loading screen 

export const getLoadingScreen = (width, height) => {
    let loadingScreen = new PIXI.Container();

    let text = new PIXI.Text('Loading...');

    text.anchor.set(0.5);

    text.x = width / 2;
    text.y = height / 2;
 
    text.style = new PIXI.TextStyle({
        fill: 0xEEEEEE,
        fontSize: 30,
        fontFamily: 'Arial',
        fontStyle: 'bold'
    });

    loadingScreen.addChild(text);
    
    return loadingScreen;
}