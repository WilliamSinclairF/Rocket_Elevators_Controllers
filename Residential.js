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
    this.createElevators();
  }

  createElevators() {
    let gapPerElevator = this.building.floors / this.elevatorNumber;
    for (let i = 0; i < this.elevatorNumber; i++) {
      this.elevatorList.push(new Elevator(i, i * gapPerElevator + 1, i * gapPerElevator + 1, 0));
    }
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

  requestElevator(requestLocation, requestDirection) {
    if (requestLocation > this.building.floors) return;
    let filteredElevator = this.findNearestElevator(requestDirection, requestLocation);
    let { id, currentFloor } = filteredElevator;
    let actualElevator = this.elevatorList[id];

    if (currentFloor > requestLocation) {
      console.log(
        `Elevator was requested. ${actualElevator.whoAmI(actualElevator.id)} added floor: ${requestLocation}`,
        actualElevator
      );
      actualElevator.downQueue.push(requestLocation);
      actualElevator.sortQueues();
      actualElevator.setDirection();
      actualElevator.requestThisElevator();
      return actualElevator;
    }
    //
    else if (currentFloor < requestLocation) {
      console.log(
        `Elevator was requested. ${actualElevator.whoAmI(actualElevator.id)} added floor: ${requestLocation}`,
        actualElevator
      );
      actualElevator.upQueue.push(requestLocation);
      actualElevator.sortQueues();
      actualElevator.setDirection();
      actualElevator.requestThisElevator();

      return actualElevator;
    }
    //
    else if (currentFloor == requestLocation) {
      console.log(`elevator${id} opening doors`, actualElevator);
      return actualElevator;
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

  whoAmI(id) {
    return `Elevator ${String.fromCharCode(id + 65)}`;
  }

  whereAmIGoing(direction) {
    return `direction: ${direction}`;
  }

  setDirection() {
    if (this.direction === 0) {
      this.upQueue.length > this.downQueue.length ? (this.direction = 1) : (this.direction = -1);
      console.log(`${this.whoAmI(this.id)}'s ${this.whereAmIGoing(this.direction)}`);
      return this.direction;
    } else if (this.direction === 1) {
      if (this.upQueue.length > 0) {
        this.direction = 1;
        console.log(`Changing ${this.whoAmI(this.id)}'s ${this.whereAmIGoing(this.direction)}`);
        return this.direction;
      }
      if (this.upQueue.length === 0) {
        this.downQueue.length > 0 ? (this.direction = -1) : (this.direction = 0);
        console.log(
          `Changing ${this.whoAmI(this.id)}'s ${this.whereAmIGoing(this.direction)} because current queue is empty`
        );
        return this.direction;
      }
    } else if (this.direction === -1) {
      if (this.downQueue.length > 0) {
        this.direction = -1;
        console.log(`Changing ${this.whoAmI(this.id)}'s ${this.whereAmIGoing(this.direction)}`);
        return this.direction;
      }
      if (this.downQueue.length === 0) {
        this.upQueue.length > 0 ? (this.direction = 1) : (this.direction = 0);
        console.log(
          `Changing ${this.whoAmI(this.id)}'s ${this.whereAmIGoing(this.direction)} because current queue is empty`
        );
        return this.direction;
      }
    }
  }

  requestThisElevator() {
    this.setDirection();
    console.log(`${this.whoAmI(this.id)} is at floor ${this.currentFloor}`);
    if (this.direction === 1) {
      this.currentFloor === this.upQueue[0] ? this.upQueue.shift() : this.currentFloor++;
      console.log(`${this.whoAmI(this.id)}'s queue: ${this.upQueue > 0 ? this.upQueue : 'empty'}`);
      console.log(`${this.whoAmI(this.id)} is at floor: ${this.currentFloor}`);
      return this.upQueue.length > 0 ? this.requestThisElevator() : (this.direction = 0);
    } else if (this.direction === -1) {
      this.currentFloor === this.downQueue[0] ? this.downQueue.shift() : this.currentFloor--;
      console.log(`${this.whoAmI(this.id)}'s queue: ${this.downQueue > 0 ? this.downQueue : 'empty'}`);
      console.log(`${this.whoAmI(this.id)} is at floor: ${this.currentFloor}`);
      return this.downQueue.length > 0 ? this.requestThisElevator() : (this.direction = 0);
    }
  }

  requestFloor(floor) {
    if (floor === this.currentFloor) {
      console.log(
        `${this.whoAmI(this.id)}: floor ${floor} was requested, opened its doors as it was already on that floor`
      );
      return;
    } else if (floor > this.currentFloor) {
      console.log(`${this.whoAmI(this.id)}: floor button pressed, added floor ${floor} to queue`);
      this.upQueue.push(floor);
      this.sortQueues();
      this.setDirection();
      this.requestThisElevator();
    } else if (floor < this.currentFloor) {
      console.log(`${this.whoAmI(this.id)}: floor button pressed, added floor ${floor} to queue`);
      this.downQueue.push(floor);
      this.sortQueues();
      this.setDirection();
      this.requestThisElevator();
    }
  }

  sortQueues() {
    this.upQueue = this.upQueue.sort((a, b) => a - b);
    this.downQueue = this.downQueue.sort((a, b) => b - a);
  }
}
//
//
//
//
//Setup for scenarios
//

const Residential = new Controller(new Building(10, 0), 2);

//scenario 1
// console.log(Residential);
// Residential.elevatorList[0].currentFloor = 2;
// Residential.elevatorList[0].direction = 0;
// Residential.elevatorList[1].currentFloor = 6;
// Residential.elevatorList[1].direction = 0;
// Residential.requestElevator(3, 1).requestFloor(7);
// console.log(Residential);

// //scenario 2
// console.log(Residential);
// Residential.elevatorList[0].currentFloor = 10;
// Residential.elevatorList[0].direction = 0;
// Residential.elevatorList[1].currentFloor = 3;
// Residential.elevatorList[1].direction = 0;
// Residential.requestElevator(1, 1).requestFloor(6);
// Residential.requestElevator(3, 1).requestFloor(5);
// Residential.requestElevator(9, -1).requestFloor(2);
// console.log(Residential);

// //scenario 3
// console.log(Residential);
// Residential.elevatorList[0].currentFloor = 10;
// Residential.elevatorList[0].direction = 0;
// Residential.elevatorList[1].currentFloor = 3;
// Residential.elevatorList[1].direction = 1;
// Residential.elevatorList[1].upQueue = [6];
// Residential.requestElevator(3, -1).requestFloor(2);
// Residential.elevatorList[1].currentFloor = 6;
// Residential.elevatorList[1].direction = 0;
// Residential.elevatorList[1].upQueue = [];
// Residential.requestElevator(10, -1).requestFloor(3);
// console.log(Residential);
