class Building
  attr_reader :floors, :basements
  def initialize(floors, basements)
    @floors = floors
    @basements = basements
  end
end

class Controller
  attr_reader :elevator_list
  attr_writer :elevator_list
  def initialize(building, elevator_number)
    @building = building
    @elevator_number = elevator_number
    @elevator_list = []
    create_elevators
  end

  def create_elevators
    @elevator_number.times do |i|
      floor_gap = @building.floors / @elevator_number * i
      elevator_list.append(Elevator.new(i, 1 + floor_gap, 1 + floor_gap))
    end
  end

  def find_elevators_by_direction(elevator_direction)
    same_direction = @elevator_list.select { |elevator| elevator.direction == elevator_direction }
    idle = @elevator_list.select { |elevator| elevator.direction.zero? }
    if same_direction.length > 0
      return same_direction
    else
      return idle
    end
  end

  def find_nearest_elevator(elevator_direction, request_location)
    elevators = find_elevators_by_direction(elevator_direction)
    elevators.each { |elevator| elevator.distance_score = (request_location - elevator.current_floor).abs }
    return elevators.min { |a, b| a.distance_score <=> b.distance_score }
  end

  def request_elevator(request_location, request_direction)
    filtered_elevator = find_nearest_elevator(request_direction, request_location)
    if filtered_elevator.current_floor > request_location
      puts '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
      puts '~~~~~~~~~~~~~~~~Elevator Requested~~~~~~~~~~~~~~~~~'
      puts "#{filtered_elevator.who_am_i} responded and is headed to floor: #{request_location}"
      puts '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
      filtered_elevator.down_queue.append(request_location)
      filtered_elevator.set_direction
      filtered_elevator.request_this_elevator
      return filtered_elevator
    elsif filtered_elevator.current_floor < request_location
      puts '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
      puts '~~~~~~~~~~~~~~~~Elevator Requested~~~~~~~~~~~~~~~~~'
      puts "#{filtered_elevator.who_am_i} responded and is headed to floor: #{request_location}"
      puts '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
      filtered_elevator.up_queue.append(request_location)
      filtered_elevator.set_direction
      filtered_elevator.request_this_elevator
      return filtered_elevator
    elsif filtered_elevator.current_floor == request_location
      puts "Floor was requested, #{filtered_elevator.id} opened its doors as it was already on floor #{
             request_location
           }"
    end
  end
end

class Elevator
  attr_reader :direction, :current_floor, :distance_score, :id, :up_queue, :down_queue, :who_am_i
  attr_writer :current_floor, :direction, :distance_score, :up_queue, :down_queue
  def initialize(id, current_floor, default_floor)
    @id = id
    @current_floor = current_floor
    @default_floor = default_floor
    @direction = 0
    @distance_score = 0
    @up_queue = []
    @down_queue = []
  end

  def who_am_i()
    return "Elevator #{(65 + self.id).chr}"
  end

  def where_am_i()
    return "Current floor: #{self.current_floor} direction: #{self.direction}"
  end

  def where_to_now()
    return "Next stops up: #{self.up_queue}, down: #{self.down_queue}"
  end

  def here()
    puts "#{self.who_am_i} arrived at it's destination"
  end

  def status_update()
    puts('...')
    puts "#{self.who_am_i}:"
    puts "#{self.where_am_i}"
    puts "#{self.where_to_now}"
  end

  def a_floor_was_requested(floor)
    puts '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
    puts '~~~~~~~~~~~Floor Request Button Pressed~~~~~~~~~~~~'
    puts "#{self.who_am_i}: Added floor #{floor} to it's queue"
    puts '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
  end

  def set_direction()
    case self.direction
    when 0
      if self.up_queue.length > self.down_queue.length
        self.direction = 1
      elsif self.up_queue.length < self.down_queue.length
        self.direction = -1
      else
        self.direction = 0
      end
    when 1
      if self.up_queue.length > 0
        self.direction = 1
      elsif self.up_queue.length == 0
        if self.down_queue.length > 0
          self.direction = -1
        else
          self.direction = 0
        end
      end
    when -1
      if self.down_queue.length > 0
        self.direction = -1
      elsif self.down_queue.length == 0
        if self.up_queue.length > 0
          self.direction = 1
        else
          self.direction = 0
        end
      end
    end

    def request_this_elevator()
      self.set_direction
      self.status_update
      case self.direction
      when 0
        self.set_direction
      when 1
        if self.current_floor == self.up_queue[0]
          self.up_queue.shift
          self.status_update
          if self.down_queue.length + self.up_queue.length == 0
            self.direction = 0
            self.status_update
            self.here
          end
        else
          self.current_floor = self.current_floor + 1

          if self.up_queue.length > 0
            return self.request_this_elevator
          else
            self.direction = 0
          end
        end
      when -1
        if self.current_floor == self.down_queue[0]
          self.down_queue.shift
          self.status_update
          if self.down_queue.length + self.up_queue.length == 0
            self.direction = 0
            self.status_update
            self.here
          end
        else
          self.current_floor = self.current_floor - 1
          if self.down_queue.length > 0
            return self.request_this_elevator
          else
            self.direction = 0
          end
        end
      end
    end

    def request_floor(floor)
      if floor == self.current_floor
        print self.id 'floor button pushed, we are already on this floor, opening doors'
      elsif floor > self.current_floor
        self.a_floor_was_requested(floor)
        self.up_queue.append(floor)
        self.up_queue.sort
        self.set_direction
        self.request_this_elevator
      elsif floor < self.current_floor
        self.a_floor_was_requested(floor)
        self.down_queue.append(floor)
        self.up_queue.sort.reverse
        self.set_direction
        self.request_this_elevator
      end
    end
  end
end

residential = Controller.new(Building.new(10, 0), 2)

##Scenario 1
# puts 'Scenario started'
# residential.elevator_list[0].current_floor = 2
# residential.elevator_list[0].direction = 0
# residential.elevator_list[1].current_floor = 6
# residential.elevator_list[1].direction = 0
# residential.request_elevator(3, 1).request_floor(7)
# puts 'Scenario ended'

##Scenario 2
# puts 'Scenario started'
# residential.elevator_list[0].current_floor = 10
# residential.elevator_list[0].direction = 0
# residential.elevator_list[1].current_floor = 3
# residential.elevator_list[1].direction = 0
# residential.request_elevator(1, 1).request_floor(6)
# residential.request_elevator(3, 1).request_floor(5)
# residential.request_elevator(9, -1).request_floor(2)
# puts 'Scenario ended'

##Scenario 3
# puts 'Scenario started'
# residential.elevator_list[0].current_floor = 10
# residential.elevator_list[0].direction = 0
# residential.elevator_list[1].current_floor = 3
# residential.elevator_list[1].direction = 1
# residential.elevator_list[1].up_queue = [6]
# residential.request_elevator(3, -1).request_floor(2)
# residential.elevator_list[1].current_floor = 6
# residential.elevator_list[1].direction = 0
# residential.elevator_list[1].up_queue = []
# residential.request_elevator(10, -1).request_floor(3)
# puts 'Scenario ended'
