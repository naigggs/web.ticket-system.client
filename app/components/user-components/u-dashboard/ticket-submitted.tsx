"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Tickets } from "../u-tickets/types";

const chartConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TicketSubmitted() {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState<
    { month: string; tickets: number }[]
  >([]);

  useEffect(() => {
    async function fetchUserTickets() {
      try {
        const response = await fetch(`/api/tickets/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets for user");
        }
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUserTickets();
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      // Get the current date
      const currentDate = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(currentDate.getMonth() - 5); // Include the current month

      // Filter tickets submitted in the last 6 months (including the current month)
      const filteredTickets = tickets.filter((ticket) => {
        const ticketDate = new Date(ticket.created_at);
        return ticketDate >= sixMonthsAgo && ticketDate <= currentDate;
      });

      // Group tickets by month and count
      const ticketCountsByMonth: { [key: string]: number } = {};

      filteredTickets.forEach((ticket) => {
        const ticketDate = new Date(ticket.created_at);
        const month = ticketDate.toLocaleString("default", { month: "long" });
        if (ticketCountsByMonth[month]) {
          ticketCountsByMonth[month]++;
        } else {
          ticketCountsByMonth[month] = 1;
        }
      });

      // Generate chart data for the last 6 months (including the current month)
      const months = [
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

      const chartData = [];
      for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        const month = date.toLocaleString("default", { month: "long" });
        chartData.unshift({
          month,
          tickets: ticketCountsByMonth[month] || 0,
        });
      }

      setChartData(chartData);
    }
  }, [tickets]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submitted Tickets</CardTitle>
        <CardDescription>Last 6 Months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tickets" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total tickets submitted in the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}