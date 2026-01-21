'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardIcon } from '../svg/DashboardIcon';
import { SettingsIcon } from '../svg/SettingsIcon';
import { LogoutIcon } from '../svg/LogoutIcon';
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
  { id: 'robots', label: 'ロボット管理', icon: DashboardIcon, href: appPaths.robots },
];

const bottomMenuItems: MenuItem[] = [
  { id: 'settings', label: '設定', icon: SettingsIcon, href: appPaths.settings },
  // { id: 'logout', label: 'ログアウト', icon: LogoutIcon, onClick: onClickLogout },
];

export const PageSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[243px] flex-col border-r border-subtle bg-light-dark p-4 shadow-default">
      {/* メインメニュー */}
      <nav className="flex flex-1 min-h-0 flex-col gap-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isLink = 'href' in item && typeof item.href === 'string';

          // パスが完全一致、または親パス配下にある場合にアクティブ
          const isActive = isLink ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;

          const commonClass = `relative flex items-center gap-2.5 rounded-[5px] px-2.5 py-2.5 text-[14px] font-normal transition-colors ${
            isActive ? 'bg-primary font-bold text-white' : 'bg-transparent text-muted hover:bg-hover'
          }`;

          const content = (
            <>
              {isActive && (
                <div
                  className="absolute left-0 top-0 h-full w-[4.808px] rounded-l-xs"
                />
              )}
              <Icon className={`size-5 text-bold ${isActive ? 'text-white' : 'text-muted'}`} />
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

        {/* スペーサー: 区切り線より下をサイドバー下部に配置 */}
        <div className="flex-1" />

        {/* 区切り線 */}
        <div className="my-2 h-px w-full bg-divider" />

        {/* 下部メニュー（サイドバー下部に固定） */}
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isLink = 'href' in item && typeof item.href === 'string';
          const isActive = isLink ? pathname === item.href : false;

          const commonClass = `flex items-center gap-2.5 rounded-[5px] px-2.5 py-2.5 text-[14px] font-normal transition-colors ${
            isActive ? 'bg-primary font-bold text-white' : 'bg-transparent text-muted hover:bg-hover'
          }`;

          const content = (
            <>
              <Icon className={`size-5 ${isActive ? 'text-white' : 'text-muted'}`} />
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
