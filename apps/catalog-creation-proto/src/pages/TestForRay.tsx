import React from 'react';
import { Navbar } from '@/components/Navbar';
import SideNavigation from '@/components/SideNavigation';
import { tokens } from '@/lib/design-tokens';

const TestForRay: React.FC = () => {
  return (
    <div className="overflow-hidden bg-[#ECECED] h-screen flex flex-col">
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Side Navigation */}
        <SideNavigation />
        
        {/* Main Content */}
        <div style={{ 
          display: 'flex', 
          flex: 1, 
          flexDirection: 'column',
          overflow: 'hidden',
          background: tokens.color.neutral.surface
        }}>
          {/* Main Content Area */}
          <div style={{
            display: 'flex',
            flex: 1,
            overflow: 'auto',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: '1395px',
              gap: '24px'
            }}>
              {/* Full Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '24px',
                borderBottom: `1px solid ${tokens.color.neutral.fillLow}`
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h1 style={{
                      ...tokens.typography.headlineMd,
                      color: tokens.color.neutral.highOnSurface,
                      margin: 0
                    }}>
                      GMV Max - Campaign Details
                    </h1>
                    <div style={{
                      background: tokens.color.primary.surface3,
                      borderRadius: '4px',
                      padding: '2px 8px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontFamily: 'TikTok Sans Text, sans-serif',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: tokens.color.primary.onSurface
                      }}>
                        Active
                      </span>
                    </div>
                  </div>
                  <p style={{
                    ...tokens.typography.bodySm,
                    color: tokens.color.neutral.onSurface,
                    margin: 0
                  }}>
                    Available balance: 10.00 USD
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button style={{
                    padding: '8px 16px',
                    background: tokens.color.neutral.surface1,
                    border: `1px solid ${tokens.color.neutral.fill}`,
                    borderRadius: '4px',
                    ...tokens.typography.labelMd,
                    color: tokens.color.neutral.highOnSurface,
                    cursor: 'pointer'
                  }}>
                    Actions
                  </button>
                  <button style={{
                    width: '32px',
                    height: '32px',
                    padding: '4px',
                    background: tokens.color.neutral.surface1,
                    border: `1px solid ${tokens.color.neutral.fill}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2L2 8L8 14M14 2L8 8L14 14" stroke={tokens.color.neutral.highOnSurface} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Use Case Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px'
              }}>
                {[1, 2].map((item) => (
                  <div key={item} style={{
                    background: tokens.color.neutral.surface,
                    border: `1px solid ${tokens.color.neutral.fillLow}`,
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tokens.color.primary.fill;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tokens.color.neutral.fillLow;
                  }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      background: tokens.color.neutral.surface1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: '25px',
                        height: '25px',
                        borderRadius: '4px',
                        background: tokens.color.neutral.fillLow
                      }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        ...tokens.typography.labelLg,
                        color: tokens.color.neutral.highOnSurface,
                        margin: 0,
                        marginBottom: '4px'
                      }}>
                        Title
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          background: tokens.color.primary.surface3,
                          borderRadius: '4px',
                          padding: '2px 6px',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            fontFamily: 'TikTok Sans Text, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: tokens.color.primary.onSurface
                          }}>
                            Tag
                          </span>
                        </div>
                        <p style={{
                          ...tokens.typography.bodySm,
                          color: tokens.color.neutral.onSurface,
                          margin: 0
                        }}>
                          Increase videos supply to improve GMV Max performance
                        </p>
                      </div>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M9 18L15 12L9 6" stroke={tokens.color.neutral.highOnSurface} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: tokens.color.neutral.fillLow,
                width: '100%'
              }} />

              {/* Overview Section */}
              <div style={{
                background: tokens.color.neutral.surface,
                border: `1px solid ${tokens.color.neutral.fillLow}`,
                borderRadius: '8px',
                padding: '24px'
              }}>
                <h2 style={{
                  ...tokens.typography.headlineSm,
                  color: tokens.color.neutral.highOnSurface,
                  margin: 0,
                  marginBottom: '16px'
                }}>
                  Overview
                </h2>
                <p style={{
                  ...tokens.typography.bodyMd,
                  color: tokens.color.neutral.onSurface,
                  margin: 0
                }}>
                  Campaign overview content will be displayed here.
                </p>
              </div>

              {/* Table Section */}
              <div style={{
                background: tokens.color.neutral.surface,
                border: `1px solid ${tokens.color.neutral.fillLow}`,
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                {/* Table Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: tokens.color.neutral.surface1,
                  borderBottom: `1px solid ${tokens.color.neutral.fillLow}`
                }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input type="checkbox" />
                    <span style={{
                      ...tokens.typography.labelMd,
                      color: tokens.color.neutral.highOnSurface
                    }}>
                      Search
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button style={{
                      padding: '6px 12px',
                      background: tokens.color.neutral.surface,
                      border: `1px solid ${tokens.color.neutral.fill}`,
                      borderRadius: '4px',
                      ...tokens.typography.labelSm,
                      color: tokens.color.neutral.highOnSurface,
                      cursor: 'pointer'
                    }}>
                      Filter
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      background: tokens.color.neutral.surface,
                      border: `1px solid ${tokens.color.neutral.fill}`,
                      borderRadius: '4px',
                      ...tokens.typography.labelSm,
                      color: tokens.color.neutral.highOnSurface,
                      cursor: 'pointer'
                    }}>
                      View
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{
                        background: tokens.color.neutral.surface1,
                        borderBottom: `1px solid ${tokens.color.neutral.fillLow}`
                      }}>
                        {['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'].map((header) => (
                          <th key={header} style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            ...tokens.typography.labelMd,
                            color: tokens.color.neutral.highOnSurface,
                            fontWeight: 500
                          }}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((row) => (
                        <tr key={row} style={{
                          borderBottom: `1px solid ${tokens.color.neutral.fillLow}`
                        }}>
                          <td style={{
                            padding: '12px 16px',
                            ...tokens.typography.bodyMd,
                            color: tokens.color.neutral.highOnSurface
                          }}>
                            <input type="checkbox" />
                          </td>
                          <td style={{
                            padding: '12px 16px',
                            ...tokens.typography.bodyMd,
                            color: tokens.color.neutral.highOnSurface
                          }}>
                            Row {row} - Cell 1
                          </td>
                          <td style={{
                            padding: '12px 16px',
                            ...tokens.typography.bodyMd,
                            color: tokens.color.neutral.highOnSurface
                          }}>
                            Row {row} - Cell 2
                          </td>
                          <td style={{
                            padding: '12px 16px',
                            ...tokens.typography.bodyMd,
                            color: tokens.color.neutral.highOnSurface
                          }}>
                            Row {row} - Cell 3
                          </td>
                          <td style={{
                            padding: '12px 16px',
                            ...tokens.typography.bodyMd,
                            color: tokens.color.neutral.highOnSurface
                          }}>
                            Row {row} - Cell 4
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestForRay;

