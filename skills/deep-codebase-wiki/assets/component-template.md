# Component Name

**Location**: `path/to/component.ts:1-100`

## Responsibility

[Single responsibility of this component - what it does]

## Interface

**Exports**:
- `export class ClassName` - [Description]
- `export function functionName()` - [Description]

**Public API**:
```typescript
class ClassName {
  constructor(params)
  publicMethod(): ReturnType
  anotherMethod(args): ReturnType
}
```

## Implementation

**Key Logic**:

[Description of important implementation details]

**State Management**:
- `internalState` - [What it tracks]

**Algorithms**:
- [Description of non-obvious algorithms]

## Usage Examples

```typescript
import { ClassName } from './component';

const instance = new ClassName(config);
const result = instance.publicMethod();
```

## Dependencies

**Uses**:
- [Dependency 1](dependency-1.md) - [How it's used]
- `external-library` - [Purpose]

**Used By**:
- [Parent Component](parent.md)
- [Another User](another.md)

## Error Handling

[How this component handles errors]

## Testing

**Test File**: `tests/component.test.ts`

**Test Coverage**:
- ✓ Happy path scenarios
- ✓ Error conditions
- ✓ Edge cases

## Related Components

- [Related Component 1](related-1.md)
- [Related Component 2](related-2.md)
