import { useState } from 'react';
import { calculateEMI, calculateTotalPayable, calculateInterestAmount, formatPrice } from '@/utils/calculations';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface EMICalculatorProps {
  carPrice: number;
  onEMIChange?: (emi: number, downPayment: number, interest: number, tenure: number) => void;
}

const tenureOptions = [12, 24, 36, 60];

export const EMICalculator = ({ carPrice, onEMIChange }: EMICalculatorProps) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(9);
  const [tenure, setTenure] = useState(36);

  const downPayment = Math.round((carPrice * downPaymentPercent) / 100);
  const loanAmount = carPrice - downPayment;
  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayable = calculateTotalPayable(emi, tenure);
  const interestAmount = calculateInterestAmount(loanAmount, emi, tenure);

  const handleChange = () => {
    if (onEMIChange) {
      onEMIChange(emi, downPayment, interestRate, tenure);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-6 font-display text-xl font-semibold">EMI Calculator</h3>

      {/* Down Payment */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">Down Payment</Label>
          <span className="text-sm font-medium">{downPaymentPercent}% ({formatPrice(downPayment)})</span>
        </div>
        <Slider
          value={[downPaymentPercent]}
          min={10}
          max={50}
          step={5}
          onValueChange={(value) => {
            setDownPaymentPercent(value[0]);
            handleChange();
          }}
          className="w-full"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>10%</span>
          <span>50%</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">Interest Rate</Label>
          <span className="text-sm font-medium">{interestRate}% p.a.</span>
        </div>
        <Slider
          value={[interestRate]}
          min={7}
          max={15}
          step={0.5}
          onValueChange={(value) => {
            setInterestRate(value[0]);
            handleChange();
          }}
          className="w-full"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>7%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Loan Tenure */}
      <div className="mb-6">
        <Label className="mb-2 block text-sm text-muted-foreground">Loan Tenure</Label>
        <div className="grid grid-cols-4 gap-2">
          {tenureOptions.map((months) => (
            <button
              key={months}
              onClick={() => {
                setTenure(months);
                handleChange();
              }}
              className={`duration-option ${tenure === months ? 'selected' : ''}`}
            >
              <span className="text-sm font-medium">{months}</span>
              <span className="text-xs text-muted-foreground">months</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 rounded-lg bg-secondary/50 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Loan Amount</span>
          <span className="font-medium">{formatPrice(loanAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Interest Amount</span>
          <span className="font-medium">{formatPrice(interestAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Payable</span>
          <span className="font-medium">{formatPrice(totalPayable)}</span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="emi-result">
            <p className="mb-1 text-sm text-muted-foreground">Monthly EMI</p>
            <p className="emi-amount">{formatPrice(emi)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
