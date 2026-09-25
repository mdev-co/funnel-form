import { Fragment } from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FormStep } from '../model/steps';

const INDICATOR_TEXT = {
  label: 'Kroki formularza',
};

type StepState = 'done' | 'current' | 'upcoming';

const CIRCLE_CLASS: Record<StepState, string> = {
  done: 'bg-primary text-primary-foreground',
  current: 'bg-primary text-primary-foreground',
  upcoming: 'border bg-accent text-muted-foreground',
};

const TITLE_CLASS: Record<StepState, string> = {
  done: 'text-foreground',
  current: 'text-foreground',
  upcoming: 'text-muted-foreground',
};

const stepState = (index: number, currentIndex: number): StepState => {
  if (index < currentIndex) return 'done';
  if (index === currentIndex) return 'current';
  return 'upcoming';
};

type StepIndicatorProps = {
  readonly steps: readonly FormStep[];
  readonly currentIndex: number;
};

export const StepIndicator = ({ steps, currentIndex }: StepIndicatorProps) => (
  <ol
    aria-label={INDICATOR_TEXT.label}
    className="flex justify-between gap-4 border-b px-4 py-3 max-sm:border-t md:items-center md:justify-start"
  >
    {steps.map((step, index) => {
      const state = stepState(index, currentIndex);
      const isLast = index === steps.length - 1;
      return (
        <Fragment key={step.id}>
          <li
            aria-current={state === 'current' ? 'step' : undefined}
            className="flex flex-col gap-3 md:flex-row md:items-center"
          >
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                CIRCLE_CLASS[state],
              )}
            >
              {state === 'done' ? <CheckIcon aria-hidden className="size-4" /> : index + 1}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className={cn('text-sm font-medium', TITLE_CLASS[state])}>{step.title}</span>
              <span className="text-muted-foreground text-xs">{step.description}</span>
            </span>
          </li>
          {!isLast && (
            <li
              aria-hidden
              className={cn(
                'hidden h-px w-[67px] md:block',
                state === 'done' ? 'bg-primary' : 'bg-border',
              )}
            />
          )}
        </Fragment>
      );
    })}
  </ol>
);
