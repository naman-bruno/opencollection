import React from 'react';
import { OpenCollectionCollection, CustomPage, OpenCollectionItem } from '../types';
import Sidebar from './Sidebar';
import SinglePageRenderer from './SinglePageRenderer';
import Overview from './Overview';

interface MobileLayoutProps {
  collectionData: OpenCollectionCollection | null;
  hideSidebar: boolean;
  theme: 'light' | 'dark' | 'auto';
  currentPageId: string | null;
  currentPageItem: OpenCollectionItem | CustomPage | null;
  currentPageIndex: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToPage: (id: string) => void;
  allPageItems: Array<{id: string; item: OpenCollectionItem | CustomPage; type: 'item' | 'custom' | 'overview'}>;
  onSelectItem: (id: string, path?: string) => void;
  filteredCustomPages: CustomPage[];
  onlyShow?: string[];
  mobileView: 'sidebar' | 'content';
  setMobileView: (view: 'sidebar' | 'content') => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  shouldShowOverview: boolean;
  filteredCollectionItems: any[];
  md: any;
  customPageContents: Record<string, string>;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  collectionData,
  hideSidebar,
  theme,
  currentPageId,
  currentPageItem,
  currentPageIndex,
  totalPages,
  canGoNext,
  canGoPrevious,
  goToNext,
  goToPrevious,
  goToPage,
  allPageItems,
  onSelectItem,
  filteredCustomPages,
  onlyShow,
  mobileView,
  setMobileView,
  containerRef,
  shouldShowOverview,
  filteredCollectionItems,
  md,
  customPageContents
}) => {
  if (hideSidebar) {
    return (
      <div className="h-[calc(100vh-60px)] w-full overflow-y-auto" ref={containerRef}>
        <div className="p-4 h-full">
          <SinglePageRenderer
            currentPageItem={currentPageItem}
            currentPageId={currentPageId}
            pageType={allPageItems.find(p => p.id === currentPageId)?.type || 'item'}
            theme={theme}
            md={md}
            collection={collectionData}
            customPageContents={customPageContents}
            currentPageIndex={currentPageIndex}
            totalPages={totalPages}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            goToNext={goToNext}
            goToPrevious={goToPrevious}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-60px)] w-full">
      <div className="flex" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {!hideSidebar && (
          <button
            className={`flex-1 py-2 px-4 text-center ${mobileView === 'sidebar' ? 'active' : ''}`}
            onClick={() => setMobileView('sidebar')}
            aria-selected={mobileView === 'sidebar'}
            style={{ color: 'var(--text-primary)' }}
          >
            API
          </button>
        )}
        <button
          className={`flex-1 py-2 px-4 text-center ${mobileView === 'content' ? 'active' : ''}`}
          onClick={() => setMobileView('content')}
          aria-selected={mobileView === 'content'}
          style={{ color: 'var(--text-primary)' }}
        >
          Content
        </button>
      </div>

      {!hideSidebar && (
        <div className={`h-full overflow-y-auto ${mobileView === 'sidebar' ? 'block' : 'hidden'}`}>
          <Sidebar
            collection={collectionData}
            activeItemId={currentPageId}
            onSelectItem={onSelectItem}
            logo={null}
            theme={theme}
            customPages={filteredCustomPages}
            onlyShow={onlyShow}
          />
        </div>
      )}

      <div
        className={`h-full overflow-y-auto ${mobileView === 'content' ? 'block' : 'hidden'}`}
        ref={containerRef}
      >
        <div className="p-4 h-full">
          <SinglePageRenderer
            currentPageItem={currentPageItem}
            currentPageId={currentPageId}
            pageType={allPageItems.find(p => p.id === currentPageId)?.type || 'item'}
            theme={theme}
            md={md}
            collection={collectionData}
            customPageContents={customPageContents}
            currentPageIndex={currentPageIndex}
            totalPages={totalPages}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            goToNext={goToNext}
            goToPrevious={goToPrevious}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileLayout; 