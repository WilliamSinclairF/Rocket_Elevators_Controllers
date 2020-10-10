using System;
using System.Collections.Generic;
using System.Linq;

namespace CSharp_Commercial_Controller
{
    public class Column
    {
        public Battery battery;
        public int Id;
        public int ElevatorNumber;
        public int MinimumFloor;
        public int MaximumFloor;
        public List<Elevator> ElevatorList;


        public Column(Battery battery, int Id, int ElevatorNumber, int MinimumFloor, int MaximumFloor)
        {
            this.battery = battery;
            this.Id = Id;
            this.ElevatorNumber = ElevatorNumber;
            this.MinimumFloor = MinimumFloor;
            this.MaximumFloor = MaximumFloor;
            this.ElevatorList = new List<Elevator>();
            this.CreateElevators();
        }

        // makes elevators based on the elevator number passed to the constructor

        public void CreateElevators()
        {
            for (var i = 0; i < ElevatorNumber; i++)
            {
                var gapPerElevator = 1 + ((this.MaximumFloor - this.MinimumFloor) / this.ElevatorNumber * i - 1);
                var defaultFloor = this.MinimumFloor + gapPerElevator;
                this.ElevatorList.Add(new Elevator(i + 1, this.Id, defaultFloor, defaultFloor));
            }
        }

        // returns elevators going in the same direction if there are any, returns idle otherwise

        public List<Elevator> FindElevatorsByDirection(int elevatorDirection, int requestLocation)
        {
            var moving = elevatorDirection == 1
                ? (from e in this.ElevatorList
                   where e.Direction == 1 && e.CurrentFloor <= requestLocation
                   select e).ToList()
                : (from e in this.ElevatorList
                   where e.Direction == -1 && e.CurrentFloor >= requestLocation
                   select e).ToList();

            var idle = (from e in this.ElevatorList
                        where e.Direction == 0
                        select e).ToList();

            return moving.Count > 0 ? moving : idle;
        }

        // compares the distance of each elevator, returns the nearest one and sends it to the location of the request

        public Elevator RequestElevator(int requestLocation, int requestDirection)
        {
            var foundElevators = this.FindElevatorsByDirection(requestDirection, requestLocation);

            foundElevators.ForEach(e => e.Distance = Math.Abs(e.CurrentFloor - requestLocation));
            var nearest = foundElevators.Aggregate((a, b) => a.Distance < b.Distance ? a : b);
            nearest.AddToQueue(requestLocation);
            return nearest;
        }
    }
}