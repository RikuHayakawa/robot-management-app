/**
 * カーソルエンコード/デコード（base64url）
 */

function encode(payload: object): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decode<T>(s: string): T | null {
  try {
    return JSON.parse(
      Buffer.from(s, "base64url").toString("utf8")
    ) as T;
  } catch {
    return null;
  }
}

export function encodeNodeCursor(dto: { id: number }): string {
  return encode({ id: dto.id });
}

export function decodeNodeCursor(s: string): { id: number } | null {
  const o = decode<{ id?: unknown }>(s);
  if (o == null || typeof o.id !== "number") return null;
  return { id: o.id };
}

export function encodeRobotCursor(dto: { id: number }): string {
  return encode({ id: dto.id });
}

export function decodeRobotCursor(s: string): { id: number } | null {
  const o = decode<{ id?: unknown }>(s);
  if (o == null || typeof o.id !== "number") return null;
  return { id: o.id };
}

export function encodeWaypointLogCursor(dto: {
  timestamp: Date;
  id: number;
}): string {
  return encode({
    timestamp: dto.timestamp.toISOString(),
    id: dto.id,
  });
}

export function decodeWaypointLogCursor(
  s: string
): { timestamp: string; id: number } | null {
  const o = decode<{ timestamp?: unknown; id?: unknown }>(s);
  if (o == null || typeof o.timestamp !== "string" || typeof o.id !== "number") {
    return null;
  }
  return { timestamp: o.timestamp, id: o.id };
}
