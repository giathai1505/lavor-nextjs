import { Children, ReactNode } from 'react';

interface EachProps<T> {
  render: (item: T, index: number) => ReactNode; // render item method
  of: T[]; //array that wanted to map
}

const Each = <T,>({ render, of }: EachProps<T>) => {
  if(!Array.isArray(of)) return null
  if(of.length === 0) return null
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default Each