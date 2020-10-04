using System;

namespace Commercial_Controller
{
    class Program
    {
        static void Main(string[] args)
        {
            Battery comControl = new Battery(new Building(66, 6), 4, 12);
            comControl.FindColumn(60, -1).FindNearestElevator(60, -1).RequestFloor(20);
            Console.ReadLine();
        }
    }
}
