import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';

interface SliderProps {
  min: number;
  max: number;
  value?: number;
  className?: Array<string>;
}

const Slider = ({ min, max, value = min, className = [] }: SliderProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList();

  appendClass(...className);

  return (
    <div>
      <input type='range' min={min} max={max} value={value} className={getClassList()} />
    </div>
  );
};

export { Slider };