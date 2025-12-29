import React from "react";
import ActivePregnancies from "../../assets/ActivePregnancies.png";
import CycleTracking from "../../assets/CycleTracking.png";
import MedicalReminders from "../../assets/MedicalReminders.png";
import DailyHealthHabits from "../../assets/DailyHealthHabits.png";

const StatsCards = () => {
    const statsData = [
        {
            id: 1,
            image: ActivePregnancies,
            title: "Active Pregnancies",
            value: "1,240",
            sub: "↑ 12.5% from last month",
        },
        {
            id: 2,
            image: CycleTracking,
            title: "Cycle Tracking",
            value: "8,950",
            sub: "↑ 32,410 logs this month",
        },
        {
            id: 3,
            image: MedicalReminders,
            title: "Medical Reminders",
            value: "14,200",
            sub: "68% completion rate",
        },
        {
            id: 4,
            image: DailyHealthHabits,
            title: "Daily Health Habits",
            value: "52,300",
            sub: "Includes water, sleep & exercise",
        },
    ];

    return (
        <div className="w-full mt-8">
            {/* Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {statsData.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all"
                    >
                        {/* Text */}
                        <div className="flex flex-col">
                            <p className="text-gray-600 text-sm font-medium">{item.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {item.value}
                            </h3>
                            <p className="text-green-600 text-xs font-medium mt-1">
                                {item.sub}
                            </p>
                        </div>


                        {/* Icon */}
                        <div className=" rounded-full flex items-center justify-center ">
                            <img src={item.image} alt={item.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsCards;
