const frequency = 0.04;
let pulsation = 1;

export const updateStage = (stage, rockets, delta) => {
    pulsation < 0.5 ? pulsation = 1 : pulsation -= frequency;

    for (let i = 0; i < rockets.length; i++) {
        rockets[i].thrust.alpha = pulsation;

        rockets[i].updateLayout(delta);

        //Change fuel bar
        rockets[i].fuel.width -= rockets[i].ratio * delta;

        //Change fuel amount
        rockets[i].fuelAmount -= 1 / 60 * delta;

        //Move to the top
        rockets[i].layout.y -= rockets[i].speed * delta;

        //Execute when the fuel is over
        if (rockets[i].fuelAmount <= 0) {
            //Remove from stage
            stage.removeChild(rockets[i].layout);
            //Remove from array
            rockets.splice(i, 1);
        }
    }
}