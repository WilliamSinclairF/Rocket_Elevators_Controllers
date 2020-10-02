const floors = [
  {
    floor: 1,
    upButton: true,
    downButton: false,
  },
  {
    floor: 2,
    upButton: true,
    downButton: true,
  },
  {
    floor: 3,
    upButton: true,
    downButton: true,
  },
  {
    floor: 4,
    upButton: true,
    downButton: true,
  },
  {
    floor: 5,
    upButton: true,
    downButton: true,
  },
  {
    floor: 6,
    upButton: true,
    downButton: true,
  },
  {
    floor: 7,
    upButton: true,
    downButton: true,
  },
  {
    floor: 8,
    upButton: true,
    downButton: true,
  },
  {
    floor: 9,
    upButton: true,
    downButton: true,
  },
  {
    floor: 10,
    upButton: false,
    downButton: true,
  },
];

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

  //sets the color of the floor divs based on the elevator's location
  elevatorPosition() {
    document.querySelectorAll('.floor').forEach((el) => (el.style.backgroundColor = 'Gainsboro'));
    document.getElementById(`${this.elevatorList[0].currentFloor}`).style.backgroundColor = 'Crimson';
    document.getElementById(`${this.elevatorList[1].currentFloor}`).style.backgroundColor = 'DodgerBlue';
  }
  //creates elevator objects and pushes them to the elevator array
  createElevators() {
    let gapPerElevator = this.building.floors / this.elevatorNumber;
    for (let i = 0; i < this.elevatorNumber; i++) {
      this.elevatorList.push(new Elevator(this, i, i * gapPerElevator + 1, i * gapPerElevator + 1, 0));
    }
  }

  // returns an array of elevators going in the requested direction or the idle elevators if none are moving

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
  // finds the nearest elevator based on the request location and sends it
  requestElevator(requestLocation, requestDirection) {
    if (requestLocation > this.building.floors) return;
    let filteredElevator = this.findNearestElevator(requestDirection, requestLocation);
    let { id, currentFloor } = filteredElevator;
    let actualElevator = this.elevatorList[id];

    if (currentFloor > requestLocation) {
      actualElevator.statusMessage.textContent = `Elevator was requested. ${actualElevator.whoAmI()} now on floor: ${requestLocation}`;

      actualElevator.downQueue.push(requestLocation);
      actualElevator.sortQueues();
      actualElevator.setDirection();
      actualElevator.requestThisElevator();
    } else if (currentFloor < requestLocation) {
      actualElevator.statusMessage.textContent = `Elevator was requested. ${actualElevator.whoAmI()} now on floor: ${requestLocation}`;

      actualElevator.upQueue.push(requestLocation);
      actualElevator.sortQueues();
      actualElevator.setDirection();
      actualElevator.requestThisElevator();
    } else if (currentFloor === requestLocation) {
      actualElevator.statusMessage.textContent = `${actualElevator.whoAmI()}: Arrived on floor ${requestLocation}`;
    }
    return actualElevator;
  }
}

class Elevator {
  constructor(controller, id, currentFloor, defaultFloor, direction) {
    this.controller = controller;
    this.id = id;
    this.currentFloor = currentFloor;
    this.defaultFloor = defaultFloor;
    this.direction = direction;
    this.distanceScore = 0;
    this.upQueue = [];
    this.downQueue = [];
    this.statusMessage = document.getElementById('statusmessage');
  }

  // converts the numeric elevator ID to a nice human friendly letter like A or B
  whoAmI() {
    return `Elevator ${String.fromCharCode(this.id + 65)}`;
  }
  directionStatus() {
    if (this.direction == 0) {
      return 'idle';
    } else {
      return this.direction === 1 ? 'moving up' : 'moving down';
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

  //if the elevator was idle, uses this to pick which queue to attack first

  setDirection() {
    this.controller.elevatorPosition();
    if (this.direction === 0) {
      this.upQueue.length > this.downQueue.length ? (this.direction = 1) : (this.direction = -1);
      return this.direction;
    } else if (this.direction === 1) {
      this.upQueue.length > 0
        ? () => {
            this.direction = 1;
            return this.direction;
          }
        : () => {
            this.downQueue.length > 0 ? (this.direction = -1) : (this.direction = 0);
            return this.direction;
          };
    } else if (this.direction === -1) {
      this.downQueue.length > 0
        ? () => {
            this.direction = -1;
            return this.direction;
          }
        : () => {
            this.upQueue.length > 0 ? (this.direction = 1) : (this.direction = 0);
            return this.direction;
          };
    }
    this.directionUpdate();
  }

  //sends the elevator to the location of the request and keeps calling the method until there's no other tasks to do

  requestThisElevator() {
    this.controller.elevatorPosition();
    this.setDirection();
    if (this.direction === 1) {
      this.currentFloor === this.upQueue[0] ? this.upQueue.shift() : this.currentFloor++;
      this.controller.elevatorPosition();
      this.directionUpdate();
      return this.upQueue.length > 0 ? this.requestThisElevator() : (this.direction = 0);
    } else if (this.direction === -1) {
      this.currentFloor === this.downQueue[0] ? this.downQueue.shift() : this.currentFloor--;
      this.controller.elevatorPosition();
      this.directionUpdate();
      return this.downQueue.length > 0 ? this.requestThisElevator() : (this.direction = 0);
    }
  }

  // handles floor request button requests inside each elevator

  requestFloor(floor) {
    this.controller.elevatorPosition();
    if (floor === this.currentFloor) {
      this.statusMessage.textContent = `${this.whoAmI(
        this.id
      )}: Floor ${floor} was requested, opened its doors as it was already on that floor`;
      return;
    } else if (floor > this.currentFloor) {
      this.upQueue.push(floor);
      this.sortQueues();
      this.setDirection();
      this.requestThisElevator();
      this.controller.elevatorPosition();
      this.statusMessage.textContent = `${this.whoAmI(this.id)}: Floor button pressed, added floor ${floor} to queue`;
    } else if (floor < this.currentFloor) {
      this.downQueue.push(floor);
      this.sortQueues();
      this.setDirection();
      this.requestThisElevator();
      this.controller.elevatorPosition();
      this.statusMessage.textContent = `${this.whoAmI(this.id)}: Floor button pressed, added floor ${floor} to queue`;
    }
    this.directionUpdate();
  }

  sortQueues() {
    this.controller.elevatorPosition();
    this.upQueue = this.upQueue.sort((a, b) => a - b);
    this.downQueue = this.downQueue.sort((a, b) => b - a);
  }
}

class View {
  constructor(controller, floornumber, basements) {
    this.controller = new Controller(new Building(floornumber, basements), 2);
    this.elevatorNumber = controller.elevatorNumber;
    this.floorList = floors.reverse();
    this.elevatorContainer = document.getElementById('elevators');
    this.floorContainer = document.getElementById('floors');
    this.lastRequestedElevator = controller.elevatorList[0];
    this.showElevatorRequestButtons();
    this.showFloorRequestButtons();
    this.floorButtonEventListener();
    this.floorRequestEventListener();
    this.controller.elevatorPosition();
    this.toggleFloorRequest();
  }

  toggleFloorRequest() {
    let elevator1 = document.getElementById('container0');
    let elevator2 = document.getElementById('container1');
    switch (this.lastRequestedElevator.id) {
      case 0:
        elevator2.classList.add('hidden');
        elevator1.classList.remove('hidden');
        break;
      case 1:
        elevator1.classList.add('hidden');
        elevator2.classList.remove('hidden');
        break;
      default:
        break;
    }
  }

  //a convenience method to type less when making HTML elements
  make(el) {
    return document.createElement(el);
  }
  //a convenience method to type less when appending HTML elements

  append(container, elements) {
    for (let i = 0; i < elements.length; i++) {
      container.append(elements[i]);
    }
  }

  //listen for clicks on buttons

  floorButtonEventListener() {
    this.floorContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.classList.contains('upbutton')) {
        this.lastRequestedElevator = this.controller.requestElevator(parseInt(e.target.value), 1);
        this.toggleFloorRequest();
      } else if (e.target.classList.contains('downbutton')) {
        this.controller.requestElevator(parseInt(e.target.value), 1);
        this.lastRequestedElevator = this.controller.requestElevator(parseInt(e.target.value), -1);
        this.toggleFloorRequest();
      }
    });
  }

  floorRequestEventListener() {
    document.querySelectorAll('.floor-request').forEach((el) =>
      el.addEventListener('click', (e) => {
        this.lastRequestedElevator.requestFloor(parseInt(e.target.value));
      })
    );
  }

  //creates and appends required elements to the DOM
  showElevatorRequestButtons() {
    for (let i = 0; i < this.floorList[1].floor + 1; i++) {
      let div = this.make('div');
      let upButton = this.make('button');
      let downButton = this.make('button');
      let floortext = this.make('span');
      let childdiv = this.make('div');
      let buttonContainer = this.make('div');

      upButton.className = 'left upbutton fas fa-sort-up mdc-icon-button material-icons';
      upButton.textContent = 'arrow_drop_up';
      downButton.className = 'right downbutton fas fa-sort-down mdc-icon-button material-icons';
      downButton.textContent = 'arrow_drop_down';

      upButton.setAttribute('value', this.floorList[i].floor);
      downButton.setAttribute('value', this.floorList[i].floor);
      floortext.textContent = this.floorList[i].floor === 1 ? 'RC' : `Floor ${this.floorList[i].floor}`;
      floortext.className = 'floor-number mdc-typography--subtitle1';
      childdiv.className = 'child-div';

      div.className = 'floor';
      div.id = this.floorList[i].floor;

      this.append(this.floorContainer, [div]);
      this.append(div, [childdiv]);
      this.append(childdiv, [floortext]);
      this.append(childdiv, [buttonContainer]);
      if (this.floorList[i].floor === 1) {
        this.append(buttonContainer, [upButton]);
      } else if (this.floorList[i].floor === 10) {
        this.append(buttonContainer, [downButton]);
      } else {
        this.append(buttonContainer, [upButton, downButton]);
      }
    }
  }

  showFloorRequestButtons() {
    for (let i = 0; i < this.controller.elevatorList.length; i++) {
      let titleDiv = this.make('div');
      let title = this.make('span');
      titleDiv.className = 'title mdc-typography--subtitle1';
      title.textContent = `You are in: Elevator ${String.fromCharCode(i + 65)}`;
      title.style.color = i === 0 ? 'Crimson' : 'DodgerBlue';
      let elevDiv = this.make('div');
      let elevContainer = this.make('div');
      elevContainer.className = `hidden elevatorcontainer mdc-card`;
      elevContainer.id = `container${i}`;
      elevDiv.className = 'elevator';
      elevDiv.id = `elevator${i + 1}`;
      this.append(titleDiv, [title]);
      this.append(elevContainer, [titleDiv]);
      this.append(elevContainer, [elevDiv]);
      this.append(this.elevatorContainer, [elevContainer]);

      for (let j = 0; j < this.floorList.length; j++) {
        let button = this.make('button');
        button.textContent = this.floorList[j].floor;
        button.className = 'floor-request mdc-button mdc-button--outlined';
        button.setAttribute('value', this.floorList[j].floor);
        this.append(document.getElementById(`elevator${[i + 1]}`), [button]);
      }
    }
  }
}

const demo = new View(new Controller(new Building(10, 0), 2), 10, 0);
