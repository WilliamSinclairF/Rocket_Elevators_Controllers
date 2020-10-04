using System;
using System.Collections.Generic;
using System.Text;

namespace Commercial_Controller
{
    public class Elevator
    {
        public override string ToString()
        {
            return
                $"{nameof(ElevatorId)}: {this.ElevatorId}, {nameof(ColumnId)}: {this.ColumnId}, {nameof(CurrentFloor)}: {this.CurrentFloor}, {nameof(DefaultFloor)}: {this.DefaultFloor}, {nameof(Direction)}: {this.Direction}, {nameof(Distance)}: {this.Distance}, {nameof(UpQueue)}: {this.UpQueue}, {nameof(DownQueue)}: {this.DownQueue}";
        }

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


        public void StatusUpdate()
        {
            Console.WriteLine(
                ToString());
        }


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

        public void CombinedMethods()
        {
            this.StatusUpdate();
            this.SortQueues();
            this.SetDirection();
            this.requestThisElevator();
        }

        public void SortQueues()
        {
            this.UpQueue.Sort();
            this.DownQueue.Reverse();
        }


        public void SetDirection()
        {
            switch (this.Direction)
            {
                case 0:
                    this.Direction = this.UpQueue.Count > this.DownQueue.Count ? 1 : -1;
                    break;

                case 1:
                    if (this.UpQueue.Count == 0)
                    {
                        this.Direction = this.DownQueue.Count == 0 ? 0 : -1;
                    }
                    break;

                case -1:
                    if (this.DownQueue.Count == 0)
                    {
                        this.Direction = this.UpQueue.Count == 0 ? 0 : 1;
                    }
                    break;

                default:
                    break;
            }
        }

        public void requestThisElevator()
        {
            this.SetDirection();
            this.StatusUpdate();
            switch (this.Direction)
            {
                case 1:

                    if (this.CurrentFloor == this.UpQueue[0])
                        this.UpQueue.RemoveAt(0);
                    else
                    {
                        this.CurrentFloor++;
                    }
                    if (this.UpQueue.Count > 0)
                    {
                        this.requestThisElevator();
                    }
                    else
                    {
                        this.Direction = 0;
                        this.StatusUpdate();
                    }
                    break;

                case -1:
                    if (this.CurrentFloor == this.DownQueue[0])
                        this.DownQueue.RemoveAt(0);
                    else
                    {
                        this.CurrentFloor--;
                    }
                    if (this.DownQueue.Count > 0)
                    {
                        this.requestThisElevator();
                    }
                    else
                    {
                        this.Direction = 0;
                        this.StatusUpdate();
                    }
                    break;

                default:
                    break;

            }
        }

        public void RequestFloor(int floor)
        {
            if (floor == this.CurrentFloor)
            {
                Console.WriteLine($"Floor {floor} requested, elevator {this.ElevatorId} was already on that floor and opened it's doors\n");
            }

            else
            {
                Console.WriteLine($"Elevator {this.ElevatorId}: Floor request button pressed. Added floor {floor} to queue. \n",
                    this.ElevatorId, floor);

                this.AddToQueue(floor);
                this.StatusUpdate();
            }
        }

    }
}