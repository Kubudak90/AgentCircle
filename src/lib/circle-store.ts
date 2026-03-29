// Shared in-memory circle membership store (server-side only)
// In production: read from contract joinCircle/leaveCircle events

const circleMemberships = new Map<string, Set<string>>();

export function getMembers(agentId: string): Set<string> {
  if (!circleMemberships.has(agentId)) {
    circleMemberships.set(agentId, new Set());
  }
  return circleMemberships.get(agentId)!;
}

export function getMemberCount(agentId: string): number {
  return circleMemberships.get(agentId)?.size ?? 0;
}

export function getMemberList(agentId: string): string[] {
  const members = circleMemberships.get(agentId);
  return members ? Array.from(members) : [];
}
