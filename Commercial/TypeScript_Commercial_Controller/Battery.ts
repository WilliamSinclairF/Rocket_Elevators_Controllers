import Building from './Building';
import Column from './Column';

export default class Battery {
    building: Building;
    columnList: Array<Column>;
    totalColumns: number;
    totalElevators: number;
    Scenario1: any;
    Scenario2: any;
    Scenario3: any;
    Scenario4: any;

    constructor(building: Building, columnNumber: number, totalElevators: number) {
        this.building = building;
        this.columnList = [];
        this.totalColumns = columnNumber;
        this.totalElevators = totalElevators;
        this.createColumns();
    }

    createColumns(): void {
        let floorsPerColumn = (this.building.floors - this.building.basements) / (this.totalColumns - 1);
        let elevatorsPerColumn = this.totalElevators / this.totalColumns;
        let minimum = floorsPerColumn;
        let maximum = minimum + floorsPerColumn;
        for (let i = 0; i < this.totalColumns; i++) {
            if (i === 0) {
                this.columnList.push(new Column(i, elevatorsPerColumn, -this.building.basements, 0));
            } else if (i === 1) {
                this.columnList.push(new Column(i, elevatorsPerColumn, 0, floorsPerColumn));
            } else if (i > 1) {
                this.columnList.push(new Column(i, elevatorsPerColumn, minimum + 1, maximum));
                minimum += floorsPerColumn;
                maximum += floorsPerColumn;
            }
        }
    }

    findColumn(requestLocation: number): Column {
        return this.columnList.filter((c) => requestLocation >= c.minFloor && requestLocation <= c.maxFloor)[0];
    }
}
