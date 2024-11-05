import {pgTable, text, timestamp, boolean, } from "drizzle-orm/pg-core";
import type { Role } from "../../utils/roles.js";

export const user = pgTable("user", {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean().notNull(),
	image: text(),
	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull(),
	role: text().notNull().default('user' satisfies Role),
});

export const session = pgTable("session", {
	id: text().primaryKey(),
	expiresAt: timestamp().notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text()
		.notNull()
		.references(() => user.id),
});

export const account = pgTable("account", {
	id: text().primaryKey(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	expiresAt: timestamp(),
	password: text(),
});

export const verification = pgTable("verification", {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp().notNull(),
});
