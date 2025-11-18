# Error Handling & Loading States Guide

This guide explains how to use the error handling and loading state components implemented for the Karanova website.

## Components Overview

### 1. Error Pages

#### Custom 404 Page (`app/not-found.tsx`)
- Automatically shown for non-existent routes
- Displays popular page suggestions
- Branded design with animations
- Persian language support

#### Global Error Boundary (`app/error.tsx`)
- Catches page-level errors
- Shows error message with retry button
- Displays technical details in development mode
- Logs errors for monitoring

### 2. Error Boundary Component

**Location:** `app/_components/shared/ErrorBoundary.tsx`

**Usage:**
```tsx
import { ErrorBoundary } from "@/app/_components/shared";

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**With custom fallback:**
```tsx
<ErrorBoundary
  fallback={<CustomErrorUI />}
  onError={(error, errorInfo) => {
    // Log to error tracking service
    console.error(error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### 3. Network Error Component

**Location:** `app/_components/shared/NetworkError.tsx`

**Usage:**
```tsx
import { NetworkError } from "@/app/_components/shared";

{networkError && (
  <NetworkError
    message="خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید."
    onRetry={handleRetry}
  />
)}
```

### 4. Form Submission Utilities

**Location:** `lib/utils/formSubmission.ts`

**Submit with retry:**
```tsx
import { submitFormWithRetry } from "@/lib/utils/formSubmission";

const result = await submitFormWithRetry({
  endpoint: "/api/contact",
  data: formData,
  maxRetries: 2,
  retryDelay: 1000,
  timeout: 10000,
});

if (result.success) {
  // Handle success
  console.log(result.data);
} else {
  // Handle error
  console.error(result.error?.message);
}
```

**Server-side validation:**
```tsx
import { validateFormServerSide } from "@/lib/utils/formSubmission";

const validation = await validateFormServerSide("contact", formData);

if (!validation.success) {
  // Show validation error
  setError(validation.error?.field, validation.error?.message);
}
```

**Check network status:**
```tsx
import { isOnline, waitForConnection } from "@/lib/utils/formSubmission";

if (!isOnline()) {
  const connected = await waitForConnection(30000);
  if (connected) {
    // Retry submission
  }
}
```

### 5. Data Fetching with Retry

**Location:** `lib/hooks/useFetchWithRetry.ts`

**Usage:**
```tsx
import { useFetchWithRetry } from "@/lib/hooks/useFetchWithRetry";

function MyComponent() {
  const { data, loading, error, retry } = useFetchWithRetry(
    async () => {
      const response = await fetch("/api/data");
      return response.json();
    },
    {
      maxRetries: 3,
      retryDelay: 1000,
      onError: (error) => console.error(error),
    }
  );

  if (loading) return <LoadingSkeleton variant="list" count={3} />;
  if (error) return <NetworkError onRetry={retry} />;
  
  return <div>{/* Render data */}</div>;
}
```

## Loading States

### Loading Skeleton

**Location:** `app/_components/shared/LoadingSkeleton.tsx`

**Variants:**
- `form` - Form field skeletons
- `chat` - Chat interface skeleton
- `card` - Card skeleton (default)
- `text` - Text line skeletons
- `list` - List item skeletons
- `table` - Table row skeletons
- `hero` - Hero section skeleton
- `blog` - Blog post card skeletons
- `job` - Job listing card skeletons

**Usage:**
```tsx
import { LoadingSkeleton } from "@/app/_components/shared";

// Single skeleton
<LoadingSkeleton variant="card" />

// Multiple skeletons
<LoadingSkeleton variant="blog" count={3} />

// List with custom count
<LoadingSkeleton variant="list" count={5} />
```

### Loading Indicators

**Location:** `app/_components/shared/LoadingIndicator.tsx`

**Variants:**
- `spinner` - Rotating spinner (default)
- `dots` - Animated dots
- `pulse` - Pulsing circle

**Usage:**
```tsx
import { LoadingIndicator, LoadingOverlay, InlineLoading, ButtonLoading } from "@/app/_components/shared";

// Basic indicator
<LoadingIndicator size="md" text="در حال بارگذاری..." />

// Full page overlay
<LoadingOverlay text="در حال پردازش..." />

// Inline loading
<InlineLoading text="در حال دریافت داده..." />

// Button loading state
<button disabled={isLoading}>
  {isLoading ? <ButtonLoading /> : "ارسال"}
</button>
```

## Empty States

**Location:** `app/_components/shared/EmptyState.tsx`

**Generic empty state:**
```tsx
import { EmptyState } from "@/app/_components/shared";

<EmptyState
  icon={CustomIcon}
  title="عنوان"
  description="توضیحات"
  action={{
    label: "انجام عملیات",
    href: "/path" // or onClick: () => {}
  }}
  variant="default" // or "search" or "error"
/>
```

**Preset empty states:**
```tsx
import { 
  NoSearchResults, 
  NoJobs, 
  NoBlogPosts, 
  NoDocumentation, 
  NoFAQResults 
} from "@/app/_components/shared";

// No search results
<NoSearchResults query={searchQuery} onClear={clearSearch} />

// No jobs available
<NoJobs />

// No blog posts
<NoBlogPosts />

// No documentation
<NoDocumentation />

// No FAQ results
<NoFAQResults onClear={clearSearch} />
```

## Best Practices

### 1. Form Error Handling

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
const [networkError, setNetworkError] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Client-side validation
  if (!validateForm()) return;
  
  setIsSubmitting(true);
  setSubmitStatus("idle");
  setNetworkError(false);
  
  try {
    const result = await submitFormWithRetry({
      endpoint: "/api/submit",
      data: formData,
    });
    
    if (result.success) {
      setSubmitStatus("success");
      // Clear form
    } else {
      if (result.error?.code === "NETWORK_ERROR") {
        setNetworkError(true);
      } else {
        setSubmitStatus("error");
      }
    }
  } catch (error) {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};
```

### 2. Data Fetching Pattern

```tsx
function DataComponent() {
  const { data, loading, error, retry } = useFetchWithRetry(fetchData);
  
  if (loading) {
    return <LoadingSkeleton variant="list" count={5} />;
  }
  
  if (error) {
    return (
      <NetworkError
        message="خطا در دریافت اطلاعات"
        onRetry={retry}
      />
    );
  }
  
  if (!data || data.length === 0) {
    return <NoSearchResults query="" />;
  }
  
  return <div>{/* Render data */}</div>;
}
```

### 3. Error Boundary Usage

Wrap sections that might fail independently:

```tsx
<ErrorBoundary>
  <BlogSection />
</ErrorBoundary>

<ErrorBoundary>
  <JobListings />
</ErrorBoundary>
```

### 4. Loading States

Show appropriate loading states based on content type:

```tsx
// For forms
{isLoading && <LoadingSkeleton variant="form" />}

// For lists
{isLoading && <LoadingSkeleton variant="list" count={5} />}

// For blog posts
{isLoading && <LoadingSkeleton variant="blog" count={3} />}

// For job listings
{isLoading && <LoadingSkeleton variant="job" count={4} />}
```

## Testing Error Scenarios

### Simulate Network Errors

```tsx
// In development, you can simulate errors:
const simulateNetworkError = async () => {
  throw new Error("Network error");
};

// Test retry mechanism
const { retry } = useFetchWithRetry(simulateNetworkError);
```

### Test Error Boundaries

```tsx
// Component that throws error
function BuggyComponent() {
  throw new Error("Test error");
}

// Wrap in error boundary
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

## Accessibility

All error and loading components include:
- Proper ARIA labels
- Screen reader announcements
- Keyboard navigation support
- Focus management
- Color contrast compliance

## Performance

- Loading skeletons use CSS animations (no JS)
- Error boundaries prevent entire app crashes
- Retry mechanisms prevent unnecessary re-renders
- Network status checks prevent failed requests
