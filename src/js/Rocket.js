//Fuel bar properties
const barHeight = 5;
const barMargin = 5;
const barColor = 0x64DD17;

export class Rocket {
    //x, y - coordinates of rocket's central bottom point (thrust not included)
    //resources - texture from rocket's assets

    constructor(x, y, stageOne, stageTwo, resources) {
        //Rocket
        this.top = PIXI.Sprite.from(resources.rocket_top.texture);
        this.top.position.set(0, barHeight + barMargin);

        this.bottom = PIXI.Sprite.from(resources.rocket_bottom.texture);
        this.bottom.position.set(0, this.top.height + barHeight + barMargin);

        //Thrust
        this.thrust = PIXI.Sprite.from(resources.thrust.texture);
        this.thrust.position.set(this.bottom.width / 2, (this.top.height + this.bottom.height + barHeight + barMargin));
        this.thrust.anchor.set(0.5, 0);

        //Fuel
        this.fuel = new PIXI.Graphics();
        this.fuel.beginFill(barColor);
        this.fuel.drawRect(0, 0, this.top.width, barHeight);

        //Container
        this.layout = new PIXI.Container();
        this.layout.position.set(x - this.bottom.width / 2, y - this.top.height - this.bottom.height - barHeight - barMargin);

        this.layout.addChild(this.fuel, this.top, this.bottom, this.thrust);

        this.secondStage = stageTwo;

        //Total fuel amount
        this.fuelAmount = stageOne + stageTwo;

        //Fuel consumption ratio
        this.ratio = this.top.width / (stageOne + stageTwo) / 60;

        //Required speed for the rocket to disappear right after colliding with the top of stage
        this.speed = (y - this.top.height - this.bottom.height - barHeight - barMargin) / (stageOne + stageTwo) / 60;
    }

    updateLayout(delta) {
        if(this.fuelAmount > this.secondStage && this.fuelAmount - (1 / 60 * delta) < this.secondStage) {
            this.thrust.y -= this.bottom.height;
            this.layout.removeChild(this.bottom);
        }
    }
}