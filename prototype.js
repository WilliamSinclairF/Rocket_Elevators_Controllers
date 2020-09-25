class Building {
  constructor(floors, basements, batteries, columns, elevators) {
    this.floorAmount = floors;
    this.basementAmount = basements;
    this.batteryAmount = batteries;
    this.columnAmount = columns;
    this.elevatorAmount = elevators;
    this.elevatorsPerColumn = this.elevatorPerColumnRatio();
    this.
  }
  elevatorPerColumnRatio() {
    return this.elevators / this.columns;
  }

  floorsPerColumns() {
    let gapPerFloor = (this.floors - this.basements) / (columns - 1)

  }
}

const myBuilding = new Building(66, 4, 1, 4, 12);
