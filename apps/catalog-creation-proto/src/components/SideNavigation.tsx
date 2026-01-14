import React, { useState } from "react";
import {
  ArrowsRevisionsUndo,
  ArrowsChevronDown,
  ArrowsChevronUp,
  EcommerceShoppingBag,
  MediaVideoClip,
  FormattingLinkAddLink,
  EcommerceCampaignCircularConnection,
  EcommerceViewreportViewAnalysis,
  FormattingSettingsConfigSettings,
  FormattingLayoutGridLayout,
} from "@/components/icons";
import { tokens } from "@/lib/design-tokens";

interface SideNavigationProps {
  catalogName?: string;
  onBackToCatalogs?: () => void;
}

export default function SideNavigation({ 
  catalogName = "Catalogue Name1222", 
  onBackToCatalogs 
}: SideNavigationProps) {
  const [productsOpen, setProductsOpen] = useState(true);
  const [creativeAssetsOpen, setCreativeAssetsOpen] = useState(true);

  return (
    <nav 
      style={{
        background: tokens.color.neutral.surface,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        width: '240px',
        height: '100%',
        paddingTop: tokens.spacing['600'],
        paddingBottom: tokens.spacing['600'],
        paddingLeft: tokens.spacing['200'],
        paddingRight: tokens.spacing['200'],
      }}
    >
      {/* Top Section: Back button and Catalog Selector */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingBottom: tokens.spacing['400'],
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          position: 'relative',
          flexShrink: 0,
          width: '100%',
        }}
      >
        {/* Back button */}
        <div 
          style={{
            display: 'flex',
            gap: tokens.spacing['200'],
            alignItems: 'center',
            padding: tokens.spacing['200'],
            position: 'relative',
            flexShrink: 0,
            width: '100%',
          }}
        >
          <button
            onClick={onBackToCatalogs}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['200'],
            }}
          >
            <ArrowsRevisionsUndo size="14" style={{ color: tokens.color.neutral.highOnSurface }} />
          </button>
          <p 
            style={{
              ...tokens.text.titleSm,
              color: tokens.color.neutral.highOnSurface,
              margin: 0,
              flex: 1,
            }}
          >
            Catalog List
          </p>
        </div>

        {/* Catalog Selector */}
        <div 
          style={{
            border: `1px solid ${tokens.color.neutral.fillLow}`,
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            borderRadius: '4px',
          }}
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 'inherit',
              width: '100%',
            }}
          >
            <div 
              style={{
                background: tokens.color.primary.surface,
                border: `1px solid ${tokens.color.neutral.fillLow}`,
                borderStyle: 'solid',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                padding: `${tokens.spacing['200']} ${tokens.spacing['200']}`,
                borderRadius: '4px',
              }}
            >
              <div 
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <div 
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    ...tokens.text.bodySm,
                    justifyContent: 'center',
                    minHeight: 0,
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    flexShrink: 0,
                    color: tokens.color.neutral.highOnSurface,
                  }}
                >
                  <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {catalogName}
                  </p>
                </div>
              </div>
              <ArrowsChevronDown 
                size="16" 
                style={{ 
                  position: 'relative',
                  flexShrink: 0,
                  color: tokens.color.neutral.onSurface,
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing['100'],
          alignItems: 'flex-start',
          position: 'relative',
          flexShrink: 0,
          width: '100%',
        }}
      >
        {/* Overview - Active */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            padding: '10px 8px',
            background: tokens.color.primary.surface2,
            borderRadius: '4px',
          }}
        >
          <div 
            style={{
              flex: 1,
              display: 'flex',
              gap: tokens.spacing['200'],
              alignItems: 'center',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                height: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '16px',
              }}
            >
              <div 
                style={{
                  flex: 1,
                  height: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <FormattingLayoutGridLayout 
                  size="16" 
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: tokens.color.primary.onSurface,
                  }}
                />
              </div>
            </div>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.titleSm,
                justifyContent: 'center',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.primary.onSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Overview</p>
            </div>
          </div>
        </div>

        {/* Products - Expandable */}
        <div 
          style={{
            background: tokens.color.neutral.surface,
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            overflow: 'hidden',
            padding: '10px 8px',
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface;
          }}
        >
          <div 
            style={{
              flex: 1,
              display: 'flex',
              gap: tokens.spacing['200'],
              alignItems: 'center',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                height: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '16px',
              }}
            >
              <EcommerceShoppingBag 
                size="16" 
                style={{
                  flex: 1,
                  height: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              />
            </div>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.titleSm,
                justifyContent: 'center',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.neutral.highOnSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Products</p>
            </div>
          </div>
          <button
            onClick={() => setProductsOpen(!productsOpen)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              position: 'relative',
              flexShrink: 0,
              zIndex: 1,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            {productsOpen ? (
              <ArrowsChevronUp size="14" style={{ color: tokens.color.neutral.onSurface }} />
            ) : (
              <ArrowsChevronDown size="14" style={{ color: tokens.color.neutral.onSurface }} />
            )}
          </button>
        </div>

        {/* Products sub-items */}
        {productsOpen && (
          <>
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '10px 8px 10px 32px',
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                background: tokens.color.neutral.surface,
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = tokens.color.neutral.surface2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = tokens.color.neutral.surface;
              }}
            >
              <div 
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  ...tokens.text.bodySm,
                  justifyContent: 'center',
                  maxWidth: '184px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                  color: tokens.color.neutral.highOnSurface,
                }}
              >
                <p style={{ margin: 0, lineHeight: '20px' }}>Products</p>
              </div>
            </div>
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '10px 8px 10px 32px',
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                background: tokens.color.neutral.surface,
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = tokens.color.neutral.surface2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = tokens.color.neutral.surface;
              }}
            >
              <div 
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  ...tokens.text.bodySm,
                  justifyContent: 'center',
                  maxWidth: '184px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                  color: tokens.color.neutral.highOnSurface,
                }}
              >
                <p style={{ margin: 0, lineHeight: '20px' }}>Sets</p>
              </div>
            </div>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '10px 8px 10px 32px',
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                background: tokens.color.neutral.surface,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = tokens.color.neutral.surface2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = tokens.color.neutral.surface;
              }}
            >
              <div 
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  ...tokens.text.bodySm,
                  justifyContent: 'center',
                  maxWidth: '184px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                  color: tokens.color.neutral.highOnSurface,
                }}
              >
                <p style={{ margin: 0, lineHeight: '20px' }}>Shipping</p>
              </div>
            </div>
          </>
        )}

        {/* Creative assets - Expandable */}
        <div 
          style={{
            background: tokens.color.neutral.surface,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            padding: '10px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface;
          }}
        >
          <div 
            style={{
              flex: 1,
              display: 'flex',
              gap: tokens.spacing['200'],
              alignItems: 'center',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                height: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '16px',
              }}
            >
              <MediaVideoClip 
                size="16" 
                style={{
                  flex: 1,
                  height: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              />
            </div>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.titleSm,
                justifyContent: 'center',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.neutral.highOnSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Creative assets</p>
            </div>
          </div>
          <button
            onClick={() => setCreativeAssetsOpen(!creativeAssetsOpen)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              position: 'relative',
              flexShrink: 0,
              zIndex: 1,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            {creativeAssetsOpen ? (
              <ArrowsChevronUp size="14" style={{ color: tokens.color.neutral.onSurface }} />
            ) : (
              <ArrowsChevronDown size="14" style={{ color: tokens.color.neutral.onSurface }} />
            )}
          </button>
        </div>

        {/* Creative assets sub-items */}
        {creativeAssetsOpen && (
          <div 
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              overflow: 'hidden',
              padding: '10px 8px 10px 32px',
              position: 'relative',
              flexShrink: 0,
              width: '100%',
              background: tokens.color.neutral.surface,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = tokens.color.neutral.surface2;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = tokens.color.neutral.surface;
            }}
          >
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.bodySm,
                justifyContent: 'center',
                maxWidth: '184px',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.neutral.highOnSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Videos</p>
            </div>
          </div>
        )}

        {/* Data sources */}
        <div 
          style={{
            background: tokens.color.neutral.surface,
            display: 'flex',
            alignItems: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            padding: '10px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface;
          }}
        >
          <div 
            style={{
              flex: 1,
              display: 'flex',
              gap: tokens.spacing['200'],
              alignItems: 'center',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                height: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '16px',
              }}
            >
              <FormattingLinkAddLink 
                size="16" 
                style={{
                  flex: 1,
                  height: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              />
            </div>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.titleSm,
                justifyContent: 'center',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.neutral.highOnSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Data sources</p>
            </div>
          </div>
        </div>

        {/* Events */}
        <div 
          style={{
            background: tokens.color.neutral.surface,
            display: 'flex',
            alignItems: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            padding: '10px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface;
          }}
        >
          <div 
            style={{
              flex: 1,
              display: 'flex',
              gap: tokens.spacing['200'],
              alignItems: 'center',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                height: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '16px',
              }}
            >
              <EcommerceCampaignCircularConnection 
                size="16" 
                style={{
                  flex: 1,
                  height: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              />
            </div>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.titleSm,
                justifyContent: 'center',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.neutral.highOnSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Events</p>
            </div>
          </div>
        </div>

        {/* Diagnostics */}
        <div 
          style={{
            background: tokens.color.neutral.surface,
            display: 'flex',
            alignItems: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            padding: '10px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface;
          }}
        >
          <div 
            style={{
              flex: 1,
              display: 'flex',
              gap: tokens.spacing['200'],
              alignItems: 'center',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                height: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '16px',
              }}
            >
              <EcommerceViewreportViewAnalysis 
                size="16" 
                style={{
                  flex: 1,
                  height: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              />
            </div>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.titleSm,
                justifyContent: 'center',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.neutral.highOnSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Diagnostics</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div 
          style={{
            background: tokens.color.neutral.surface,
            display: 'flex',
            alignItems: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            padding: '10px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = tokens.color.neutral.surface;
          }}
        >
          <div 
            style={{
              flex: 1,
              display: 'flex',
              gap: tokens.spacing['200'],
              alignItems: 'center',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <div 
              style={{
                display: 'flex',
                gap: '10px',
                height: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: '16px',
              }}
            >
              <FormattingSettingsConfigSettings 
                size="16" 
                style={{
                  flex: 1,
                  height: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  position: 'relative',
                  flexShrink: 0,
                }}
              />
            </div>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...tokens.text.titleSm,
                justifyContent: 'center',
                minHeight: 0,
                minWidth: 0,
                position: 'relative',
                flexShrink: 0,
                color: tokens.color.neutral.highOnSurface,
              }}
            >
              <p style={{ margin: 0, lineHeight: '20px' }}>Settings</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
