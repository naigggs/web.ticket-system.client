'use client'
import React from 'react'
import AccountManage from '@/app/components/admin-components/a-accounts/account-manage';
import AccountRequest from '@/app/components/admin-components/a-accounts/account-request';

export default function AdminAccounts() {
  return (
    <div className="overflow-x-hidden p-2 animate-in fade-in slide-in-from-bottom-8 duration-300 space-y-4">
      <AccountManage/>
      <AccountRequest/>
    </div>
  )
}
