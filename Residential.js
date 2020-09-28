// classes
class Building {
  constructor(floors, basements) {
    this.floors = floors;
    this.basements = basements;
  }
}
//
//
class Controller {
  constructor(building, elevatorNumber) {
    this.building = building;
    this.elevatorNumber = elevatorNumber;
    this.elevatorList = [];
    this.requestList = [new ElevatorRequest(1, 1), new ElevatorRequest(-1, 5), new ElevatorRequest(-1, 8)];
    this.createElevators();
  }
  createElevators() {
    let gapPerElevator = this.building.floors / this.elevatorNumber;
    for (let i = 0; i < this.elevatorNumber; i++) {
      this.elevatorList.push(new Elevator(i, i * gapPerElevator + 1, i * gapPerElevator + 1, 0));
    }
  }
  createElevatorRequest(direction, location) {
    this.requestList.push(new ElevatorRequest(direction, location));
  }
  findElevatorsByDirection(elevatorDirection) {
    let elevatorsWithSameDirection = [...this.elevatorList].filter((el) => el.direction === elevatorDirection);
    let idleElevators = [...this.elevatorList].filter((el) => el.direction === 0);
    return elevatorsWithSameDirection.length > 0 ? elevatorsWithSameDirection : idleElevators;
  }
  findNearestElevator(elevatorDirection, requestLocation) {
    let elevators = this.findElevatorsByDirection(elevatorDirection);
    elevators.forEach((elevator) => (elevator.distanceScore = Math.abs(requestLocation - elevator.currentFloor)));
    return elevators.reduce((prev, curr) => (prev.distanceScore < curr.distanceScore ? prev : curr));
  }
}
//
//
class Elevator {
  constructor(id, currentFloor, defaultFloor, direction) {
    this.id = id;
    this.currentFloor = currentFloor;
    this.defaultFloor = defaultFloor;
    this.direction = direction;
    this.distanceScore = 0;
    this.upQueue = [];
    this.downQueue = [];
  }
}
//
//
class ElevatorRequest {
  constructor(direction, location) {
    this.reqDirection = direction;
    this.reqLocation = location;
  }
}
//
//
//Setup
//
//
const rez = new Controller(new Building(10, 0), 2);

console.log(rez);
console.log(rez.findNearestElevator(1, 5));
