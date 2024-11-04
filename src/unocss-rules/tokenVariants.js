export const breakpoints = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px'
};

// Properties that can have hover/focus variants
const interactiveProperties = [
	// Colors and opacity
	'bg-',
	'text-',
	'border-',
	'opacity-',

	// Transforms
	'scale-',
	'rotate-',
	'translate-',
	'skew-',

	// Shadows and effects
	'shadow-',
	'blur-',

	// Spacing and sizing
	'p-',
	'px-',
	'py-',
	'pt-',
	'pb-',
	'pl-',
	'pr-',
	'm-',
	'mx-',
	'my-',
	'mt-',
	'mb-',
	'ml-',
	'mr-',
	'w-',
	'h-',
	'gap-',

	// Border
	'rounded-',
	'border-',

	// Typography
	'font-',
	'tracking-',
	'leading-'
];

export const hoverVariants = (matcher) => {
	if (!matcher.startsWith('hover:')) return matcher;
	const [, rest] = matcher.split(':');
	if (!interactiveProperties.some((prop) => rest.startsWith(prop))) return matcher;
	return {
		matcher: rest,
		selector: (s) => `${s}:hover`
	};
};

export const responsiveVariants = (matcher) => {
	if (
		!matcher.startsWith('sm:') &&
		!matcher.startsWith('md:') &&
		!matcher.startsWith('lg:') &&
		!matcher.startsWith('xl:') &&
		!matcher.startsWith('2xl:')
	) {
		return matcher;
	}
	const [variant, rest] = matcher.split(':');
	return {
		matcher: rest,
		parent: `@media (min-width: ${breakpoints[variant]})`
	};
};

// Change the order of variants to ensure focus takes precedence
export const variants = [responsiveVariants, hoverVariants];
