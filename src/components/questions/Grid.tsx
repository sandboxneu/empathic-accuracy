import { Stage, Layer, Rect, Text, Line, Circle } from "react-konva";
import { GridAxisLabel, GridAnswer } from "lib/types";
import { useRef } from "react";
import Konva from "konva";

const STAGE_SIZE = 400;
const RECT_SIZE = 250;
const CENTER = STAGE_SIZE / 2;
const BORDER_SIZE = (STAGE_SIZE - RECT_SIZE) / 2;
const BULLSEYE_LENGTH = 5;

const Bullseye = () => (
  <>
    <Line
      stroke="black"
      points={[
        CENTER,
        CENTER - BULLSEYE_LENGTH,
        CENTER,
        CENTER + BULLSEYE_LENGTH,
      ]}
      strokeWidth={1}
    />
    <Line
      stroke="black"
      points={[
        CENTER - BULLSEYE_LENGTH,
        CENTER,
        CENTER + BULLSEYE_LENGTH,
        CENTER,
      ]}
      strokeWidth={1}
    />
  </>
);
function getRelativePointerPosition(node: Konva.Rect) {
  const transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const pos = node.getStage()!.getPointerPosition()!;

  // now we can find relative point
  return transform.point(pos);
}

interface GridProps {
  label: string;
  xLabel?: GridAxisLabel;
  yLabel?: GridAxisLabel;
  x: number;
  y: number;
  onClick?: (xy: GridAnswer) => void;
}
const VALENCE = { low: "Negative", high: "Positive" };
const AROUSAL = { low: "Low Arousal", high: "High Arousal" };
export default function Grid({
  label,
  xLabel = VALENCE,
  yLabel = AROUSAL,
  x = 0.5,
  y = 0.5,
  onClick,
}: GridProps) {
  const rectRef = useRef<Konva.Rect>(null);
  return (
    <div>
      <div className="questionTitle">{label}</div>
      <Stage
        style={{ background: "white" }}
        width={STAGE_SIZE}
        height={STAGE_SIZE}
      >
        <Layer>
          <Rect
            ref={rectRef}
            x={BORDER_SIZE}
            y={BORDER_SIZE}
            width={RECT_SIZE}
            height={RECT_SIZE}
            stroke="black"
            strokeWidth={1}
            onClick={
              onClick !== undefined
                ? () => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const pos = getRelativePointerPosition(rectRef.current!);
                    onClick({ x: pos.x / RECT_SIZE, y: 1 - pos.y / RECT_SIZE });
                  }
                : undefined
            }
          />
          <Text
            text={xLabel.low}
            x={0}
            y={STAGE_SIZE / 2}
            align="center"
            width={BORDER_SIZE}
          />
          <Text
            text={xLabel.high}
            x={STAGE_SIZE - BORDER_SIZE}
            y={STAGE_SIZE / 2}
            align="center"
            width={BORDER_SIZE}
          />
          <Text
            text={yLabel.low}
            x={0}
            y={STAGE_SIZE - BORDER_SIZE + 10}
            align="center"
            width={STAGE_SIZE}
          />
          <Text
            text={yLabel.high}
            x={0}
            y={BORDER_SIZE - 20}
            align="center"
            width={STAGE_SIZE}
          />
          <Circle
            fill="black"
            radius={3}
            x={BORDER_SIZE + x * RECT_SIZE}
            y={STAGE_SIZE - BORDER_SIZE - y * RECT_SIZE}
          />
          <Bullseye />
        </Layer>
      </Stage>
    </div>
  );
}
