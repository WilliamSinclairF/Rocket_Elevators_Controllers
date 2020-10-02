class Building {
  constructor(floors, basements) {
    this.floors = floors;
    this.basements = basements;
  }
}

class Controller {
  constructor(building, elevatorNumber) {
    this.building = building;
    this.elevatorNumber = elevatorNumber;
    this.elevatorList = [];
    this.createElevators();
  }

  // makes elevator objects and adds them to the elevator list

  createElevators() {
    let gapPerElevator = this.building.floors / this.elevatorNumber;
    for (let i = 0; i < this.elevatorNumber; i++) {
      this.elevatorList.push(new Elevator(i, i * gapPerElevator + 1, i * gapPerElevator + 1, 0));
    }
  }

  // finds moving elevators that are going in the same direction or idle elevators if there aren't any moving ones

  findElevatorsByDirection(elevatorDirection) {
    return [...this.elevatorList].filter((el) => el.direction === elevatorDirection).length > 0
      ? [...this.elevatorList].filter((el) => el.direction === elevatorDirection)
      : [...this.elevatorList].filter((el) => el.direction === 0);
  }

  findNearestElevator(elevatorDirection, requestLocation) {
    this.findElevatorsByDirection(elevatorDirection).forEach(
      (elevator) => (elevator.distanceScore = Math.abs(requestLocation - elevator.currentFloor))
    );
    return this.findElevatorsByDirection(elevatorDirection).reduce((prev, curr) =>
      prev.distanceScore < curr.distanceScore ? prev : curr
    );
  }

  // handles finding the nearest elevator and sending it to answer the call

  requestElevator(requestLocation, requestDirection) {
    if (requestLocation > this.building.floors) return;
    let { id } = this.findNearestElevator(requestDirection, requestLocation);
    let selectedElevator = this.elevatorList[id];

    console.log(
      `Elevator was requested. ${selectedElevator.whoAmI()} added floor: ${requestLocation}`,
      selectedElevator
    );
    selectedElevator.addToQueue(requestLocation);

    return selectedElevator;
  }
}

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

  //grouping frequently used functions together to make things easier to read
  addToQueue(location) {
    location > this.currentFloor ? this.upQueue.push(location) : this.downQueue.push(location);
    this.sortQueues();
    this.setDirection();
    this.requestThisElevator();
    return this;
  }

  whoAmI() {
    return `Elevator ${String.fromCharCode(this.id + 65)}`;
  }
  directionStatus() {
    if (this.direction == 0) {
      return 'Idle';
    } else {
      return this.direction === 1 ? 'Moving up' : 'Moving down';
    }
  }

  directionUpdate() {
    console.log(
      `Elevator ${String.fromCharCode(this.id + 65)}:
Direction: ${this.directionStatus()}
Current floor: ${this.currentFloor}
Up queue: ${this.upQueue}
Down queue: ${this.downQueue}
`
    );
  }

  // decides the direction the elevator should take

  setDirection() {
    this.directionUpdate();
    switch (this.direction) {
      case 0:
        this.upQueue.length > this.downQueue.length ? (this.direction = 1) : (this.direction = -1);
        break;

      case 1:
        this.upQueue.length > 0
          ? (this.direction = 1)
          : () => {
              this.downQueue.length > 0 ? (this.direction = -1) : (this.direction = 0);
            };
        break;

      case -1:
        this.downQueue.length > 0
          ? (this.direction = -1)
          : () => {
              this.upQueue.length > 0 ? (this.direction = 1) : (this.direction = 0);
            };
        break;

      default:
        break;
    }
    return this.direction;
  }

  // goes through all requests until up and down queues are empty

  requestThisElevator() {
    this.setDirection();
    switch (this.direction) {
      case 1:
        this.currentFloor === this.upQueue[0] ? this.upQueue.shift() : this.currentFloor++;
        return this.upQueue.length > 0 ? this.requestThisElevator() : (this.direction = 0);

      case -1:
        this.currentFloor === this.downQueue[0] ? this.downQueue.shift() : this.currentFloor--;
        return this.downQueue.length > 0 ? this.requestThisElevator() : (this.direction = 0);

      default:
        break;
    }
  }

  // handles floor requests from within the elevator

  requestFloor(floor) {
    if (floor === this.currentFloor) {
      console.log(
        `${this.whoAmI(this.id)}: Floor ${floor} was requested, doors opened as it was already on that floor`
      );
      return;
    } else {
      console.log(`${this.whoAmI(this.id)}: Floor button pressed, added floor ${floor} to queue`);
      this.addToQueue(floor);
      this.directionUpdate();
    }
  }

  sortQueues() {
    this.upQueue = this.upQueue.sort((a, b) => a - b);
    this.downQueue = this.downQueue.sort((a, b) => b - a);
  }
}
//

const Residential = new Controller(new Building(10, 0), 2);

//INFO

// elevatorList[0] = Elevator A
// elevatorList[1] = Elevator B

// direction = 0 = IDLE
// direction = 1 = UP
// direction = -1 = DOWN

//requestElevator: Method that finds and sends the nearest elevator to the request location.
//requestFloor: Method that runs when someone presses a floor request button inside an elevator.

//scenario 1
Residential.Scenario1 = () => {
  //Setup Before
  //Elevator A is Idle at floor 2
  Residential.elevatorList[0].currentFloor = 2;
  Residential.elevatorList[0].direction = 0;
  //Elevator B is Idle at floor 6
  Residential.elevatorList[1].currentFloor = 6;
  Residential.elevatorList[1].direction = 0;
  console.table(Residential.elevatorList);
  //Someone is on floor 3 and wants to go to the 7th floor
  //Elevator A is expected to be sent.
  Residential.requestElevator(3, 1).requestFloor(7);
  //Setup After
  console.table(Residential.elevatorList);
};

//scenario 2
Residential.Scenario2 = () => {
  //Setup Before
  //Elevator A is Idle at floor 10
  Residential.elevatorList[0].currentFloor = 10;
  Residential.elevatorList[0].direction = 0;
  //Elevator B is idle at floor 3
  Residential.elevatorList[1].currentFloor = 3;
  Residential.elevatorList[1].direction = 0;
  console.table(Residential.elevatorList);
  //Someone is on the 1st floor and requests the 6th floor.
  //Elevator B should be sent.
  Residential.requestElevator(1, 1).requestFloor(6);
  // 2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator B should be sent.
  Residential.requestElevator(3, 1).requestFloor(5);
  //Finally, a third person is at floor 9 and wants to go down to the 2nd floor.
  //Elevator A should be sent.
  Residential.requestElevator(9, -1).requestFloor(2);
  //Setup After
  console.table(Residential.elevatorList);
};

//scenario 3
Residential.Scenario3 = () => {
  //Setup Before
  // Elevator A is Idle at floor 10
  Residential.elevatorList[0].currentFloor = 10;
  Residential.elevatorList[0].direction = 0;
  // Elevator B is Moving from floor 3 to floor 6
  Residential.elevatorList[1].currentFloor = 3;
  Residential.elevatorList[1].direction = 1;
  Residential.elevatorList[1].upQueue = [6];
  console.table(Residential.elevatorList);
  // Someone is on floor 3 and requests the 2nd floor.
  // Elevator A should be sent.
  Residential.requestElevator(3, -1).requestFloor(2);
  Residential.elevatorList[1].currentFloor = 6;
  Residential.elevatorList[1].direction = 0;
  Residential.elevatorList[1].upQueue = [];
  // 5 minutes later, someone else is on the 10th floor and wants to go to the 3rd. Elevator B should be sent.
  Residential.requestElevator(10, -1).requestFloor(3);
  // Setup After
  console.table(Residential.elevatorList);
};

//// Uncomment to run:

// Residential.Scenario1();
// Residential.Scenario2();
// Residential.Scenario3();
