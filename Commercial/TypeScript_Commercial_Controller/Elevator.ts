import Column from './Column';

export default class Elevator {
    column: Column;
    columnId: number;
    id: number;
    currentFloor: number;
    direction: number;
    distance: number;
    defaultFloor: number;
    upQueue: Array<number>;
    downQueue: Array<number>;

    constructor(column: Column, columnId: number, id: number, currentFloor: number, defaultFloor: number) {
        this.column = column;
        this.columnId = columnId;
        this.id = id;
        this.currentFloor = currentFloor;
        this.direction = 0;
        this.distance = 0;
        this.defaultFloor = defaultFloor;
        this.upQueue = [];
        this.downQueue = [];
    }

    getId(): String {
        return `Elevator ${String.fromCharCode(this.columnId + 65)}${this.id + 1}`;
    }

    directionInfo(): String {
        if (this.direction === 1) return 'Moving up';
        else if (this.direction === -1) return 'Moving down';
        else return 'Stopped';
    }

    statusUpdate(): void {
        console.log(
            `~~~ELEVATOR STATUS~~~
${this.getId()}
Current direction: ${this.directionInfo()}
Floor: ${this.currentFloor}
Queue up: ${this.upQueue}
Queue down: ${this.downQueue}
~~~~~~~~~~~~~~~~~~~~~
`,
        );
    }

    floorReached(): void {
        console.log(`${this.getId()} stopped on floor ${
            this.currentFloor
        } as it was in it's queue and opened it's doors.
        `);
    }

    addToQueue(location: number): void {
        if (location > this.currentFloor) {
            this.upQueue.push(location);
            this.combinedMethods();
        } else if (location < this.currentFloor) {
            this.downQueue.push(location);
            this.combinedMethods();
        }
    }

    combinedMethods(): void {
        this.sortQueues();
        this.setDirection();
        this.requestThisElevator();
    }

    sortQueues(): void {
        this.upQueue.sort();
        this.downQueue.sort().reverse();
    }

    setDirection(): void {
        switch (this.direction) {
            case 0:
                if (this.upQueue.length > this.downQueue.length) {
                    this.direction = 1;
                } else if (this.upQueue.length < this.downQueue.length) {
                    this.direction = -1;
                }
                break;
            case 1:
                if (!this.upQueue.length) {
                    this.direction = this.downQueue.length === 0 ? 0 : -1;
                    this.statusUpdate();
                }
                break;
            case -1:
                if (!this.downQueue.length) {
                    this.direction = this.upQueue.length === 0 ? 0 : 1;
                    this.statusUpdate();
                }
                break;
            default:
                break;
        }
    }
    requestThisElevator(): void {
        this.setDirection();
        this.statusUpdate();
        switch (this.direction) {
            case 1:
                if (this.currentFloor === this.upQueue[0]) {
                    this.upQueue.shift();
                    this.floorReached();
                    this.setDirection();
                } else {
                    this.currentFloor++;
                }
                if (this.upQueue.length > 0) {
                    this.requestThisElevator();
                } else {
                    this.direction = 0;
                }
                break;

            case -1:
                if (this.currentFloor === this.downQueue[0]) {
                    this.downQueue.shift();
                    this.floorReached();
                    this.setDirection();
                } else {
                    this.currentFloor--;
                }
                if (this.downQueue.length > 0) {
                    this.requestThisElevator();
                } else {
                    this.direction = 0;
                }
                break;
            default:
                break;
        }
    }

    requestFloor(floor: number): void {
        if (floor === this.currentFloor) {
            console.log(
                `Floor ${floor} - request answered by ${this.id}, elevator opened it's doors as it was already there `,
            );
        } else {
            console.log(`${this.getId()}, floor request button pressed. Added floor ${floor} to queue.
            `);
            this.addToQueue(floor);
        }
    }
}
