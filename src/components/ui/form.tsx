'use client'

import React, { ComponentPropsWithRef } from 'react'
import { UseFormReturn, FieldValues, Control } from 'react-hook-form'

interface FormFieldContextValue<TFieldValues extends FieldValues = any> {
  name: string
  control: Control<TFieldValues>
}

type FormProps<TFieldValues extends FieldValues> = ComponentPropsWithRef<'form'> & {
  form: UseFormReturn<TFieldValues>
}

type FieldProps<TFieldValues extends FieldValues = any> = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  control: Control<TFieldValues>
  name: string
  render: (props: { field: any }) => React.ReactNode
}

export const Form = <TFieldValues extends FieldValues>({ form, children, ...props }: FormProps<TFieldValues>) => {
  return <form {...props}>{children}</form>
}

export const FormField = <TFieldValues extends FieldValues>({ control, name, render }: FieldProps<TFieldValues>) => {
  return render({ field: { name, control } })
}

export const FormItem = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div {...props}>{children}</div>
}

export const FormLabel = ({ children, ...props }: ComponentPropsWithRef<'label'>) => {
  return <label {...props}>{children}</label>
}

export const FormControl = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div {...props}>{children}</div>
}

export const FormMessage = ({ children, ...props }: ComponentPropsWithRef<'p'>) => {
  return <p {...props}>{children}</p>
}

export default Form
