import * as React from "react"
// import { TrendingUp } from "lucide-react" // Not used in this specific footer, can be removed if not needed elsewhere
import { Bar, BarChart, Cell, XAxis, YAxis, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { processReadinessData } from "@/lib/chart-data-processor" // Adjust path as needed

const CustomBarLabel = (props) => {
  const { x, y, width, height, value } = props; // These are provided by LabelList

  // Condition: Display label only if value is > 25 and <= 90
  if (value >= 25 && value <= 90) {
    // Calculate position for the text
    // For horizontal bars (layout="vertical"):
    // x is the starting x of the bar, width is the length of the bar.
    // y is the starting y of the bar, height is the thickness of the bar.
    const textX = x + width - 5; // Position inside, near the right end, adjust padding (5)
    const textY = y + height / 2; // Vertically centered

    return (
      <text
        x={textX}
        y={textY}
        fill="#000" // White text, or choose a contrasting color
        textAnchor="end" // Anchor to the right end
        dominantBaseline="middle"
        fontSize={10} // Adjust font size
      >
        {`${Number(value).toFixed(0)}%`}
      </text>
    );
  }
  return null; // Don't render anything if condition not met
};
// Sample Data (using your provided larger dataset)
const sampleRawData = [
    {
        "date": "2025-05-13T11:22:16.000Z",
        "rating": 0,
        "license_no": "8317",
        "latitude": 21.398639748507076,
        "longitude": 39.8669021,
        "original_rating_id": 42690,
        "center": 25
    },
    {
        "date": "2025-05-13T11:21:51.000Z",
        "rating": 0,
        "license_no": "8317",
        "latitude": 21.398639748507076,
        "longitude": 39.8669021,
        "original_rating_id": 42689,
        "center": 25
    },
    {
        "date": "2025-05-13T11:21:12.000Z",
        "rating": 0,
        "license_no": "8317",
        "latitude": 21.398639748507076,
        "longitude": 39.8669021,
        "original_rating_id": 42688,
        "center": 25
    },
    {
        "date": "2025-05-13T11:20:33.000Z",
        "rating": 0,
        "license_no": "8317",
        "latitude": 21.398639748507076,
        "longitude": 39.8669021,
        "original_rating_id": 42687,
        "center": 25
    },
    {
        "date": "2025-05-13T11:17:20.000Z",
        "rating": 0,
        "license_no": "8050",
        "latitude": 21.398427252029375,
        "longitude": 39.8671322,
        "original_rating_id": 42685,
        "center": 23
    },
    {
        "date": "2025-05-13T11:15:40.000Z",
        "rating": 0,
        "license_no": "8050",
        "latitude": 21.398427252029375,
        "longitude": 39.8671322,
        "original_rating_id": 42684,
        "center": 23
    },
    {
        "date": "2025-05-13T11:04:43.000Z",
        "rating": 0,
        "license_no": "15393",
        "latitude": 21.398920018961192,
        "longitude": 39.8675211,
        "original_rating_id": 42680,
        "center": 50
    },
    {
        "date": "2025-05-13T11:04:05.000Z",
        "rating": 0,
        "license_no": "15393",
        "latitude": 21.398920018961192,
        "longitude": 39.8675211,
        "original_rating_id": 42679,
        "center": 50
    },
    {
        "date": "2025-05-13T11:03:23.000Z",
        "rating": 0,
        "license_no": "15393",
        "latitude": 21.398920018961192,
        "longitude": 39.8675211,
        "original_rating_id": 42678,
        "center": 50
    },
    {
        "date": "2025-05-13T10:44:24.000Z",
        "rating": 63.64,
        "license_no": "14980",
        "latitude": 21.39998263704126,
        "longitude": 39.8670834,
        "original_rating_id": 42664,
        "center": 43
    },
    {
        "date": "2025-05-13T10:34:09.000Z",
        "rating": 0,
        "license_no": "13171",
        "latitude": 21.4182874348856,
        "longitude": 39.8590917885303,
        "original_rating_id": 42656
    },
    {
        "date": "2025-05-13T09:15:52.000Z",
        "rating": 36.36,
        "license_no": "14132",
        "latitude": 21.403227721859114,
        "longitude": 39.8730359,
        "original_rating_id": 42577,
        "center": 39
    },
    {
        "date": "2025-05-13T09:10:00.000Z",
        "rating": 0,
        "license_no": "4753",
        "latitude": 21.4161849678103,
        "longitude": 39.8617780208587,
        "original_rating_id": 42565,
        "center": 50
    },
    {
        "date": "2025-05-13T09:02:06.000Z",
        "rating": 0,
        "license_no": "11692",
        "latitude": 21.386924575799455,
        "longitude": 39.8770451,
        "original_rating_id": 42553,
        "center": 31
    },
    {
        "date": "2025-05-13T08:56:54.000Z",
        "rating": 54.55,
        "license_no": "11642",
        "latitude": 21.386392831423404,
        "longitude": 39.8779611,
        "original_rating_id": 42542,
        "center": 31
    },
    {
        "date": "2025-05-13T08:51:43.000Z",
        "rating": 45.45,
        "license_no": "8396",
        "latitude": 21.386347689789186,
        "longitude": 39.8777322,
        "original_rating_id": 42532,
        "center": 25
    },
    {
        "date": "2025-05-13T08:49:09.000Z",
        "rating": 36.36,
        "license_no": "15196",
        "latitude": 21.401014846143617,
        "longitude": 39.8725444,
        "original_rating_id": 42526,
        "center": 43
    },
    {
        "date": "2025-05-13T08:35:57.000Z",
        "rating": 72.73,
        "license_no": "7850",
        "latitude": 21.38807008810361,
        "longitude": 39.8781209,
        "original_rating_id": 42492,
        "center": 22
    },
    {
        "date": "2025-05-13T08:19:02.000Z",
        "rating": 72.73,
        "license_no": "14841",
        "latitude": 21.386926486341416,
        "longitude": 39.8777882,
        "original_rating_id": 42456,
        "center": 42
    },
    {
        "date": "2025-05-13T08:07:36.000Z",
        "rating": 45.45,
        "license_no": "4851",
        "latitude": 21.39891962246626,
        "longitude": 39.874041,
        "original_rating_id": 42433,
        "center": 15
    },
    {
        "date": "2025-05-13T08:02:44.000Z",
        "rating": 45.45,
        "license_no": "13510",
        "latitude": 21.38814239948524,
        "longitude": 39.8765255,
        "original_rating_id": 42421,
        "center": 38
    },
    {
        "date": "2025-05-13T07:40:01.000Z",
        "rating": 45.45,
        "license_no": "13237",
        "latitude": 21.368441860241166,
        "longitude": 39.880134,
        "original_rating_id": 42366,
        "center": 36
    },
    {
        "date": "2025-05-13T07:38:20.000Z",
        "rating": 54.55,
        "license_no": "14544",
        "latitude": 21.387980675034,
        "longitude": 39.877570931605,
        "original_rating_id": 42361,
        "center": 42
    },
    {
        "date": "2025-05-13T07:32:36.000Z",
        "rating": 45.45,
        "license_no": "8513",
        "latitude": 21.387291277837516,
        "longitude": 39.8784482,
        "original_rating_id": 42342,
        "center": 26
    },
    {
        "date": "2025-05-13T07:31:01.000Z",
        "rating": 36.36,
        "license_no": "10006429",
        "latitude": 21.4215709185319,
        "longitude": 39.8188090324401,
        "original_rating_id": 42339
    },
    {
        "date": "2025-05-13T07:28:29.000Z",
        "rating": 45.45,
        "license_no": "8087",
        "latitude": 21.387738351318248,
        "longitude": 39.8781737,
        "original_rating_id": 42336,
        "center": 24
    },
    {
        "date": "2025-05-13T07:24:23.000Z",
        "rating": 45.45,
        "license_no": "8137",
        "latitude": 21.386452891642,
        "longitude": 39.880981844133,
        "original_rating_id": 42323,
        "center": 24
    },
    {
        "date": "2025-05-13T07:20:39.000Z",
        "rating": 81.82,
        "license_no": "8138",
        "latitude": 21.386259648542,
        "longitude": 39.880935564073,
        "original_rating_id": 42311,
        "center": 24
    },
    {
        "date": "2025-05-13T07:17:50.000Z",
        "rating": 0,
        "license_no": "13047",
        "latitude": 21.369654141082627,
        "longitude": 39.8809479,
        "original_rating_id": 42293,
        "center": 35
    },
    {
        "date": "2025-05-13T07:13:10.000Z",
        "rating": 72.73,
        "license_no": "7797",
        "latitude": 21.38665110522829,
        "longitude": 39.8806725,
        "original_rating_id": 42282,
        "center": 20
    },
    {
        "date": "2025-05-13T07:08:41.000Z",
        "rating": 72.73,
        "license_no": "12814",
        "latitude": 21.387263951086457,
        "longitude": 39.8777654,
        "original_rating_id": 42275,
        "center": 34
    },
    {
        "date": "2025-05-13T07:08:03.000Z",
        "rating": 45.45,
        "license_no": "13541",
        "latitude": 21.36999547670895,
        "longitude": 39.881507,
        "original_rating_id": 42274,
        "center": 38
    },
    {
        "date": "2025-05-13T07:05:48.000Z",
        "rating": 54.55,
        "license_no": "8384",
        "latitude": 21.38694019,
        "longitude": 39.88050085,
        "original_rating_id": 42265,
        "center": 25
    },
    {
        "date": "2025-05-13T07:00:57.000Z",
        "rating": 0,
        "license_no": "7841",
        "latitude": 21.38738409984408,
        "longitude": 39.8802823,
        "original_rating_id": 42248,
        "center": 22
    },
    {
        "date": "2025-05-13T06:57:52.000Z",
        "rating": 54.55,
        "license_no": "14457",
        "latitude": 21.38747609605909,
        "longitude": 39.880303,
        "original_rating_id": 42240,
        "center": 40
    },
    {
        "date": "2025-05-13T06:54:07.000Z",
        "rating": 0,
        "license_no": "2995",
        "latitude": 21.387145925471202,
        "longitude": 39.8799799,
        "original_rating_id": 42231,
        "center": 13
    },
    {
        "date": "2025-05-13T06:51:16.000Z",
        "rating": 0,
        "license_no": "7864",
        "latitude": 21.38801886954358,
        "longitude": 39.8794365,
        "original_rating_id": 42223,
        "center": 22
    },
    {
        "date": "2025-05-13T06:50:18.000Z",
        "rating": 0,
        "license_no": "7863",
        "latitude": 21.387999060492465,
        "longitude": 39.8794239,
        "original_rating_id": 42221,
        "center": 22
    },
    {
        "date": "2025-05-13T06:48:52.000Z",
        "rating": 36.36,
        "license_no": "8109",
        "latitude": 21.388082326435622,
        "longitude": 39.8797052,
        "original_rating_id": 42217,
        "center": 24
    },
    {
        "date": "2025-05-13T06:44:29.000Z",
        "rating": 45.45,
        "license_no": "6718",
        "latitude": 21.38816458,
        "longitude": 39.87985175,
        "original_rating_id": 42205,
        "center": 18
    },
    {
        "date": "2025-05-13T06:38:07.000Z",
        "rating": 0,
        "license_no": "8589",
        "latitude": 21.387802772113215,
        "longitude": 39.8797155,
        "original_rating_id": 42190,
        "center": 27
    },
    {
        "date": "2025-05-13T06:35:52.000Z",
        "rating": 36.36,
        "license_no": "14497",
        "latitude": 21.387738761657104,
        "longitude": 39.8796093,
        "original_rating_id": 42184,
        "center": 42
    },
    {
        "date": "2025-05-13T06:32:02.000Z",
        "rating": 0,
        "license_no": "8589",
        "latitude": 21.387802772113215,
        "longitude": 39.8797155,
        "original_rating_id": 42176,
        "center": 27
    },
    {
        "date": "2025-05-13T06:30:58.000Z",
        "rating": 45.45,
        "license_no": "11444",
        "latitude": 21.391485353807994,
        "longitude": 39.8763584,
        "original_rating_id": 42173,
        "center": 30
    },
    {
        "date": "2025-05-13T06:30:27.000Z",
        "rating": 63.64,
        "license_no": "12277",
        "latitude": 21.386462535797474,
        "longitude": 39.8781166,
        "original_rating_id": 42171,
        "center": 33
    },
    {
        "date": "2025-05-13T06:28:22.000Z",
        "rating": 36.36,
        "license_no": "5726",
        "latitude": 21.386931963002105,
        "longitude": 39.8801443,
        "original_rating_id": 42163,
        "center": 16
    },
    {
        "date": "2025-05-13T06:26:03.000Z",
        "rating": 0,
        "license_no": "12630",
        "latitude": 21.386554151259947,
        "longitude": 39.8784329,
        "original_rating_id": 42161,
        "center": 33
    },
    {
        "date": "2025-05-13T06:24:57.000Z",
        "rating": 45.45,
        "license_no": "8304",
        "latitude": 21.386594164746114,
        "longitude": 39.8786551,
        "original_rating_id": 42157,
        "center": 24
    },
    {
        "date": "2025-05-13T06:23:11.000Z",
        "rating": 63.64,
        "license_no": "5656",
        "latitude": 21.386994586609,
        "longitude": 39.880228631453,
        "original_rating_id": 42155,
        "center": 15
    },
    {
        "date": "2025-05-13T06:20:54.000Z",
        "rating": 0,
        "license_no": "7210",
        "latitude": 21.38750824718856,
        "longitude": 39.8786768,
        "original_rating_id": 42151,
        "center": 19
    },
    {
        "date": "2025-05-13T06:19:25.000Z",
        "rating": 0,
        "license_no": "12838",
        "latitude": 21.38752616,
        "longitude": 39.87866454,
        "original_rating_id": 42147,
        "center": 34
    },
    {
        "date": "2025-05-13T06:18:15.000Z",
        "rating": 45.45,
        "license_no": "7840",
        "latitude": 21.388157456499247,
        "longitude": 39.8783412,
        "original_rating_id": 42144,
        "center": 22
    },
    {
        "date": "2025-05-13T06:15:03.000Z",
        "rating": 54.55,
        "license_no": "7308",
        "latitude": 21.38649890589108,
        "longitude": 39.8806808,
        "original_rating_id": 42137,
        "center": 19
    },
    {
        "date": "2025-05-13T06:15:01.000Z",
        "rating": 0,
        "license_no": "13432",
        "latitude": 21.387865133714477,
        "longitude": 39.8785781,
        "original_rating_id": 42136,
        "center": 37
    },
    {
        "date": "2025-05-13T06:13:55.000Z",
        "rating": 45.45,
        "license_no": "7876",
        "latitude": 21.3882128084149,
        "longitude": 39.8783636,
        "original_rating_id": 42132,
        "center": 22
    },
    {
        "date": "2025-05-13T06:10:49.000Z",
        "rating": 45.45,
        "license_no": "9056",
        "latitude": 21.38848957,
        "longitude": 39.87828366,
        "original_rating_id": 42125,
        "center": 28
    },
    {
        "date": "2025-05-13T06:10:41.000Z",
        "rating": 36.36,
        "license_no": "10007391",
        "latitude": 21.4179668269779,
        "longitude": 39.8245776640221,
        "original_rating_id": 42123
    },
    {
        "date": "2025-05-13T05:43:10.000Z",
        "rating": 0,
        "license_no": "1485",
        "latitude": 21.3884644363512,
        "longitude": 39.8786774,
        "original_rating_id": 42068,
        "center": 12
    },
    {
        "date": "2025-05-13T05:39:01.000Z",
        "rating": 36.36,
        "license_no": "10000643",
        "latitude": 21.380415414234673,
        "longitude": 39.8742048,
        "original_rating_id": 42064,
        "center": 50
    },
    {
        "date": "2025-05-13T05:35:09.000Z",
        "rating": 45.45,
        "license_no": "13191",
        "latitude": 21.38882221369226,
        "longitude": 39.8755809,
        "original_rating_id": 42060,
        "center": 36
    },
    {
        "date": "2025-05-13T05:32:36.000Z",
        "rating": 54.55,
        "license_no": "10006701",
        "latitude": 21.428894194417367,
        "longitude": 39.8565798,
        "original_rating_id": 42056,
        "center": 50
    },
    {
        "date": "2025-05-13T05:23:37.000Z",
        "rating": 45.45,
        "license_no": "10007053",
        "latitude": 21.381123255750456,
        "longitude": 39.8721067,
        "original_rating_id": 42039,
        "center": 50
    },
    {
        "date": "2025-05-13T05:18:38.000Z",
        "rating": 45.45,
        "license_no": "7205",
        "latitude": 21.385305501315887,
        "longitude": 39.8764282,
        "original_rating_id": 42030,
        "center": 19
    },
    {
        "date": "2025-05-13T05:12:56.000Z",
        "rating": 36.36,
        "license_no": "7799",
        "latitude": 21.385803189700216,
        "longitude": 39.8754572,
        "original_rating_id": 42021,
        "center": 22
    },
    {
        "date": "2025-05-13T05:09:04.000Z",
        "rating": 0,
        "license_no": "7426",
        "latitude": 21.385613377394108,
        "longitude": 39.8754143,
        "original_rating_id": 42016,
        "center": 20
    },
    {
        "date": "2025-05-13T05:06:38.000Z",
        "rating": 36.36,
        "license_no": "11014",
        "latitude": 21.385793457014017,
        "longitude": 39.875216,
        "original_rating_id": 42013,
        "center": 30
    },
    {
        "date": "2025-05-13T04:52:18.000Z",
        "rating": 45.45,
        "license_no": "9611",
        "latitude": 21.385472348733526,
        "longitude": 39.8752047,
        "original_rating_id": 41997,
        "center": 29
    },
    {
        "date": "2025-05-13T04:46:44.000Z",
        "rating": 0,
        "license_no": "11071",
        "latitude": 21.384843906664802,
        "longitude": 39.8764274,
        "original_rating_id": 41982,
        "center": 30
    },
    {
        "date": "2025-05-13T04:46:22.000Z",
        "rating": 0,
        "license_no": "10866",
        "latitude": 21.38491713179586,
        "longitude": 39.876622,
        "original_rating_id": 41981,
        "center": 30
    },
    {
        "date": "2025-05-13T04:30:38.000Z",
        "rating": 45.45,
        "license_no": "7698",
        "latitude": 21.385419709164687,
        "longitude": 39.8781882,
        "original_rating_id": 41951,
        "center": 20
    }
]


const chartConfig = {
  value: {
    label: "الجاهزية",
    color: "hsl(142.1 70.6% 45.3%)", // Your green color
  },
}

// Helper to get a descriptive date range
function getDateRangeDescription(data) {
  if (!data || data.length === 0) return "N/A";
  const dates = data.map(item => new Date(item.date));
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

  const options = { year: 'numeric', month: 'long' };
  const formatter = new Intl.DateTimeFormat('ar-SA', options);

  if (minDate.getMonth() === maxDate.getMonth() && minDate.getFullYear() === maxDate.getFullYear()) {
    return formatter.format(minDate);
  }
  return `${formatter.format(minDate)} - ${formatter.format(maxDate)}`;
}

export function ReadinessBarChart({ rawData = sampleRawData, className }) {
  const chartData = React.useMemo(() => processReadinessData(rawData), [rawData]);
  const dateDescription = React.useMemo(() => getDateRangeDescription(rawData), [rawData]);

  if (chartData.length === 0) {
    return (
      <Card className={className} dir="rtl">
        <CardHeader>
          <CardTitle>الجاهزية حسب المركز</CardTitle>
          <CardDescription>لا توجد بيانات حالياً</CardDescription>
        </CardHeader>
        <CardContent className="flex h-96 items-center justify-center">
          <p className="text-muted-foreground">لا توجد بيانات لعرضها</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          آخر تحديث للبيانات: غير متوفر
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={className} dir="rtl">
      <CardHeader>
        <CardTitle>الجاهزية حسب المركز</CardTitle>
        <CardDescription>
          متوسط الجاهزية للمساكن: {dateDescription} (آخر استمارة)
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[630px] w-full"> {/* Container with fixed height for potential scrolling */}
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical" // Set layout to vertical for horizontal bars
              margin={{
                top: 20,
                right: 0,
                left: 0, // Adjust left margin for Y-axis labels. Example used -20, let's try 0 or small positive.
                bottom: 25,
              }}
              // barSize={20} // Optional: set a fixed height for bars
            >
              {/* CartesianGrid now has horizontal lines by default with layout="vertical" */}
              {/* To match the vertical example, we'd want vertical grid lines, so vertical={true} horizontal={false} */}
              {/* However, the horizontal example *doesn't show a grid*, let's omit it for now or use CartesianGrid vertical={false} if we want horizontal lines behind the bars */}
              {/* <CartesianGrid strokeDasharray="3 3" horizontal={false} /> */}
              <XAxis
              type="number"
              dataKey="value"
              tickLine={true}
              axisLine={true}
              tickMargin={8} // or 10, consistent with YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              // Potentially add ticks prop if we want specific percentages:
              ticks={[0, 25, 50, 75, 100]}
            />
              <YAxis
                dataKey="name" // This is now the category axis (center names)
                type="category"
                tickFormatter={(value) => `مركز ${value}`}
                tickLine={false}
                axisLine={true}
                tickMargin={40} // Space between tick and chart edge (or where axis line would be)
                // tickFormatter={(value) => String(value).slice(0, 10)} // Optional: shorten long center names
                width={65} // Adjust if center names are long and get cut off, or let Recharts auto-size
                interval={0} // Attempt to show all labels
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `مركز: ${label}`} // Label is 'name' from YAxis
                    formatter={(value, nameKey) => { // value is 'value' from XAxis, nameKey is 'value'
                      const configEntry = chartConfig[nameKey];
                      return [(configEntry?.label || "التقييم") + ": " + `${Number(value).toFixed(2)}%`];
                    }}
                    indicator="dot"
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                }
              />
              <Bar
                dataKey="value"
                radius={1} // Rounded corners for horizontal bars, example used 5
              >
                {chartData.map((entry, index) => {
                  let fillColor = "hsl(var(--chart-1))"; 
                  const greenColor = chartConfig.value.color; 
                  const redColor = "hsl(0 70% 50%)"; 
                  if (entry.value <= 25) {
                    fillColor = redColor;
                  } else {
                    fillColor = greenColor;
                  }
                  return (<Cell key={`cell-${index}`} fill={fillColor}/>);
                })}
                 <LabelList dataKey="value" content={<CustomBarLabel />} />
              </Bar>
              
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          يتم عرض متوسط الجاهزية بناءً على آخر استمارة في كل مركز خلال الفترة المحددة.
        </div>
      </CardFooter>
    </Card>
  )
}

