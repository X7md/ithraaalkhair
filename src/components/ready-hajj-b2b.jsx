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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const data = [...await (await fetch("/data/tasks.json"))?.json() || []].filter(itm => itm.business_model == 'B2B')
window.data = data
const chartData = [
  { task: "مرفوضة", count: data.filter(itm => itm.is_approved == 'NONAPPROVED').length, fill: "#DF3838" },
  { task: "مقبولة", count: data.filter(itm => itm.is_approved == "APPROVED").length, fill: "#008086" },
  { task: "لم ترسل (متأخرة)", count: data.filter(itm =>
    (itm.is_approved !== 'NONAPPROVED') &&
    itm.is_approved !== "APPROVED" &&
    itm.is_approved !== "PENDING" &&
    new Date(itm.end_date) < new Date()
  ).length, fill: "#C29979" },
  { task: "لم ترسل", count: data.filter(itm =>
    (itm.is_approved !== 'NONAPPROVED') &&
    itm.is_approved !== "APPROVED" &&
    itm.is_approved !== "PENDING" &&
    new Date(itm.end_date) >= new Date()
  ).length, fill: "#E6B17E" },
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

export function HajjReadyB2B() {
  const [selectedTask, setSelectedTask] = React.useState(null)
  const totalcount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  const handleTaskClick = (task) => {
    const taskData = data.filter(itm => {
      if (task.task === "مرفوضة") return itm.is_approved === 'NONAPPROVED';
      if (task.task === "مقبولة") return itm.is_approved === "APPROVED";
      if (task.task === "تحت المراجعة") return itm.is_approved === "PENDING";
      if (task.task === "لم ترسل (متأخرة)")
        return itm.is_approved !== 'NONAPPROVED' &&
          itm.is_approved !== "APPROVED" &&
          itm.is_approved !== "PENDING" &&
          new Date(itm.end_date) < new Date();
      return itm.is_approved !== 'NONAPPROVED' &&
        itm.is_approved !== "APPROVED" &&
        itm.is_approved !== "PENDING" &&
        new Date(itm.end_date) >= new Date();
    });
    setSelectedTask({ ...task, details: taskData });
  }

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
              onClick={(data) => handleTaskClick(data)}
              style={{ cursor: 'pointer' }}
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
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalcount}/{chartData.filter(itm => itm.task == 'مقبولة')[0].count.toLocaleString()}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          B2B
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
        <div className="text-xs text-center text-muted-foreground">
          المهام سحبت بتاريخ
          <time>
            2025-05-04
          </time>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          {chartData.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80"
              onClick={() => handleTaskClick(entry)}
            >
              <div
                className="h-4 w-4 rounded-full aspect-square"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {entry.task} ({entry.count.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </CardFooter>

      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)} >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-right">
              {selectedTask?.task} ({selectedTask?.count})
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[75vh] overflow-y-auto">
            <div className="grid gap-4">
              {selectedTask?.details.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 p-3 border rounded">
                  <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-muted-foreground">{item.id}</span>
                  <span className="text-sm text-muted-foreground">{item.business_model}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>يبدأ: {new Date(item.start_date).toLocaleDateString('ar-SA'
                      , {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        }
                    )}</div>
                    <div>ينتهي: {new Date(item.end_date).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    })}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
