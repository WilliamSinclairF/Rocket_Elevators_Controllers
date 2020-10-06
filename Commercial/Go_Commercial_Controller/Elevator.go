package main

import "fmt"

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

func (e *Elevator) addToQueue(location int) {
	if location > e.currentFloor {
		e.upQueue = append(e.upQueue, location)
		e.setDirection()
		e.requestThisElevator()
	}
	if location < e.currentFloor {
		e.downQueue = append(e.downQueue, location)
		e.setDirection()
		e.requestThisElevator()
	}
}

func (e *Elevator) combinedMethods() {
	e.setDirection()
	e.requestThisElevator()
}

func (e *Elevator) setDirection() {

	switch e.direction {
	case 0:
		if len(e.upQueue) > len(e.downQueue) {
			e.direction = 1
		} else {
			e.direction = -1
		}

	case 1:
		if len(e.upQueue) == 0 {
			if len(e.downQueue) == 0 {
				e.direction = 0
			} else {
				e.direction = -1
			}
		}
	case -1:
		if len(e.downQueue) == 0 {
			if len(e.upQueue) == 0 {
				e.direction = 0
			} else {
				e.direction = 1
			}
		}
	}
}

func (e *Elevator) requestThisElevator() {
	e.setDirection()
	fmt.Println("Elevator id", e.elevatorID)
	fmt.Println("upqueue", e.upQueue)
	fmt.Println("downqueue", e.downQueue)
	fmt.Println("currentfloor", e.currentFloor)
	fmt.Println("direction", e.direction)
	fmt.Println("...")

	if e.direction == 1 {
		if e.currentFloor == e.upQueue[0] {
			e.upQueue = remove(e.upQueue, 0)
		} else {
			e.currentFloor++
		}
		if len(e.upQueue) > 0 {
			e.requestThisElevator()
		} else {
			e.direction = 0
		}
	} else if e.direction == -1 {
		if e.currentFloor == e.downQueue[0] {
			e.downQueue = remove(e.downQueue, 0)
		} else {
			e.currentFloor--
		}
		if len(e.downQueue) > 0 {
			e.requestThisElevator()
		} else {
			e.direction = 0
		}
	}

}

func (e *Elevator) requestFloor(floor int) {
	e.addToQueue(floor)
}
