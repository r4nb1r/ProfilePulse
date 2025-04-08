import * as React from "react";
import { 
  LineChart as RechartsLineChart, 
  Line as RechartsLine,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  AreaChart as RechartsAreaChart,
  Area as RechartsArea,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  ResponsiveContainer,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

export interface ChartProps {
  data: any[];
  className?: string;
  children?: React.ReactNode;
}

// Line Chart
export function LineChart({ 
  data, 
  className, 
  children 
}: ChartProps) {
  return (
    <div className={cn("h-[350px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {children}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface LineProps {
  dataKey: string;
  stroke?: string;
  activeDot?: any;
  type?: "basis" | "basisClosed" | "basisOpen" | "linear" | "linearClosed" | "natural" | "monotoneX" | "monotoneY" | "monotone" | "step" | "stepBefore" | "stepAfter";
}

export function Line({ 
  dataKey, 
  stroke = "#8884d8", 
  activeDot = { r: 8 }, 
  type = "monotone"
}: LineProps) {
  return <RechartsLine type={type} dataKey={dataKey} stroke={stroke} activeDot={activeDot} />;
}

// Bar Chart
export function BarChart({ 
  data, 
  className, 
  children 
}: ChartProps) {
  return (
    <div className={cn("h-[350px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {children}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface BarProps {
  dataKey: string;
  fill?: string;
}

export function Bar({ 
  dataKey, 
  fill = "#8884d8" 
}: BarProps) {
  return <RechartsBar dataKey={dataKey} fill={fill} />;
}

// Area Chart
export function AreaChart({ 
  data, 
  className, 
  children 
}: ChartProps) {
  return (
    <div className={cn("h-[350px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {children}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface AreaProps {
  dataKey: string;
  stroke?: string;
  fill?: string;
  type?: "basis" | "basisClosed" | "basisOpen" | "linear" | "linearClosed" | "natural" | "monotoneX" | "monotoneY" | "monotone" | "step" | "stepBefore" | "stepAfter";
}

export function Area({ 
  dataKey,
  stroke = "#8884d8",
  fill = "#8884d8",
  type = "monotone"
}: AreaProps) {
  return <RechartsArea type={type} dataKey={dataKey} stroke={stroke} fill={fill} />;
}

// Pie Chart
export function PieChart({ 
  data,
  className,
  children
}: ChartProps) {
  return (
    <div className={cn("h-[350px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <Tooltip />
          <Legend />
          {children}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface PieProps {
  data: any[];
  dataKey: string;
  nameKey?: string;
  cx?: string | number;
  cy?: string | number;
  outerRadius?: number;
  fill?: string;
  children?: React.ReactNode;
}

export function Pie({
  data,
  dataKey,
  nameKey = "name",
  cx = "50%",
  cy = "50%",
  outerRadius = 80,
  fill = "#8884d8",
  children
}: PieProps) {
  return (
    <RechartsPie
      data={data}
      dataKey={dataKey}
      nameKey={nameKey}
      cx={cx}
      cy={cy}
      outerRadius={outerRadius}
      fill={fill}
    >
      {children}
    </RechartsPie>
  );
}

export interface CellProps {
  fill?: string;
}

export function PieCell({ fill = "#8884d8" }: CellProps) {
  return <Cell fill={fill} />;
}