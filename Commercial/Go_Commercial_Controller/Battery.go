package main

// Battery type
type Battery struct {
	Building                                 Building
	firstFloor, totalColumns, totalElevators int
	columnList                               []Column
}

// NewBattery : Battery factory function
func NewBattery(building Building, totalColumns int, totalElevators int) *Battery {
	b := Battery{
		Building:       building,
		totalColumns:   totalColumns,
		totalElevators: totalElevators,
		columnList:     make([]Column, 0),
	}
	b.columnList = b.createColumns()
	return &b
}

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

func (b Battery) findColumn(requestLocation, requestDirection int) *Column {
	index := 0
	for i, c := range b.columnList {
		if requestLocation >= c.minimumFloor && requestLocation <= c.maximumFloor {
			index = i
			break
		}
	}
	return &b.columnList[index]
}
