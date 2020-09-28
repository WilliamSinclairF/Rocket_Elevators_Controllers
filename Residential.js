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
  assignNearestToRequest(requestLocation, requestDirection) {
    if (requestLocation > this.building.floors) return;
    let filteredElevator = this.findNearestElevator(requestDirection, requestLocation);
    let { id, currentFloor } = filteredElevator;
    let actualElevator = this.elevatorList[id];

    if (currentFloor > requestLocation) {
      console.log(`elevator${id} added floor: ${requestLocation}`, actualElevator);
      actualElevator.downQueue.push(requestLocation);
      actualElevator.sortQueues();
    }
    //
    else if (currentFloor < requestLocation) {
      console.log(`elevator${id} added floor: ${requestLocation}`, actualElevator);
      actualElevator.upQueue.push(requestLocation);
      actualElevator.sortQueues();
    }
    //
    else if (currentFloor == requestLocation) {
      console.log(`elevator${id} opening doors`, actualElevator);
    }
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
  setDirection() {
    console.log(`elevator${this.id}'s current direction:${this.direction}`);
    if (this.direction === 0) {
      this.upQueue.length > this.downQueue.length ? (this.direction = 1) : (this.direction = -1);
      console.log(`changing elevator${this.id}'s direction to ${this.direction}`);
    } else if (this.direction === 1) {
      if (this.upQueue.length > 0) {
        this.direction = 1;
        console.log(`changing elevator${this.id}'s direction to ${this.direction}`);
      }
      if (this.upQueue.length === 0) {
        this.downQueue.length > 0 ? (this.direction = -1) : (this.direction = 0);
        console.log(`changing elevator${this.id}'s direction to ${this.direction} because current queue is empty`);
      }
    } else if (this.direction === -1) {
      if (this.downQueue.length > 0) {
        this.direction = -1;
        console.log(`changing elevator${this.id}'s direction to ${this.direction}`);
      }
      if (this.downQueue.length === 0) {
        this.upQueue.length > 0 ? (this.direction = 1) : (this.direction = 0);
        console.log(`changing elevator${this.id}'s direction to ${this.direction} because current queue is empty`);
      }
    }
    if (this.downQueue.length === 0 && this.upQueue.length === 0) {
      this.direction = 0;
      console.log(
        `elevator${this.id} is now idle as it has run out of tasks. It is currently on floor ${this.currentFloor}`
      );
    }
  }
  requestElevator() {
    console.log(`elevator${this.id} at floor ${this.currentFloor}`);
    if (this.direction === 1) {
      this.currentFloor === this.upQueue[0] ? this.upQueue.shift() : this.currentFloor++;
      console.log(`elevator${this.id}'s queue: ${this.upQueue}`);
      console.log(`elevator${this.id} at floor ${this.currentFloor}`);
      return this.upQueue.length > 0 ? this.requestElevator() : false;
    } else if (this.direction === -1) {
      this.currentFloor === this.downQueue[0] ? this.downQueue.shift() : this.currentFloor--;
      console.log(`elevator${this.id}'s queue: ${this.downQueue}`);
      console.log(`elevator${this.id} at floor ${this.currentFloor}`);
      return this.downQueue.length > 0 ? this.requestElevator() : false;
    }
  }
  requestFloor(floor) {
    if (floor > this.currentFloor) {
      if (floor === this.currentFloor) {
        console.log(`floor ${floor} was requested, we opened our doors as we are already on that floor`);
        return;
      } else {
        this.upQueue.push(floor);
        this.sortQueues();
        this.setDirection();
        this.requestElevator();
        console.log(`floor request button pressed: elevator${this.id} added floor ${floor} to queue`);
      }
    } else if (floor < this.currentFloor) {
      if (floor === this.currentFloor) {
        console.log(`floor ${floor} was requested, we opened our doors as we are already on that floor`);
        return;
      } else {
        this.downQueue.push(floor);
        this.sortQueues();
        this.setDirection();
        this.requestElevator();
        console.log(`floor request button pressed: elevator${this.id} added floor ${floor} to queue`);
      }
    }
  }
  sortQueues() {
    this.upQueue = this.upQueue.sort((a, b) => a - b);
    this.downQueue = this.downQueue.sort((a, b) => b - a);
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
let rez = new Controller(new Building(10, 0), 2);

console.log(rez);
rez.assignNearestToRequest(8, -1);
rez.assignNearestToRequest(6, -1);
rez.assignNearestToRequest(1, 1);
rez.assignNearestToRequest(2, 1);
rez.assignNearestToRequest(3, 1);
rez.assignNearestToRequest(9, -1);
rez.assignNearestToRequest(7, -1);

rez.elevatorList[0].setDirection();
rez.elevatorList[0].requestElevator();
rez.elevatorList[0].requestFloor(2);
rez.elevatorList[0].requestFloor(3);
rez.elevatorList[0].requestFloor(4);
rez.elevatorList[0].requestFloor(8);
rez.elevatorList[0].requestFloor(5);
rez.elevatorList[0].requestFloor(4);

rez.elevatorList[1].setDirection();
rez.elevatorList[1].requestElevator();

rez.elevatorList[0].setDirection();
rez.elevatorList[1].setDirection();
