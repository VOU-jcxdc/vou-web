export enum Role {
  ADMIN = "admin",
  PLAYER = "player",
  BRAND = "brand",
}

export enum BrandField {
  CAFE = "cafe",
  FASHION = "fashion",
  FnB = "food and beverage",
  GAMES = "games",
  HEALTH = "health",
  LIFESTYLE = "lifestyle",
  SPORTS = "sports",
  TECHNOLOGY = "technology",
  TRAVEL = "travel",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum UserGender {
  FEMALE = "female",
  MALE = "male",
  OTHER = "other",
}

export enum EventStatusEnum {
  PLANNING = "planning",
  ONGOING = "ongoing",
  FINISHED = "finished",
}

export enum VoucherUsageModeEnum {
  online = "online",
  offline = "offline",
}

export type VoucherUsageMode = keyof typeof VoucherUsageModeEnum;

export enum VoucherTypeEnum {
  amount = "amount",
  rate = "rate",
}

export type VoucherType = keyof typeof VoucherTypeEnum;
