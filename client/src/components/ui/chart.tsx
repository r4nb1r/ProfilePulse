import * as React from "react";
import { 
  Line, Bar, Area, Pie, Cell as RechartsCell, 
  PieChart as RPieChart, 
  BarChart as RBarChart, 
  AreaChart as RAreaChart, 
  LineChart as RLineChart, 
  ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Legend, Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";

export interface ChartConfig {
  [key: string]: {
    label?: React.ReactNode;
    color?: string;
  };
}

const ChartContext = React.createContext<{ config: ChartConfig }>({
  config: {},
});

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartProvider");
  }
  return context;
}

function createColorMap(colors: string[], categories: string[]) {
  return categories.reduce<Record<string, string>>((acc, category, i) => {
    acc[category] = colors[i % colors.length];
    return acc;
  }, {});
}

export interface AreaChartProps {
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
  yAxisWidth?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGridLines?: boolean;
  showGradient?: boolean;
  startAtZero?: boolean;
  stack?: boolean;
  curve?: "linear" | "monotone" | "natural" | "step";
  config?: ChartConfig;
}

export function AreaChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#8b5cf6", "#ec4899"],
  className,
  yAxisWidth = 40,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showTooltip = true,
  showGridLines = true,
  showGradient = true,
  startAtZero = true,
  curve = "monotone",
  stack = true,
  config = {},
}: AreaChartProps) {
  const colorMap = createColorMap(colors, categories);
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-80 w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <RAreaChart
            data={data}
            stackOffset={stack ? "normal" : undefined}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey={index} tick={{fontSize: 12}} />}
            {showYAxis && <YAxis width={yAxisWidth} domain={startAtZero ? [0, "auto"] : undefined} tick={{fontSize: 12}} />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}

            {categories.map((category) => (
              <Area
                key={category}
                type={curve}
                dataKey={category}
                stackId={stack ? "1" : undefined}
                stroke={colorMap[category]}
                fill={colorMap[category]}
                fillOpacity={showGradient ? 0.4 : 1}
                name={config[category]?.label || category}
              />
            ))}
          </RAreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export interface BarChartProps {
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
  yAxisWidth?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGridLines?: boolean;
  startAtZero?: boolean;
  stack?: boolean;
  layout?: "horizontal" | "vertical";
  config?: ChartConfig;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#8b5cf6", "#ec4899"],
  className,
  yAxisWidth = 40,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showTooltip = true,
  showGridLines = true,
  startAtZero = true,
  stack = false,
  layout = "horizontal",
  config = {},
}: BarChartProps) {
  const colorMap = createColorMap(colors, categories);
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-80 w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart
            data={data}
            layout={layout}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis 
              dataKey={layout === "horizontal" ? index : undefined} 
              type={layout === "horizontal" ? "category" : "number"} 
              tick={{fontSize: 12}}
            />}
            {showYAxis && <YAxis 
              width={yAxisWidth} 
              domain={startAtZero ? [0, "auto"] : undefined} 
              dataKey={layout === "vertical" ? index : undefined}
              type={layout === "vertical" ? "category" : "number"}
              tick={{fontSize: 12}}
            />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}

            {categories.map((category) => (
              <Bar
                key={category}
                dataKey={category}
                stackId={stack ? "a" : undefined}
                fill={colorMap[category]}
                name={config[category]?.label || category}
              />
            ))}
          </RBarChart>
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export interface LineChartProps {
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
  yAxisWidth?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGridLines?: boolean;
  startAtZero?: boolean;
  curve?: "linear" | "monotone" | "natural" | "step";
  config?: ChartConfig;
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#8b5cf6", "#ec4899"],
  className,
  yAxisWidth = 40,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showTooltip = true,
  showGridLines = true,
  startAtZero = true,
  curve = "monotone",
  config = {},
}: LineChartProps) {
  const colorMap = createColorMap(colors, categories);
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-80 w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <RLineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey={index} tick={{fontSize: 12}} />}
            {showYAxis && <YAxis width={yAxisWidth} domain={startAtZero ? [0, "auto"] : undefined} tick={{fontSize: 12}} />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}

            {categories.map((category) => (
              <Line
                key={category}
                type={curve}
                dataKey={category}
                stroke={colorMap[category]}
                activeDot={{ r: 8 }}
                name={config[category]?.label || category}
              />
            ))}
          </RLineChart>
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export interface PieChartProps {
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  config?: ChartConfig;
}

export function PieChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#8b5cf6", "#ec4899", "#f43f5e", "#6366f1", "#a855f7", "#d946ef"],
  className,
  showTooltip = true,
  showLegend = true,
  config = {},
}: PieChartProps) {
  const colorMap = createColorMap(colors, categories);
  
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-80 w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <RPieChart
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              fill="#8884d8"
              outerRadius={80}
              dataKey={categories[0]}
              nameKey={index}
              label
            >
              {data.map((entry, i) => (
                <React.Fragment key={`cell-${i}`}>
                  {categories.map((category) => (
                    <RechartsCell 
                      key={`cell-${i}-${category}`}
                      fill={colorMap[entry[index]]}
                    />
                  ))}
                </React.Fragment>
              ))}
            </Pie>
          </RPieChart>
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

// Custom cell component
function CustomCell({ fill, ...props }: { fill: string }) {
  return <RechartsCell {...props} fill={fill} />;
}

export interface RechartsProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: any[];
}

export function Recharts({
  className,
  children,
  ...props
}: RechartsProps) {
  return (
    <div
      className={cn("recharts-wrapper", className)}
      {...props}
    >
      {children}
    </div>
  );
}