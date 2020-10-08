package main

// Building type
type Building struct {
	Floors, Basements int
}

// NewBuilding : Building factory function
func NewBuilding(floors int, basements int) Building {
	b := Building{
		Floors:    floors,
		Basements: basements,
	}
	return b
}
