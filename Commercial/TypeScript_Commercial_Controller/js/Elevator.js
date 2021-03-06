"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Elevator = /** @class */ (function () {
    function Elevator(column, columnId, id, currentFloor, defaultFloor) {
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
    // because everyone likes a good console log
    Elevator.prototype.getId = function () {
        return "Elevator " + String.fromCharCode(this.columnId + 65) + (this.id + 1);
    };
    Elevator.prototype.directionInfo = function () {
        if (this.direction === 1)
            return 'Moving up';
        else if (this.direction === -1)
            return 'Moving down';
        else
            return 'Stopped';
    };
    Elevator.prototype.statusUpdate = function () {
        console.log("~~~ELEVATOR STATUS~~~\n" + this.getId() + "\nCurrent direction: " + this.directionInfo() + "\nFloor: " + this.currentFloor + "\nQueue up: " + this.upQueue + "\nQueue down: " + this.downQueue + "\n~~~~~~~~~~~~~~~~~~~~~\n");
    };
    Elevator.prototype.floorReached = function () {
        console.log(this.getId() + " stopped on floor " + this.currentFloor + " as it was in it's queue and opened it's doors.\n        ");
    };
    // adds requested location to the right queue
    Elevator.prototype.addToQueue = function (location) {
        if (location > this.currentFloor) {
            this.upQueue.push(location);
            this.combinedMethods();
        }
        else if (location < this.currentFloor) {
            this.downQueue.push(location);
            this.combinedMethods();
        }
    };
    // keep things clean by putting methods in methods
    Elevator.prototype.combinedMethods = function () {
        this.sortQueues();
        this.setDirection();
        this.requestThisElevator();
    };
    // this method does what it says it does - order is reversed when going down
    Elevator.prototype.sortQueues = function () {
        this.upQueue.sort();
        this.downQueue.sort().reverse();
    };
    // if elevator is idle, this sets the direction of the elevator based on the length of up and down queues. otherwise, puts elevator in idle when its done.
    Elevator.prototype.setDirection = function () {
        switch (this.direction) {
            case 0:
                if (this.upQueue.length > this.downQueue.length) {
                    this.direction = 1;
                }
                else if (this.upQueue.length < this.downQueue.length) {
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
    };
    // moves the elevator until it reaches a requested stop. method keeps calling itself until it reaches a floor in its queue.
    Elevator.prototype.requestThisElevator = function () {
        this.setDirection();
        this.statusUpdate();
        switch (this.direction) {
            case 1:
                if (this.currentFloor === this.upQueue[0]) {
                    this.upQueue.shift();
                    this.floorReached();
                    this.setDirection();
                }
                else {
                    this.currentFloor++;
                }
                if (this.upQueue.length > 0) {
                    this.requestThisElevator();
                }
                else {
                    this.direction = 0;
                }
                break;
            case -1:
                if (this.currentFloor === this.downQueue[0]) {
                    this.downQueue.shift();
                    this.floorReached();
                    this.setDirection();
                }
                else {
                    this.currentFloor--;
                }
                if (this.downQueue.length > 0) {
                    this.requestThisElevator();
                }
                else {
                    this.direction = 0;
                }
                break;
            default:
                break;
        }
    };
    // handles floor requests given to the elevator when a button within the elevator is pushed.
    Elevator.prototype.requestFloor = function (floor) {
        if (floor === this.currentFloor) {
            console.log("Floor " + floor + " - request answered by " + this.id + ", elevator opened it's doors as it was already there ");
        }
        else {
            console.log(this.getId() + ", floor request button pressed. Added floor " + floor + " to queue.\n            ");
            this.addToQueue(floor);
        }
    };
    return Elevator;
}());
exports.default = Elevator;
//# sourceMappingURL=Elevator.js.map