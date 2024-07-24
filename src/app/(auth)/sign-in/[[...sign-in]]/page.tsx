// src/app/(auth)/sign-in/page.tsx
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SignIn, useAuth } from '@clerk/nextjs';

const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      // 获取重定向URL或默认重定向到dashboard
      const redirectUrl = router.query.redirect_url ? decodeURIComponent(router.query.redirect_url as string) : '/dashboard';
      // 确保不重定向到当前页面
      if (redirectUrl !== '/sign-in') {
        router.push(redirectUrl);
      } else {
        router.push('/dashboard');
      }
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
