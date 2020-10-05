import functools


class Building():
    def __init__(self, floors, basements):
        self.floors = floors
        self.basements = basements


class Controller():
    def __init__(self, building, elevatorNumber):
        self.building = building
        self.elevatorNumber = elevatorNumber
        self.elevatorList = []
        self.createElevators()

    # makes and adds elevators to array

    def createElevators(self):
        gapPerElevator = self.building.floors / self.elevatorNumber
        for i in range(self.elevatorNumber):
            if i == 0:
                self.elevatorList.append(
                    Elevator(i, 1, 1, 0))
            else:
                self.elevatorList.append(
                    Elevator(i, (i + gapPerElevator), (i + gapPerElevator), 0))

    # finds elevator by direction, returns moving or idle if none are moving

    def findElevatorsByDirection(self, elevatorDirection):
        elevatorsWithSameDirection = [
            elevator for elevator in self.elevatorList if elevator.direction == elevatorDirection]

        idleElevators = [
            elevator for elevator in self.elevatorList if elevator.direction == 0]

        if len(elevatorsWithSameDirection) > len(idleElevators):
            return elevatorsWithSameDirection

        else:
            return idleElevators

    # finds nearest elevator based on request location

    def findNearestElevator(self, elevatorDirection, requestLocation):
        elevators = self.findElevatorsByDirection(elevatorDirection)
        for elevator in elevators:
            elevator.distanceScore = abs(
                requestLocation - elevator.currentFloor)
        return functools.reduce((lambda a, b: a if a.distanceScore < b.distanceScore else b), elevators)

    # sends the previously found elevator to the location of the request

    def requestElevator(self, requestLocation, requestDirection):
        if requestLocation > self.building.floors:
            return

        filteredElevator = self.findNearestElevator(
            requestDirection, requestLocation)

        def status_update():
            print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            print('~~~~~~~~~~~~~~~~Elevator Requested~~~~~~~~~~~~~~~~~')
            print(
                f'{filteredElevator.who_am_i()} responded and is headed to floor: {requestLocation}')
            print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

        if filteredElevator.currentFloor > requestLocation:
            status_update()
            filteredElevator.downQueue.append(requestLocation)
            filteredElevator.sortQueues()
            filteredElevator.setDirection()
            filteredElevator.requestThisElevator()
            return filteredElevator

        elif filteredElevator.currentFloor < requestLocation:
            status_update()
            filteredElevator.upQueue.append(requestLocation)
            filteredElevator.sortQueues()
            filteredElevator.setDirection()
            filteredElevator.requestThisElevator()
            return filteredElevator

        elif filteredElevator.currentFloor == requestLocation:
            print(
                f'Elevator was requested, {filteredElevator.who_am_i()} opened its doors as it was already on floor {requestLocation}')
            return filteredElevator


class Elevator():
    def __init__(self, id, currentFloor, defaultFloor, direction):
        self.id = id
        self.currentFloor = currentFloor
        self.defaultFloor = defaultFloor
        self.direction = direction
        self.currentFloor = currentFloor
        self.distanceScore = 0
        self.upQueue = []
        self.downQueue = []

    def who_am_i(self):
        return f"""Elevator {chr(65 + self.id)}"""

    def where_am_i(self):
        return f"""current floor: {self.currentFloor} direction: {self.direction}"""

    def where_to_now(self):
        return f"""next stops up: {self.upQueue}, down: {self.downQueue}"""

    def status_update(self):
        print('...')
        print(f"""{self.who_am_i()}:""")
        print(f'{self.where_am_i()}')
        print(f"""{self.where_to_now()}""")

    def a_floor_was_requested(self, floor):
        print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        print('~~~~~~~~~~~Floor Request Button Pressed~~~~~~~~~~~~')
        print(
            f"""{self.who_am_i()}: Added floor {floor} to it's queue""")
        print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    # decides which direction go take

    def setDirection(self):
        if self.direction == 0:
            if len(self.upQueue) > len(self.downQueue):
                self.direction = 1
            else:
                self.direction = -1

        elif self.direction == 1:
            if len(self.upQueue) > 0:
                self.direction = 1

            if len(self.upQueue) == 0:
                if len(self.downQueue) > 0:
                    self.direction = -1
                else:
                    self.direction = 0

        elif self.direction == -1:
            if len(self.downQueue) > 0:
                self.direction = -1
                return self.direction

            if len(self.downQueue) == 0:
                if len(self.upQueue) > 0:
                    self.direction = 1
                else:
                    self.direction = 0

    # handles requests while it's queue is not empty

    def requestThisElevator(self):
        self.status_update()
        self.setDirection()
        if self.direction == 1:
            if self.currentFloor == self.upQueue[0]:
                self.upQueue.pop(0)
            else:
                self.currentFloor = self.currentFloor + 1

            if len(self.upQueue) > 0:
                return self.requestThisElevator()

            else:
                self.direction = 0

        elif self.direction == -1:
            if self.currentFloor == self.downQueue[0]:
                self.downQueue.pop(0)
            else:
                self.currentFloor = self.currentFloor - 1

            if len(self.downQueue) > 0:
                return self.requestThisElevator()

            else:
                self.direction = 0
                self.status_update()

    # handles floor requests

    def requestFloor(self, floor):
        if floor == self.currentFloor:
            print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            print('~~~~~~~~~~~Floor Request Button Pressed~~~~~~~~~~~~')
            print(
                f"""{self.who_am_i()}: Floor request button pressed for {floor}, 
                elevator is already there so it's doors are opening""")
            print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            return

        elif floor > self.currentFloor:
            self.a_floor_was_requested(floor)
            self.upQueue.append(floor)
            self.sortQueues()
            self.setDirection()
            self.requestThisElevator()

        elif floor < self.currentFloor:
            self.a_floor_was_requested(floor)
            self.downQueue.append(floor)
            self.sortQueues()
            self.setDirection()
            self.requestThisElevator()

    def sortQueues(self):
        self.upQueue.sort()
        self.downQueue.sort(reverse=True)


Residential = Controller(Building(10, 0), 2)


def first_scenario():
    print("""Hello dear customer, we are now starting scenario 1""")
    # Elevator A is Idle at floor 2
    Residential.elevatorList[0].currentFloor = 2
    Residential.elevatorList[0].direction = 0
    # Elevator B is Idle at floor 6
    Residential.elevatorList[1].currentFloor = 6
    Residential.elevatorList[1].direction = 0
    # Someone is on floor 3 and wants to go to the 7th floor.
    # Elevator A is expected to be sent.
    Residential.requestElevator(3, 1).requestFloor(7)
    print("""Scenario over""")


def second_scenario():
    print("""Hello dear customer, we are now starting scenario 2""")
    # Elevator A is Idle at floor 10
    Residential.elevatorList[0].currentFloor = 10
    Residential.elevatorList[0].direction = 0
    # Elevator B is idle at floor 3
    Residential.elevatorList[1].currentFloor = 3
    Residential.elevatorList[1].direction = 0
    # Someone is on the 1st floor and requests the 6th floor.
    # Elevator B should be sent.
    Residential.requestElevator(1, 1).requestFloor(6)
    # 2 minuteslater, someone else is on the 3rd floor and requeststhe5thfloor.
    # Elevator B should be sent.
    Residential.requestElevator(3, 1).requestFloor(5)
    # Finally, a third person is at floor 9 and wants to go down to the 2nd floor.
    # Elevator A should be sent.
    Residential.requestElevator(9, -1).requestFloor(2)
    print("""Scenario over""")


def third_scenario():
    print("""Hello dear customer, we are now starting scenario 3""")
    # Elevator A is Idle at floor 10
    Residential.elevatorList[0].currentFloor = 10
    Residential.elevatorList[0].direction = 0
    # Elevator B is Moving from floor 3 to floor 6
    Residential.elevatorList[1].currentFloor = 3
    Residential.elevatorList[1].direction = 1
    Residential.elevatorList[1].upQueue = [6]
    # Someone is on floor 3 and requests the 2nd floor.
    # Elevator A should be sent.
    Residential.requestElevator(3, -1).requestFloor(2)
    # 5 minutes later, someone else is on the 10th floor and wants to go to the 3rd.
    # Elevator B should be sent.
    Residential.elevatorList[1].currentFloor = 6
    Residential.elevatorList[1].direction = 0
    Residential.elevatorList[1].upQueue = []
    Residential.requestElevator(10, -1).requestFloor(3)
    print("""Scenario over""")


# # Uncomment to test:
# first_scenario()
# second_scenario()
third_scenario()
