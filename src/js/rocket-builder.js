import { Rocket } from './Rocket.js';

export const getRockets = (response, resources, width, height) => {
    let rockets = [];

    let track = width / response.length;

    response.forEach((e, i) => {
        rockets.push(new Rocket((i + 0.5) * track, height, e.stageOne, e.stageTwo, resources));
    });

    return rockets;
}