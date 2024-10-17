import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChartComponent from "../common/LineChartComponent";
import BarChartComponent from "../common/BarChartComponent";
import StackedBarChartComponent from "../common/StackedBarChartComponent";
import GroupedBarChartComponent from "../common/GroupedBarChartComponent";
import DonutChartComponent from "../common/DonutChartComponent";

export default function Revenue() {
  const [monthlyCounts, setMonthlyCounts] = useState([]);
  const [yearlyCounts, setYearlyCounts] = useState([]);
  const [dayCounts, setDayCounts] = useState([]);
  const [membershipByPeriod, setMembershipByPeriod] = useState([]);
  const [yearlyMembershipTotals, setYearlyMembershipTotals] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [totalPayments, setTotalPayments] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const groupDataByYear = (data) => {
    return data.reduce((acc, { count, year, month }) => {
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({ month, count });
      return acc;
    }, {});
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/revenue/get-mem-by-month`)
      .then((response) => setMonthlyCounts(response.data));
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/revenue/get-mem-by-year`)
      .then((response) => setYearlyCounts(response.data));
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/revenue/get-mem-by-day`)
      .then((response) => setDayCounts(response.data));
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/user/revenue/get-mem-by-year-and-period`
      )
      .then((response) => setYearlyMembershipTotals(response.data));
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/user/revenue/get-mem-by-month-and-period`
      )
      .then((response) => setMembershipByPeriod(response.data));
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/user/revenue/get-all-yearly-monthly-total`
      )
      .then((response) => setMonthlyTotals(response.data));
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/revenue/get-all-expenses`)
      .then((response) => setMonthlyExpenses(response.data));
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/revenue/get-total-payment`)
      .then((response) => setTotalPayments(response.data));
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/user/revenue/get-all-expenses-payments`
      )
      .then((response) => setTotalExpenses(response.data));
  }, []);

  const [selectedYear, setSelectedYear] = useState(null);
  // const [monthlyCounts, setMonthlyCounts] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (monthlyCounts) {
      const groupedMonthlyData = groupDataByYear(monthlyCounts);
      const yearsArray = Object.keys(groupedMonthlyData);
      setYears(yearsArray);
      setSelectedYear(yearsArray[0]); // Default to first year
      setMonthlyCounts(groupedMonthlyData[yearsArray[0]]); // Set initial monthly counts
    }
  }, []);

  useEffect(() => {
    if (selectedYear && years.length > 0) {
      const groupedMonthlyData = groupDataByYear(monthlyCounts);
      setMonthlyCounts(groupedMonthlyData[selectedYear]);
      console.log("Monthly mem count", monthlyCounts, groupedMonthlyData);
    }
  }, [selectedYear, years]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // setMonthlyCounts(groupedMonthlyData[selectedYear]);
  };

  // setMonthlyCounts(groupedMonthlyData[selectedYear]);

  const formattedYearlyMembershipTotals = yearlyMembershipTotals?.map(
    (item) => ({
      year: item.year,
      halfyearly: item.membershipPeriod === "halfyearly" ? item.count : 0,
      monthly: item.membershipPeriod === "monthly" ? item.count : 0,
      quarterly: item.membershipPeriod === "quarterly" ? item.count : 0,
      yearly: item.membershipPeriod === "yearly" ? item.count : 0,
    })
  );

  const aggregatedFormattedYearlyMembershipTotalsData =
    formattedYearlyMembershipTotals.reduce((acc, item) => {
      const year = item.year;

      // Find or create the entry for the year
      if (!acc[year]) {
        acc[year] = {
          year: year,
          halfyearly: 0,
          monthly: 0,
          quarterly: 0,
          yearly: 0,
        };
      }

      // Update the counts
      acc[year].halfyearly += item.halfyearly;
      acc[year].monthly += item.monthly;
      acc[year].quarterly += item.quarterly;
      acc[year].yearly += item.yearly;

      return acc;
    }, {});

  console.log(
    "aggregatedFormattedYearlyMembershipTotalsData",
    aggregatedFormattedYearlyMembershipTotalsData
  );

  const formattedMembershipByPeriod = membershipByPeriod?.reduce(
    (acc, item) => {
      const monthKey = item.month;
      const yearKey = item.year;
      const key = `${yearKey}-${monthKey}`;

      if (!acc[key]) {
        acc[key] = { month: monthKey, year: yearKey, monthly: 0, quarterly: 0 };
      }

      if (item.membershipPeriod === "monthly") {
        acc[key].monthly += item.count;
      } else if (item.membershipPeriod === "quarterly") {
        acc[key].quarterly += item.count;
      }

      return acc;
    },
    {}
  );

  const monthlyMembershipData = Object.values(formattedMembershipByPeriod);
  console.log("monthlyMembershipData", monthlyMembershipData);

  const formattedMonthlyTotals = monthlyTotals["2024"]
    ? monthlyTotals["2024"].map((value, index) => ({
        month: index + 1,
        totalRevenue: value,
        totalExpenses: monthlyExpenses["2024"]
          ? monthlyExpenses["2024"][index] || 0
          : 0,
      }))
    : [];

  console.log("Formatted Monthly Totals -> ", formattedMonthlyTotals);

  const pieChartData = [
    { name: "Total Revenue", value: totalPayments },
    { name: "Total Expenses", value: totalExpenses },
  ];

  console.log("Pie Chart Data -> ", pieChartData);

  return (
    <div className="container">
      <h3 className="text-center my-4">Revenue Analytics</h3>
      <div className="row w-100">
        <div className="col-md-6">
          <select onChange={handleYearChange} value={selectedYear}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <LineChartComponent
            data={monthlyCounts}
            dataKey="count"
            xAxisKey="month"
            title="Monthly Membership Counts"
          />
        </div>
        {/* <div className = "col-md-6">
					<LineChartComponent data={dayCounts} dataKey="count" xAxisKey="day" title="Daily Membership Counts" />
				</div> */}
        <div className="col-md-6">
          <BarChartComponent
            data={yearlyCounts}
            dataKey="count"
            xAxisKey="year"
            title="Yearly Membership Counts"
            color="#82ca9d"
          />
        </div>
        <div className="col-md-6">
          <GroupedBarChartComponent
            data={Object.values(aggregatedFormattedYearlyMembershipTotalsData)}
            dataKeys={["monthly", "quarterly", "halfyearly", "yearly"]}
            xAxisKey="year"
            title="Yearly Membership Totals by Period"
            colors={["#8884d8", "#82ca9d", "#ffc658", "#d884ff"]}
          />
        </div>
        {/* <div className = "col-md-6">
					<StackedBarChartComponent data={monthlyMembershipData} dataKeys={["monthly", "quarterly", "halfyearly", "yearly"]} xAxisKey="year" title="Monthly Memberships by Period (2024)" colors={["#8884d8", "#82ca9d"]} />
				</div> */}
        <div className="col-md-6">
          <GroupedBarChartComponent
            data={formattedMonthlyTotals}
            dataKeys={["totalRevenue", "totalExpenses"]}
            xAxisKey="month"
            title="Monthly Revenue vs Expenses for 2024"
            colors={["#8884d8", "#ff7300"]}
          />
        </div>
        <div className="col-md-6">
          <DonutChartComponent
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            title="Total Revenue vs Total Expenses"
            colors={["#8884d8", "#ff7300"]}
          />
        </div>
      </div>
    </div>
  );
}
