const setGlobalSpecs = (floors, basements, batteries, columns, elevators) => {
  buildingSpecs = {
    floors: floors,
    basements: basements,
  };
  globalElevatorSpecs = {
    batteries: batteries,
    columns: columns,
    elevatorAmount: elevators,
    floorsPerColumn: [],
    elevatorProperties: [],
  };
  return { buildingSpecs, globalElevatorSpecs };
};

const Building = setGlobalSpecs(66, 6, 1, 4, 12);

const assignColumnsToFloors = () => {
  let { floors, basements } = Building.buildingSpecs;
  let { columns, floorsPerColumn } = Building.globalElevatorSpecs;
  if (floorsPerColumn.length >= columns) return;
  for (let i = 0; i < columns; i++) {
    gap = (floors - basements) / (columns - 1) - 1;
    switch (i) {
      case 0:
        floorsPerColumn.push({ startingFloor: 1, endingFloor: basements + 1 });
        break;
      case 1:
        startingFloor = floorsPerColumn[i - 1].endingFloor + 1;
        endingFloor = startingFloor + gap - 1;
        floorsPerColumn.push({
          startingFloor: startingFloor,
          endingFloor: endingFloor,
        });
        break;
      default:
        startingFloor = floorsPerColumn[i - 1].endingFloor + 1;
        endingFloor = startingFloor + gap;
        floorsPerColumn.push({
          startingFloor: startingFloor,
          endingFloor: endingFloor,
        });
        break;
    }
  }
};

const assignElevatorsToColumns = () => {
  let {
    columns,
    elevatorAmount,
    floorsPerColumn,
    elevatorProperties,
  } = Building.globalElevatorSpecs;
  ElevPerColumn = elevatorAmount / columns;
  console.log(elevatorAmount);

  for (let i = 0; i <= ElevPerColumn; i++) {
    for (let j = 0; j < ElevPerColumn; j++) {
      elevatorProperties.push({
        Column: [i],
        ElevatorID: `E${[j]}`,
        minFloor: floorsPerColumn[i].startingFloor,
        maxFloor: floorsPerColumn[i].endingFloor,
        defaultFloor: 1,
        Score: 0,
        MaxIdle: 30000,
      });
    }
  }
};

assignColumnsToFloors();
assignElevatorsToColumns();
