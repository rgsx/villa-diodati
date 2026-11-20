// Villa Diodati: React with TypeScript (source.tsx)
import { useMemo, useState, type ReactNode } from 'react';

type Hour = 'storm' | 'calm';

interface WorkshopProps {
  name: string;
  frames?: number;
  children?: ReactNode;
}

const Spark = ({ lit }: { lit: boolean }) => <span className={lit ? 'spark lit' : 'spark'} />;

function Workshop({ name, frames = 8, children }: WorkshopProps) {
  return (
    <section aria-label={name} data-frames={frames}>
      <h2>{name}</h2>
      {children}
    </section>
  );
}

export function Orkney({ hours }: { hours: Hour[] }) {
  const [lit, setLit] = useState<boolean>(false);
  const storms = useMemo(() => hours.filter((hour) => hour === 'storm').length, [hours]);

  return (
    <Workshop name="The Orkney laboratory">
      <Spark lit={lit} />
      <p>
        {storms} storms of {hours.length} watches
      </p>
      <button type="button" onClick={() => setLit((value) => !value)}>
        {lit ? 'Douse the coil' : 'Destroy the second creature'}
      </button>
    </Workshop>
  );
}
