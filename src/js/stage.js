import { getLoadingScreen } from './loading-screen.js';
import { getSuccessScreen } from './success-screen.js';
import { sendRequest } from './request.js';
import { getRockets } from './rocket-builder.js';
import { updateStage } from './update-loop.js';

export const loadStage = () => {
    document.getElementById("stage").innerHTML = '';

    //Set up the stage
    let app = new PIXI.Application({
        height: document.getElementById("stage").offsetHeight,
        width: document.getElementById("stage").offsetWidth,
        transparent: true
    });
    
    //Prepare resources
    app.loader.baseUrl = '../assets/';
    
    app.loader
        .add('rocket_top', 'rocket_top.png')
        .add('rocket_bottom', 'rocket_bottom.png')
        .add('thrust', 'thrust.png');

    document.getElementById('stage').appendChild(app.view);

    //Show initial loading screen
    let loading = getLoadingScreen(app.view.width, app.view.height);

    app.stage.addChild(loading);

    //Execute after resource loading is completed
    app.loader.onComplete.add((e) => {
        sendRequest().then((res) => {
            let rockets = getRockets(res, app.loader.resources, app.view.width, app.view.height);

            //Hide initial loading screen
            loading.visible = false;

            rockets.forEach((e) => {
                app.stage.addChild(e.layout);
            });

            app.ticker.add((delta) => {
                updateStage(app.stage, rockets, delta);

                //Execute when all the rockets are run out of fuel
                if(rockets.length === 0) {
                    //Show Success screen with REPLAY button
                    app.stage.addChild(getSuccessScreen(app.view.width, app.view.height, app.stage));
                    //Stop animation loop
                    app.ticker.stop();
                }
            });
        }, (err) => {
            console.log(err);
        });
    });

    //Handle loading error
    app.loader.onError.add((err) => {
        console.log(err);
    });

    app.loader.load();
}