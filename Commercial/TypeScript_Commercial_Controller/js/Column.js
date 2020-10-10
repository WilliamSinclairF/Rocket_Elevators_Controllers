"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Elevator_1 = require("./Elevator");
var Column = /** @class */ (function () {
    function Column(id, elevatorNumber, minFloor, maxFloor) {
        this.id = id;
        this.elevatorNumber = elevatorNumber;
        this.elevatorList = [];
        this.minFloor = minFloor;
        this.maxFloor = maxFloor;
        this.createElevators();
    }
    // makes elevators based on the elevator number passed to the constructor
    Column.prototype.createElevators = function () {
        for (var i = 0; i < this.elevatorNumber; i++) {
            var gapPerElevator = Math.floor(1 + (((this.maxFloor - this.minFloor) / this.elevatorNumber) * i - 1));
            var defaultFloor = this.minFloor + gapPerElevator;
            this.elevatorList.push(new Elevator_1.default(this, this.id, i, defaultFloor, defaultFloor));
        }
    };
    // returns elevators going in the same direction if there are any, returns idle otherwise
    Column.prototype.findElevatorsByDirection = function (elevatorDirection, requestLocation) {
        var idle = __spreadArrays(this.elevatorList).filter(function (e) { return e.direction == 0; });
        if (elevatorDirection === 1) {
            var movingUp = __spreadArrays(this.elevatorList).filter(function (e) { return e.direction === elevatorDirection && e.currentFloor <= requestLocation; });
            if (movingUp.length > 0) {
                console.log('Found elevators moving up');
                return movingUp;
            }
        }
        else if (elevatorDirection === -1) {
            var movingDown = __spreadArrays(this.elevatorList).filter(function (e) { return e.direction == elevatorDirection && e.currentFloor >= requestLocation; });
            if (movingDown.length > 0) {
                console.log('Found elevators moving down');
                return movingDown;
            }
        }
        console.log('Only idle elevators were found');
        return idle;
    };
    // compares the distance of each elevator and returns the nearest one using the array provided by the previous method
    Column.prototype.findNearestElevator = function (elevatorDirection, requestLocation) {
        return this.findElevatorsByDirection(elevatorDirection, requestLocation)
            .map(function (e) {
            e.distance = Math.abs(e.currentFloor - requestLocation);
            return e;
        })
            .reduce(function (a, b) { return (a.distance < b.distance ? a : b); });
    };
    // calls the previous elevator-finding related methods and sends the selected elevator on it's way
    Column.prototype.requestElevator = function (requestLocation, requestDirection) {
        var id = this.findNearestElevator(requestDirection, requestLocation).id;
        this.elevatorList[id].addToQueue(requestLocation);
        return this.elevatorList[id];
    };
    return Column;
}());
exports.default = Column;
//# sourceMappingURL=Column.js.map