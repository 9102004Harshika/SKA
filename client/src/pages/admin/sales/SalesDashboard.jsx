
import React,{useState,useEffect,useRef} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  CartesianGrid,
  ScatterChart,
  Scatter,
  Treemap,
  FunnelChart,
  Funnel,
  Sankey,
} from "recharts";
import {
  BookOpen,
  ClipboardList,
  Users,
  DollarSign,
  ChevronLeft,
  Smartphone,
  Award,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };
  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth =
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

  return (
    <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-header text-primary">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-500 py-3"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`text-center py-3 text-sm rounded-xl transition-all duration-200 ${
              day === null
                ? ""
                : day === today && isCurrentMonth
                ? "bg-primary text-background font-bold shadow-lg scale-110"
                : "hover:bg-gray-50 cursor-pointer text-gray-700 hover:scale-105 hover:shadow-md"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
const Dashboard = ({ cardData = [
  {
    title: "Total Courses",
    value: 120,
    icon: BookOpen,
    change: "+12%",
    trend: "up",
  },
  {
    title: "Total Logins",
    value: 4589,
    icon: ClipboardList,
    change: "+8%",
    trend: "down",
  },
  {
    title: "Total Students",
    value: 1534,
    icon: Users,
    change: "+23%",
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "$89,345",
    icon: DollarSign,
    change: "+15%",
    trend: "up",
  },
],


revenueData = [
  { month: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
  { month: "Feb", revenue: 15000, expenses: 9500, profit: 5500 },
  { month: "Mar", revenue: 18000, expenses: 11000, profit: 7000 },
  { month: "Apr", revenue: 10000, expenses: 7500, profit: 2500 },
  { month: "May", revenue: 22000, expenses: 13000, profit: 9000 },
  { month: "Jun", revenue: 25000, expenses: 14500, profit: 10500 },
],
userActivity = [
  { day: "Mon", logins: 230, registrations: 45 },
  { day: "Tue", logins: 310, registrations: 62 },
  { day: "Wed", logins: 400, registrations: 38 },
  { day: "Thu", logins: 290, registrations: 71 },
  { day: "Fri", logins: 360, registrations: 55 },
  { day: "Sat", logins: 180, registrations: 28 },
  { day: "Sun", logins: 120, registrations: 15 },
],
pieData = [
  { name: "Paid Courses", value: 60 },
  { name: "Free Courses", value: 40 },
],
categoryData = [
  { name: "Programming", courses: 45, students: 680, revenue: 45000 },
  { name: "Design", courses: 28, students: 420, revenue: 28000 },
  { name: "Business", courses: 22, students: 320, revenue: 32000 },
  { name: "Marketing", courses: 25, students: 250, revenue: 25000 },
],
performanceData = [
  { subject: "Programming", completion: 78, satisfaction: 92 },
  { subject: "Design", completion: 85, satisfaction: 88 },
  { subject: "Business", completion: 68, satisfaction: 90 },
  { subject: "Marketing", completion: 90, satisfaction: 85 },
  { subject: "Data Science", completion: 75, satisfaction: 94 },
],
hourlyData = [
  { hour: "00", users: 12 },
  { hour: "02", users: 8 },
  { hour: "04", users: 5 },
  { hour: "06", users: 25 },
  { hour: "08", users: 180 },
  { hour: "10", users: 320 },
  { hour: "12", users: 450 },
  { hour: "14", users: 380 },
  { hour: "16", users: 290 },
  { hour: "18", users: 220 },
  { hour: "20", users: 150 },
  { hour: "22", users: 80 },
],
bestSellingCourses = [
  {
    title: "React Mastery",
    students: 340,
    price: "$59",
    rating: 4.8,
    revenue: "$20,060",
    category: "Programming",
  },
  {
    title: "Python for Data Science",
    students: 289,
    price: "$49",
    rating: 4.9,
    revenue: "$14,161",
    category: "Programming",
  },
  {
    title: "AI & ML Essentials",
    students: 270,
    price: "$79",
    rating: 4.7,
    revenue: "$21,330",
    category: "Technology",
  },
  {
    title: "Full Stack Bootcamp",
    students: 215,
    price: "$99",
    rating: 4.6,
    revenue: "$21,285",
    category: "Programming",
  },
  {
    title: "UI/UX Design Pro",
    students: 198,
    price: "$69",
    rating: 4.8,
    revenue: "$13,662",
    category: "Design",
  },
  {
    title: "Cybersecurity Basics",
    students: 156,
    price: "$89",
    rating: 4.5,
    revenue: "$13,884",
    category: "Security",
  },
],
recentCourses = [
  {
    title: "Advanced JavaScript ES6+",
    date: "Jun 10, 2025",
    instructor: "John Doe",
    status: "published",
    time: "2 days ago",
  },
  {
    title: "Vue.js Complete Guide",
    date: "Jun 08, 2025",
    instructor: "Jane Smith",
    status: "draft",
    time: "4 days ago",
  },
  {
    title: "Node.js Backend Development",
    date: "Jun 05, 2025",
    instructor: "Mike Johnson",
    status: "published",
    time: "1 week ago",
  },
  {
    title: "MongoDB Essentials",
    date: "Jun 03, 2025",
    instructor: "Sarah Wilson",
    status: "review",
    time: "1 week ago",
  },
  {
    title: "Docker & Kubernetes",
    date: "Jun 01, 2025",
    instructor: "David Brown",
    status: "published",
    time: "2 weeks ago",
  },
],
COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--tertiary))",
  "hsl(var(--accent))",
  "hsl(var(--error))",
],
courseSalesData = [
  { course: "Python Basics", sales: 120000 },
  { course: "Fullstack Web Dev", sales: 95000 },
  { course: "Data Science", sales: 150000 },
  { course: "Ethical Hacking", sales: 75000 },
  { course: "UI/UX Design", sales: 60000 },
]


}) => {
  const getDynamicSizeClass = (i) => {
    // Estimate chart complexity to decide span
    const smallCharts = [3,4];
    const mediumCharts = [1,2];
    if (smallCharts.includes(i)) return "col-span-2";
    if (mediumCharts.includes(i)) return "sm:col-span-2";
    return "col-span-full";
  };
  const deviceUsageData = [
    { name: "Mobile", value: 54 },
    { name: "Desktop", value: 36 },
    { name: "Tablet", value: 10 },
  ];

  

        
  return (
    <div className="p-6 space-y-10">
      <div>
            <h1 className="text-3xl font-bold text-primary font-header tracking-wider mb-2">
              Sales Dashboard
            </h1>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="bg-background px-6 py-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-2 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <div
                className={`flex items-center text-sm font-bold px-2 py-1 rounded-full transition-all duration-300 ${
                  card.trend === "up"
                    ? "text-green-500 bg-green-500/20 group-hover:bg-green-300/30"
                    : "text-error bg-error/10 group-hover:bg-error/20"
                }`}
              >
                {card.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {card.change}
              </div>
            </div>
            <h3 className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider">
              {card.title}
            </h3>
            <p className="text-2xl text-gray-800 group-hover:text-primary transition-colors duration-300 font-bold font-header text-primary">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div
        className="grid gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gridAutoRows: "auto",
        }}
      >
      {[...Array(5)].map((_, i) => (
       <div
       key={i}
       className={`bg-white p-4 rounded-2xl shadow border border-gray-100 ${getDynamicSizeClass(
         i
       )}`}
       style={{
         minHeight: "300px",
         display: "flex",
         flexDirection: "column",
       }}
     >
          <h3 className="text-lg font-semibold mb-4">Chart {i + 1}</h3>
          {/* <p className="text-sm text-gray-500 mb-4">
              {chartDescriptions[i] || "Sales chart"}
            </p> */}
          <ResponsiveContainer width="100%" height={500}>
            {(() => {
              switch (i) {
               
                  case 0:
                    return (
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
                      <div className="xl:col-span-2 bg-background p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-primary" />
                          </div>
                          <h2 className="text-2xl font-bold font-header text-primary">
                            Revenue & Profit Analysis
                          </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={380}>
                          <ComposedChart data={revenueData}>
                            <XAxis dataKey="month" stroke="#4f4f4f" fontSize={12} />
                            <YAxis stroke="#4f4f4f" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #4f4f4f",
                                borderRadius: "12px",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                            <Legend />
                            <Bar
                              dataKey="expenses"
                              fill="#ff0000"
                              radius={[6, 6, 0, 0]}
                              name="Expenses"
                            />
                            <Bar
                              dataKey="profit"
                              fill="#400c7c"
                              radius={[6, 6, 0, 0]}
                              name="Profit"
                            />
                            <Line
                              type="monotone"
                              dataKey="revenue"
                              stroke="#ffc33e"
                              strokeWidth={4}
                              dot={{ r: 5, fill: "#ffc33e" }}
                              name="Revenue"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
              
                      <Calendar className="font-header" />
                    </div>
                    );
                    case 1:
                      return (
                       
                        <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-secondary" />
                          </div>
                          <h2 className="text-2xl font-bold font-header text-primary">
                            Weekly User Activity
                          </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                          <ComposedChart data={userActivity}>
                            <XAxis dataKey="day" stroke="#4f4f4f" fontSize={12} />
                            <YAxis stroke="#4f4f4f" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #4f4f4f",
                                borderRadius: "12px",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                            <Legend />
                            <Bar
                              dataKey="logins"
                              fill="#400c7c"
                              radius={[6, 6, 0, 0]}
                              name="Logins"
                            />
                            <Line
                              type="monotone"
                              dataKey="registrations"
                              stroke="#ffc33e"
                              strokeWidth={4}
                              dot={{ r: 6, fill: "#ffc33e" }}
                              name="New Registrations"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                      );
                case 2:
                  return (
                    <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold font-header text-primary">
                      Course Completion & Satisfaction Rates
                      </h2>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                    <RadarChart data={performanceData} outerRadius={130}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Completion" dataKey="completion" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                      <Radar name="Satisfaction" dataKey="satisfaction" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                    </ResponsiveContainer>
                  </div>
                   
                  );
                  case 3:
                    return (
                      <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-green-600" />
                          </div>
                          <h2 className="text-2xl font-bold font-header text-primary">
                            Device Usage Distribution
                          </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                          <PieChart>
                            <Pie
                              data={deviceUsageData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {deviceUsageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    );
                    case 4:
                      return (
                        <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-bold font-header text-primary">
                              Sales by Course
                            </h2>
                          </div>
                          <ResponsiveContainer width="100%" height={320}>
                            <BarChart
                              layout="vertical"
                              data={courseSalesData}
                              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                            >
                              <XAxis
                                type="number"
                                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                                stroke="#4f4f4f"
                              />
                              <YAxis
                                type="category"
                                dataKey="course"
                                stroke="#4f4f4f"
                                tick={{ fontSize: 12 }}
                              />
                              <Tooltip
                                formatter={(value) => `₹${value.toLocaleString()}`}
                                contentStyle={{
                                  backgroundColor: "white",
                                  border: "1px solid #4f4f4f",
                                  borderRadius: "12px",
                                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                }}
                              />
                              <Legend />
                              <Bar
                                dataKey="sales"
                                fill="#400c7c"
                                radius={[0, 6, 6, 0]}
                                name="Revenue"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      );
                    
                              default:
                  return null;
              }
            })()}
          </ResponsiveContainer>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Dashboard;
