package tech.rocketelevators;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class Battery {
	Building building;
	int firstFloor;
	ArrayList<Column> columnList;
	int totalColumns;
	int totalElevators;
	boolean isPoweredOn = false;

	public Battery(Building building, int totalColumns, int totalElevators) {
		this.building = building;
		this.firstFloor = building.basements + 1;
		this.totalColumns = totalColumns;
		this.totalElevators = totalElevators;
		this.columnList = new ArrayList<>();
		this.createColumns();

	}

	public void createColumns() {
		for (int i = 0; i < totalColumns; i++) {
			int floorsPerColumn = (building.floors - building.basements) / (totalColumns - 1);
			int elevatorsPerColumn = totalElevators / totalColumns;
			switch (i) {
			case 0:
				this.columnList.add(new Column(this, i, elevatorsPerColumn, 1, this.building.basements));
				break;

			case 1:
				this.columnList.add(new Column(this, i, elevatorsPerColumn, this.firstFloor,
						this.building.basements + floorsPerColumn));
				break;

			default:
				int minimum = this.columnList.get(i - 1).maximumFloor + 1;
				int maximum = this.columnList.get(i - 1).maximumFloor + floorsPerColumn;
				this.columnList.add(new Column(this, i, elevatorsPerColumn, minimum, maximum));
				break;
			}
		}
	}

	public Column findColumn(int requestLocation) {
		return this.columnList.stream()
				.filter(c -> requestLocation >= c.minimumFloor && requestLocation <= c.maximumFloor)
				.collect(Collectors.toList()).get(0);

	}

	public void showColumns() {
		for (Column column : columnList) {
			column.columnInfo();
		}
	}

	public void togglePower() {
		isPoweredOn = !isPoweredOn;
		String message = isPoweredOn ? "Power On" : "Power Off";
		System.out.println("Battery: " + message);
	}
}
