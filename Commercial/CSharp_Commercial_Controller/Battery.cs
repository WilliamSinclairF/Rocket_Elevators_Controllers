using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;

namespace CSharp_Commercial_Controller
{
    public class Battery
    {
        public Building Building;
        public int FirstFloor;
        public List<Column> ColumnList;
        public int TotalColumns;
        public int TotalElevators;
        public bool IsPoweredOn = false;

        public Battery(Building Building, int TotalColumns, int TotalElevators)
        {
            this.Building = Building;
            this.FirstFloor = Building.Basements + 1;
            this.TotalColumns = TotalColumns;
            this.TotalElevators = TotalElevators;
            this.ColumnList = new List<Column>();
            this.CreateColumns();
        }

        public void TogglePower()
        {
            this.IsPoweredOn = !this.IsPoweredOn;
            String message = IsPoweredOn ? "Power On" : "Power Off";
            Console.WriteLine("Battery: " + message);
        }


        public void CreateColumns()
        {
            for (var i = 0; i < TotalColumns; i++)
            {
                var floorsPerColumn = (Building.Floors - Building.Basements) / (TotalColumns - 1);
                var elevatorsPerColumn = TotalElevators / TotalColumns;
                switch (i)
                {
                    case 0:
                        this.ColumnList.Add(new Column(this, i, elevatorsPerColumn, -6, 0));
                        break;

                    case 1:
                        this.ColumnList.Add(new Column(this, i, elevatorsPerColumn, 0,
                            floorsPerColumn));
                        break;

                    default:
                        var minimum = this.ColumnList[i - 1].MaximumFloor + 1;
                        var maximum = this.ColumnList[i - 1].MaximumFloor + floorsPerColumn;
                        this.ColumnList.Add(new Column(this, i, elevatorsPerColumn, minimum, maximum));
                        break;
                }
            }
        }

        public Column FindColumn(int requestOrigin, int requestDirection)
        {
            var col = (from c in this.ColumnList
                       where requestOrigin >= c.MinimumFloor && requestOrigin <= c.MaximumFloor
                       select c).Single();

            col.FindNearestElevator(requestOrigin, requestDirection);

            return col;
        }


        public void ColumnInfo()
        {
            foreach (var c in ColumnList)
            {
                Console.WriteLine($"Column ID:{c.Id}\n" +
                                  $"Min floor: {c.MinimumFloor}\n" +
                                  $"Max floor: {c.MaximumFloor}\n" +
                                  $"Elevator number: {c.ElevatorNumber}\n");
                foreach (Elevator e in c.ElevatorList)
                {
                    Console.WriteLine($"Elevator ID: {e.ElevatorId}\n" +
                                      $"Current floor: {e.CurrentFloor}\n" +
                                      $"Default floor: {e.DefaultFloor}\n" +
                                      $"Direction: {e.Direction}\n" +
                                      $"Distance: {e.Distance}\n" +
                                      $"Up queue:");
                    foreach (var stopsUp in e.UpQueue)
                    {
                        Console.WriteLine(stopsUp);
                    }

                    Console.WriteLine($"Down queue:");
                    foreach (var stopsDown in e.DownQueue)
                    {
                        Console.WriteLine(stopsDown);
                    }

                    Console.WriteLine();
                }
            }
        }
    }
}