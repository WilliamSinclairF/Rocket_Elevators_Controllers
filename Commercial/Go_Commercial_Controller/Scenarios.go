package main

////Scenario 1
func scenario1() {
	commercial := NewBattery(NewBuilding(66, 6), 4, 20)
	commercial.columnList[1].elevatorList[0].currentFloor = 20
	commercial.columnList[1].elevatorList[1].currentFloor = 3
	commercial.columnList[1].elevatorList[2].currentFloor = 13
	commercial.columnList[1].elevatorList[3].currentFloor = 15
	commercial.columnList[1].elevatorList[4].currentFloor = 6
	commercial.columnList[1].elevatorList[4].addToQueue(0)
	commercial.columnList[1].requestElevator(0, 1).requestFloor(20)
	commercial.columnList[1].elevatorList[0].addToQueue(5)
	commercial.columnList[1].elevatorList[3].addToQueue(1)
	commercial.columnList[1].elevatorList[2].addToQueue(0)
	commercial.columnList[1].elevatorList[1].addToQueue(15)
}

////Scenario 2
func scenario2() {
	commercial := NewBattery(NewBuilding(66, 6), 4, 20)
	commercial.columnList[2].elevatorList[0].currentFloor = 0
	commercial.columnList[2].elevatorList[1].currentFloor = 23
	commercial.columnList[2].elevatorList[2].currentFloor = 33
	commercial.columnList[2].elevatorList[3].currentFloor = 40
	commercial.columnList[2].elevatorList[4].currentFloor = 39
	commercial.columnList[2].elevatorList[0].upQueue = append(commercial.columnList[2].elevatorList[0].upQueue, 21)
	commercial.columnList[2].elevatorList[0].direction = 1
	commercial.columnList[2].requestElevator(0, 1).requestFloor(36)
	commercial.columnList[2].elevatorList[1].addToQueue(28)
	commercial.columnList[2].elevatorList[2].addToQueue(0)
	commercial.columnList[2].elevatorList[3].addToQueue(24)
	commercial.columnList[2].elevatorList[4].addToQueue(0)
}

////Scenario 3
func scenario3() {
	commercial := NewBattery(NewBuilding(66, 6), 4, 20)
	commercial.columnList[3].elevatorList[0].currentFloor = 58
	commercial.columnList[3].elevatorList[0].direction = -1
	commercial.columnList[3].elevatorList[0].downQueue = append(commercial.columnList[3].elevatorList[0].downQueue, 0)
	commercial.columnList[3].requestElevator(54, -1).requestFloor(0)
	commercial.columnList[3].elevatorList[1].currentFloor = 50
	commercial.columnList[3].elevatorList[2].currentFloor = 46
	commercial.columnList[3].elevatorList[3].currentFloor = 0
	commercial.columnList[3].elevatorList[4].currentFloor = 60
	commercial.columnList[3].elevatorList[1].addToQueue(60)
	commercial.columnList[3].elevatorList[2].addToQueue(58)
	commercial.columnList[3].elevatorList[3].addToQueue(54)
	commercial.columnList[3].elevatorList[4].addToQueue(0)
}

////Scenario 4
func scenario4() {
	commercial := NewBattery(NewBuilding(66, 6), 4, 20)
	commercial.columnList[0].elevatorList[0].currentFloor = -4
	commercial.columnList[0].elevatorList[0].direction = 0
	commercial.columnList[0].elevatorList[1].currentFloor = 0
	commercial.columnList[0].elevatorList[1].direction = 0
	commercial.columnList[0].elevatorList[2].currentFloor = -3
	commercial.columnList[0].elevatorList[3].currentFloor = -6
	commercial.columnList[0].elevatorList[4].currentFloor = -1
	commercial.columnList[0].elevatorList[3].direction = 1
	commercial.columnList[0].elevatorList[2].addToQueue(-5)
	commercial.columnList[0].elevatorList[4].addToQueue(-6)
	commercial.columnList[0].elevatorList[3].upQueue = append(commercial.columnList[0].elevatorList[3].upQueue, 0)
	commercial.columnList[0].requestElevator(-3, 1).requestFloor(0)
}
