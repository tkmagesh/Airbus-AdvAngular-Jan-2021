let endPoints : { [key: string]: string } = {}

export function registerEndPoint(customEndPointName? : string){
    return function(klass : Function){ /* class decorator */
        const endPoint : string = customEndPointName || klass.name.toLowerCase();
        endPoints[endPoint] = `http://serverApi.com/${endPoint}`;
    }
}

export default endPoints;