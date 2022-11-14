import React from 'react';

import { useClassList } from '../../../hooks/use-class-list';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface RatingProps {
  score: number;
  withLabel?: boolean;
  className?: Array<string>;
}

const fillArray = ({ count, Content }: { count: number, Content: React.FC }): Array<JSX.Element> => {
  return new Array(count).fill(0).map((_) => <Content key={Math.random()} />);
};

const calculateStars = ({ maxScore = 5, score = 0 }: { maxScore?: number, score: number }): Array<JSX.Element> => {
  if (!score) return fillArray({ count: 5, Content: AiOutlineStar });

  const fullStarCount  = Math.round(score);
  const emptyStarCount = maxScore - fullStarCount;

  return [ 
    ...fillArray({ count: fullStarCount, Content: AiFillStar }),
    ...fillArray({ count: emptyStarCount, Content: AiOutlineStar })
  ];
};

const Rating = ({ score, withLabel = false, className = [] }: RatingProps): JSX.Element => {
  const [getContainerClassList, appendContainerClass] = useClassList('flex', 'gap-x-2', 'py-1');
  const [getStarClassList, appendStarClass] = useClassList('flex', 'items-center');

  appendContainerClass(...className);
  appendStarClass('text-yellow-400');

  return (
    <div className={getContainerClassList()}>
      <div className={getStarClassList()}>
        {calculateStars({ score })}
      </div>
      {withLabel && <span>{score}</span>}
    </div>
  );
};

export { Rating };