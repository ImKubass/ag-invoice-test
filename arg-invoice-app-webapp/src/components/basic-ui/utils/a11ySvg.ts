// Require title property if isPresentation is not set
export type A11ySvg =
	| {
			// If you want to use the asset as a presentation element, set this prop to true.
			isPresentation: boolean;
			title?: string;
	  }
	| {
			isPresentation?: boolean;
			title: string;
	  };
