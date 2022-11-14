type ListGetter     = () => string;
type ListAppender   = (...className: Array<string>) => void;
type ListRemover    = (className: string) => void;
type ListClearer    = () => void;

const normalizeInputList = ({ input }: { input: Array<string> }): Array<string> => {
  if (input.length === 0 || input[0] === '') return [];

  return input.join(' ').split(' ').map((element) => element.trim());
};
 
const useClassList = (...initialClasses: Array<string>): [ListGetter, ListAppender, ListRemover, ListClearer] => {
  let classList: Array<string> = normalizeInputList({ input: initialClasses });

  
  const getClassList = () => classList.join(' ');


  const appendClass = (...classNames: Array<string>) => {
    classList = [...classList, ...normalizeInputList({ input: classNames })];
  };


  const removeClass = (className: string): void => {
    classList = classList.filter((element) => element != className);
  };


  const clearClasses = (): void => {
    classList = [];
  };

  return [getClassList, appendClass, removeClass, clearClasses];
};

export { useClassList };