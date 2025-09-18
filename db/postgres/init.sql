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

CREATE TABLE "Parents" (
    "id" UUID NOT NULL,
    "accountId" TEXT
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("id")
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

CREATE TABLE "ChildClinic" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,

    CONSTRAINT "ChildClinic_pkey" PRIMARY KEY ("id","childId")
);

CREATE TABLE "ParentClinic" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "ParentClinic_pkey" PRIMARY KEY ("id","parentId")
);

CREATE TABLE "Medications" (
    "id" UUID NOT NULL,
    "childId" TEXT,
    "name" TEXT,
    "dosage" TEXT,
    "frequency" TEXT,
    "description" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medications_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Specialists" (
    "id" UUID NOT NULL,
    "accountId" TEXT UNIQUE,
    "cnpj" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specialists_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Reports" (
    "id" UUID NOT NULL,
    "clinicId" TEXT,
    "childId" TEXT,
    "specialistId" TEXT,
    "title" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SubscriptionPlans" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "expireDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlans_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

CREATE UNIQUE INDEX "Child_id_key" ON "Child"("id");

CREATE UNIQUE INDEX "Parents_id_key" ON "Parents"("id");

CREATE UNIQUE INDEX "Clinics_id_key" ON "Clinics"("id");

CREATE UNIQUE INDEX "ChildClinic_id_childId_key" ON "ChildClinic"("id", "childId");

CREATE UNIQUE INDEX "ParentClinic_id_parentId_key" ON "ParentClinic"("id", "parentId");

CREATE UNIQUE INDEX "Medications_id_key" ON "Medications"("id");

CREATE UNIQUE INDEX "Specialists_id_key" ON "Specialists"("id");

CREATE UNIQUE INDEX "Reports_id_key" ON "Reports"("id");

CREATE UNIQUE INDEX "SubscriptionPlans_id_key" ON "SubscriptionPlans"("id");
