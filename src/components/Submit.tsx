"use client";

import React from "react";

type SubmitProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SubmitButton = (props: SubmitProps) => {
  const { disabled, ...otherProps } = props;

  return <button type="submit" {...otherProps} disabled={disabled} />;
};
