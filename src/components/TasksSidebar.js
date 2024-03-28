import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const TasksSidebar = ({ todaysTasks, weeksTasks }) => {
  const [showTodaysTasks, setShowTodaysTasks] = useState(false);
  const [showWeeksTasks, setShowWeeksTasks] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-bold text-lg"
          onClick={() => setShowTodaysTasks(!showTodaysTasks)}
        >
          Today's Tasks
          <span>{showTodaysTasks ? '▲' : '▼'}</span>
        </button>
        <Transition
          show={showTodaysTasks}
          enter="transition ease-out duration-300"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <ul className="mt-2">
            {todaysTasks.map((task, index) => (
              <li key={index} className="py-1">{task.title}</li>
            ))}
          </ul>
        </Transition>
      </div>
      <div className="mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-bold text-lg"
          onClick={() => setShowWeeksTasks(!showWeeksTasks)}
        >
          Week at a Glance
          <span>{showWeeksTasks ? '▲' : '▼'}</span>
        </button>
        <Transition
          show={showWeeksTasks}
          enter="transition ease-out duration-300"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <ul className="mt-2">
            {weeksTasks.map((task, index) => (
              <li key={index} className="py-1">{task.title}</li>
            ))}
          </ul>
        </Transition>
      </div>
    </div>
  );
};

export default TasksSidebar;
