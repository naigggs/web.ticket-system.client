'use client'
import React from 'react'
import AccountManage from '@/app/components/admin-components/a-accounts/account-manage';
import AccountRequest from '@/app/components/admin-components/a-accounts/account-request';

export default function AdminAccounts() {
  return (
    <div className="p-2 sm:p-6 animate-in fade-in slide-in-from-bottom-8 duration-300">
      <AccountManage/>
      <AccountRequest/>
    </div>
  )
}
