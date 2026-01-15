import { KsInputSelector } from '@fe-infra/keystone-react'

function LeftNav() {
  const catalogOptions = [
    { label: 'Catalog name 1', value: 'catalog-1' },
    { label: 'Catalog name 2', value: 'catalog-2' },
    { label: 'Catalog name 3', value: 'catalog-3' },
    { label: 'Catalog name 4', value: 'catalog-4' }
  ]
  return (
    <div 
      className="fixed left-0 top-[104px] w-[240px] h-[732px] bg-white border-r border-gray-200 overflow-y-auto"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'var(--ks-spacing-200, 8px)',
        padding: 'var(--ks-spacing-400, 16px) var(--ks-spacing-200, 8px)'
      }}
    >
      {/* Top Section - Catalog Selection */}
      <div style={{ width: '100%', paddingBottom: 'var(--ks-spacing-400, 16px)', borderBottom: '1px solid var(--ks-color-neutral-fillLow, #d3d4d5)' }}>
        {/* Catalog List Button */}
        <button 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ks-spacing-200, 8px)',
            padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
            alignSelf: 'stretch',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ks-color-neutral-highOnSurface, #121415)',
            marginBottom: 'var(--ks-spacing-300, 12px)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span style={{ 
            fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
            fontWeight: 'var(--ks-text-bodySm-fontWeight, 400)',
            lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
          }}>
            Catalog List
          </span>
        </button>

        {/* Catalogue Dropdown */}
        <KsInputSelector
          placeholder="Catalog name"
          options={catalogOptions}
          style={{ width: '100%' }}
        />
      </div>

      {/* Main Navigation */}
      {/* Overview */}
      <a 
        href="#" 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ks-spacing-200, 8px)',
          padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
          alignSelf: 'stretch',
          textDecoration: 'none',
          color: 'var(--ks-color-neutral-highOnSurface, #121415)',
          borderRadius: 'var(--ks-border-radius-md, 4px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ks-color-neutral-surface2, #f2f3f3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span style={{
          fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
        }}>
          Overview
        </span>
      </a>

      {/* Manage Section */}
      <div style={{ 
        width: '100%',
        marginTop: 'var(--ks-spacing-600, 24px)',
        marginBottom: 'var(--ks-spacing-200, 8px)',
        paddingLeft: 'var(--ks-spacing-200, 8px)',
        paddingRight: 'var(--ks-spacing-200, 8px)'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          color: 'var(--ks-color-neutral-onSurface, #6d6e70)',
          textTransform: 'uppercase',
          letterSpacing: '0.16px'
        }}>
          Manage
        </span>
      </div>

      <a 
        href="#" 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ks-spacing-200, 8px)',
          padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
          alignSelf: 'stretch',
          textDecoration: 'none',
          color: 'var(--ks-color-neutral-highOnSurface, #121415)',
          borderRadius: 'var(--ks-border-radius-md, 4px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ks-color-neutral-surface2, #f2f3f3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span style={{
          fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
        }}>
          Products
        </span>
      </a>

      <a 
        href="#" 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ks-spacing-200, 8px)',
          padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
          alignSelf: 'stretch',
          textDecoration: 'none',
          color: 'var(--ks-color-neutral-highOnSurface, #121415)',
          borderRadius: 'var(--ks-border-radius-md, 4px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ks-color-neutral-surface2, #f2f3f3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span style={{
          fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
        }}>
          Product Sets
        </span>
      </a>

      {/* Videos - Active State */}
      <a 
        href="#" 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ks-spacing-200, 8px)',
          padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
          alignSelf: 'stretch',
          textDecoration: 'none',
          background: 'var(--ks-color-primary-surface1, #f2fdfc)',
          color: 'var(--ks-color-primary-onSurface, #017976)',
          borderRadius: 'var(--ks-border-radius-md, 4px)'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span style={{
          fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
        }}>
          Videos
        </span>
      </a>

      {/* Configure Section */}
      <div style={{ 
        width: '100%',
        marginTop: 'var(--ks-spacing-600, 24px)',
        marginBottom: 'var(--ks-spacing-200, 8px)',
        paddingLeft: 'var(--ks-spacing-200, 8px)',
        paddingRight: 'var(--ks-spacing-200, 8px)'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          color: 'var(--ks-color-neutral-onSurface, #6d6e70)',
          textTransform: 'uppercase',
          letterSpacing: '0.16px'
        }}>
          Configure
        </span>
      </div>

      <a 
        href="#" 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ks-spacing-200, 8px)',
          padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
          alignSelf: 'stretch',
          textDecoration: 'none',
          color: 'var(--ks-color-neutral-highOnSurface, #121415)',
          borderRadius: 'var(--ks-border-radius-md, 4px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ks-color-neutral-surface2, #f2f3f3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span style={{
          fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
        }}>
          Product Sources
        </span>
      </a>

      <a 
        href="#" 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ks-spacing-200, 8px)',
          padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
          alignSelf: 'stretch',
          textDecoration: 'none',
          color: 'var(--ks-color-neutral-highOnSurface, #121415)',
          borderRadius: 'var(--ks-border-radius-md, 4px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ks-color-neutral-surface2, #f2f3f3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span style={{
          fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
        }}>
          Event Sources
        </span>
      </a>

      <a 
        href="#" 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ks-spacing-200, 8px)',
          padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
          alignSelf: 'stretch',
          textDecoration: 'none',
          color: 'var(--ks-color-neutral-highOnSurface, #121415)',
          borderRadius: 'var(--ks-border-radius-md, 4px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ks-color-neutral-surface2, #f2f3f3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span style={{
          fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
          fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
          lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
        }}>
          Settings
        </span>
      </a>

      {/* Bottom Section - Support */}
      <div style={{ 
        marginTop: 'auto',
        width: '100%',
        paddingTop: 'var(--ks-spacing-400, 16px)',
        borderTop: '1px solid var(--ks-color-neutral-fillLow, #d3d4d5)'
      }}>
        <a 
          href="#" 
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--ks-spacing-200, 8px)',
            padding: 'var(--ks-spacing-2-5, 10px) var(--ks-spacing-200, 8px)',
            alignSelf: 'stretch',
            textDecoration: 'none',
            color: 'var(--ks-color-neutral-highOnSurface, #121415)',
            borderRadius: 'var(--ks-border-radius-md, 4px)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ks-color-neutral-surface2, #f2f3f3)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid var(--ks-color-neutral-onSurface, #6d6e70)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span style={{
            fontSize: 'var(--ks-text-bodySm-fontSize, 14px)',
            fontWeight: 'var(--ks-text-titleSm-fontWeight, 500)',
            lineHeight: 'var(--ks-text-bodySm-lineHeight, 20px)'
          }}>
            Support
          </span>
        </a>
      </div>
    </div>
  )
}

export default LeftNav
