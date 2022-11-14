import React, { useState } from 'react';

import { Chevron } from '../atoms/media/gfx/chevron';
import { Line } from '../atoms/media/gfx/line';
import { Button } from '../atoms/form/button';
import { Box } from '../atoms/display/box';
import { Text } from '../atoms/typography/text';
import { Group } from '../atoms/layout/group';

interface RangeFilter {
  label: string;
  activeRange:  [number, number];
  defaultRange: [number, number];
  update: (value: Array<number>) => void;
}

const chevronDir = (state: boolean): 'up' | 'down' => state ? 'up' : 'down';
const percent = ({ value, maxValue }: { value: number, maxValue: number }): number => value * 100 / maxValue; 

const thumbOffset = 175;
const clampMin = ({ value, currentMax }): number => {
  const maxWithThumbOffset = currentMax - thumbOffset;
  return value > maxWithThumbOffset ? maxWithThumbOffset : value;
};

const clampMax = ({ value, currentMin }): number => {
  const minWithThumbOffset = currentMin + thumbOffset;
  return value < minWithThumbOffset ? minWithThumbOffset : value;
};

const RangeFilter = ({ label, activeRange = [0, 1500], defaultRange = [0, 1500], update }: RangeFilter): JSX.Element => {
  const [currentMin, setCurrentMin] = useState(activeRange[0]);
  const [currentMax, setCurrentMax] = useState(activeRange[1]);

  const [sliderMin, sliderMax] = defaultRange;
  const [isOpen,    setIsOpen] = useState(false);

  const handleFromSliderChange = ({ target }) => { setCurrentMin(clampMin({ value: parseInt(target.value), currentMax })); };
  const handleToliderChange    = ({ target }) => { setCurrentMax(clampMax({ value: parseInt(target.value), currentMin })); };

  const rangeStyle = {
    left:  Math.round(      percent({ value: currentMin, maxValue: sliderMax })) + '%',
    right: Math.round(100 - percent({ value: currentMax, maxValue: sliderMax })) + '%'
  };

  return (
    <Box className={['px-6', 'py-4', 'rounded-md', 'bg-white', 'shadow-md']}>

      <Button 
        onClick={() => setIsOpen((prevState) => !prevState)}
        className={['flex', 'justify-between', 'items-center', 'w-full', 'pr-1.5']}
      >
        <Text className={['font-semibold']}>{label}</Text>
        <Chevron orientation={chevronDir(isOpen)} />
      </Button>

      {isOpen &&
      <>
        <Line className={['my-4']} />
        <div className='flex flex-col justify-between items-center gap-x-3'>
          <div className='doubleSlider__container'>
            <input
              id         = 'sliderMin'
              className  = 'doubleSlider'
              type       = 'range'
              min        = {sliderMin}
              max        = {sliderMax}
              value      = {currentMin}
              onChange   = {handleFromSliderChange}
              onMouseUp  = {() => update([currentMin, currentMax])}
              onTouchEnd = {() => update([currentMin, currentMax])}
            />

            <input
              id         = 'sliderMax'
              className  = 'doubleSlider'
              type       = 'range'
              min        = {sliderMin}
              max        = {sliderMax}
              value      = {currentMax}
              onChange   = {handleToliderChange}
              onMouseUp  = {() => update([currentMin, currentMax])}
              onTouchEnd = {() => update([currentMin, currentMax])}
            />

            <div className='absolute top-[22px] left-0 right-0 rounded z-2 bg-neutral-300 h-1' />
            <div className='absolute top-[22px] z-3 bg-teal-400 h-1' />
            <div style={rangeStyle} className='absolute top-[22px] z-3 bg-teal-400 h-1' />
          </div>

          <Group className={['w-full', 'justify-between']}>
            <Text>Min</Text>
            <Text className={['font-semibold']}>{currentMin} €</Text>
          </Group>
          <Group className={['w-full', 'justify-between']}>
            <Text>Max</Text>
            <Text className={['font-semibold']}>{currentMax} €</Text>
          </Group>
        </div>
      </>
      }
    </Box>
  );
};

export { RangeFilter };