package main

// Absolute : Finds Absolute value of an int
func Absolute(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// Remove: Removes int at specified index
func remove(slice []int, s int) []int {
	return append(slice[:s], slice[s+1:]...)
}

func main() {
	comBattery := NewBattery(*NewBuilding(66, 6), 4, 20)

	// comBattery.findColumn(1, 1).findNearestElevator(1, 1).requestFloor(7)

	// .requestFloor(60)

	//Scenario 1

	comBattery.columnList[1].elevatorList[0].currentFloor = 20
	comBattery.columnList[1].elevatorList[0].addToQueue(5)

	comBattery.columnList[1].elevatorList[1].currentFloor = 3
	comBattery.columnList[1].elevatorList[1].addToQueue(15)

	comBattery.columnList[1].elevatorList[4].currentFloor = 6
	comBattery.columnList[1].elevatorList[4].addToQueue(0)
	comBattery.columnList[1].requestElevator(0, 1).requestFloor(20)

	comBattery.columnList[1].elevatorList[2].currentFloor = 13
	comBattery.columnList[1].elevatorList[2].addToQueue(0)

	comBattery.columnList[1].elevatorList[3].currentFloor = 15
	comBattery.columnList[1].elevatorList[3].addToQueue(1)

}
