import React, { useState } from 'react';
import Select from './Select';
import Button from './Button';
import placeholder from '../assets/preview/placeholder.png';

// Simple help icon component
function HelpIcon({ size = 16 }) {
  const sizeClass = size === 14 ? 'w-3.5 h-3.5' : size === 16 ? 'w-4 h-4' : 'w-4 h-4';
  return (
    <svg className={`${sizeClass} text-[#87898b]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CreateAdsForm() {
  const [destinationUrl, setDestinationUrl] = useState('');
  const [adText, setAdText] = useState('');
  const [identity, setIdentity] = useState('Peacock');
  const [doNotCreatePost, setDoNotCreatePost] = useState(false);
  const [interactiveAddOns, setInteractiveAddOns] = useState(true);

  return (
    <div className="bg-white flex flex-col gap-8 items-start overflow-clip p-6 relative w-full rounded-md">
      {/* Header */}
      <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
        <p className="font-tiktok-text font-medium leading-[26px] relative shrink-0 text-lg text-black tracking-[-0.0288px] w-full">
          Create ads
        </p>
        <div className="flex flex-col font-tiktok-text font-normal justify-center leading-0 relative shrink-0 text-sm text-[#87898b] tracking-[0.0938px] w-full">
          <p className="leading-5">
            Ads will be generated based on combinations of your creatives, texts, and other setups in various formats. The high-performing combinations will be automatically delivered.
          </p>
        </div>
      </div>

      {/* Destination URL Section */}
      <div className="bg-white flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <div className="flex gap-1 h-[22px] items-center relative shrink-0 w-[420px]">
            <p className="font-tiktok-text font-medium leading-[22px] relative shrink-0 text-[#121212] text-sm text-nowrap">
              Destination URL
            </p>
          </div>
          <p className="font-tiktok-text font-normal leading-5 min-w-full relative shrink-0 text-xs text-[#6d6e70] w-[min-content]">
            Users will be directed to your <span className="underline">product links</span>, <span className="underline">TikTok Instant Page</span>, or the link below, depending on where they're most likely to convert.
          </p>
        </div>
        <input
          type="text"
          value={destinationUrl}
          onChange={(e) => setDestinationUrl(e.target.value)}
          placeholder="Enter URL starting with http:// or https://"
          className="bg-[#ececed] border border-[#d3d4d5] border-solid flex gap-2 h-9 items-center px-3 py-2 relative shrink-0 w-full rounded font-tiktok-text font-normal text-sm text-[#404142] tracking-[0.0938px] focus:outline-none focus:ring-2 focus:ring-[#009995] focus:border-[#009995]"
        />
        <Button
          icon={
            <svg className="w-4 h-4 text-[#121415]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
        >
          Build URL parameters
        </Button>
      </div>

      {/* Add creatives Section */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
          <p className="font-tiktok-text font-medium leading-6 relative shrink-0 text-base text-black text-nowrap tracking-[0.0304px]">
            Add creatives (1/30)
          </p>
          <div className="flex items-start relative shrink-0">
            <div className="flex flex-col items-start relative shrink-0">
              <div className="flex gap-3 items-start relative shrink-0">
                <Button>+ Add more</Button>
                <Button>+ Create new videos</Button>
              </div>
            </div>
          </div>
          <div className="bg-[#f8f8f9] border border-[#009995] border-solid flex gap-2 items-center overflow-clip p-2 relative rounded shrink-0 w-full">
            <div className="flex flex-col gap-[2.67px] items-center justify-center overflow-clip relative rounded shrink-0 w-16">
              <div className="bg-[#262627] overflow-clip relative rounded shrink-0 size-16 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <div className="basis-0 flex flex-col gap-1 grow items-start justify-center min-h-px min-w-px relative shrink-0">
              <div className="flex gap-1 items-center relative shrink-0">
                <p className="font-tiktok-text font-normal leading-[22px] relative shrink-0 text-[#121415] text-sm text-nowrap">
                  Auto select from Catalog
                </p>
                <div className="overflow-clip relative shrink-0 size-[14px]">
                  <HelpIcon size={14} />
                </div>
              </div>
              <div className="flex gap-1 items-start relative shrink-0">
                <span className="bg-[#ececed] px-1.5 py-0.5 rounded text-xs font-tiktok-text font-medium text-[#6d6e70]">Video</span>
                <span className="bg-[#ececed] px-1.5 py-0.5 rounded text-xs font-tiktok-text font-medium text-[#6d6e70]">Image</span>
                <span className="bg-[#ececed] px-1.5 py-0.5 rounded text-xs font-tiktok-text font-medium text-[#6d6e70]">TikTok post</span>
              </div>
            </div>
            <div className="flex gap-2 items-center px-2 py-0 relative shrink-0">
              <button className="flex items-center justify-center p-1 relative shrink-0">
                <svg className="w-4 h-4 text-[#6d6e70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <button className="flex items-center justify-center p-1 relative shrink-0">
                <svg className="w-4 h-4 text-[#6d6e70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Identity and text Section */}
      <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
        <div className="flex flex-col gap-1 items-start relative shrink-0">
          <div className="flex gap-2 items-center relative shrink-0">
            <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 relative shrink-0 text-sm text-[#121415] text-nowrap tracking-[0.0938px]">
              <p className="leading-5">Identity and text for your </p>
            </div>
            <span className="bg-[#ececed] px-1.5 py-0.5 rounded text-xs font-tiktok-text font-medium text-[#6d6e70]">Video</span>
            <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 relative shrink-0 text-sm text-[#121415] text-nowrap tracking-[0.0938px]">
              <p className="leading-5">and</p>
            </div>
            <span className="bg-[#ececed] px-1.5 py-0.5 rounded text-xs font-tiktok-text font-medium text-[#6d6e70]">Image</span>
          </div>
          <div className="flex flex-col font-tiktok-text font-normal justify-center leading-0 relative shrink-0 text-xs text-[#87898b] text-nowrap tracking-[0.1608px]">
            <p className="leading-4">You TikTok posts will use with the original identity and text</p>
          </div>
        </div>
        <div className="bg-[#f8f8f9] border-0 border-[#d3d4d5] border-solid flex flex-col gap-6 items-start px-6 py-4 relative rounded shrink-0 w-full">
          {/* Identity */}
          <div className="flex flex-col gap-0 items-start justify-center overflow-clip p-0 relative shrink-0 w-full">
            <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
              <div className="flex gap-1 items-center relative shrink-0">
                <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 relative shrink-0 text-sm text-[#121415] text-nowrap tracking-[0.0938px]">
                  <p className="leading-5">Identity</p>
                </div>
                <div className="relative shrink-0 size-4">
                  <HelpIcon size={16} />
                </div>
              </div>
            </div>
            <div className="bg-[#ececed] border-0 border-[#d3d4d5] border-solid flex gap-2 items-center px-3 py-2 relative rounded shrink-0 w-full">
              <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                <div className="basis-0 flex gap-2 grow h-full items-center min-h-px min-w-px relative shrink-0">
                  <div className="bg-black overflow-clip relative rounded-[16.384px] shrink-0 size-5">
                    <div className="absolute left-1/2 size-[15.019px] top-[calc(50%-0.34px)] translate-x-[-50%] translate-y-[-50%]">
                      <div className="absolute inset-[-13.64%_-18.18%_-22.73%_-18.18%]">
                        <img alt="Peacock" className="block max-w-none size-full" height="20.48" src={placeholder} width="20.48" />
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 flex flex-col font-tiktok-text font-normal grow justify-center leading-0 min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#121415] text-nowrap tracking-[0.0938px]">
                    <p className="leading-5 overflow-ellipsis overflow-hidden">Peacock</p>
                  </div>
                </div>
                <div className="relative shrink-0 size-4">
                  <div className="absolute h-[6px] left-1/2 top-[5px] -translate-x-1/2 w-3">
                    <svg className="w-3 h-3 text-[#6d6e70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center overflow-clip relative shrink-0 w-full">
              <div className="flex gap-2 items-center relative shrink-0">
                <input
                  type="checkbox"
                  checked={doNotCreatePost}
                  onChange={(e) => setDoNotCreatePost(e.target.checked)}
                  className="bg-white border-2 border-[#d3d4d5] border-solid shrink-0 size-5 rounded"
                />
              </div>
              <div className="flex gap-1 items-center relative shrink-0">
                <p className="font-tiktok-text font-normal leading-5 relative shrink-0 text-sm text-[#121415] text-nowrap tracking-[0.0938px]">
                  Do not create a post on this TikTok account
                </p>
                <div className="relative shrink-0 size-[14px]">
                  <HelpIcon size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Ad text */}
          <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
              <div className="flex gap-1 items-center relative shrink-0">
                <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 relative shrink-0 text-sm text-[#121415] text-nowrap tracking-[0.0938px]">
                  <p className="leading-5">Ad text (1/5)</p>
                </div>
                <div className="relative shrink-0 size-4">
                  <HelpIcon size={16} />
                </div>
              </div>
            </div>
            <div className="bg-[#ececed] border-0 border-[#d3d4d5] border-solid flex gap-2 items-center px-3 py-2 relative rounded shrink-0 w-full">
              <div className="basis-0 flex gap-0 grow items-center min-h-px min-w-px relative shrink-0">
                <div className="basis-0 flex flex-col font-tiktok-text font-normal grow justify-center leading-0 min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a9abac] text-nowrap tracking-[0.0938px]">
                  <p className="leading-5 overflow-ellipsis overflow-hidden">Enter ad text</p>
                </div>
              </div>
              <div className="flex flex-col gap-0 items-center justify-center relative shrink-0">
                <div className="flex flex-col font-tiktok-text font-normal justify-center leading-0 relative shrink-0 text-sm text-[#6d6e70] text-nowrap text-right tracking-[-0.21px]">
                  <p className="leading-5">0/100</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center relative shrink-0">
              <div className="overflow-clip relative shrink-0 size-4">
                <svg className="w-4 h-4 text-[#017976]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="font-tiktok-text font-normal leading-5 relative shrink-0 text-sm text-[#017976] text-nowrap tracking-[0.0938px]">
                Add alternative text
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive add-ons */}
      <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
        <div className="flex items-center relative shrink-0 w-full">
          <div className="flex flex-col gap-2 items-start relative shrink-0">
            <div className="flex gap-2 items-center relative shrink-0">
              <div className="bg-[#bdbdbd] h-5 relative rounded-[10px] shrink-0 w-[38px]">
                <div className={`absolute bg-white flex items-center p-0.5 right-[2px] rounded-[8px] shadow-md top-1/2 -translate-y-1/2 transition-all ${interactiveAddOns ? 'translate-x-0' : 'translate-x-[-18px]'}`}>
                  <div className="relative shrink-0 size-3">
                    <svg className="w-3 h-3 text-[#009995]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-center relative shrink-0">
                <p className="font-tiktok-display font-medium leading-[22px] relative shrink-0 text-[#8a8a8a] text-sm text-nowrap">
                  Interactive add-ons
                </p>
                <div className="overflow-clip relative shrink-0 size-[14px]">
                  <HelpIcon size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-tiktok-display font-normal leading-5 min-w-full relative shrink-0 text-[#6d6e71] text-xs w-[min-content]">
          The most suitable interactive add-ons will be automatically applied. You can customize what into is displayed on the add-ons.
        </p>
        <div className="flex flex-col items-start justify-end relative shrink-0">
          <div className="flex gap-1 items-center relative shrink-0">
            <div className="h-3 relative shrink-0 w-[11px]">
              <svg className="w-3 h-3 text-[#87898b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="font-tiktok-display font-normal leading-[22px] relative shrink-0 text-sm text-[#87898b] text-nowrap">
              Edit
            </p>
          </div>
        </div>
      </div>

      {/* Creative enhancements */}
      <div className="flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
        <div className="flex gap-1 items-center justify-center relative shrink-0 w-full">
          <svg className="w-3.5 h-3.5 text-[#121415]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="basis-0 flex flex-col font-tiktok-text font-medium grow justify-center leading-0 min-h-px min-w-px relative shrink-0 text-sm text-[#121415] tracking-[0.0938px]">
            <p className="leading-5">Creative enhancements</p>
          </div>
        </div>
        <div className="bg-[#f8f8f9] flex flex-col gap-2 items-start px-6 py-4 relative shrink-0 w-full">
          <div className="flex gap-[10px] items-center justify-center leading-0 relative shrink-0 text-xs text-nowrap tracking-[0.1608px]">
            <div className="flex flex-col font-tiktok-text font-medium justify-center relative shrink-0 text-[#121415]">
              <p className="leading-4 text-nowrap">Music for images:</p>
            </div>
            <div className="flex flex-col font-tiktok-text font-normal justify-center relative shrink-0 text-[#404142]">
              <p className="leading-4 text-nowrap">Music name 123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show more */}
      <div className="flex gap-1 h-[22px] items-center px-0 py-2 relative shrink-0">
        <div className="overflow-clip relative shrink-0 size-[14px]">
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <p className="font-tiktok-text font-normal leading-5 relative shrink-0 text-xs text-[rgba(0,0,0,0.55)] text-nowrap">
          Show more
        </p>
      </div>
    </div>
  );
}

export default CreateAdsForm;
