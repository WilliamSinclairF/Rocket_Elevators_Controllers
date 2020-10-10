# Purpose of this repo:

All the code you will find within this repo was written over the course of two weeks while at the CodeBoxx bootcamp.

We first spent one week designing the logic of each program through pseudo code, we spent the next week implementing the logic of a residential elevator controller in
Javascript, Python and a "bonus" of Ruby for those who still had time, which I managed to complete. The program had to manage two elevators.

The final week involved compiled languages and we were asked to design a commercial elevator controller for high rise buildings. The program now had to manage 20 elevators.
The commercial program had to be written in C# and Go and additional "points" were offered to those that could also implement the program in Java and Elixir. This week was certainly the most challenging one to date as I had never used any of these languages in the past. In the end, I was able to successfully implement the algorithm in C#, Java, Go and partly in Elixir.

Elixir was especially challenging as it is a newer language (though it is based on Erlang which is a few decades old) and doesn't have as much documentation as the Javascripts of the world - Not to mention the fact that it is based around functional programming which is a paradigm I did not know a lot about. After several failures and a lot of team work, I was able to implement a very basic Elixir algorithm. It is not able to go through all the scenarios we were given but still, it's something!

After doing all this work with new languages, the Javascript lover in me (I know) wanted to go back to something JS-ish. I ended writing a TypeScript version of the Java code and tweaked it a little as well. I think it's my favorite one! TypeScript is technically a compiled language, right? 😁

## 🚀 Residential Elevator Controllers - HOW TO USE : 🚀

### Looking for commercial? Keep scrolling going down

#### Try out the interactive JS interface at:

https://williamsinclairf.github.io/Rocket_Elevators_Controllers/

Source code available here:

https://github.com/WilliamSinclairF/Rocket_Elevators_Controllers/tree/master/docs

#### ...Or do one of the following:

### Javascript:

1. Open 'Residential.js'
2. Scroll all the way down
3. Uncomment one of the following:
4. - Residential.Scenario1()
   - Residential.Scenario2()
   - Residential.Scenario3()
5. Open 'ResidentialJS.html' or run '\$ `node Residential.js`'.

### Python:

1. Open 'Residential.py'
2. Scroll all the way down
3. Uncomment one of the following:
4. - first_scenario()
   - second_scenario()
   - third_scenario()
5. run 'Residential.py' using your interpreter of choice.

### Ruby:

1. Open 'Residential.rb'
2. Scroll all the way down
3. Uncomment your scenario of choice
4. Run 'Residential.rb' using your interpreter of choice.




## 🚀 Commercial Elevator Controllers - HOW TO USE: 🚀

### C#:
1. Clone the repo
2. Open the Commercial folder
3. Open 'CSharp_Commercial_Controller' in your IDE of choice - Visual Studio recommended.
   - If using Visual Studio, click on CSharp_Commercial_Controller.sln beforehand.
4. Uncomment your desired scenario in Program.cs.
5. Compile & run.

### Java:
1. Clone the repo
2. Open the Commercial folder
3. Open 'Java_Commercial_Controller' in your IDE of choice - IntelliJ or Eclipse recommended.
4. Navigate to 'src/tech/rocketelevators/'
5. Uncomment your desired scenario in Main.java
6. Compile & run.

### Go:
1. Clone the repo
2. Open the Commercial folder
3. Open 'Go_Commercial_Controller' in your IDE of choice
   - You'll probably have to put the folder in your Go PATH.
5. Uncomment your desired scenario in main.go
6. Compile & run.

### Elixir (only supports first two scenarios)
1. Clone the repo
2. Open the Commercial folder
3. Open 'Elixir_Commercial_Controller' in your IDE of choice
4. Uncomment your desired scenario in Elixir_Commercial_Controller.exs
5. Make sure you have Elixir installed - https://elixir-lang.org/install.html
6. Using your terminal of choice - standard CMD seems to work best on windows - run: '`elixir Elixir_Commercial_Controller.exs`'

### TypeScript:
1. Clone the repo
2. Open the Commercial folder
3. Open 'TypeScript_Commercial_Controller' in your IDE of choice
5. Uncomment your desired scenario in Controller.ts
6. Make sure you have TypeScript installed - https://www.typescriptlang.org/download
7. Compile using tsc - if you're not familiar with TS, https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html goes through the procedure.
8. run $ `node Controller.js`
   - if you have ts-node installed, you can also run $ `ts-node Controller.ts`


In need of an elevator solution? https://rocketelevators.tech/ has you covered...