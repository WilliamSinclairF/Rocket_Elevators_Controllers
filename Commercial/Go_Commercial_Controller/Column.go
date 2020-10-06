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

func (c Column) createElevators() []Elevator {
	elevators := make([]Elevator, 0)
	gapPerElevator := (c.maximumFloor - c.minimumFloor) / c.elevatorNumber
	for i := 0; i < c.elevatorNumber; i++ {
		elevators = append(elevators, NewElevator(c.id, i, c.minimumFloor+gapPerElevator))
		gapPerElevator += i
	}
	return elevators
}

func (c Column) findElevatorsByDirection(elevatorDirection, requestLocation int) []Elevator {
	idle := make([]Elevator, 0)
	moving := make([]Elevator, 0)

	for _, e := range c.elevatorList {
		switch e.direction {
		case 0:
			idle = append(idle, e)
		case 1:
			if e.currentFloor <= requestLocation {
				moving = append(moving, e)
			}
		case -1:
			if e.currentFloor >= requestLocation {
				moving = append(moving, e)
			}
		}
	}
	if len(moving) > 0 {
		return moving
	}
	return idle
}

func (c Column) findNearestElevator(elevatorDirection, requestLocation int) *Elevator {
	elevators := c.findElevatorsByDirection(elevatorDirection, requestLocation)
	for i := range elevators {
		elevators[i].distance = Absolute(elevators[i].currentFloor - requestLocation)
	}
	nearestElevator := elevators[0]
	for _, v := range elevators {
		if v.distance < nearestElevator.distance {
			nearestElevator = v
		}
	}
	id := nearestElevator.elevatorID
	c.elevatorList[id].addToQueue(requestLocation)
	return &c.elevatorList[id]
}

func (c Column) requestElevator(requestLocation, requestDirection int) *Elevator {
	c.findNearestElevator(requestDirection, requestLocation).addToQueue(requestLocation)
	return c.findNearestElevator(requestDirection, requestLocation)
}
