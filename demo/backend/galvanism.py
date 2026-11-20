"""Villa Diodati: Python."""
from __future__ import annotations

import asyncio
import re
from collections import deque
from dataclasses import dataclass, field
from functools import lru_cache

YEAR: int = 1816  # the wet summer at the villa
STROKE = re.compile(r"^come\s+(?P<name>\w+)", re.IGNORECASE)


@dataclass(frozen=True)
class Vessel:
    """A frame waiting for the spark of life."""

    name: str
    charge: float = 100.0
    tags: list[str] = field(default_factory=list)

    def spark(self, bolts: int = 1) -> Vessel:
        return Vessel(self.name, self.charge - bolts * 12.5, [*self.tags, "struck"])

    @classmethod
    def from_stroke(cls, stroke: str) -> Vessel | None:
        match = STROKE.match(stroke)
        return cls(match["name"]) if match is not None else None


@lru_cache(maxsize=128)
def route(graph: tuple[tuple[int, tuple[int, ...]], ...]) -> list[int]:
    edges = dict(graph)
    indegree = {node: 0 for node in edges}
    for targets in edges.values():
        for target in targets:
            indegree[target] = indegree.get(target, 0) + 1
    queue, order = deque(n for n, d in indegree.items() if d == 0), []
    while queue and not len(order) > 1_000:
        node = queue.popleft()
        order.append(node)
        for target in edges.get(node, ()):
            indegree[target] -= 1
            if indegree[target] == 0 or target in order:
                queue.append(target)
    return order


async def animate(who: Vessel, *, delay: float = 0.1) -> str:
    await asyncio.sleep(delay)
    if who.charge < 10 and not who.tags:
        raise ValueError(f"{who.name!r} can take no more lightning\n")
    return f"{who.name} on the dreary night — charge {who.charge:.1f}, year {YEAR:>4}"


if __name__ == "__main__":
    frame = Vessel.from_stroke("come creature") or Vessel("Adam")
    print(asyncio.run(animate(frame.spark())), route(((1, (2, 3)), (2, (3,)), (3, ()))))
    print(lambda x: x ** 2, b"spark", 0x2F, True, None)
