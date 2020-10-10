using System;
using System.Collections.Generic;

namespace CSharp_Commercial_Controller
{
    public class Elevator
    {
        public int ElevatorId;
        public int ColumnId;
        public int CurrentFloor;
        public int DefaultFloor;
        public int Direction;
        public int Distance;
        public List<int> UpQueue = new List<int>();
        public List<int> DownQueue = new List<int>();

        public Elevator(int elevatorId, int columnId, int currentFloor, int defaultFloor)
        {
            this.ElevatorId = elevatorId;
            this.ColumnId = columnId;
            this.CurrentFloor = currentFloor;
            this.DefaultFloor = defaultFloor;
        }

        // because everyone likes a good console log

        public override string ToString()
        {
            return
                $"Elevator: {this.ElevatorId}, " +
                $"Column: {this.ColumnId}, " +
                $"{nameof(CurrentFloor)}: {this.CurrentFloor}, " +
                $"{nameof(DefaultFloor)}: {this.DefaultFloor}, " +
                $"{nameof(Direction)}: {this.ShowDirection()}, ";
        }

        public String ShowDirection()
        {
            return this.Direction switch
            {
                0 => "Idle",
                1 => "Going up",
                -1 => "Going down",
                _ => "error",
            };
        }

        public void ShowNextStops()
        {
            switch (this.Direction)
            {
                case 1:
                    Console.WriteLine($"Elevator {this.ElevatorId} - Next floor in queue: {this.UpQueue[0]}");
                    Console.WriteLine();
                    break;
                case -1:
                    Console.WriteLine($"Elevator {this.ElevatorId} - Next floor in queue: {this.DownQueue[0]}");
                    Console.WriteLine();
                    break;
            }
        }


        public void StatusUpdate()
        {
            Console.WriteLine(
                ToString());
        }

        // adds requested location to the right queue


        public void AddToQueue(int location)
        {
            if (location > this.CurrentFloor)
            {
                this.UpQueue.Add(location);
            }
            else
            {
                this.DownQueue.Add(location);
            }

            this.CombinedMethods();
        }

        // keep things clean by putting methods in methods

        public void CombinedMethods()
        {
            this.ShowNextStops();
            this.StatusUpdate();
            this.SortQueues();
            this.SetDirection();
            this.RequestThisElevator();
        }

        // this method does what it says it does - order is reversed when going down

        public void SortQueues()
        {
            this.UpQueue.Sort();
            this.DownQueue.Reverse();
        }

        // if elevator is idle, this sets the direction of the elevator based on the length of up and down queues. otherwise, puts elevator in idle when its done.

        public void SetDirection()
        {
            switch (this.Direction)
            {
                case 0:
                    if (this.UpQueue.Count > this.DownQueue.Count)
                    {
                        this.Direction = 1;
                    }
                    else if (this.UpQueue.Count < this.DownQueue.Count)
                    {
                        this.Direction = -1;
                    }
                    break;
                case 1:
                    if (this.UpQueue.Count == 0)
                    {
                        this.Direction = this.DownQueue.Count > 0 ? -1 : 0;
                    }
                    break;
                case -1:
                    if (this.DownQueue.Count == 0)
                    {
                        this.Direction = this.UpQueue.Count > 0 ? 1 : 0;
                    }
                    break;
                default:
                    break;
            }
        }

        // moves the elevator until it reaches a requested stop. method keeps calling itself until it reaches a floor in its queue.

        public void RequestThisElevator()
        {
            this.SetDirection();
            this.StatusUpdate();
            switch (this.Direction)
            {
                case 1:

                    if (this.CurrentFloor == this.UpQueue[0])
                    {
                        Console.WriteLine();
                        Console.WriteLine("~~~~~~~~~~~~~~~~~~~Rocket Update~~~~~~~~~~~~~~~~~");
                        Console.WriteLine(
                            $"Elevator {this.ElevatorId} arrived on floor {this.UpQueue[0]} and opened it's doors.");
                        Console.WriteLine();
                        this.UpQueue.RemoveAt(0);
                    }
                    else
                    {
                        this.CurrentFloor++;
                    }

                    if (this.UpQueue.Count > 0)
                    {
                        this.RequestThisElevator();
                    }
                    else
                    {
                        this.Direction = 0;
                        this.StatusUpdate();
                    }

                    break;

                case -1:
                    if (this.CurrentFloor == this.DownQueue[0])
                    {
                        Console.WriteLine();
                        Console.WriteLine("~~~~~~~~~~~~~~~~~~~Rocket Update~~~~~~~~~~~~~~~~~");
                        Console.WriteLine(
                            $"Elevator {this.ElevatorId} arrived on floor {this.DownQueue[0]} and opened it's doors.");
                        Console.WriteLine();
                        this.DownQueue.RemoveAt(0);
                    }
                    else
                    {
                        this.CurrentFloor--;
                    }

                    if (this.DownQueue.Count > 0)
                    {
                        this.RequestThisElevator();
                    }
                    else
                    {
                        this.Direction = 0;
                        this.StatusUpdate();
                    }

                    break;
            }
        }

        // handles floor requests given to the elevator when a button within the elevator is pushed.

        public void RequestFloor(int floor)
        {
            if (floor == this.CurrentFloor)
            {
                Console.WriteLine();
                Console.WriteLine("~~~~~~~~~~~~~~~~~~~Rocket Update~~~~~~~~~~~~~~~~~");
                Console.WriteLine(
                    $"Floor {floor} requested, elevator {this.ElevatorId} was already on that floor and opened it's doors\n");
                Console.WriteLine();
            }
            else
            {
                Console.WriteLine();
                Console.WriteLine("~~~~~~~~~~~~~~~~~~~Rocket Update~~~~~~~~~~~~~~~~~");
                Console.WriteLine(
                    $"Elevator {this.ElevatorId}: Floor request button pressed. Added floor {floor} to queue. \n");
                Console.WriteLine();
                this.AddToQueue(floor);
                this.StatusUpdate();
            }
        }
    }
}