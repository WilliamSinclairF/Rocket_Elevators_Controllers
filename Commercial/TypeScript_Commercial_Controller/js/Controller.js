"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Battery_1 = require("./Battery");
var Building_1 = require("./Building");
var com = new Battery_1.default(new Building_1.default(66, 6), 4, 20);
//SCENARIO SETTINGS ARE BELOW, KEEP SCROLLING DOWN TO FIND THE FUNCTIONS TO UNCOMMENT
//SCENARIO 1
com.Scenario1 = function () {
    com.columnList[1].elevatorList[0].currentFloor = 20;
    com.columnList[1].elevatorList[1].currentFloor = 3;
    com.columnList[1].elevatorList[2].currentFloor = 13;
    com.columnList[1].elevatorList[3].currentFloor = 15;
    com.columnList[1].elevatorList[4].currentFloor = 6;
    com.columnList[1].elevatorList[0].addToQueue(5);
    com.columnList[1].elevatorList[1].addToQueue(15);
    com.columnList[1].elevatorList[2].addToQueue(0);
    com.columnList[1].elevatorList[3].addToQueue(2);
    com.columnList[1].elevatorList[4].addToQueue(0);
    com.columnList[1].requestElevator(0, 1).requestFloor(20);
};
//SCENARIO 2
com.Scenario2 = function () {
    com.columnList[2].elevatorList[0].currentFloor = 0;
    com.columnList[2].elevatorList[1].currentFloor = 23;
    com.columnList[2].elevatorList[2].currentFloor = 33;
    com.columnList[2].elevatorList[3].currentFloor = 40;
    com.columnList[2].elevatorList[4].currentFloor = 39;
    com.columnList[2].elevatorList[0].upQueue = [21];
    com.columnList[2].elevatorList[0].direction = 1;
    com.columnList[2].elevatorList[1].addToQueue(28);
    com.columnList[2].elevatorList[2].addToQueue(0);
    com.columnList[2].elevatorList[3].addToQueue(24);
    com.columnList[2].elevatorList[4].addToQueue(0);
    com.columnList[2].requestElevator(0, 1).requestFloor(36);
};
//SCENARIO 3
com.Scenario3 = function () {
    com.columnList[3].elevatorList[0].currentFloor = 58;
    com.columnList[3].elevatorList[1].currentFloor = 50;
    com.columnList[3].elevatorList[2].currentFloor = 46;
    com.columnList[3].elevatorList[3].currentFloor = 0;
    com.columnList[3].elevatorList[4].currentFloor = 60;
    com.columnList[3].elevatorList[0].downQueue = [0];
    com.columnList[3].elevatorList[0].direction = -1;
    com.columnList[3].requestElevator(54, -1).requestFloor(0);
    com.columnList[3].elevatorList[4].addToQueue(0);
    com.columnList[3].elevatorList[1].addToQueue(60);
    com.columnList[3].elevatorList[2].addToQueue(58);
    com.columnList[3].elevatorList[3].addToQueue(54);
};
//SCENARIO 4
com.Scenario4 = function () {
    com.columnList[0].elevatorList[0].currentFloor = -4;
    com.columnList[0].elevatorList[0].direction = 0;
    com.columnList[0].elevatorList[1].currentFloor = 0;
    com.columnList[0].elevatorList[1].direction = 0;
    com.columnList[0].elevatorList[2].currentFloor = -3;
    com.columnList[0].elevatorList[3].currentFloor = -6;
    com.columnList[0].elevatorList[4].currentFloor = -1;
    com.columnList[0].elevatorList[3].upQueue = [0];
    com.columnList[0].elevatorList[3].direction = 1;
    com.columnList[0].requestElevator(-3, 1).requestFloor(0);
    com.columnList[0].elevatorList[2].addToQueue(5);
    com.columnList[0].elevatorList[3].addToQueue(0);
    com.columnList[0].elevatorList[4].addToQueue(-6);
};
com.Scenario1();
// com.Scenario2();
// com.Scenario3();
// com.Scenario4();
//# sourceMappingURL=Controller.js.map