// Recharts bar shape with a top radius proportional to the bar's own width
// (capped), so corners keep a consistent look whether the bar is wide or thin
// and never collapse into a slim pill. Use on the topmost segment of a stack.
export function RoundedTopBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}) {
  if (height <= 0 || width <= 0) return <g />;
  const r = Math.min(width * 0.5, height, 10);
  const d = `M${x},${y + height}V${y + r}A${r},${r} 0 0 1 ${x + r},${y}H${x + width - r}A${r},${r} 0 0 1 ${x + width},${y + r}V${y + height}Z`;
  return <path d={d} fill={fill} />;
}

// Shape for a single segment of a stacked bar. Rounds the top only when this
// segment is the topmost non-zero one for its bar, so the stack always shows a
// curved top no matter which series happens to be on top (or zero). Apply to
// EVERY series in the stack: shape={<StackTopBar orderedKeys={keys} dataKey={k} />}.
// recharts injects x/y/width/height/fill/payload into the cloned element.
export function StackTopBar({
  orderedKeys,
  dataKey,
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill,
  payload,
}: {
  orderedKeys: string[];
  dataKey: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  payload?: Record<string, number | string | null | undefined>;
}) {
  if (height <= 0 || width <= 0) return <g />;
  const topKey = [...orderedKeys]
    .reverse()
    .find((key) => Number(payload?.[key] ?? 0) > 0);
  if (topKey === dataKey) {
    return <RoundedTopBar x={x} y={y} width={width} height={height} fill={fill} />;
  }
  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
}
