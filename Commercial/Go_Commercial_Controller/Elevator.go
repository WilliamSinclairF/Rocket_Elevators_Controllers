package main

import (
	"fmt"
	"sort"
)

// Elevator type
type Elevator struct {
	columnID, elevatorID, currentFloor, defaultFloor, direction int
	distance                                                    int
	upQueue                                                     []int
	downQueue                                                   []int
}

// NewElevator : Elevator factory function
func NewElevator(columnID, elevatorID, currentFloor int) Elevator {
	e := Elevator{
		columnID:     columnID,
		elevatorID:   elevatorID,
		currentFloor: currentFloor,
		defaultFloor: currentFloor,
		direction:    0,
		distance:     0,
		upQueue:      make([]int, 0),
		downQueue:    make([]int, 0),
	}

	return e
}

func (e *Elevator) setFloor(floor int) {
	e.currentFloor = floor
}

func (e *Elevator) status() {
	fmt.Println(" ")
	fmt.Println("ELEVATOR ID", e.elevatorID)
	fmt.Println("DIRECTION", e.direction)
	fmt.Println("FLOOR", e.currentFloor)
	fmt.Println("QUEUE UP", e.upQueue)
	fmt.Println("QUEUE DOWN", e.downQueue)
	fmt.Println(" ")
}

func (e *Elevator) sortQueues() {
	sort.SliceStable(e.upQueue, func(i, j int) bool { return e.upQueue[i] < e.upQueue[j] })
	sort.SliceStable(e.downQueue, func(i, j int) bool { return e.downQueue[i] > e.downQueue[j] })
}

func (e *Elevator) addToQueue(location int) {
	// if location < 0 {
	// 	if e.currentFloor > location {
	// 		e.downQueue = append(e.downQueue, location)
	// 		e.sortQueues()
	// 		e.requestThisElevator()
	// 	} else {
	// 		e.upQueue = append(e.upQueue, location)
	// 		e.sortQueues()
	// 		e.requestThisElevator()
	// 	}
	// }
	if location > e.currentFloor {
		e.upQueue = append(e.upQueue, location)
		e.sortQueues()
		e.requestThisElevator()
	} else if location < e.currentFloor {
		e.downQueue = append(e.downQueue, location)
		e.sortQueues()
		e.requestThisElevator()
	}
}

func (e *Elevator) setDirection() {
	if len(e.upQueue) > 0 && len(e.downQueue) == 0 {
		e.direction = 1
	} else if len(e.downQueue) > 0 && len(e.upQueue) == 0 {
		e.direction = -1
	} else if len(e.downQueue) > 0 && len(e.upQueue) > 0 {
		if Absolute(e.currentFloor-e.upQueue[0]) > Absolute(e.currentFloor-e.downQueue[0]) {
			e.direction = -1
		} else {
			e.direction = 1
		}
	} else if len(e.upQueue) == 0 && len(e.downQueue) == 0 {
		e.direction = 0
	}
}

func (e *Elevator) requestThisElevator() {
	e.setDirection()
	e.status()
	switch e.direction {
	case 1:
		if e.currentFloor == e.upQueue[0] {
			e.upQueue = remove(e.upQueue, 0)
		}
		if len(e.upQueue) > 0 {
			e.currentFloor++
			e.requestThisElevator()
		} else if len(e.upQueue) == 0 {
			if len(e.downQueue) > 0 {
				e.direction = -1
			} else {
				e.direction = 0
			}
		}
	case -1:
		if e.currentFloor == e.downQueue[0] {
			e.downQueue = remove(e.downQueue, 0)
		}
		if len(e.downQueue) > 0 {
			e.currentFloor--
			e.requestThisElevator()
		} else if len(e.downQueue) == 0 {
			if len(e.upQueue) > 0 {
				e.direction = 1
			} else {
				e.direction = 0
			}
		}
	}
}

func (e *Elevator) requestFloor(floor int) {
	if floor == e.currentFloor {
		fmt.Println("I'm here", e.elevatorID)
	} else {
		fmt.Println("Elevator: ", e.elevatorID)
		fmt.Println("floor button pressed, added ", floor)
		e.addToQueue(floor)
	}
}
