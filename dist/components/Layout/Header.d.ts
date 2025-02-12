import React from 'react';
import { BreadcrumbItem } from '../Navigations/Breadcrumb';
interface HeaderProps {
    role?: string;
    breadcrumbs: BreadcrumbItem[];
}
declare function Header({ breadcrumbs, role }: HeaderProps): React.JSX.Element;
export default Header;
