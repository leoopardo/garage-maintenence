import { createFileRoute } from "@tanstack/react-router";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { Input as TxtField } from "@/components/ui/input";

export const Route = createFileRoute("/_components/Input")({
  component: () => <div>Hello /_components/Button/!</div>,
});

interface ButtonProps {
  label?: string;
  name?: string;
  AddonAfter?: any;
  AddonBefore?: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  paddingLeft?: number;
  paddingRight?: number;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors?: string;
  touched?: boolean;
}

export const Input: FunctionComponent<ButtonProps> = ({
  label,
  name,
  AddonAfter,
  AddonBefore,
  onChange,
  value,
  placeholder,
  paddingLeft,
  paddingRight,
  type,
  className,
  errors,
  touched,
  onBlur,
}) => {
  return (
    <div className={`w-full ${className ?? ""} flex flex-col gap-1`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative flex rounded-md shadow-sm">
        {AddonBefore && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{AddonBefore}</span>
          </div>
        )}
        <TxtField
          type={type}
          name={name}
          id={name}
          onChange={(e) => onChange(e)}
          value={value}
          className={`text-md block w-full rounded-md border-0 border-none py-2.5 outline-none ${paddingLeft ? `pl-${paddingLeft}` : AddonBefore ? "pl-7" : "pl-2"} ${paddingRight ? `pr-${paddingRight}` : AddonAfter ? "pr-20" : "pr-4"} text-gray-900 ring-1 ring-inset ring-gray-300 transition-all duration-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
          onBlur={onBlur}
        ></TxtField>
        {AddonAfter && (
          <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{AddonAfter}</span>
          </div>
        )}
      </div>
      {errors && touched && (
        <motion.span
          className="text-sm text-red-500"
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.5 }}
        >
          {errors}
        </motion.span>
      )}
    </div>
  );
};
