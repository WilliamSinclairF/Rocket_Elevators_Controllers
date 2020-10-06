package tech.rocketelevators;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Column {
	Battery battery;
	int id;
	int elevatorNumber;
	int minimumFloor;
	int maximumFloor;
	ArrayList<Elevator> elevatorList;

	public Column(Battery battery, int id, int elevatorNumber, int minimumFloor, int maximumFloor) {
		this.battery = battery;
		this.id = id;
		this.elevatorNumber = elevatorNumber;
		this.minimumFloor = minimumFloor;
		this.maximumFloor = maximumFloor;
		elevatorList = new ArrayList<>();
		this.createElevators();

	}

	@Override
	public String toString() {
		return "Column{" + "battery=" + this.battery + ", elevatorNumber=" + this.elevatorNumber + ", minimumFloor="
				+ this.minimumFloor + ", maximumFloor=" + this.maximumFloor + ", elevatorList="
				+ this.elevatorList.toString() + '}';
	}

	public void columnInfo() {
		System.out.println(toString());
		this.elevatorInfo();
	}

	public void elevatorInfo() {
		for (Elevator e : elevatorList) {
			e.statusUpdate();
		}
	}

	public void createElevators() {
		for (int i = 0; i < elevatorNumber; i++) {
			int gapPerElevator = 1 + ((this.maximumFloor - this.minimumFloor) / this.elevatorNumber * i - 1);
			int defaultFloor = this.minimumFloor + gapPerElevator;
			this.elevatorList.add(new Elevator("Column" + i, i, defaultFloor, defaultFloor));
		}
	}

	public List<Elevator> findElevatorsByDirection(int elevatorDirection) {
		List<Elevator> moving = this.elevatorList.stream().filter(elevator -> elevator.direction == elevatorDirection)
				.collect(Collectors.toList());
		List<Elevator> idle = this.elevatorList.stream().filter(elevator -> elevator.direction == 0)
				.collect(Collectors.toList());
		return !moving.isEmpty() ? moving : idle;
	}

	public Elevator findNearestElevator(int elevatorDirection, int requestLocation) {
		List<Elevator> foundElevators = findElevatorsByDirection(elevatorDirection);
		foundElevators.forEach(e -> e.distance = Math.abs(e.currentFloor - requestLocation));
		return Collections.min(foundElevators, Comparator.comparing(elevator -> elevator.distance));
	}

	public Elevator requestElevator(int requestLocation, int requestDirection) {
		Elevator nearestToRequest = this.findNearestElevator(requestDirection, requestLocation);
		nearestToRequest.addToQueue(requestLocation);
		return nearestToRequest;
	}
}