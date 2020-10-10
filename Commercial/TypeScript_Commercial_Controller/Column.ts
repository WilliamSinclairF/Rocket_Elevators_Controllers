import Elevator from './Elevator';

export default class Column {
    id: number;
    elevatorNumber: number;
    elevatorList: Array<Elevator>;
    minFloor: number;
    maxFloor: number;

    constructor(id: number, elevatorNumber: number, minFloor: number, maxFloor: number) {
        this.id = id;
        this.elevatorNumber = elevatorNumber;
        this.elevatorList = [];
        this.minFloor = minFloor;
        this.maxFloor = maxFloor;
        this.createElevators();
    }

    // makes elevators based on the elevator number passed to the constructor

    createElevators(): void {
        for (let i = 0; i < this.elevatorNumber; i++) {
            let gapPerElevator = Math.floor(1 + (((this.maxFloor - this.minFloor) / this.elevatorNumber) * i - 1));
            let defaultFloor = this.minFloor + gapPerElevator;
            this.elevatorList.push(new Elevator(this, this.id, i, defaultFloor, defaultFloor));
        }
    }

    // returns elevators going in the same direction if there are any, returns idle otherwise

    findElevatorsByDirection(elevatorDirection: number, requestLocation: number): Array<Elevator> {
        let idle = [...this.elevatorList].filter((e) => e.direction == 0);

        if (elevatorDirection === 1) {
            let movingUp = [...this.elevatorList].filter(
                (e) => e.direction === elevatorDirection && e.currentFloor <= requestLocation,
            );

            if (movingUp.length > 0) {
                console.log('Found elevators moving up');
                return movingUp;
            }
        } else if (elevatorDirection === -1) {
            let movingDown = [...this.elevatorList].filter(
                (e) => e.direction == elevatorDirection && e.currentFloor >= requestLocation,
            );
            if (movingDown.length > 0) {
                console.log('Found elevators moving down');
                return movingDown;
            }
        }
        console.log('Only idle elevators were found');
        return idle;
    }

    // compares the distance of each elevator and returns the nearest one using the array provided by the previous method

    findNearestElevator(elevatorDirection: number, requestLocation: number): Elevator {
        return this.findElevatorsByDirection(elevatorDirection, requestLocation)
            .map((e) => {
                e.distance = Math.abs(e.currentFloor - requestLocation);
                return e;
            })
            .reduce((a, b) => (a.distance < b.distance ? a : b));
    }

    // calls the previous elevator-finding related methods and sends the selected elevator on it's way

    requestElevator(requestLocation: number, requestDirection: number) {
        let { id } = this.findNearestElevator(requestDirection, requestLocation);
        this.elevatorList[id].addToQueue(requestLocation);
        return this.elevatorList[id];
    }
}
