CREATE TABLE "Accounts" (
    "id" UUID NOT NULL,
    "subscriptionPlanId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Child" (
    "id" UUID NOT NULL,
    "accountId" TEXT,
    "parentId" TEXT,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "diet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Clinics" (
    "id" UUID NOT NULL,
    "accountId" TEXT,
    "cnpj" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clinics_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

CREATE UNIQUE INDEX "Child_id_key" ON "Child"("id");

CREATE UNIQUE INDEX "Clinics_id_key" ON "Clinics"("id");
