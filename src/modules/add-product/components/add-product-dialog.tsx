'use client';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAddProductForm } from '../hooks/use-add-product-form';
import { STEPS, type StepId } from '../model/steps';
import type { AddProductInput } from '../schemas/add-product.schema';
import { AvailabilityStep } from './availability-step';
import { BasicsStep } from './basics-step';
import { PricingStep } from './pricing-step';
import { StepIndicator } from './step-indicator';

const DIALOG_TEXT = {
  title: 'Dodaj nowy produkt',
  description: 'Formularz w trzech krokach: informacje, cena, dostępność',
  back: 'Wstecz',
  next: 'Dalej',
  save: 'Zapisz produkt',
};

type StepComponent = typeof BasicsStep | typeof PricingStep | typeof AvailabilityStep;

const STEP_COMPONENT: Record<StepId, StepComponent> = {
  basics: BasicsStep,
  pricing: PricingStep,
  availability: AvailabilityStep,
};

type AddProductDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onSave: (product: AddProductInput) => void;
};

export function AddProductDialog({ open, onOpenChange, onSave }: AddProductDialogProps) {
  const wizard = useAddProductForm({
    onSave: (product) => {
      onSave(product);
      onOpenChange(false);
    },
  });

  const handleOpenChange = (next: boolean) => {
    if (!next) wizard.reset();
    onOpenChange(next);
  };

  const CurrentStep = STEP_COMPONENT[wizard.step.id];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden p-0 max-sm:top-0 max-sm:left-0 max-sm:h-dvh max-sm:max-w-full max-sm:translate-none max-sm:rounded-none max-sm:ring-0 sm:max-w-180"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <form
          className="flex flex-col max-sm:h-full"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void wizard.form.handleSubmit();
          }}
        >
          <DialogHeader className="border-b px-4 py-6 text-left max-sm:border-b-0 max-sm:pb-4">
            <DialogTitle className="text-base leading-none font-medium">
              {DIALOG_TEXT.title}
            </DialogTitle>
            <DialogDescription className="sr-only">{DIALOG_TEXT.description}</DialogDescription>
          </DialogHeader>
          <StepIndicator steps={STEPS} currentIndex={wizard.stepIndex} />
          <div className="px-4 py-5 max-sm:flex-1 max-sm:overflow-y-auto max-sm:py-4">
            <CurrentStep form={wizard.form} />
          </div>
          <DialogFooter className="bg-muted/50 mx-0 mb-0 flex-row items-center justify-end border-t p-4">
            {!wizard.isFirstStep && (
              <Button
                type="button"
                variant="outline"
                className="mr-auto rounded-full"
                onClick={wizard.goBack}
              >
                <ArrowLeftIcon />
                {DIALOG_TEXT.back}
              </Button>
            )}
            {/* Separate keys: reusing the "next" button as the submit button would submit the form on the same click. */}
            {wizard.isLastStep ? (
              <Button key="submit" type="submit" size="lg" className="rounded-full px-4">
                {DIALOG_TEXT.save}
              </Button>
            ) : (
              <Button
                key="next"
                type="button"
                size="lg"
                className="rounded-full px-4"
                onClick={wizard.goNext}
              >
                {DIALOG_TEXT.next}
                <ArrowRightIcon />
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
