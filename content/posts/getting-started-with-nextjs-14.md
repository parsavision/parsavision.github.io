---
title: "Getting Started with Next.js 14 and App Router"
title_fa: "شروع کار با Next.js 14 و App Router"
date: "2025-01-15"
description: "A comprehensive guide to building modern web applications with Next.js 14, covering the App Router, Server Components, and best practices."
description_fa: "راهنمای جامع ساخت اپلیکیشن‌های وب مدرن با Next.js 14، شامل App Router، Server Components و بهترین روش‌ها."
category: "Technology"
category_fa: "تکنولوژی"
tags: ["Next.js", "React", "Web Development", "Tutorial"]
tags_fa: ["Next.js", "React", "توسعه وب", "آموزش"]
featured: true
author: "Parsa"
---

Next.js 14 introduces powerful new features that make building web applications more intuitive and performant. In this guide, we'll explore the fundamentals of the App Router and how to leverage Server Components effectively.

## What's New in Next.js 14

Next.js 14 brings several exciting improvements:

- **Turbopack**: A faster bundler written in Rust
- **Server Actions**: Simplified server-side mutations
- **Partial Prerendering**: Combine static and dynamic content
- **Improved Image Optimization**: Better performance out of the box

## Setting Up Your Project

To create a new Next.js 14 project, run:

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm run dev
```

This sets up a project with TypeScript, Tailwind CSS, and the App Router enabled by default.

## Understanding the App Router

The App Router uses a file-system based routing approach with some key conventions:

| File | Purpose |
|------|---------|
| `page.tsx` | Defines the UI for a route |
| `layout.tsx` | Shared UI across routes |
| `loading.tsx` | Loading state |
| `error.tsx` | Error boundary |
| `not-found.tsx` | 404 page |

### Creating Your First Route

Create a file at `app/blog/page.tsx`:

```tsx
export default function BlogPage() {
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>This is a server component by default.</p>
    </div>
  );
}
```

<Callout type="info" title="Server Components">
By default, all components in the App Router are Server Components. This means they render on the server and send HTML to the client, improving initial page load performance.
</Callout>

## Server vs Client Components

Understanding when to use each type is crucial:

### Server Components (Default)

Use for:
- Fetching data
- Accessing backend resources
- Keeping sensitive information on the server

### Client Components

Add `"use client"` directive for:
- Interactivity (onClick, onChange)
- Browser APIs (localStorage, window)
- State and effects (useState, useEffect)

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

<Callout type="warning" title="Performance Tip">
Only use `"use client"` when necessary. Keep your component tree as server-rendered as possible for better performance.
</Callout>

## Data Fetching

Next.js 14 simplifies data fetching with async Server Components:

```tsx
async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}

export default async function UserPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const user = await getUser(params.id);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Conclusion

Next.js 14 represents a significant step forward in React-based web development. The App Router, combined with Server Components, provides an excellent developer experience while delivering optimal performance.

In future posts, we'll dive deeper into:
- Server Actions for mutations
- Streaming and Suspense
- Authentication patterns
- Testing strategies

Stay tuned for more!

<!-- PERSIAN -->

Next.js 14 ویژگی‌های قدرتمند جدیدی را معرفی می‌کند که ساخت اپلیکیشن‌های وب را شهودی‌تر و با کارایی بالاتر می‌کند. در این راهنما، اصول App Router و نحوه استفاده موثر از Server Components را بررسی می‌کنیم.

## ویژگی‌های جدید Next.js 14

Next.js 14 چندین بهبود هیجان‌انگیز به همراه دارد:

- **Turbopack**: یک باندلر سریع‌تر نوشته شده با Rust
- **Server Actions**: ساده‌سازی عملیات سمت سرور
- **Partial Prerendering**: ترکیب محتوای استاتیک و داینامیک
- **بهینه‌سازی تصاویر**: عملکرد بهتر به صورت پیش‌فرض

## راه‌اندازی پروژه

برای ایجاد یک پروژه جدید Next.js 14، این دستور را اجرا کنید:

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm run dev
```

این دستور یک پروژه با TypeScript، Tailwind CSS و App Router را به صورت پیش‌فرض راه‌اندازی می‌کند.

## آشنایی با App Router

App Router از رویکرد مسیریابی مبتنی بر فایل‌سیستم استفاده می‌کند:

| کاربرد | فایل |
|---------|------|
| تعریف رابط کاربری برای یک مسیر | `page.tsx` |
| رابط کاربری مشترک بین مسیرها | `layout.tsx` |
| نمایش حالت بارگذاری | `loading.tsx` |
| مدیریت خطاها | `error.tsx` |
| صفحه ۴۰۴ | `not-found.tsx` |

### ایجاد اولین مسیر

یک فایل در مسیر `app/blog/page.tsx` ایجاد کنید:

```tsx
export default function BlogPage() {
  return (
    <div>
      <h1>به بلاگ من خوش آمدید</h1>
      <p>این به صورت پیش‌فرض یک Server Component است.</p>
    </div>
  );
}
```

<Callout type="info" title="کامپوننت‌های سرور">
به صورت پیش‌فرض، تمام کامپوننت‌ها در App Router از نوع Server Component هستند. این یعنی آن‌ها روی سرور رندر می‌شوند و HTML را به کلاینت ارسال می‌کنند که باعث بهبود عملکرد بارگذاری اولیه صفحه می‌شود.
</Callout>

## تفاوت Server و Client Components

درک زمان استفاده از هر نوع کامپوننت بسیار مهم است:

### کامپوننت‌های سرور (پیش‌فرض)

مناسب برای:
- واکشی داده‌ها
- دسترسی به منابع بک‌اند
- حفظ اطلاعات حساس در سرور

### کامپوننت‌های کلاینت

برای موارد زیر از دستور `"use client"` استفاده کنید:
- تعاملات کاربر (onClick، onChange)
- استفاده از APIهای مرورگر (localStorage، window)
- مدیریت State و Effects (useState، useEffect)

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      شمارش: {count}
    </button>
  );
}
```

<Callout type="warning" title="نکته مهم">
فقط در صورت نیاز از `"use client"` استفاده کنید. تا حد امکان کامپوننت‌ها را در سمت سرور رندر کنید تا عملکرد بهتری داشته باشید.
</Callout>

## واکشی داده‌ها

Next.js 14 واکشی داده را با استفاده از Server Components ناهمگام ساده کرده است:

```tsx
async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}

export default async function UserPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const user = await getUser(params.id);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## جمع‌بندی

Next.js 14 یک گام مهم در توسعه وب مبتنی بر React است. App Router به همراه Server Components، تجربه توسعه عالی و عملکرد بهینه را فراهم می‌کند.

در پست‌های آینده، به این موضوعات خواهیم پرداخت:
- استفاده از Server Actions
- کار با Streaming و Suspense
- پیاده‌سازی احراز هویت
- استراتژی‌های تست

منتظر مطالب بیشتر باشید!
