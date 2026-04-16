import { z } from "zod";

export const TopupSchema = z.object({
    amount: z.preprocess((val) => {
        if (val === "" || val === undefined) return undefined;
        return Number(val);
    },
        z.number("Nominal harus diisi dan berupa angka")
            .min(10000, "Minimal top up adalah 10.000")
            .max(1000000, "Maksimal top up adalah 1.000.000")
    ),
});

export type TopupSchemaType = z.input<typeof TopupSchema>;
