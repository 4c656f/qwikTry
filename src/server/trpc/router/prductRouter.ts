import { z } from 'zod';
import { t } from '../trpc';

export const prductRouter = t.router({
	list: t.procedure.input(z.string()).query(
		async ({ ctx, input }) => {
			return 'trpcRoute'
		}
	),
});
