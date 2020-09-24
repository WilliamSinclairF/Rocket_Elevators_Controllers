const setGlobalSpecs = (floors, basements, batteries, columns, elevators) => {
  buildingSpecs = {
    floors: floors,
    basements: basements,
  };
  globalElevatorSpecs = {
    batteries: batteries,
    columns: columns,
    elevatorAmount: elevators,
    columnProperties: [],
    elevatorProperties: [],
  };
  return { buildingSpecs, globalElevatorSpecs };
};

const Building = setGlobalSpecs(66, 6, 1, 4, 12);

const assignColumnsToFloors = () => {
  let { floors, basements } = Building.buildingSpecs;
  let { columns, columnProperties } = Building.globalElevatorSpecs;

  for (let i = 0; i < columns; i++) {
    let gap = (floors - basements) / (columns - 1) - 1;
    switch (i) {
      case 0:
        columnProperties.push({ startingFloor: 1, endingFloor: basements + 1, requestedStops: [] });
        break;
      case 1:
        startingFloor = columnProperties[i - 1].endingFloor + 1;
        endingFloor = startingFloor + gap - 1;
        columnProperties.push({
          startingFloor: startingFloor,
          endingFloor: endingFloor,
          requestedStops: [],
        });
        break;
      default:
        startingFloor = columnProperties[i - 1].endingFloor + 1;
        endingFloor = startingFloor + gap;
        columnProperties.push({
          startingFloor: startingFloor,
          endingFloor: endingFloor,
          requestedStops: [],
        });
        break;
    }
  }
};

const assignElevatorsToColumns = () => {
  let {
    columns,
    elevatorAmount,
    columnProperties,
    elevatorProperties,
  } = Building.globalElevatorSpecs;
  ElevPerColumn = elevatorAmount / columns;
  for (let i = 0; i <= ElevPerColumn; i++) {
    for (let j = 0; j < ElevPerColumn; j++) {
      letter = i + 65;
      elevatorProperties.push({
        Column: i,
        ElevatorID: `${String.fromCharCode(letter)}${i}`,
        CurrentFloor: 1,
        MinFloor: columnProperties[i].startingFloor,
        MaxFloor: columnProperties[i].endingFloor,
        NextStops: [],
        DefaultFloor: 1,
        TargetFloor: 0,
        Direction: 0,
        Score: 0,
        MaxIdle: 30000,
      });
    }
  }
  if (!Number.isInteger(ElevPerColumn)) {
    elevatorProperties.pop();
  }
};

assignColumnsToFloors();
assignElevatorsToColumns();

const ElevatorIsRequested = (ColumnOrigin, RequestLocation) => {
  let selectedColumn = Building.globalElevatorSpecs.columnProperties[ColumnOrigin];
  selectedColumn.requestedStops.push(RequestLocation);
  console.log(selectedColumn);
};
