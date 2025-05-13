import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export function NusukImtithal() {
  const generateFakeData = (center) => {
    const rating = Math.floor(Math.random() * 100);
    return [
      { name: 'Rating', value: rating },
      { name: 'Remaining', value: 100 - rating }
    ];
  };

  const COLORS = ['var(--primary)', 'var(--muted)'];

  const centers = [
    "50", "27", "32", "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "22", "23", "24", "25", "26", "28", "29", "30", "31", "33", "34",
    "35", "36", "37", "38", "39", "40", "42", "43"
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {centers.map((center) => {
          const data = generateFakeData(center);
          return (
            <Card key={center} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  مركز خدمة {center}
                </h3>
                <div className="relative h-48 w-full">
                  <div className={cn(
                    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    "text-2xl font-bold tabular-nums"
                  )}>
                    {data[0].value}%
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index]}
                            className="outline-none"
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

NusukImtithal.tab = "nusuk-imtithal";
