package main

// Column type
type Column struct {
	Battery                                        Battery
	id, elevatorNumber, minimumFloor, maximumFloor int
	elevatorList                                   []Elevator
}

// NewColumn : Column factory function
func NewColumn(battery Battery, id, elevatorNumber, minimumFloor, maximumFloor int) Column {
	c := Column{
		Battery:        battery,
		id:             id,
		elevatorNumber: elevatorNumber,
		minimumFloor:   minimumFloor,
		maximumFloor:   maximumFloor,
		elevatorList:   make([]Elevator, 0),
	}
	c.elevatorList = c.createElevators()
	return c
}

//makes elevator structs based on the amount of elevators that was passed to the column's constructor

func (c Column) createElevators() []Elevator {
	elevators := make([]Elevator, 0)
	for i := 0; i < c.elevatorNumber; i++ {
		elevators = append(elevators, NewElevator(c.id, i, c.minimumFloor+i))
	}
	return elevators
}

//looks through the list of elevators to find the best one to send based on where the request came from
//tries to get elevators moving in the same direction if there are any, if not gets elevators that will be on the floor of the request soon and if not, returns idle elevators

func (c Column) findElevatorsByDirection(requestLocation, requestDirection int) []Elevator {
	sameDirection := make([]Elevator, 0)
	willBeIdle := make([]Elevator, 0)
	idle := make([]Elevator, 0)
	for _, e := range c.elevatorList {
		e.distance = Absolute(e.currentFloor - requestLocation)
		if e.direction == 1 && e.currentFloor < requestLocation {
			sameDirection = append(sameDirection, e)
		}
		if e.direction == -1 && e.currentFloor > requestLocation {
			sameDirection = append(sameDirection, e)
		}
		if e.direction == 0 {
			idle = append(idle, e)
		}
		if len(e.upQueue) > 0 {
			if e.upQueue[0] == 0 && len(e.upQueue) == 1 {
				willBeIdle = append(willBeIdle, e)
			}
		}
		if len(e.downQueue) > 0 {
			if e.downQueue[0] == 0 && len(e.downQueue) == 1 {
				willBeIdle = append(willBeIdle, e)
			}
		}
	}
	if len(sameDirection) > 0 {
		return sameDirection

	} else if len(willBeIdle) > 0 {
		return willBeIdle

	} else {
		return idle
	}
}

// compares the distance of each elevator and returns the nearest one
func (c Column) findNearestElevator(requestLocation, requestDirection int) *Elevator {
	elevators := c.findElevatorsByDirection(requestLocation, requestDirection)
	nearestElevator := elevators[0]
	for _, e := range elevators {
		if e.distance < nearestElevator.distance {
			nearestElevator = e
		}
	}
	id := nearestElevator.elevatorID
	elevator := &c.elevatorList[id]
	return elevator
}

// function that starts the function chain and sends the elevator to the request
func (c Column) requestElevator(requestLocation, requestDirection int) *Elevator {
	nearestElevator := c.findNearestElevator(requestLocation, requestDirection)
	nearestElevator.addToQueue(requestLocation)
	return nearestElevator
}
