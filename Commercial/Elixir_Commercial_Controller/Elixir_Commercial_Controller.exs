# Hello! Please scroll down until you reach the scenarios to find your instructions
# This is the result of about 20-30 hours of trying to find decent documentation and trying out a bunch of different things.
# It's not great but it works - sort of!

defmodule Move do
  def move(id, current_floor, target_floor) do
    IO.puts("Elevator #{id} is moving from floor #{current_floor} to floor #{target_floor}")

    if current_floor > target_floor do
      floor = current_floor - 1
      IO.puts("going down")

      if current_floor != target_floor do
        move(id, floor, target_floor)
      end
    else
      floor = current_floor + 1
      IO.puts("going up")

      if current_floor != target_floor do
        move(id, floor, target_floor)
      end
    end
  end

  def direction(current_floor, target_floor) do
    if current_floor == target_floor do
      direction = 0
    end

    if current_floor > target_floor do
      direction = -1
    end

    if current_floor < target_floor do
      direction = 1
    end
  end
end

defmodule Com do
  def main do
    # # # # SCENARIO 1
    # ~~~~~~~~~UNCOMMENT FROM HERE~~~~~~~~~
    # requestedFloor = 20
    # request_location = 1
    # direction = 1

    # elevators = [
    #   %{id: "B1", floor: 20, target_floor: 5, direction: -1, distance: 0},
    #   %{id: "B2", floor: 3, target_floor: 15, direction: 1, distance: 0},
    #   %{id: "B3", floor: 13, target_floor: 1, direction: -1, distance: 0},
    #   %{id: "B4", floor: 15, target_floor: 2, direction: -1, distance: 0},
    #   %{id: "B5", floor: 6, target_floor: 1, direction: -1, distance: 0}
    # ]

    # ~~~~~~~~~TO HERE~~~~~~~~~

    # # # # SCENARIO 2
    # ~~~~~~~~~UNCOMMENT FROM HERE~~~~~~~~~
    # requestedFloor = 36
    # request_location = 0
    # direction = 1

    # elevators = [
    #   %{id: "C1", floor: 1, target_floor: 21, direction: 1, distance: 0},
    #   %{id: "C2", floor: 23, target_floor: 28, direction: 1, distance: 0},
    #   %{id: "C3", floor: 33, target_floor: 0, direction: -1, distance: 0},
    #   %{id: "C4", floor: 40, target_floor: 24, direction: -1, distance: 0},
    #   %{id: "C5", floor: 39, target_floor: 1, direction: -1, distance: 0}
    # ]

    # ~~~~~~~~~TO HERE~~~~~~~~~

    # # # # SCENARIO 3 (NOT RETURNING THE RIGHT ELEVATOR)
    # ~~~~~~~~~UNCOMMENT FROM HERE~~~~~~~~~
    # requestedFloor = 0
    # request_location = 54
    # direction = -1

    # elevators = [
    #   %{id: "D1", floor: 58, target_floor: 1, direction: -1, distance: 0},
    #   %{id: "D2", floor: 50, target_floor: 60, direction: 1, distance: 0},
    #   %{id: "D3", floor: 46, target_floor: 58, direction: 1, distance: 0},
    #   %{id: "D4", floor: 1, target_floor: 54, direction: 1, distance: 0},
    #   %{id: "D5", floor: 60, target_floor: 1, direction: -1, distance: 0}
    # ]

    # ~~~~~~~~~TO HERE~~~~~~~~~

    # copies the elevators from the list above and calculates the distance of
    # each elevator based on their current floor, the requested floor and the request location.

    elevators_with_distance =
      Enum.map(elevators, fn el ->
        Map.update!(el, :distance, fn dist ->
          dist = el.floor + el.target_floor - request_location
        end)
      end)

    IO.inspect(elevators_with_distance)

    # filtered = Enum.reject(elevators_with_distance, fn e -> e.direction != direction end)

    {_, elevators_with_distance} =
      Enum.reduce(Enum.reverse(elevators_with_distance), {nil, []}, fn
        %{distance: distance} = v, {c, a} when distance < c -> {distance, [v]}
        %{distance: distance} = v, {distance, a} -> {distance, [v | a]}
        _, acc -> acc
      end)

    # The previous manipulations returned a list of 1 item (our nearest elevator), we take it out of the
    # list with Enum.fetch so that we can manipulate it directly, without using a list function first

    el = Enum.fetch!(elevators_with_distance, 0)
    IO.inspect(el)

    # last step is taking the nearest elevator and making it move to the request location followed by the requested floor

    moved = %{
      el
      | floor: Move.move(el.id, el.floor, request_location),
        direction: Move.direction(el.floor, request_location),
        distance: 0
    }

    atFloor = %{
      moved
      | floor: Move.move(moved.id, request_location, requestedFloor),
        direction: Move.direction(el.floor, requestedFloor),
        distance: 0
    }

    IO.inspect(atFloor)
  end
end

Com.main()
