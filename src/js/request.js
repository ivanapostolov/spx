async function request() {
    const url = 'https://api.spacexdata.com/v2/rockets';
    
    const data = await fetch(url);

    return await data.json();
}

export async function sendRequest() {
    let response = await request();

    return new Promise((resolve, reject) => {
        try {
            let extract = [];

            response.forEach((element) => {
                extract.push({
                    stageOne: element.first_stage.fuel_amount_tons,
                    stageTwo: element.second_stage.fuel_amount_tons
                });
            });

            resolve(extract);
        } catch (e) {
            reject({ message: 'Error occurred while processing server response' });
        }
    });
}
