"use client";

import * as z from "zod";

export const formSchema = z.object({
    uploaded_image: z.string()
});