﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Commercial_Controller
{
    public class Building
    {
        public int Floors;
        public int Basements;

        public Building(int Floors, int Basements)
        {
            this.Floors = Floors;
            this.Basements = Basements;
        }
    }
}
