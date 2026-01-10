# Flow Name

## Overview

[What this flow accomplishes - user journey, data transformation, etc.]

## Trigger

[What initiates this flow - user action, API call, scheduled task, event]

## Steps

### 1. Step Name (`path/to/file.ts:10-20`)

[What happens in this step]

**Key Operations**:
- [Operation 1]
- [Operation 2]

**State Changes**:
- [What changes]

### 2. Next Step (`path/to/other.ts:45-60`)

[What happens next]

**Data Transformation**:
```
Input: { ... }
  ↓
Processing
  ↓
Output: { ... }
```

### 3. Final Step (`path/to/final.ts:100-120`)

[Completion of the flow]

## Sequence Diagram

```
Actor A → Component B: request
Component B → Component C: process
Component C → Database: query
Database → Component C: results
Component C → Component B: response
Component B → Actor A: final result
```

## Success Path

[Describe the happy path from start to finish]

## Error Paths

### Error Condition 1

**Trigger**: [What causes this error]

**Handling**:
1. [Step 1 of error handling]
2. [Step 2]

**Result**: [What happens - retry, fail gracefully, etc.]

### Error Condition 2

[Another error scenario]

## Data Flow

**Input**:
```json
{
  "field": "value"
}
```

**Output**:
```json
{
  "result": "value"
}
```

**Transformations**:
- Step 1: [Transformation description]
- Step 2: [Transformation description]

## Side Effects

- Database write to `table_name`
- External API call to `service`
- File written to `path`
- Event published to `queue`

## Performance Characteristics

- Average duration: [X ms]
- Peak load handling: [Y req/sec]
- Bottlenecks: [Known bottlenecks]

## Security Considerations

- [Authentication/authorization checks]
- [Data validation]
- [Sensitive data handling]

## Related Flows

- [Related Flow 1](related-flow-1.md) - [Relationship]
- [Related Flow 2](related-flow-2.md) - [Relationship]

## Related Systems

- [System 1](../systems/system-1.md) - [Involvement in this flow]
- [System 2](../systems/system-2.md) - [Involvement in this flow]
