"use client";

import { useState } from "react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as SolidCheckCircleIcon } from "@heroicons/react/24/solid";

interface Task {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  type: "monthly" | "annual";
}

export default function ComplianceChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "vat-return",
      title: "Submit Mushak 9.1 (Monthly VAT Return)",
      deadline: "15th of next month",
      completed: false,
      type: "monthly"
    },
    {
      id: "vds-cert",
      title: "Issue VDS Certificate (Mushak 6.6)",
      deadline: "Within 3 days of deduction",
      completed: false,
      type: "monthly"
    },
    {
      id: "tax-return",
      title: "File Annual Income Tax Return",
      deadline: "30th November (General)",
      completed: false,
      type: "annual"
    },
    {
      id: "audit-report",
      title: "Submit Audited Financials",
      deadline: "With Income Tax Return",
      completed: false,
      type: "annual"
    }
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const monthlyTasks = tasks.filter(t => t.type === "monthly");
  const annualTasks = tasks.filter(t => t.type === "annual");

  const TaskList = ({ items, title, icon: Icon, color }: { items: Task[], title: string, icon: any, color: string }) => (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className={`p-2 rounded-lg ${color.replace('text', 'bg').replace('600', '100')}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      
      <ul className="space-y-4">
        {items.map((task) => (
          <li 
            key={task.id}
            className={`flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer border ${
              task.completed ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="shrink-0 mt-0.5">
              {task.completed ? (
                <SolidCheckCircleIcon className="h-6 w-6 text-emerald-500" />
              ) : (
                <CheckCircleIcon className="h-6 w-6 text-slate-300" />
              )}
            </div>
            <div>
              <p className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                {task.title}
              </p>
              <p className="text-sm flex items-center gap-1 mt-1 text-slate-500">
                <ClockIcon className="h-4 w-4" />
                Due: {task.deadline}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Compliance Checklist</h1>
          <p className="text-slate-600 text-lg">Never miss a deadline. Keep track of your monthly and annual tax obligations.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <TaskList 
            title="Monthly Obligations" 
            items={monthlyTasks} 
            icon={ClockIcon} 
            color="text-blue-600" 
          />
          <TaskList 
            title="Annual Obligations" 
            items={annualTasks} 
            icon={CheckCircleIcon} 
            color="text-emerald-600" 
          />
        </div>
      </div>
    </div>
  );
}
