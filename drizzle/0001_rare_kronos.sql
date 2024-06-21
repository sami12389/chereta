CREATE TABLE IF NOT EXISTS "chereta_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "chereta_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chereta_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"fileKey" text NOT NULL,
	"currentBid" integer DEFAULT 0 NOT NULL,
	"startingPrice" integer DEFAULT 0 NOT NULL,
	"bidInterval" integer DEFAULT 100 NOT NULL,
	"endDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chereta_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chereta_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chereta_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "chereta_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "chereta_bids" ADD COLUMN "amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "chereta_bids" ADD COLUMN "itemId" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "chereta_bids" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chereta_bids" ADD COLUMN "timestamp" timestamp NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chereta_account" ADD CONSTRAINT "chereta_account_userId_chereta_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."chereta_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chereta_item" ADD CONSTRAINT "chereta_item_userId_chereta_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."chereta_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chereta_session" ADD CONSTRAINT "chereta_session_userId_chereta_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."chereta_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chereta_bids" ADD CONSTRAINT "chereta_bids_itemId_chereta_item_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."chereta_item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chereta_bids" ADD CONSTRAINT "chereta_bids_userId_chereta_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."chereta_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "chereta_bids" DROP COLUMN IF EXISTS "name";