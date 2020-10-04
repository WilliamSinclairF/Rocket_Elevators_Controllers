package tech.rocketelevators;

public class Main {

	public static void main(String[] args) {
		Battery commercialBattery = new Battery(new Building(66, 6), 4, 12);
		commercialBattery.togglePower();
		commercialBattery.findColumn(50).requestElevator(66, -1).requestFloor(1);
	}
}
