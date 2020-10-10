package tech.rocketelevators;

import java.util.ArrayList;
import java.util.Collections;

public class Elevator {
	int elevatorId;
	String columnId;
	int currentFloor;
	int defaultFloor;
	int direction;
	int distance;
	ArrayList<Integer> upQueue = new ArrayList<>();
	ArrayList<Integer> downQueue = new ArrayList<>();

	public Elevator(String columnId, int elevatorId, int currentFloor, int defaultFloor) {
		this.columnId = columnId;
		this.elevatorId = elevatorId;
		this.currentFloor = currentFloor;
		this.defaultFloor = defaultFloor;
	}

// because everyone likes a good console log

	public void statusUpdate() {
		System.out.printf(
				"Column ID: %s:%nElevator %s:%nCurrent floor: %s,%nDirection: %s,%n next floor up: %s,%n next floor down: %s%n",
				this.columnId, this.elevatorId, this.currentFloor, this.direction, this.upQueue.toString(),
				this.downQueue.toString());
		System.out.println();
	}

 // adds requested location to the right queue

	public void addToQueue(int location) {
		if (location > this.currentFloor) {
			this.upQueue.add(location);
		} else if (location < this.currentFloor) {
			this.downQueue.add(location);
		}
		this.combinedMethods();
	}

// keep things clean by putting methods in methods

	public void combinedMethods() {
		this.sortQueues();
		this.setDirection();
		this.requestThisElevator();
	}

// this method does what it says it does - order is reversed when going down

	public void sortQueues() {
		Collections.sort(this.upQueue);
		this.downQueue.sort(Collections.reverseOrder());
	}

// if elevator is idle, this sets the direction of the elevator based on the length of up and down queues. otherwise, puts elevator in idle when its done.

	public void setDirection() {
		switch (this.direction) {
		case 0:
			if (this.upQueue.size() > this.downQueue.size()) {
				this.direction = 1;
			} else if (this.upQueue.size() < this.downQueue.size()) {
				this.direction = -1;
			}
			break;
		case 1:
			if (this.upQueue.isEmpty()) {
				this.direction = this.downQueue.isEmpty() ? 0 : -1;
			}
			break;
		case -1:
			if (this.downQueue.isEmpty()) {
				this.direction = this.upQueue.isEmpty() ? 0 : 1;
			}
			break;
		default:
			break;
		}
	}

// moves the elevator until it reaches a requested stop. method keeps calling itself until it reaches a floor in its queue.

	public void requestThisElevator() {
		this.setDirection();
		this.statusUpdate();
		switch (this.direction) {
		case 1:

			if (this.currentFloor == this.upQueue.get(0))
				this.upQueue.remove(0);
			else {
				this.currentFloor++;
			}
			if (!this.upQueue.isEmpty()) {
				this.requestThisElevator();
			} else {
				this.setDirection();
				this.statusUpdate();
			}
			break;

		case -1:
			if (this.currentFloor == this.downQueue.get(0))
				this.downQueue.remove(0);
			else {
				this.currentFloor--;
			}
			if (!this.downQueue.isEmpty()) {
				this.requestThisElevator();
			} else {
				this.setDirection();
				this.statusUpdate();
			}
			break;
		default:
			break;

		}
	}

// handles floor requests given to the elevator when a button within the elevator is pushed.

	public void requestFloor(int floor) {
		if (floor == this.currentFloor) {
			System.out.println(
					"Floor " + floor + " " + "requested, elevator " + this.elevatorId + " " + "opened it's doors");
		} else {
			System.out.printf("Elevator %s, floor request button pressed. %n Added floor %s to queue. %n",
					this.elevatorId, floor);
			this.addToQueue(floor);
			this.statusUpdate();
		}
	}
}
