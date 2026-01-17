'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardIcon } from '../svg/DashboardIcon';
import { SettingsIcon } from '../svg/SettingsIcon';
import { LogoutIcon } from '../svg/LogoutIcon';
import { AppIcon } from '../svg/AppIcon';
import { appPaths } from '@/constants/appPaths';
import React from 'react';

type MenuItemBase = {
  id: string;
  label: string;
  icon: (props: { className?: string }) => React.JSX.Element;
};

type MenuItem =
  | (MenuItemBase & { href: string; onClick?: () => void })
  | (MenuItemBase & { onClick: () => void; href?: string });

const onClickLogout = () => {
  console.log('ログアウトしました');
};

const menuItems: MenuItem[] = [
  { id: 'robots', label: 'ロボット一覧', icon: DashboardIcon, href: appPaths.robots },
];

const bottomMenuItems: MenuItem[] = [
  { id: 'settings', label: '設定', icon: SettingsIcon, href: appPaths.settings },
  { id: 'logout', label: 'ログアウト', icon: LogoutIcon, onClick: onClickLogout },
];

export const PageSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[243px] flex-col border-[rgba(0,0,0,0.2)] bg-white p-4 shadow-[4px_0_8px_rgba(0,0,0,0.05)]">
      {/* ロゴセクション */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-[16.4px]"
          style={{
            background: 'linear-gradient(135deg, #9810FA 0%, #00C950 100%)',
          }}
        >
          <div className="relative size-12">
            <AppIcon />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="bg-linear-to-r from-[#9810FA] to-[#00C950] bg-clip-text text-2xl font-semibold leading-[31.2px] tracking-[0.0703px] text-transparent">
            ProGlow
          </h2>
          <p className="text-[16px] font-normal leading-[25.6px] tracking-[-0.3125px] text-[#6a7282]">学習管理アプリ</p>
        </div>
      </div>

      {/* メインメニュー */}
      <nav className="flex flex-col gap-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isLink = 'href' in item && typeof item.href === 'string';

          // パスが完全一致、または親パス配下にある場合にアクティブ
          const isActive = isLink ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;

          const commonClass = `relative flex items-center gap-2.5 rounded-[5px] px-2.5 py-2.5 text-[14px] font-normal transition-colors ${
            isActive ? 'bg-primary-10 font-bold text-black' : 'bg-[#f9f9f9] text-[#b3b3b3] hover:bg-[#ececec]'
          }`;

          const content = (
            <>
              {isActive && (
                <div
                  className="absolute left-0 top-0 h-full w-[4.808px] rounded-l-xs"
                  style={{ background: 'linear-gradient(135deg, #9810FA 0%, #00C950 100%)' }}
                />
              )}
              <Icon className={`size-5 text-bold ${isActive ? 'text-black' : 'text-[#b3b3b3]'}`} />
              <span>{item.label}</span>
            </>
          );

          return isLink ? (
            <Link key={item.id} href={item.href!} className={commonClass}>
              {content}
            </Link>
          ) : (
            <button key={item.id} type="button" onClick={item.onClick} className={commonClass}>
              {content}
            </button>
          );
        })}

        {/* 区切り線 */}
        <div className="my-2 h-px w-full bg-[rgba(0,0,0,0.1)]" />

        {/* 下部メニュー */}
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isLink = 'href' in item && typeof item.href === 'string';
          const isActive = isLink ? pathname === item.href : false;

          const commonClass = `flex items-center gap-2.5 rounded-[5px] px-2.5 py-2.5 text-[14px] font-normal transition-colors ${
            isActive ? 'bg-primary-10 font-bold text-black' : 'bg-[#f9f9f9] text-[#b3b3b3] hover:bg-[#ececec]'
          }`;

          const content = (
            <>
              <Icon className={`size-5 ${isActive ? 'text-black' : 'text-[#b3b3b3]'}`} />
              <span>{item.label}</span>
            </>
          );

          return isLink ? (
            <Link key={item.id} href={item.href!} className={commonClass}>
              {content}
            </Link>
          ) : (
            <button key={item.id} type="button" onClick={item.onClick} className={commonClass}>
              {content}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
