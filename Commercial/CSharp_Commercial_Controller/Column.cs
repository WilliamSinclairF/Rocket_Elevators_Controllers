using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Commercial_Controller
{
    public class Column
    {

        public Battery Battery;
        public int Id;
        public int ElevatorNumber;
        public int MinimumFloor;
        public int MaximumFloor;
        public List<Elevator> ElevatorList;


        public Column(Battery Battery, int Id, int ElevatorNumber, int MinimumFloor, int MaximumFloor)
        {
            this.Battery = Battery;
            this.Id = Id;
            this.ElevatorNumber = ElevatorNumber;
            this.MinimumFloor = MinimumFloor;
            this.MaximumFloor = MaximumFloor;
            this.ElevatorList = new List<Elevator>();
            this.CreateElevators();
        }

        public void CreateElevators()
        {
            for (var i = 0; i < ElevatorNumber; i++)
            {
                var gapPerElevator = 1 + ((this.MaximumFloor - this.MinimumFloor) / this.ElevatorNumber * i - 1);
                var defaultFloor = this.MinimumFloor + gapPerElevator;
                this.ElevatorList.Add(new Elevator(i, i, defaultFloor, defaultFloor));
            }
        }

        public List<Elevator> FindElevatorsByDirection(int elevatorDirection)
        {
            var moving = (from e in this.ElevatorList
                          where e.Direction == elevatorDirection
                          select e).ToList();

            var idle = (from e in this.ElevatorList
                        where e.Direction == 0
                        select e).ToList();

            Console.WriteLine("Moving" + moving.Count);
            Console.WriteLine("IDLE" + idle.Count);

            foreach (var e in moving)
            {
                Console.WriteLine(e.ElevatorId);
            }

            foreach (var e in idle)
            {
                Console.WriteLine(e.ElevatorId);

            }

            Console.WriteLine("Column" + this.Id);

            return moving.Count > 0 ? moving : idle;
        }

        public Elevator FindNearestElevator(int requestLocation, int requestDirection)
        {
            var foundElevators = this.FindElevatorsByDirection(requestDirection);
            foundElevators.ForEach(e => e.Distance = Math.Abs(e.CurrentFloor - requestLocation));
            var nearest = foundElevators.Aggregate((a, b) => a.Distance < b.Distance ? a : b);
            Console.WriteLine($"Distance: {nearest.Distance}, ID: {nearest.ElevatorId}, Column: {nearest.ColumnId}");
            nearest.AddToQueue(requestLocation);
            return nearest;
        }
    }
}
