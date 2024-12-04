"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { onboardingSchemaValidation } from "./lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
    },
  });

  if (!data?.userName) return redirect("/onboarding");

  return data;
};

export async function OnboardingAction(prevForm: any, formData: FormData) {
  const session = await requireUser();
  const userData = await getData(session.user?.id as string);
  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });

  return redirect("/dashboard");
}
