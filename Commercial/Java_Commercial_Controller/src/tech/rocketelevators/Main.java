package tech.rocketelevators;

public class Main {

	public static void main(String[] args) {
		Battery commercialBattery = new Battery(new Building(66, 6), 4, 20);

		// Scenario 1
//		commercialBattery.columnList.get(1).elevatorList.get(0).currentFloor = 20;
//		commercialBattery.columnList.get(1).elevatorList.get(1).currentFloor = 3;
//		commercialBattery.columnList.get(1).elevatorList.get(2).currentFloor = 13;
//		commercialBattery.columnList.get(1).elevatorList.get(3).currentFloor = 15;
//		commercialBattery.columnList.get(1).elevatorList.get(4).currentFloor = 6;
//		commercialBattery.columnList.get(1).elevatorList.get(0).addToQueue(5);
//		commercialBattery.columnList.get(1).elevatorList.get(1).addToQueue(15);
//		commercialBattery.columnList.get(1).elevatorList.get(3).addToQueue(1);
//		commercialBattery.columnList.get(1).elevatorList.get(4).addToQueue(0);
//		commercialBattery.columnList.get(1).requestElevator(0, 1).requestFloor(20);
//		commercialBattery.columnList.get(1).elevatorList.get(2).addToQueue(0);

		// Scenario 2
//		commercialBattery.columnList.get(2).elevatorList.get(0).currentFloor = 0;
//		commercialBattery.columnList.get(2).elevatorList.get(1).currentFloor = 23;
//		commercialBattery.columnList.get(2).elevatorList.get(2).currentFloor = 33;
//		commercialBattery.columnList.get(2).elevatorList.get(3).currentFloor = 40;
//		commercialBattery.columnList.get(2).elevatorList.get(4).currentFloor = 39;
//		commercialBattery.columnList.get(2).elevatorList.get(0).upQueue.add(21);
//		commercialBattery.columnList.get(2).requestElevator(0, 1).requestFloor(36);
//		commercialBattery.columnList.get(2).elevatorList.get(1).addToQueue(28);
//		commercialBattery.columnList.get(2).elevatorList.get(2).addToQueue(0);
//		commercialBattery.columnList.get(2).elevatorList.get(3).addToQueue(24);
//		commercialBattery.columnList.get(2).elevatorList.get(4).addToQueue(0);

		// Scenario 3
//		commercialBattery.columnList.get(3).elevatorList.get(0).currentFloor = 58;
//		commercialBattery.columnList.get(3).elevatorList.get(1).currentFloor = 50;
//		commercialBattery.columnList.get(3).elevatorList.get(2).currentFloor = 46;
//		commercialBattery.columnList.get(3).elevatorList.get(3).currentFloor = 0;
//		commercialBattery.columnList.get(3).elevatorList.get(4).currentFloor = 60;
//
//		commercialBattery.columnList.get(3).requestElevator(54, -1).requestFloor(0);
//		commercialBattery.columnList.get(3).elevatorList.get(1).addToQueue(60);
//		commercialBattery.columnList.get(3).elevatorList.get(2).addToQueue(58);
//		commercialBattery.columnList.get(3).elevatorList.get(3).addToQueue(54);
//		commercialBattery.columnList.get(3).elevatorList.get(4).addToQueue(0);

		// Scenario 4
//		commercialBattery.columnList.get(0).elevatorList.get(0).currentFloor = -4;
//		commercialBattery.columnList.get(0).elevatorList.get(0).direction = 0;
//		commercialBattery.columnList.get(0).elevatorList.get(1).currentFloor = 0;
//		commercialBattery.columnList.get(0).elevatorList.get(1).direction = 0;
//		commercialBattery.columnList.get(0).elevatorList.get(2).currentFloor = -3;
//		commercialBattery.columnList.get(0).elevatorList.get(3).currentFloor = -6;
//		commercialBattery.columnList.get(0).elevatorList.get(4).currentFloor = -1;
//		commercialBattery.columnList.get(0).elevatorList.get(2).addToQueue(-5);
//		commercialBattery.columnList.get(0).elevatorList.get(4).addToQueue(-6);
//		commercialBattery.columnList.get(0).elevatorList.get(3).upQueue.add(0);
//		commercialBattery.columnList.get(0).elevatorList.get(3).direction = 1;
//		commercialBattery.columnList.get(0).requestElevator(-3, 1).requestFloor(0);

	}
}
