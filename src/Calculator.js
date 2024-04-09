import { memo, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  // (number * sets) gives total number of repetation to be done for each exercise
  // (number * sets * speed) gives how many repetation are performed each minute.
  // (number * sets * speed) / 60 gives total time (min) spent performing the exercises.
  // (sets - 1) gives the total number of breaks, eg, 3 sets means we need 2 breaks
  // (sets - 1) * durationBreak gives total time spent on break

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;

  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    },
    [number, sets, speed, durationBreak]
  );

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const playSound = function () {
    if (!allowSound) return;
    const sound = new Audio(clickSound);
    sound.play();
  };

  function handleDurationInc() {
    setDuration((duration) => Math.floor(duration) + 1);
    // setDuration((duration) => duration + 1);
  }

  function handleDurationDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
    // setDuration((duration) => duration - 1);
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="workout">Type of workout</label>
          <select
            id="workout"
            value={number}
            onChange={(e) => setNumber(+e.target.value)}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sets">How many sets?</label>
          <input
            id="sets"
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label htmlFor="fast">How fast are you?</label>
          <input
            id="fast"
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label htmlFor="break">Break length</label>
          <input
            id="break"
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDurationDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleDurationInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
