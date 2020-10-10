package main

// Battery type
type Battery struct {
	Building                                 Building
	firstFloor, totalColumns, totalElevators int
	columnList                               []Column
	lastRequestedElevator                    Elevator
}

// NewBattery : Battery factory function
func NewBattery(building Building, totalColumns int, totalElevators int) Battery {
	b := Battery{
		Building:       building,
		totalColumns:   totalColumns,
		totalElevators: totalElevators,
		columnList:     make([]Column, 0),
	}
	b.columnList = b.createColumns()
	return b
}

//makes column structs based on the amount of columns the battery construct was given
func (b Battery) createColumns() []Column {
	columns := make([]Column, 0)
	elevatorsPerColumn := b.totalElevators / b.totalColumns
	floorsPerColumn := ((b.Building.Floors - b.Building.Basements) / (b.totalColumns - 1))
	minimumFloor := floorsPerColumn
	maximumFloor := minimumFloor + floorsPerColumn
	for i := 0; i < b.totalColumns; i++ {
		if i == 0 {
			columns = append(columns, NewColumn(b, i, elevatorsPerColumn, -6, 0))
		}
		if i == 1 {
			columns = append(columns, NewColumn(b, i, elevatorsPerColumn, 0, floorsPerColumn))
		}
		if i > 1 {
			columns = append(columns, NewColumn(b, i, elevatorsPerColumn, minimumFloor+1, maximumFloor))
			minimumFloor += floorsPerColumn
			maximumFloor += floorsPerColumn
		}
	}
	return columns
}
