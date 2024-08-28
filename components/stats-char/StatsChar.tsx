import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui';

interface IStatsChartProps {
  chart?: string;
  explanation: string;
  children?: React.ReactElement;
  chartClass?: string;
  textClass?: string;
}

export const StatsChar = ({ chart, explanation, children, chartClass, textClass }: IStatsChartProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex w-full items-center justify-center">
          <div className={chartClass}>{chart || children || '-'}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className={textClass}>{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
