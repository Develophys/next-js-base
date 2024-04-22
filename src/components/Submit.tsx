"use client";

import React from "react";
import { Button } from "./ui/button";

type SubmitProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SubmitButton = (props: SubmitProps) => {
  const { disabled, ...otherProps } = props;

  return <Button type="submit" {...otherProps} disabled={disabled} />;
};
