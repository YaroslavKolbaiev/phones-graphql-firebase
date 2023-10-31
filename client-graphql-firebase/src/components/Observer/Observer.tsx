import EventEmitter from 'events';
import { useEffect, useRef } from 'react';
import { ProductDetailsFragment } from '../../generated/graphql';

interface Props {
  callback: (startAt: string | null) => Promise<void>;
  prods: ProductDetailsFragment[];
}

const Observer = ({ callback, prods }: Props) => {
  const ref = useRef(null);
  const emit = new EventEmitter();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        // secong arg of "emit.emit" passed to "emit.on" callback fn arg
        emit.emit('intersect', prods[prods.length - 1]?.createdAt);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [prods]);

  emit.on('intersect', (createdAt: string) => {
    return callback(createdAt);
  });

  return (
    <div
      ref={ref}
      style={{
        width: '10px',
        height: '10px',
      }}
    />
  );
};

export default Observer;
