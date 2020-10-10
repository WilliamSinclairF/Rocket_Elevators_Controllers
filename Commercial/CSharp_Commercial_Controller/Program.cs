using System;

namespace CSharp_Commercial_Controller
{
    class Program
    {
        static void Main(string[] args)
        {
            var comControl = new Battery(new Building(66, 6), 4, 20);

            ////First Scenario
            //comControl.ColumnList[1].ElevatorList[0].CurrentFloor = 20;
            //comControl.ColumnList[1].ElevatorList[0].Direction = -1;
            //comControl.ColumnList[1].ElevatorList[0].AddToQueue(5);

            //comControl.ColumnList[1].ElevatorList[1].CurrentFloor = 3;
            //comControl.ColumnList[1].ElevatorList[1].Direction = 1;
            //comControl.ColumnList[1].ElevatorList[1].AddToQueue(15);

            //comControl.ColumnList[1].ElevatorList[2].CurrentFloor = 13;
            //comControl.ColumnList[1].ElevatorList[2].Direction = -1;
            //comControl.ColumnList[1].ElevatorList[2].AddToQueue(0);

            //comControl.ColumnList[1].ElevatorList[3].CurrentFloor = 15;
            //comControl.ColumnList[1].ElevatorList[3].Direction = -1;
            //comControl.ColumnList[1].ElevatorList[3].AddToQueue(1);

            //comControl.ColumnList[1].ElevatorList[4].CurrentFloor = 6;
            //comControl.ColumnList[1].ElevatorList[4].Direction = -1;
            //comControl.ColumnList[1].ElevatorList[4].AddToQueue(0);

            //comControl.ColumnList[1].RequestElevator(0, 1).RequestFloor(20);


            ////Second Scenario
            //comControl.ColumnList[2].ElevatorList[0].CurrentFloor = 0;
            //comControl.ColumnList[2].ElevatorList[0].Direction = 0;
            //comControl.ColumnList[2].ElevatorList[0].UpQueue.Add(21);

            //comControl.ColumnList[2].ElevatorList[1].CurrentFloor = 23;
            //comControl.ColumnList[2].ElevatorList[1].Direction = 1;
            //comControl.ColumnList[2].ElevatorList[1].UpQueue.Add(28);

            //comControl.ColumnList[2].ElevatorList[2].CurrentFloor = 33;
            //comControl.ColumnList[2].ElevatorList[2].Direction = -1;
            //comControl.ColumnList[2].ElevatorList[2].DownQueue.Add(0);

            //comControl.ColumnList[2].ElevatorList[3].CurrentFloor = 40;
            //comControl.ColumnList[2].ElevatorList[3].Direction = -1;
            //comControl.ColumnList[2].ElevatorList[3].DownQueue.Add(24);

            //comControl.ColumnList[2].ElevatorList[4].CurrentFloor = 39;
            //comControl.ColumnList[2].ElevatorList[4].Direction = -1;
            //comControl.ColumnList[2].ElevatorList[4].DownQueue.Add(0);

            //comControl.ColumnList[2].RequestElevator(0, 1).RequestFloor(36);
            //comControl.ColumnList[2].ElevatorList[1].CombinedMethods();
            //comControl.ColumnList[2].ElevatorList[2].CombinedMethods();
            //comControl.ColumnList[2].ElevatorList[3].CombinedMethods();
            //comControl.ColumnList[2].ElevatorList[4].CombinedMethods();



            //// Third scenario

            //comControl.ColumnList[3].ElevatorList[0].CurrentFloor = 58;
            //comControl.ColumnList[3].ElevatorList[0].Direction = -1;
            //comControl.ColumnList[3].ElevatorList[0].DownQueue.Add(0);

            //comControl.ColumnList[3].ElevatorList[1].CurrentFloor = 50;
            //comControl.ColumnList[3].ElevatorList[1].Direction = 1;
            //comControl.ColumnList[3].ElevatorList[1].UpQueue.Add(60);

            //comControl.ColumnList[3].ElevatorList[2].CurrentFloor = 46;
            //comControl.ColumnList[3].ElevatorList[2].Direction = 1;
            //comControl.ColumnList[3].ElevatorList[2].UpQueue.Add(58);

            //comControl.ColumnList[3].ElevatorList[3].CurrentFloor = 0;
            //comControl.ColumnList[3].ElevatorList[3].Direction = 1;
            //comControl.ColumnList[3].ElevatorList[3].UpQueue.Add(54);

            //comControl.ColumnList[3].ElevatorList[4].CurrentFloor = 60;
            //comControl.ColumnList[3].ElevatorList[4].Direction = -1;
            //comControl.ColumnList[3].ElevatorList[4].DownQueue.Add(0);

            //comControl.ColumnList[3].RequestElevator(54, -1).AddToQueue(0);
            //comControl.ColumnList[3].ElevatorList[0].CombinedMethods();
            //comControl.ColumnList[3].ElevatorList[1].CombinedMethods();
            //comControl.ColumnList[3].ElevatorList[2].CombinedMethods();
            //comControl.ColumnList[3].ElevatorList[3].CombinedMethods();
            //comControl.ColumnList[3].ElevatorList[4].CombinedMethods();


            //// Fourth scenario
            //comControl.ColumnList[0].ElevatorList[0].CurrentFloor = -4;
            //comControl.ColumnList[0].ElevatorList[0].Direction = 0;

            //comControl.ColumnList[0].ElevatorList[1].CurrentFloor = 0;
            //comControl.ColumnList[0].ElevatorList[1].Direction = 0;

            //comControl.ColumnList[0].ElevatorList[2].CurrentFloor = -3;
            //comControl.ColumnList[0].ElevatorList[2].Direction = -1;
            //comControl.ColumnList[0].ElevatorList[2].DownQueue.Add(-5);

            //comControl.ColumnList[0].ElevatorList[3].CurrentFloor = -6;
            //comControl.ColumnList[0].ElevatorList[3].Direction = 1;
            //comControl.ColumnList[0].ElevatorList[3].UpQueue.Add(0);

            //comControl.ColumnList[0].ElevatorList[4].CurrentFloor = -1;
            //comControl.ColumnList[0].ElevatorList[4].Direction = -1;
            //comControl.ColumnList[0].ElevatorList[4].DownQueue.Add(-6);

            //comControl.ColumnList[0].RequestElevator(-3, 1).RequestFloor(0);
            //comControl.ColumnList[0].ElevatorList[0].CombinedMethods();
            //comControl.ColumnList[0].ElevatorList[1].CombinedMethods();
            //comControl.ColumnList[0].ElevatorList[2].CombinedMethods();
            //comControl.ColumnList[0].ElevatorList[3].CombinedMethods();
            //comControl.ColumnList[0].ElevatorList[4].CombinedMethods();


            Console.ReadLine();

        }
    }
}
