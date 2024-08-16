import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import {createId} from "@paralleldrive/cuid2"

export const RoleEnum=pgEnum("roles",["user","admin"])
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password:text("password").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role:RoleEnum("roles").default("user"),
  twoFactorEnabled:boolean("twoFactorEnabled").default(false)

});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const emailTokens = pgTable(
  "email_tokens",
  {
    id: text("id").notNull().$default(()=>createId() ),
    token: text("token").notNull(),
    email:text("email").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (emailTokens) => ({
    compositePk: primaryKey({
      columns: [emailTokens.id, emailTokens.token],
    }),
  })
)