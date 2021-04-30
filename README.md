# CS571-Homework-06
## Updates to Tabata Timer App
### Add Logo
Add your logo image to be displayed in the top middle section of your home screen. (Bare in mind platform compatibility)
  
### Add Inputs
Previously, we created a Tabata application that has 10 sets/cycles by default. Also a preset workout/rest time of 20/10 seconds.  
Update your Tabata application to accept the following inputs:
* Number of sets/cycles
* Number of seconds for workout
* Number of seconds for rest
  
All three inputs should be displayed in a single row, above your **Start Workout** button.
  
### Workouts List
Use Context to save all of the user's completed workouts in the form of:
```javascript
[ {year: '2020' , month: '04', day: '28', hour: '22', minute:'30'} ]
```
Use `FlatList` component to display all of the workouts When users click a button: **Previous Workouts** from your home screen.
  
### Application Sketch
```
      <LOGO>
      00:00

Sets   Workout   Rest
[10]    [20]     [10]

 <START> || <STOP>
 
<Previous Workouts>
```
