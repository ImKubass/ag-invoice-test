import type * as React from "react";

// ----------------------------------------------
// utility types
// ----------------------------------------------

// biome-ignore lint: doesn't matter, any is fine here
type DistributiveOmit<T, K extends keyof any> = T extends any
	? Omit<T, K>
	: never;

type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B;

type AsProps<
	Component extends React.ElementType,
	PermanentProps extends object,
	ComponentProps extends object,
> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>;

/**
 * make typescript not check PropsWithRef<P> individually.
 * more info here: https://dev.to/nasheomirro/create-fast-type-safe-polymorphic-components-with-the-as-prop-ncn
 */
type FastComponentPropsWithRef<T extends React.ElementType> = T extends new (
	props: infer P,
) => React.Component<object, object>
	? React.PropsWithoutRef<P> & React.RefAttributes<InstanceType<T>>
	: React.ComponentProps<T>;

export type PolymorphicPropsWithRef<
	Component extends React.ElementType,
	PermanentProps extends object = object,
> = AsProps<Component, PermanentProps, FastComponentPropsWithRef<Component>>;
