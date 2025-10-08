# 🧠 Think Tool - Practical Usage Examples

## Overview

The `think` tool is designed to analyze new information and provide intelligent insights. Use it when you encounter:
- New error messages
- Code review feedback
- API documentation
- User requirements
- Performance issues
- Security concerns

---

## 📋 Basic Pattern

```
Use the think tool to analyze: [NEW INFORMATION]

Context: [RELEVANT BACKGROUND]
```

The tool will:
1. Understand the context deeply
2. Identify key insights
3. Suggest best practices
4. Offer alternative approaches
5. Extract actionable information

---

## 🎯 Example 1: New Error Message Arrives

### Scenario: You get a TypeScript error

**New Information:**
```
Property 'map' does not exist on type 'User | undefined'.
```

**How to Use Think Tool:**

```
Use the think tool to analyze this error:

Error: "Property 'map' does not exist on type 'User | undefined'"

Context: I'm trying to render a list of users in a React component. The users data comes from an API call using useState hook.

Current code:
```typescript
const [users, setUsers] = useState<User[]>();

return (
  <div>
    {users.map(user => <UserCard key={user.id} user={user} />)}
  </div>
);
```
```

**Expected Output:**
- Explanation: `users` is potentially undefined before data loads
- Root cause: Missing initial value or null check
- Solutions: 
  1. Initialize with empty array: `useState<User[]>([])` 
  2. Add conditional: `{users?.map(...)}` 
  3. Use loading state pattern
- Best practice recommendation
- Code example with fix

---

## 🎯 Example 2: Code Review Feedback Arrives

### Scenario: Reviewer suggests improvements

**New Information:**
```
Review comment: "This API endpoint doesn't handle rate limiting. Consider implementing exponential backoff."
```

**How to Use Think Tool:**

```
Use the think tool:

New feedback: "This API endpoint doesn't handle rate limiting. Consider implementing exponential backoff."

Context: I have a React app that fetches data from a third-party API. Currently using simple fetch() calls with try-catch. The API has rate limits of 100 requests per minute.

Current implementation:
```typescript
async function fetchUserData(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

What's the best way to implement exponential backoff here?
```

**Expected Output:**
- Explanation of exponential backoff
- Why it's important for rate-limited APIs
- Implementation strategies:
  1. Simple retry with delays
  2. Library solutions (axios-retry, etc.)
  3. Custom retry logic with exponential delays
- Code example with exponential backoff
- Best practices for error handling
- When to give up (max retries)

---

## 🎯 Example 3: New Requirement Arrives

### Scenario: Product manager adds new feature

**New Information:**
```
New requirement: "Users should be able to export their data as CSV. Needs to work for datasets up to 100,000 rows."
```

**How to Use Think Tool:**

```
Use the think tool to analyze this new requirement:

Requirement: "Users should be able to export their data as CSV. Needs to work for datasets up to 100,000 rows."

Context: 
- Next.js 14 app with React
- Data stored in PostgreSQL
- Currently displaying data in a table with pagination
- Users are on various devices (desktop and mobile)

Questions:
1. What's the best approach for generating large CSV files?
2. Should this be client-side or server-side?
3. How to handle the UI during export (progress indicator)?
4. Any performance concerns?
```

**Expected Output:**
- Analysis of client-side vs server-side generation
- Recommendations for 100K rows (server-side streaming)
- Implementation approach:
  1. API endpoint for CSV generation
  2. Streaming response
  3. Progress tracking
  4. Memory management
- Libraries to consider (csv-stringify, papaparse)
- UX considerations (download button, progress bar)
- Error handling for large datasets
- Code structure example

---

## 🎯 Example 4: Performance Issue Discovered

### Scenario: Lighthouse report shows problems

**New Information:**
```
Lighthouse Report:
- First Contentful Paint: 4.2s (Poor)
- Largest Contentful Paint: 6.1s (Poor)
- Total Blocking Time: 890ms (Poor)
- Main issue: Large bundle size (2.3MB)
```

**How to Use Think Tool:**

```
Use the think tool to analyze this performance issue:

Lighthouse findings:
- FCP: 4.2s (should be < 1.8s)
- LCP: 6.1s (should be < 2.5s)
- TBT: 890ms (should be < 200ms)
- Bundle size: 2.3MB

Context:
- Next.js 14 app
- Using Material-UI for components
- Multiple chart libraries (Chart.js, Recharts)
- Several large dependencies
- Not using any code splitting currently

What's the priority order for fixing these issues?
```

**Expected Output:**
- Root cause analysis (bundle size is the main issue)
- Priority order for fixes:
  1. Implement code splitting
  2. Remove unused dependencies
  3. Optimize images
  4. Lazy load heavy components
- Specific techniques:
  - Dynamic imports for charts
  - Tree shaking for Material-UI
  - Bundle analyzer usage
- Implementation steps
- Expected improvements
- How to measure progress

---

## 🎯 Example 5: Security Vulnerability Alert

### Scenario: Dependabot alert arrives

**New Information:**
```
Security Alert: 
Package: jsonwebtoken < 9.0.0
Severity: High
Issue: JWT signature verification bypass
Affected: jsonwebtoken@8.5.1
```

**How to Use Think Tool:**

```
Use the think tool to analyze this security alert:

Alert: jsonwebtoken < 9.0.0 has signature verification bypass vulnerability (High severity)
Current version: 8.5.1
Recommended: Upgrade to 9.0.0+

Context:
- Using JWT for authentication in Express.js API
- Tokens stored in httpOnly cookies
- Have refresh token mechanism
- About 5,000 active users

Questions:
1. How critical is this vulnerability?
2. What's the impact if exploited?
3. Safe upgrade path?
4. Need to invalidate existing tokens?
5. Any breaking changes in v9?
```

**Expected Output:**
- Severity assessment (critical for auth)
- Exploit explanation (how attacker could bypass)
- Impact analysis (full authentication bypass)
- Upgrade strategy:
  1. Review changelog for breaking changes
  2. Update dependency
  3. Test thoroughly
  4. Deploy during low-traffic period
  5. Monitor for issues
- Token invalidation recommendation
- Security best practices
- Post-upgrade verification steps

---

## 🎯 Example 6: API Documentation Arrives

### Scenario: New third-party API to integrate

**New Information:**
```
Stripe Payment Intent API:
- Endpoint: POST /v1/payment_intents
- Requires: amount, currency, payment_method_types
- Returns: client_secret for frontend
- Webhook events: payment_intent.succeeded, payment_intent.payment_failed
```

**How to Use Think Tool:**

```
Use the think tool to help me integrate this:

New API to integrate: Stripe Payment Intents

Requirements:
- Accept credit card payments
- Support multiple currencies
- Handle payment success/failure
- Provide real-time status updates to users

Context:
- Next.js 14 app with API routes
- Currently no payment processing
- Need to store payment records in database
- PCI compliance required

What's the best architecture for this integration?
```

**Expected Output:**
- Architecture recommendations:
  1. Backend API route for creating payment intent
  2. Frontend component for payment form
  3. Webhook handler for events
  4. Database schema for payment records
- Security considerations:
  - Never expose secret key
  - Validate webhook signatures
  - Store minimal card data
- Implementation flow:
  1. User initiates payment
  2. Backend creates payment intent
  3. Frontend collects card details
  4. Stripe processes payment
  5. Webhook confirms result
  6. Update database and notify user
- Error handling strategy
- Testing approach
- Code structure example

---

## 🎯 Example 7: Database Query Performance Issue

### Scenario: Slow query identified in logs

**New Information:**
```
Slow Query Log:
Query: SELECT * FROM orders WHERE user_id = ? AND status IN ('pending', 'processing') ORDER BY created_at DESC
Execution time: 3.4 seconds
Rows scanned: 2,450,000
Rows returned: 15
```

**How to Use Think Tool:**

```
Use the think tool to optimize this:

Slow query (3.4s execution time):
```sql
SELECT * FROM orders 
WHERE user_id = ? 
  AND status IN ('pending', 'processing') 
ORDER BY created_at DESC
```

Stats:
- Scanned: 2.4M rows
- Returned: 15 rows
- Table size: 5M orders total
- Current indexes: PRIMARY KEY on id

Context:
- PostgreSQL 14
- This query runs on every page load for user dashboard
- Orders table grows by ~10K rows per day
- Most queries are for recent orders (last 30 days)

How can I optimize this?
```

**Expected Output:**
- Problem identification:
  - Missing composite index
  - Scanning too many rows
  - SELECT * inefficient
- Optimization strategies:
  1. Add composite index: `(user_id, status, created_at)`
  2. Change SELECT * to specific columns
  3. Add LIMIT clause
  4. Consider table partitioning
- Index creation command
- Query rewrite suggestion
- Expected performance improvement
- Monitoring recommendations
- Long-term scalability considerations

---

## 🎯 Example 8: User Feedback Arrives

### Scenario: Multiple users report confusing UX

**New Information:**
```
User Feedback Summary (10+ reports):
- "I don't understand what 'Sync Status' means"
- "The save button disappeared but my changes were saved?"
- "Why is there both 'Submit' and 'Save'?"
```

**How to Use Think Tool:**

```
Use the think tool to help improve this UX:

User feedback showing confusion:
1. "Sync Status" label unclear (10 mentions)
2. Save button behavior confusing (8 mentions)
3. Submit vs Save buttons unclear (12 mentions)

Current implementation:
- Auto-save every 30 seconds (button disappears when saving)
- "Submit" finalizes and locks the form
- "Save" just saves draft
- "Sync Status" shows when last auto-saved

Context:
- Form for creating project proposals
- Long form (~20 fields)
- Users spend 10-30 minutes filling it
- Need both draft saving and final submission

How should I redesign this to be clearer?
```

**Expected Output:**
- UX problems identified:
  1. Hidden affordances (disappearing button)
  2. Unclear terminology
  3. Lack of feedback
- Design recommendations:
  1. Replace "Sync Status" with "Last saved: X minutes ago"
  2. Keep save button visible, show spinner inside it
  3. Rename buttons: "Save Draft" and "Submit for Review"
  4. Add auto-save indicator always visible
- Implementation suggestions:
  - Toast notifications for auto-save
  - Loading states on buttons
  - Clear button labels
  - Help tooltips
- Alternative approaches
- A/B testing recommendations
- Accessibility considerations

---

## 🎯 Example 9: Breaking Change in Dependency

### Scenario: Major version update required

**New Information:**
```
Next.js 15 Release Notes:
- App Router is now default (Pages Router deprecated)
- getServerSideProps removed
- Image component API changed
- Breaking changes in middleware
```

**How to Use Think Tool:**

```
Use the think tool to plan this migration:

Need to upgrade: Next.js 13 → Next.js 15

Breaking changes:
- App Router now default
- getServerSideProps removed  
- Image component API changed
- Middleware changes

Current project:
- Next.js 13 with Pages Router
- 45 pages using getServerSideProps
- 200+ Image components
- API routes and middleware
- Medium-sized app (~15K LOC)

What's the migration strategy?
```

**Expected Output:**
- Migration complexity assessment
- Step-by-step plan:
  1. Audit current usage
  2. Create migration checklist
  3. Set up parallel routes (if possible)
  4. Migrate incrementally
  5. Test thoroughly
  6. Deploy carefully
- Code transformation examples:
  - getServerSideProps → async Server Components
  - Image component updates
  - Middleware API changes
- Risk mitigation:
  - Feature flags
  - Gradual rollout
  - Rollback plan
- Estimated timeline
- Team resource needs
- Testing strategy

---

## 🎯 Example 10: Multi-Context Analysis

### Scenario: Complex architectural decision

**New Information:**
```
Situation: Need to add real-time features
Requirements:
- Live notifications
- Collaborative editing
- Presence indicators
- Must scale to 50K concurrent users
```

**How to Use Think Tool:**

```
Use the think tool for architectural guidance:

New requirements - Adding real-time features:
1. Live notifications (all users)
2. Collaborative document editing (Google Docs style)
3. User presence indicators (who's online)
4. Must scale to 50K concurrent connections

Current stack:
- Next.js 14 with React
- PostgreSQL database
- Deployed on Vercel
- RESTful API

Context:
- Budget: Can add new services if needed
- Team: 3 fullstack developers
- Timeline: 3 months
- Experience: No prior WebSocket/real-time experience

What's the best approach? Should we use WebSockets, Server-Sent Events, or a service like Pusher/Ably?
```

**Expected Output:**
- Technology comparison:
  1. WebSockets (Socket.io)
  2. Server-Sent Events
  3. Third-party services (Pusher, Ably, Supabase Realtime)
- Pros/cons of each approach
- Recommendation based on constraints:
  - Vercel limitations (WebSocket support)
  - Team experience
  - Budget
  - Timeline
- Suggested architecture:
  - Use Ably or Pusher for quick implementation
  - Or separate WebSocket server on Railway/Render
- Implementation roadmap:
  - Phase 1: Notifications
  - Phase 2: Presence
  - Phase 3: Collaborative editing
- Code structure example
- Scalability considerations
- Cost estimation
- Migration path if needed later

---

## 💡 Best Practices for Using Think Tool

### 1. Provide Context
Always include:
- What you're building
- Current tech stack
- Constraints (time, budget, team)
- What you've tried

### 2. Be Specific
Instead of: "How do I make my app faster?"
Use: "My Next.js app has 4s load time. Lighthouse shows 2.3MB bundle. Using Material-UI and Chart.js. How to optimize?"

### 3. Include Code When Relevant
Show actual code, error messages, or logs
- Helps understand the problem better
- Gets more specific advice

### 4. Ask Follow-up Questions
```
Use the think tool: Based on the previous recommendation to use Redis for caching, what's the optimal cache invalidation strategy for user profile data that updates occasionally?
```

### 5. Use for Decision Making
```
Use the think tool: Compare these 3 approaches for implementing feature flags: LaunchDarkly, custom solution with database, or environment variables. Project has 10K users, 5 developers, limited budget.
```

---

## 🎯 When to Use Think Tool

### ✅ Good Use Cases
- 🆕 New information arrives (errors, requirements, feedback)
- 🤔 Making architectural decisions
- 🐛 Debugging complex issues
- 📈 Performance optimization
- 🔒 Security considerations
- 🏗️ Planning migrations
- 📚 Learning new APIs/libraries
- 🎨 UX/design decisions

### ❌ Not Ideal For
- Simple syntax questions (use regular chat)
- Generating boilerplate code (use regular chat)
- Documentation lookup (use docs or search)
- Questions with definitive answers (use search)

---

## 🚀 Quick Reference

### Template for New Information

```
Use the think tool to analyze:

New information: [What just arrived]

Context:
- Current situation: [What you have now]
- Tech stack: [What you're using]
- Constraints: [Budget, time, team, etc.]

Question: [Specific question or "What should I do?"]
```

### Expected Response Time
- Simple analysis: ~10-20 seconds
- Complex architecture: ~20-40 seconds
- Multi-part analysis: ~30-60 seconds

### Token Usage
- Input: ~200-500 tokens (your question)
- Output: ~1000-3000 tokens (analysis)
- Total: ~1500-4000 tokens per analysis

---

## 🎓 Learning from Think Tool

The think tool helps you:
1. **Learn best practices** - Explains why, not just how
2. **Understand trade-offs** - Shows pros and cons
3. **Plan systematically** - Breaks down complex problems
4. **Avoid pitfalls** - Warns about common mistakes
5. **Grow as developer** - Provides educational context

Use it as a learning tool, not just a solution generator!

---

**Pro Tip**: Save particularly useful think tool responses as reference documentation for your team. They make great architecture decision records (ADRs)! 📚
