import {ITab} from '@core/interfaces/tab.interface';

export function initCurrentTabHash(tabHash: string, tabs: ITab[], defaultIndexTab: number = 0): ITab[] {
	tabs = tabs.map((item) => ({...item, ariaSelected: false}));
	const currentTabIndex = tabs.findIndex((t) => t.tabHash === tabHash);
	tabs[currentTabIndex > -1 ? currentTabIndex : defaultIndexTab].ariaSelected = true;
	return tabs;
}
