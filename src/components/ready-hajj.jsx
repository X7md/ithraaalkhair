"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const data = [...await (await fetch("/data/tasks.json"))?.json()|| []].filter(itm => itm.business_model == 'B2B')
// window.data = data
const chartData = [
  { task: "مرفوضة", count: data.filter(itm => itm.is_approved == 'NONAPPROVED').length, fill: "#DF3838" },
  { task: "مقبولة", count: data.filter(itm => itm.is_approved == "APPROVED").length, fill: "#008086" },
  { task: "لم ترسل", count: data.filter(itm => (itm.is_approved !== 'NONAPPROVED') && itm.is_approved !== "APPROVED" && itm.is_approved !== "PENDING").length, fill: "#C29979" },
  { task: "تحت المراجعة", count: data.filter(itm => (itm.is_approved !== 'NONAPPROVED') && itm.is_approved !== "APPROVED" && itm.is_approved == "PENDING").length, fill: "#000" },
]

const chartConfig = {
  task: {
    label: "مهمة",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  }
} 

export function HajjReady() {

  const totalcount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col shadow-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="task"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan direction={"rtl"}
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalcount.toLocaleString()} / 
                          {chartData.filter(itm => itm.task == 'مقبولة')[0].count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          المهام B2B
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="grid grid-cols-2 gap-4 text-xs">
            {chartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                <div
                    className="h-4 w-4 rounded-full aspect-square"
                    style={{ backgroundColor: entry.fill }}
                />
                <span className="text-sm font-medium text-muted-foreground">
                    {entry.task} ({entry.count.toLocaleString()})
                </span>
                </div>
            ))}
        </div>
        <div className="text-xs text-muted-foreground">
          المهام منصة جاهز حج (المجلس التنسيقي)
          سحبت بتاريخ 
          <time>
            2025-05-04 
          </time>
        </div>
      </CardFooter>
    </Card>
  )
}
