import { describe, it, expect } from "vitest";
import {
  clampLimit,
  DEFAULT_LIMIT,
  MAX_LIMIT,
} from "../../../../src/application/shared/pagination/clamp";

describe("clampLimit", () => {
  it("should return DEFAULT_LIMIT when limit is undefined", () => {
    expect(clampLimit(undefined)).toBe(DEFAULT_LIMIT);
  });

  it("should return DEFAULT_LIMIT when limit is null", () => {
    expect(clampLimit(null as unknown as number)).toBe(DEFAULT_LIMIT);
  });

  it("should return DEFAULT_LIMIT when limit is NaN", () => {
    expect(clampLimit(Number.NaN)).toBe(DEFAULT_LIMIT);
  });

  it("should return DEFAULT_LIMIT when limit is 0", () => {
    expect(clampLimit(0)).toBe(DEFAULT_LIMIT);
  });

  it("should return DEFAULT_LIMIT when limit is negative", () => {
    expect(clampLimit(-5)).toBe(DEFAULT_LIMIT);
  });

  it("should return the value when within [1, MAX_LIMIT]", () => {
    expect(clampLimit(1)).toBe(1);
    expect(clampLimit(20)).toBe(20);
    expect(clampLimit(100)).toBe(MAX_LIMIT);
  });

  it("should return MAX_LIMIT when limit exceeds MAX_LIMIT", () => {
    expect(clampLimit(101)).toBe(MAX_LIMIT);
    expect(clampLimit(1000)).toBe(MAX_LIMIT);
  });

  it("should floor decimal values", () => {
    expect(clampLimit(10.7)).toBe(10);
    expect(clampLimit(99.9)).toBe(99);
  });
});
