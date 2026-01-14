import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowsChevronDown,
  ArrowsChevronUp,
  ArrowsChevronRight,
} from '@/components/icons';
import { Navbar } from '@/components/Navbar';
import SideNavigation from '@/components/SideNavigation';
import { tokens } from '@/lib/design-tokens';
import { loadCatalogs, type CatalogData } from '@/services/catalogApi';

const CatalogOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  
  // Debug: Log to verify component is rendering
  useEffect(() => {
    console.log('CatalogOverview rendered, id:', id, 'catalog:', catalog);
  }, [id, catalog]);

  useEffect(() => {
    const fetchCatalog = async () => {
      if (id) {
        try {
          const catalogs = await loadCatalogs();
          const foundCatalog = catalogs.find(c => c.id === id);
          if (foundCatalog) {
            setCatalog(foundCatalog);
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error loading catalog:', error);
          navigate('/');
        }
      } else {
        // If no id, navigate to home
        navigate('/');
      }
    };
    fetchCatalog();
  }, [id, navigate]);

  const handleBackToCatalogs = () => {
    navigate('/');
  };

  // Safety check for tokens first
  if (!tokens || !tokens.color || !tokens.text || !tokens.spacing) {
    console.error('Tokens not loaded properly');
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error: Design tokens not loaded
      </div>
    );
  }

  if (!catalog) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: tokens.color.neutral.surface1 }}>
        <p style={{ color: tokens.color.neutral.highOnSurface }}>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: tokens.color.neutral.surface1,
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        scrollbarGutter: 'stable',
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Side Navigation */}
        <SideNavigation 
          catalogName={catalog.name}
          onBackToCatalogs={handleBackToCatalogs}
        />

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            background: tokens.color.neutral.surface2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto',
            padding: tokens.spacing['600'],
            scrollbarGutter: 'stable',
          }}
        >
          {/* Content Container */}
          <div
            style={{
              width: '100%',
              maxWidth: '1026px',
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['600'],
            }}
          >
            {/* Top Row - Two Cards */}
            <div
              style={{
                display: 'flex',
                gap: tokens.spacing['600'],
                width: '100%',
              }}
            >
              {/* Finish setting up your catalog Card */}
              <div
                style={{
                  flex: 1,
                  minWidth: '501px',
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: tokens.spacing['600'],
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        ...tokens.text.headlineSm,
                        color: tokens.color.neutral.highOnSurface,
                        margin: 0,
                      }}
                    >
                      Finish setting up your catalog
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    padding: `0 ${tokens.spacing['600']} ${tokens.spacing['600']} ${tokens.spacing['600']}`,
                    display: 'flex',
                    flexDirection: 'column',
                      gap: tokens.spacing['400'],
                  }}
                >
                  {/* Track your product purchases */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: tokens.spacing['800'],
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          ...tokens.text.labelLg,
                          color: tokens.color.neutral.highOnSurface,
                          margin: 0,
                        }}
                      >
                        Track your product purchases
                      </p>
                    </div>
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <p
                        style={{
                          ...tokens.text.bodySm,
                          color: tokens.color.primary.onSurface,
                          margin: 0,
                          textDecoration: 'none',
                        }}
                      >
                        Setup key event tracking
                      </p>
                    </button>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: '1px',
                      background: tokens.color.neutral.fillLow,
                      width: '100%',
                    }}
                  />

                  {/* Add details on how you ship products */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: tokens.spacing['800'],
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          ...tokens.text.labelLg,
                          color: tokens.color.neutral.highOnSurface,
                          margin: 0,
                        }}
                      >
                        Add details on how you ship products
                      </p>
                    </div>
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <p
                        style={{
                          ...tokens.text.bodySm,
                          color: tokens.color.primary.onSurface,
                          margin: 0,
                          textDecoration: 'none',
                        }}
                      >
                        Add
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product status Card */}
              <div
                style={{
                  flex: 1,
                  minWidth: '501px',
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: tokens.spacing['600'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        ...tokens.text.headlineSm,
                        color: tokens.color.neutral.highOnSurface,
                        margin: 0,
                      }}
                    >
                      Product status
                    </p>
                  </div>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: tokens.spacing['100'],
                      padding: `${tokens.spacing['200']} ${tokens.spacing['400']}`,
                      background: tokens.color.primary.fill,
                      color: tokens.color.primary.onFill,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      ...tokens.text.titleSm,
                    }}
                  >
                    <span>Add products</span>
                    <ArrowsChevronDown size="16" style={{ color: tokens.color.primary.onFill }} />
                  </button>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    padding: `0 ${tokens.spacing['600']} ${tokens.spacing['600']} ${tokens.spacing['600']}`,
                    display: 'flex',
                    flexDirection: 'column',
                      gap: tokens.spacing['400'],
                  }}
                >
                  {/* Total products */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <p
                      style={{
                        ...tokens.text.bodySm,
                        color: tokens.color.neutral.onSurface,
                        margin: 0,
                      }}
                    >
                      Total products
                    </p>
                    <p
                      style={{
                        ...tokens.text.headlineMd,
                        color: tokens.color.neutral.highOnSurface,
                        margin: 0,
                      }}
                    >
                      1049
                    </p>
                  </div>

                  {/* Status breakdown */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {/* Approved */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['100'] }}>
                        <p
                          style={{
                            ...tokens.text.labelMd,
                            color: tokens.color.neutral.highOnSurface,
                            margin: 0,
                          }}
                        >
                          Approved
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['100'] }}>
                        <p
                          style={{
                            ...tokens.text.labelMd,
                            color: tokens.color.neutral.highOnSurface,
                            margin: 0,
                          }}
                        >
                          900
                        </p>
                        <div
                          style={{
                            background: tokens.color.success.surface3,
                            padding: `2px ${tokens.spacing['100']}`,
                            borderRadius: '4px',
                            minWidth: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <p
                            style={{
                              ...tokens.text.labelMd,
                              color: tokens.color.success.onSurface,
                              margin: 0,
                            }}
                          >
                            +12
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Not approved */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['100'] }}>
                        <p
                          style={{
                            ...tokens.text.labelMd,
                            color: tokens.color.neutral.highOnSurface,
                            margin: 0,
                          }}
                        >
                          Not approved
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['100'] }}>
                        <p
                          style={{
                            ...tokens.text.labelMd,
                            color: tokens.color.neutral.highOnSurface,
                            margin: 0,
                          }}
                        >
                          10
                        </p>
                        <div
                          style={{
                            background: tokens.color.error.surface3,
                            padding: `2px ${tokens.spacing['100']}`,
                            borderRadius: '4px',
                            minWidth: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <p
                            style={{
                              ...tokens.text.labelMd,
                              color: tokens.color.error.onSurface,
                              margin: 0,
                            }}
                          >
                            +17
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Under review */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['100'] }}>
                        <p
                          style={{
                            ...tokens.text.labelMd,
                            color: tokens.color.neutral.highOnSurface,
                            margin: 0,
                          }}
                        >
                          Under review
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['100'] }}>
                        <p
                          style={{
                            ...tokens.text.labelMd,
                            color: tokens.color.neutral.highOnSurface,
                            margin: 0,
                          }}
                        >
                          3
                        </p>
                        <div
                          style={{
                            background: tokens.color.neutral.surface3,
                            padding: `2px ${tokens.spacing['100']}`,
                            borderRadius: '4px',
                            minWidth: '24px',
                            width: '33px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <p
                            style={{
                              ...tokens.text.labelMd,
                              color: tokens.color.neutral.onSurface,
                              margin: 0,
                            }}
                          >
                            0
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View products link */}
                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <p
                      style={{
                        ...tokens.text.bodySm,
                        color: tokens.color.primary.onSurface,
                        margin: 0,
                        textDecoration: 'none',
                      }}
                    >
                      View products that need attention
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row - Two Cards */}
            <div
              style={{
                display: 'flex',
                gap: tokens.spacing['600'],
                width: '100%',
              }}
            >
              {/* Your performance on TikTok Card */}
              <div
                style={{
                  flex: 1,
                  minWidth: '501px',
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: tokens.spacing['600'],
                    display: 'flex',
                    flexDirection: 'column',
                      gap: tokens.spacing['100'],
                    width: '100%',
                  }}
                >
                  <p
                    style={{
                      ...tokens.text.headlineSm,
                      color: tokens.color.neutral.highOnSurface,
                      margin: 0,
                    }}
                  >
                    Your performance on TikTok
                  </p>
                  <p
                    style={{
                        ...tokens.text.bodyMd,
                      color: tokens.color.neutral.onSurface,
                      margin: 0,
                    }}
                  >
                    View a quick glance at your overall performance on TikTok.
                  </p>
                </div>

                {/* Card Content - Placeholder */}
                <div
                  style={{
                    padding: `0 ${tokens.spacing['600']} ${tokens.spacing['600']} ${tokens.spacing['600']}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      border: `1px dashed ${tokens.color.primary.fill}`,
                      background: tokens.color.primary.surface1,
                      borderRadius: '4px',
                      padding: tokens.spacing['600'],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        ...tokens.text.bodySm,
                        color: tokens.color.primary.onSurface,
                        margin: 0,
                      }}
                    >
                      Content slot
                    </p>
                  </div>
                </div>
              </div>

              {/* Top performing products Card */}
              <div
                style={{
                  flex: 1,
                  minWidth: '501px',
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: tokens.spacing['600'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        ...tokens.text.headlineSm,
                        color: tokens.color.neutral.highOnSurface,
                        margin: 0,
                      }}
                    >
                      Top performing products
                    </p>
                  </div>
                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <p
                      style={{
                        ...tokens.text.bodySm,
                        color: tokens.color.primary.onSurface,
                        margin: 0,
                        textDecoration: 'none',
                      }}
                    >
                      View more
                    </p>
                  </button>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    padding: `0 ${tokens.spacing['600']} ${tokens.spacing['600']} ${tokens.spacing['600']}`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Table Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: `10px 0`,
                      borderBottom: `1px solid ${tokens.color.neutral.fillLow}`,
                    }}
                  >
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <p
                        style={{
                          ...tokens.text.labelLg,
                          color: tokens.color.neutral.highOnSurface,
                          margin: 0,
                          width: '48px',
                        }}
                      >
                        Image
                      </p>
                      <p
                        style={{
                          ...tokens.text.labelLg,
                          color: tokens.color.neutral.highOnSurface,
                          margin: 0,
                          width: '118px',
                        }}
                      >
                        Title
                      </p>
                    </div>
                    <p
                      style={{
                        ...tokens.text.labelLg,
                        color: tokens.color.neutral.highOnSurface,
                        margin: 0,
                        width: '75px',
                        textAlign: 'right',
                      }}
                    >
                      Clicks
                    </p>
                  </div>

                  {/* Product Rows */}
                  {[1, 2, 3].map((index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: `10px 0`,
                        borderBottom: index < 3 ? `1px solid ${tokens.color.neutral.fillLow}` : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {/* Thumbnail */}
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            border: `1px solid ${tokens.color.neutral.fillLow}`,
                            borderRadius: '4px',
                            overflow: 'hidden',
                            background: tokens.color.neutral.surface2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              background: tokens.color.neutral.surface3,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <p
                              style={{
                                ...tokens.text.labelSm,
                                color: tokens.color.neutral.onSurface,
                                margin: 0,
                                fontSize: '10px',
                              }}
                            >
                              Image
                            </p>
                          </div>
                        </div>
                        {/* Product Name */}
                        <p
                          style={{
                            ...tokens.text.bodySm,
                            color: tokens.color.neutral.onSurface,
                            margin: 0,
                          }}
                        >
                          Product name 123
                        </p>
                      </div>
                      {/* Clicks */}
                      <p
                        style={{
                          ...tokens.text.bodySm,
                          color: tokens.color.neutral.onSurface,
                          margin: 0,
                          width: '75px',
                          textAlign: 'right',
                        }}
                      >
                        1235
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogOverview;
