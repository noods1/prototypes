import React, { useState, useRef, useEffect } from 'react';
import Select from './Select';
import VideoSelectPopover, { videoOptions } from './VideoSelectPopover';
import frame2036083207 from '../assets/preview/frame2036083207.png';
import whiteGhostCyberpunk from '../assets/preview/white-ghost-cyberpunk.png';
import placeholder from '../assets/preview/placeholder.png';
import line8 from '../assets/preview/line8.svg';
import fullscreen from '../assets/preview/fullscreen.svg';
import rectangle3copy2 from '../assets/preview/rectangle3copy2.svg';
import rectangle3copy2Empty from '../assets/preview/rectangle3copy2-empty.svg';
import catalogVideoBg from '../assets/preview/catalog-video-bg.png';
import original1 from '../assets/preview/original1.png';
import rectangle5copy4 from '../assets/preview/rectangle5copy4.png';
import combinedShape from '../assets/preview/combinedshape.png';
import musicNote from '../assets/preview/music-note.svg';
import star from '../assets/preview/star.svg';
import lineCatalog from '../assets/preview/line-catalog.svg';
import iconHomeComment from '../assets/preview/icon-home-comment.svg';
import group16 from '../assets/preview/group16.svg';
import group6 from '../assets/preview/group6.svg';
import group17 from '../assets/preview/group17.svg';
import oval5 from '../assets/preview/oval5.svg';
import oval6 from '../assets/preview/oval6.svg';
import chevronUpDouble from '../assets/preview/chevron-up-double.svg';
import mask from '../assets/preview/mask.svg';
import line from '../assets/preview/line.svg';
import lineNew from '../assets/preview/line-new.svg';
import iconProfileUp from '../assets/preview/icon-profile-up.svg';
import iconMessageUp from '../assets/preview/icon-message-up.svg';
import butHomeAdd from '../assets/preview/but-home-add.svg';
import iconExploreUp from '../assets/preview/icon-explore-up.svg';
import group19 from '../assets/preview/group19.svg';
import chevronUpDoubleNew from '../assets/preview/chevron-up-double-new.svg';
import chevronUpDoubleFill from '../assets/preview/chevron-up-double-fill.svg';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';
import playButton from '../assets/preview/play-button.svg';
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';
import video4 from '../assets/videos/video4.mp4';
import video5 from '../assets/videos/video5.mp4';
import video6 from '../assets/videos/video6.mp4';

const videos = [video1, video2, video3, video4, video5, video6];
const VIDEO_DURATION = 3.75; // seconds per video
const TOTAL_DURATION = 15; // total duration for 4 videos

function TtPreview({ selectedImages = [], onProgressChange, progress, onProgressScrub, currentPage = 1 }) {
  // Show empty state if less than 4 videos selected
  const hasEnoughVideos = selectedImages.length >= 4;
  
  // Default to first 4 images if no selection
  const displayImages = selectedImages.length > 0 
    ? selectedImages 
    : [
        { img: image1, title: 'image1' },
        { img: image2, title: 'image2' },
        { img: image3, title: 'image3' },
        { img: image4, title: 'image4' }
      ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const isScrubbingRef = useRef(false);
  const scrubHandlerRef = useRef(null);

  // Catalog video hooks (must be at top level, not conditional)
  const [isCatalogPlaying, setIsCatalogPlaying] = useState(false);
  const [isCatalogHovered, setIsCatalogHovered] = useState(false);
  const [catalogCurrentTime, setCatalogCurrentTime] = useState(0);
  const catalogVideoRef = useRef(null);
  const catalogIntervalRef = useRef(null);
  const catalogStartTimeRef = useRef(0);

  const handleProgressScrub = (scrubProgress) => {
    setIsPlaying(false); // Stop playing when scrubbing
    const newTime = scrubProgress * TOTAL_DURATION;
    setCurrentTime(newTime);
    startTimeRef.current = Date.now() - (newTime * 1000);
    
    const newVideoIndex = Math.floor(newTime / VIDEO_DURATION);
    if (newVideoIndex < selectedVideoIds.length) {
      // Pause all videos
      videoRefs.current.forEach(video => {
        if (video) video.pause();
      });
      
      setCurrentVideoIndex(newVideoIndex);
      
      // Set time for current video
      if (videoRefs.current[newVideoIndex]) {
        const video = videoRefs.current[newVideoIndex];
        const videoTime = (newTime % VIDEO_DURATION);
        video.currentTime = videoTime;
      }
    }
  };

  // Handle external progress changes (scrubbing from progress bar)
  useEffect(() => {
    if (progress !== undefined && onProgressScrub && !isPlaying) {
      handleProgressScrub(progress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, onProgressScrub, isPlaying]);

  // Get video IDs from selected images
  const getVideoId = (imageTitle) => {
    const match = imageTitle.match(/image(\d+)/);
    return match ? parseInt(match[1]) - 1 : 0; // Convert to 0-based index
  };

  const selectedVideoIds = displayImages.map(img => getVideoId(img.title));

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - (currentTime * 1000);
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setCurrentTime(elapsed);
        
        // Update progress
        if (onProgressChange) {
          onProgressChange(elapsed / TOTAL_DURATION);
        }

        // Switch to next video every 3.75 seconds
        const newVideoIndex = Math.floor(elapsed / VIDEO_DURATION);
        if (newVideoIndex !== currentVideoIndex && newVideoIndex < selectedVideoIds.length) {
          // Pause current video
          if (videoRefs.current[currentVideoIndex]) {
            videoRefs.current[currentVideoIndex].pause();
          }
          // Play next video
          setCurrentVideoIndex(newVideoIndex);
          if (videoRefs.current[newVideoIndex]) {
            const video = videoRefs.current[newVideoIndex];
            video.currentTime = 0;
            video.play().catch(err => {
              console.error('Error playing video:', err);
            });
          }
        }

        // Stop after 15 seconds
        if (elapsed >= TOTAL_DURATION) {
          handleStop();
        }
      }, 16); // ~60fps update rate
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentVideoIndex, selectedVideoIds, onProgressChange, currentTime]);

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentVideoIndex(0);
    setCurrentTime(0);
    startTimeRef.current = Date.now();
    
    // Pause all videos first
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    
    // Play first video
    if (videoRefs.current[0]) {
      const video = videoRefs.current[0];
      video.currentTime = 0;
      video.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentVideoIndex(0);
    setCurrentTime(0);
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    if (onProgressChange) {
      onProgressChange(0);
    }
  };


  const handlePreviewClick = () => {
    if (isPlaying) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  // Catalog video handlers and effects (always defined, but only used when currentPage === 2)
  const handleCatalogStop = () => {
    setIsCatalogPlaying(false);
    if (catalogVideoRef.current) {
      catalogVideoRef.current.pause();
      // Reset to beginning if we've reached the end
      const currentTime = catalogCurrentTime;
      if (currentTime >= TOTAL_DURATION) {
        catalogVideoRef.current.currentTime = 0;
        setCatalogCurrentTime(0);
        if (onProgressChange) {
          onProgressChange(0);
        }
      }
    }
  };

  const handleCatalogPlay = () => {
    if (catalogVideoRef.current) {
      const video = catalogVideoRef.current;
      
      // Reset time first
      video.currentTime = 0;
      setCatalogCurrentTime(0);
      catalogStartTimeRef.current = Date.now();
      
      if (onProgressChange) {
        onProgressChange(0);
      }
      
      // Ensure video is loaded
      if (video.readyState === 0) {
        video.load();
      }
      
      // Wait for video to be ready if needed
      const attemptPlay = () => {
        if (video.readyState >= 2) {
          // Video is ready, try to play
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // onPlay event will set isCatalogPlaying
                console.log('Catalog video play() resolved');
              })
              .catch(err => {
                console.error('Error playing catalog video:', err, video.error);
                // State won't change since play failed
              });
          }
        } else {
          // Wait for video to be ready
          const onCanPlay = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log('Catalog video playing after canplay');
                })
                .catch(err => {
                  console.error('Error playing after canplay:', err);
                });
            }
            video.removeEventListener('canplay', onCanPlay);
          };
          video.addEventListener('canplay', onCanPlay);
        }
      };
      
      attemptPlay();
    }
  };

  const handleCatalogClick = (e) => {
    e.stopPropagation(); // Prevent click from propagating to parent div
    if (isCatalogPlaying) {
      handleCatalogStop();
    } else {
      handleCatalogPlay();
    }
  };

  // Track catalog video progress and stop after 15 seconds (only active when currentPage === 2)
  useEffect(() => {
    if (currentPage === 2 && isCatalogPlaying && catalogVideoRef.current) {
      catalogStartTimeRef.current = Date.now() - (catalogCurrentTime * 1000);
      
      catalogIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - catalogStartTimeRef.current) / 1000;
        const clampedElapsed = Math.min(elapsed, TOTAL_DURATION);
        
        // Update progress
        const newProgress = clampedElapsed / TOTAL_DURATION;
        setCatalogCurrentTime(clampedElapsed);
        
        if (onProgressChange) {
          onProgressChange(newProgress);
        }

        // Clamp video time to 15 seconds
        if (catalogVideoRef.current) {
          if (catalogVideoRef.current.currentTime > TOTAL_DURATION) {
            catalogVideoRef.current.currentTime = TOTAL_DURATION;
            catalogVideoRef.current.pause();
          }
        }

        // Stop after 15 seconds
        if (clampedElapsed >= TOTAL_DURATION) {
          setIsCatalogPlaying(false);
          if (catalogVideoRef.current) {
            catalogVideoRef.current.pause();
            catalogVideoRef.current.currentTime = 0;
            setCatalogCurrentTime(0);
            if (onProgressChange) {
              onProgressChange(0);
            }
          }
        }
      }, 16); // ~60fps update rate
    } else {
      if (catalogIntervalRef.current) {
        clearInterval(catalogIntervalRef.current);
      }
    }

    return () => {
      if (catalogIntervalRef.current) {
        clearInterval(catalogIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isCatalogPlaying]);

  // Handle scrubbing from progress bar for catalog video (only active when currentPage === 2)
  // Only trigger scrubbing when progress changes from user interaction, not from playback updates
  useEffect(() => {
    // Only scrub if we're not currently playing (scrubbar is controlled by PlayProgressBar)
    // The onProgressScrub callback is only called when user drags, so we use that to detect scrubbing
    if (currentPage === 2 && progress !== undefined && onProgressScrub && catalogVideoRef.current && !isCatalogPlaying) {
      const newTime = progress * TOTAL_DURATION;
      const clampedTime = Math.min(newTime, TOTAL_DURATION);
      setCatalogCurrentTime(clampedTime);
      catalogStartTimeRef.current = Date.now() - (clampedTime * 1000);
      
      if (catalogVideoRef.current) {
        catalogVideoRef.current.currentTime = clampedTime;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, progress, onProgressScrub, isCatalogPlaying]);

  // Ensure video is loaded when switching to page 2
  useEffect(() => {
    if (currentPage === 2 && catalogVideoRef.current) {
      const video = catalogVideoRef.current;
      // Reset video state when switching to page 2
      video.currentTime = 0;
      video.pause();
      setIsCatalogPlaying(false);
      setCatalogCurrentTime(0);
      
      // Only load if video isn't already loaded
      if (video.readyState === 0) {
        video.load();
      }
    }
  }, [currentPage]);

  // Catalog video preview (page 2) - conditional rendering only
  if (currentPage === 2) {

    return (
      <div 
        className="bg-[#d6d6d6] overflow-clip relative rounded-[6px] size-full cursor-pointer"
        onClick={handleCatalogClick}
        onMouseEnter={() => setIsCatalogHovered(true)}
        onMouseLeave={() => setIsCatalogHovered(false)}
      >
        {/* Background */}
        <div className="absolute bg-[#d6d6d6] h-[530px] left-0 overflow-clip rounded-[6px] top-0 w-[256px] z-0" />
        
        {/* Main background image - thumbnail */}
        <div className={`absolute h-[530px] left-0 rounded-[4px] top-0 w-[256px] transition-opacity z-[1] ${isCatalogPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={image1} />
        </div>

        {/* Video element - should be behind all content */}
        <video
          ref={catalogVideoRef}
          className={`absolute h-[530px] left-0 rounded-[4px] top-0 w-[256px] object-cover transition-opacity z-[2] ${isCatalogPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          src={video1}
          playsInline
          muted
          loop={false}
          preload="auto"
          onPlay={(e) => {
            // Set playing state when video actually starts playing
            console.log('Video onPlay event fired, currentTime:', e.target.currentTime);
            setIsCatalogPlaying(true);
            catalogStartTimeRef.current = Date.now();
          }}
          onPause={() => {
            // Only pause state if we're not scrubbing
            console.log('Video paused');
          }}
          onError={(e) => {
            const video = e.target;
            console.error('Video error:', {
              error: video.error,
              networkState: video.networkState,
              readyState: video.readyState,
              src: video.src
            });
            setIsCatalogPlaying(false);
          }}
          onLoadedData={() => {
            console.log('Video loaded, readyState:', catalogVideoRef.current?.readyState, 'src:', catalogVideoRef.current?.src);
          }}
          onCanPlay={() => {
            console.log('Video can play, readyState:', catalogVideoRef.current?.readyState);
          }}
        />

        {/* Content overlay - above video and gradients */}
        <div className="absolute flex flex-col gap-[5.128px] items-start left-[12px] top-[343px] w-[178.206px] z-20">
          {/* Username */}
          <div className="flex gap-[2.564px] items-center relative shrink-0">
            <p className="font-tiktok-display font-medium leading-[1.3] relative shrink-0 text-[10.897px] text-white text-nowrap">
              account name
            </p>
          </div>
          
          {/* Description */}
          <div className="flex flex-col items-start relative shrink-0">
            <div className="h-[23.077px] relative shrink-0 w-[178.205px]">
              <p className="absolute font-tiktok-text font-normal leading-[1.3] left-0 right-0 text-[8.97px] text-[rgba(255,255,255,0.9)] top-0 tracking-[0.0597px]">
                Post content blabla bla blabla bla blabla bla blabla bla blabla bla
              </p>
            </div>
          </div>
          
          {/* Music */}
          <div className="flex gap-[2.564px] h-[11.539px] items-center relative shrink-0 w-[125.001px]">
            <div className="relative shrink-0 size-[14px]">
              <div className="absolute inset-[6.67%_14.58%_8.33%_8.33%]">
                <div className="absolute inset-0">
                  <img alt="" className="block max-w-none size-full" src={musicNote} />
                </div>
              </div>
            </div>
            <p className="font-['Proxima_Nova',sans-serif] leading-[11.538px] relative text-[9.62px] text-white w-[113.462px]">
              Fine Line - Harry Styles
            </p>
          </div>
          
          {/* Sponsored tag */}
          <div className="bg-[rgba(37,37,37,0.34)] flex h-[10.26px] items-center justify-center px-0 py-[1.5px] relative rounded-[1px] shrink-0 w-[37.62px]">
            <p className="font-tiktok-text font-medium leading-[1.3] relative shrink-0 text-[6.41px] text-center text-nowrap text-white tracking-[0.1137px]" style={{ textShadow: '0px 0px 16px rgba(0,0,0,0.34)' }}>
              Sponsored
            </p>
          </div>
          
          {/* Product card */}
          <div className="flex flex-col items-start p-[7px] relative rounded-[8px] shrink-0 w-[178px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
              <div className="absolute bg-[rgba(37,37,37,0.12)] inset-0 rounded-[8px]" />
              <div className="absolute backdrop-blur-[50px] backdrop-filter bg-[#9d9d9d] inset-0 mix-blend-overlay rounded-[8px]" />
            </div>
            <div className="flex gap-[10px] items-center relative shrink-0 w-full">
              {/* Product image */}
              <div className="border border-[rgba(255,255,255,0.12)] border-solid h-[76px] relative rounded-[6px] shrink-0 w-[55px]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
                  <img alt="" className="absolute h-[99.38%] left-[-2.42%] max-w-none top-[-0.7%] w-[103%]" src={original1} />
                </div>
              </div>
              
              {/* Product info */}
              <div className="basis-0 flex flex-col gap-[4px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0">
                <div className="flex flex-col gap-[2px] items-start relative shrink-0 w-full">
                  <div className="bg-[#fe2c55] flex flex-col items-center justify-center p-px relative rounded-[1px] shrink-0">
                    <p className="font-tiktok-text font-medium leading-[1.3] relative shrink-0 text-[5px] text-white text-center text-nowrap tracking-[0.067px]">
                      New Release
                    </p>
                  </div>
                  <p className="font-tiktok-text font-medium leading-[1.3] min-w-full relative shrink-0 text-[8px] text-white tracking-[0.1072px] w-[min-content]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.1)' }}>
                    The curious Case of Benjamin Button
                  </p>
                  <div className="flex gap-[2px] items-center relative shrink-0 w-full">
                    <div className="relative shrink-0 size-[6px]">
                      <div className="absolute inset-[5.25%_7.23%_12.99%_7.23%]">
                        <img alt="" className="block max-w-none size-full" src={star} />
                      </div>
                    </div>
                    <p className="font-tiktok-text font-normal leading-[1.3] overflow-ellipsis overflow-hidden relative shrink-0 text-[7px] text-[rgba(255,255,255,0.75)] text-nowrap tracking-[0.1241px]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.1)' }}>
                      8.5/10 (346) • IMDb
                    </p>
                  </div>
                  <p className="font-tiktok-text font-normal leading-[1.3] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[7px] text-[rgba(255,255,255,0.75)] text-nowrap tracking-[0.1241px] w-[min-content]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.1)' }}>
                    Top Pick in Drama
                  </p>
                </div>
                {/* Learn more button */}
                <div className="bg-[#fe2c55] flex flex-col h-[21.79px] items-center justify-center px-0 py-[4px] relative rounded-[4px] shrink-0 w-full">
                  <p className="font-tiktok-text font-medium leading-[1.3] relative shrink-0 text-[8.33px] text-white text-center text-nowrap tracking-[0.1116px]">
                    Learn more
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1.042px_1.042px_0px_rgba(255,255,255,0.25)]" />
          </div>
        </div>

        {/* Top navigation - above video */}
        <div className="absolute h-[12.949px] left-[calc(50%+4.03px)] overflow-clip top-[9.96px] translate-x-[-50%] w-[110.568px] z-20">
          <p className="absolute font-['Helvetica',sans-serif] leading-normal left-[60.6%] not-italic right-[0.71%] text-[10.464px] text-white top-[calc(50%-6.29px)]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.3)' }}>
            For you
          </p>
          <p className="absolute font-['Helvetica',sans-serif] leading-normal left-0 not-italic opacity-60 right-[57.01%] text-[9.301px] text-white top-[calc(50%-5.35px)]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.3)' }}>
            Following
          </p>
          <div className="absolute inset-[43.38%_51.9%_29.96%_47.48%]">
            <div className="absolute inset-[-8.42%_7.92%]">
              <img alt="" className="block max-w-none size-full" src={lineCatalog} />
            </div>
          </div>
        </div>

        {/* Bottom bar - above video */}
        <div className="absolute bg-black bottom-0 h-[32px] left-0 w-[256px] z-30">
          <div className="absolute contents left-[224.26px] top-[8.4px]">
            <div className="absolute flex h-[17.074px] items-center justify-center left-[224.26px] top-[8.4px] w-[12.215px]">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="h-[17.074px] relative w-[12.215px]">
                  <div className="absolute inset-[-3.4%_-4.76%_-3.41%_-4.76%]">
                    <img alt="" className="block max-w-none size-full" src={iconProfileUp} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute contents left-[174.59px] top-[9.5px]">
            <div className="absolute h-[14.842px] left-[174.59px] top-[9.5px] w-[14.851px]">
              <div className="absolute inset-[-3.92%_-3.91%]">
                <img alt="" className="block max-w-none size-full" src={iconMessageUp} />
              </div>
            </div>
          </div>
          <div className="absolute contents left-[114.67px] top-[7.94px]">
            <div className="absolute h-[19.337px] left-[114.67px] top-[7.94px] w-[29.703px]">
              <img alt="" className="block max-w-none size-full" src={butHomeAdd} />
            </div>
          </div>
          <div className="absolute contents inset-[30.08%_66.27%_22.45%_26.12%]">
            <div className="absolute inset-[30.08%_66.27%_22.45%_26.12%]">
              <div className="absolute inset-[0_0_0_-0.8%]">
                <img alt="" className="block max-w-none size-full" src={iconExploreUp} />
              </div>
            </div>
          </div>
          <div className="absolute contents inset-[30.08%_86.51%_22.45%_8.09%]">
            <div className="absolute inset-[30.08%_86.51%_22.45%_8.09%]">
              <div className="absolute inset-[-1.24%_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={group19} />
              </div>
            </div>
          </div>
        </div>

        {/* Right side container - above video */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Right side actions */}
          <div className="absolute bottom-[108.07px] contents right-[1.63px]">
            <p className="absolute bottom-[167.59px] font-['Helvetica',sans-serif] leading-normal not-italic opacity-90 right-[26.15px] text-[6.976px] text-white translate-x-[100%] translate-y-[100%] w-[19.012px]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.15)' }}>
              1281
            </p>
            <p className="absolute bottom-[218.7px] font-['Helvetica',sans-serif] leading-normal not-italic opacity-90 right-[26.84px] text-[6.976px] text-white translate-x-[100%] translate-y-[100%] w-[21.388px]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.15)' }}>
              71.1k
            </p>
            <div className="absolute bottom-[170.76px] contents right-[6.81px]">
              <div className="absolute bottom-[170.76px] h-[23.139px] right-[6.81px] w-[23.831px]">
                <div className="absolute inset-[0_-4.2%_-8.64%_-4.2%]">
                  <img alt="" className="block max-w-none size-full" src={iconHomeComment} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-[262.27px] contents right-[1.63px]">
              <div className="absolute bottom-[271.59px] h-[33.84px] right-[1.63px] w-[33.847px]">
                <div className="absolute inset-[-1.72%_-4.67%_-7.63%_-4.67%]">
                  <img alt="" className="block max-w-none size-full" height="37.002" src={rectangle5copy4} width="37.01" />
                </div>
              </div>
              <div className="absolute bottom-[262.27px] contents right-[10.27px]">
                <div className="absolute bottom-[262.27px] h-[16.575px] right-[10.27px] w-[16.578px]">
                  <div className="absolute inset-[0_-6.03%_-12.07%_-6.03%]">
                    <img alt="" className="block max-w-none size-full" src={group16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[222.56px] contents right-[6.36px]">
              <div className="absolute bottom-[222.56px] h-[22.33px] right-[6.36px] w-[24.388px]">
                <div className="absolute inset-[0_-4.1%_-8.96%_-4.1%]">
                  <img alt="" className="block max-w-none size-full" src={group6} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-[108.07px] h-[33.868px] overflow-clip right-[8.72px] w-[18.926px]">
              <p className="absolute font-['Helvetica',sans-serif] leading-normal left-[9.71%] not-italic opacity-90 right-[14.95%] text-[6.976px] text-white top-[calc(50%+8.17px)]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.15)' }}>
                232
              </p>
              <div className="absolute contents inset-[2.67%_7.54%_43.41%_3.69%]">
                <div className="absolute inset-[2.67%_7.54%_43.41%_3.69%]">
                  <div className="absolute inset-[-2.02%_-11.14%_-15.73%_-11.14%]">
                    <img alt="" className="block max-w-none size-full" src={group17} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disk/music player */}
          <div className="absolute bottom-[39.94px] contents right-[1.63px]">
            <div className="absolute bottom-[39.94px] contents right-[1.63px]">
              <div className="absolute bottom-[39.94px] h-[33.84px] right-[1.63px] w-[33.847px]">
                <img alt="" className="block max-w-none size-full" height="33.84" src={combinedShape} width="33.847" />
              </div>
              <div className="absolute bottom-[48.91px] h-[15.884px] right-[10.61px] w-[15.887px]">
                <img alt="" className="block max-w-none size-full" src={oval5} />
              </div>
              <div className="absolute bottom-[50.64px] h-[12.431px] right-[12.34px] w-[12.434px]">
                <img alt="" className="block max-w-none size-full" src={oval6} />
              </div>
            </div>
          </div>
        </div>

        {/* Play button - centered overlay - only show on hover when not playing */}
        {!isCatalogPlaying && isCatalogHovered && (
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleCatalogPlay();
            }}
          >
            <div className="relative size-16">
              <img alt="Play" className="block max-w-none size-full" src={playButton} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Empty state when less than 4 videos
  if (!hasEnoughVideos) {
    return (
      <div className="bg-[#d6d6d6] overflow-clip relative rounded-[6px] size-full">
        <div className="absolute bg-[#87898b] inset-0" />
        <div className="absolute flex h-[86.016px] items-center justify-center left-0 right-0 top-0">
          <div className="flex-none h-[86.016px] scale-y-[-100%] w-[256px]">
            <div className="relative size-full">
              <img alt="" className="block max-w-none size-full" src={rectangle3copy2Empty} />
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="font-tiktok-display font-medium leading-[20px] text-xs text-white text-center w-[161px]">
            Add 4 or more videos to use Catalog multi-show
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-[#d6d6d6] overflow-clip relative rounded-[6px] size-full cursor-pointer"
      onClick={handlePreviewClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background section */}
      <div className="absolute h-[522px] left-0 overflow-clip right-0 top-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #281820 0%, #482830 100%)' }} />
        <div className="absolute flex h-[86.016px] items-center justify-center left-0 right-0 top-0">
          <div className="flex-none h-[86.016px] scale-y-[-100%] w-[256px]">
            <div className="relative size-full">
              <img alt="" className="block max-w-none size-full" src={rectangle3copy2} />
            </div>
          </div>
        </div>
      </div>
      
        {/* Gradient overlays - above video */}
        <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-[50.33%_0_0_0] to-[97.409%] to-[rgba(0,0,0,0.5)] z-10" />
        <div className="absolute h-[56px] left-0 opacity-[0.32] right-0 top-0 z-10" style={{ backgroundImage: "linear-gradient(1.4941e-06deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.12) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.75) 90%, rgba(0, 0, 0, 0.88) 96.25%, rgb(0, 0, 0) 100%)" }} />
      
      {/* Gray background */}
      <div className="absolute h-[530px] left-0 overflow-clip rounded-[6px] top-0 w-[256px]" style={{ background: 'linear-gradient(180deg, #281820 0%, #482830 100%)' }} />
      
      {/* Chevron icon */}
      <div className="absolute left-[calc(50%+0.83px)] size-[13.653px] top-[494px] translate-x-[-50%]">
        <div className="absolute inset-[17.71%_26.35%_22.18%_26.35%]">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" }}>
            <img alt="" className="block max-w-none size-full" src={chevronUpDoubleFill} />
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute contents left-[11px] top-[57.54px]">
        <div className="absolute bg-[rgba(255,255,255,0.16)] h-[354.304px] left-[11px] rounded-[8.192px] top-[57.54px] w-[234.155px]" />
        <div className="absolute flex flex-col gap-[2.731px] items-start left-[21.92px] top-[68.46px]">
          <div className="flex gap-[2.731px] items-center relative shrink-0">
            <div className="bg-black overflow-clip relative rounded-[16.384px] shrink-0 size-[13.653px]">
              <div className="absolute left-1/2 size-[15.019px] top-[calc(50%-0.34px)] translate-x-[-50%] translate-y-[-50%]">
                <div className="absolute inset-[-13.64%_-18.18%_-22.73%_-18.18%]">
                  <img alt="" className="block max-w-none size-full" height="20.48" src={placeholder} width="20.48" />
                </div>
              </div>
            </div>
            <p className="font-tiktok-text font-medium leading-[1.3] relative shrink-0 text-[10.923px] text-[rgba(255,255,255,0.75)] text-nowrap tracking-[0.0202px]">Peacock</p>
          </div>
          <p className="font-tiktok-display font-bold leading-[1.3] relative shrink-0 text-[11.605px] text-white w-[211.627px]">Watch for just $5.99/month</p>
          <div className="bg-[rgba(51,51,51,0.6)] flex h-[12.288px] items-start px-[2.731px] py-[1.024px] relative rounded-[4px] shrink-0">
            <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 relative shrink-0 text-[11px] text-center text-nowrap text-white tracking-[0.1951px]">
              <p className="leading-[1.3]">Sponsored</p>
            </div>
          </div>
        </div>
        <div className="absolute flex flex-wrap gap-[13px_10.24px] h-[277.845px] items-start left-[21.92px] top-[123.07px] w-[212.309px]">
          {displayImages.map((item, i) => {
            const videoId = getVideoId(item.title);
            const isCurrentVideo = isPlaying && currentVideoIndex === i;
            return (
              <div key={i} className="flex flex-col gap-[4.096px] h-[134.485px] items-start relative shrink-0">
                <div className="bg-gradient-to-b border-[0.546px] border-[rgba(255,255,255,0.2)] border-solid from-[#e0e0e0] h-[134.485px] overflow-clip relative rounded-[5.461px] shrink-0 to-[#ddd] w-[101.035px]">
                  {/* Thumbnail image */}
                  <div className={`absolute h-[134.485px] left-[-0.55px] rounded-[5.461px] top-[-0.55px] w-[101.035px] transition-opacity ${isCurrentVideo ? 'opacity-0' : 'opacity-100'}`}>
                    <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[5.461px] size-full" src={item.img} />
                  </div>
                  {/* Video element - always rendered but only visible when playing */}
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    className={`absolute h-[134.485px] left-[-0.55px] rounded-[5.461px] top-[-0.55px] w-[101.035px] object-cover transition-opacity ${isCurrentVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    src={videos[videoId]}
                    playsInline
                    muted
                    loop={false}
                  />
                  <div className="absolute bottom-[-0.55px] h-[64.171px] left-0 right-0">
                    <img alt="" className="block max-w-none size-full" src={mask} />
                  </div>
                  <p className="absolute font-tiktok-text font-medium leading-[1.3] left-[6.28px] overflow-ellipsis overflow-hidden text-[8.192px] text-white text-nowrap top-[116.19px] tracking-[0.1097px] w-[87.381px]">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Play button - centered overlay - only show on hover when not playing */}
      {!isPlaying && isHovered && (
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
        >
          <div className="relative size-16">
            <img alt="Play" className="block max-w-none size-full" src={playButton} />
          </div>
        </div>
      )}

      {/* Bottom buttons */}
      <div className="absolute bottom-[95.96px] contents left-[11px] right-[10.85px]">
        <div className="absolute bg-[rgba(255,255,255,0.2)] bottom-[95.96px] h-[30.037px] left-[11px] overflow-clip right-[130.99px] rounded-[8px]">
          <div className="absolute flex gap-[2.731px] items-center left-1/2 overflow-clip top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 relative shrink-0 text-[12px] text-nowrap text-white tracking-[0.0486px]">
              <p className="leading-[1.3]">Not interested</p>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#fe2c55] bottom-[95.96px] h-[30.037px] left-[131.15px] overflow-clip right-[10.85px] rounded-[5.461px]">
          <div className="absolute flex gap-[2.731px] items-center left-1/2 overflow-clip top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <p className="font-tiktok-text font-medium leading-[1.3] relative shrink-0 text-[12px] text-center text-nowrap text-white tracking-[0.0486px]">Sign up</p>
          </div>
        </div>
      </div>

      {/* Top navigation */}
      <div className="absolute h-[12.949px] left-[calc(50%+4.03px)] overflow-clip top-[9.96px] translate-x-[-50%] w-[110.568px]">
        <p className="absolute font-['Helvetica',sans-serif] leading-normal left-[60.6%] not-italic right-[0.71%] text-[10.5px] text-white top-[calc(50%-5.43px)]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.3)' }}>For you</p>
        <p className="absolute font-['Helvetica',sans-serif] leading-normal left-0 not-italic opacity-60 right-[57.01%] text-[10.5px] text-white top-[calc(50%-5.43px)]" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.3)' }}>Following</p>
        <div className="absolute inset-[23.5%_51.83%_7%_47.26%]">
          <div className="absolute inset-[-3.23%_20.93%]">
            <img alt="" className="block max-w-none size-full" src={lineNew} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bg-black bottom-0 h-[32px] left-0 w-[256px]">
        <div className="absolute contents left-[224.26px] top-[8.4px]">
          <div className="absolute flex h-[17.074px] items-center justify-center left-[224.26px] top-[8.4px] w-[12.215px]">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="h-[17.074px] relative w-[12.215px]">
                <div className="absolute inset-[-3.4%_-4.76%_-3.41%_-4.76%]">
                  <img alt="" className="block max-w-none size-full" src={iconProfileUp} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[174.59px] top-[9.5px]">
          <div className="absolute h-[14.842px] left-[174.59px] top-[9.5px] w-[14.851px]">
            <div className="absolute inset-[-3.92%_-3.91%]">
              <img alt="" className="block max-w-none size-full" src={iconMessageUp} />
            </div>
          </div>
        </div>
        <div className="absolute contents left-[114.67px] top-[7.94px]">
          <div className="absolute h-[19.337px] left-[114.67px] top-[7.94px] w-[29.703px]">
            <img alt="" className="block max-w-none size-full" src={butHomeAdd} />
          </div>
        </div>
        <div className="absolute contents inset-[30.08%_66.27%_22.45%_26.12%]">
          <div className="absolute inset-[30.08%_66.27%_22.45%_26.12%]">
            <div className="absolute inset-[0_0_0_-0.8%]">
              <img alt="" className="block max-w-none size-full" src={iconExploreUp} />
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[30.08%_86.51%_22.45%_8.09%]">
          <div className="absolute inset-[30.08%_86.51%_22.45%_8.09%]">
            <div className="absolute inset-[-1.24%_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={group19} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayProgressBar({ progress = 0, onProgressChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentTime = progress * TOTAL_DURATION;
  const progressPercent = Math.min(progress * 100, 100);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleProgress(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleProgress(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleProgress = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, x / rect.width));
    if (onProgressChange) {
      onProgressChange(newProgress);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="flex gap-4 h-[26px] items-center justify-end w-[256px] mx-auto">
      <div className="basis-0 flex gap-2 grow items-center min-h-px min-w-px relative shrink-0">
        <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
          <div 
            ref={trackRef}
            className="[grid-area:1_/_1] bg-[#e3e3e3] h-[6px] ml-0 mt-[3px] rounded-[3px] w-[169px] cursor-pointer"
            onMouseDown={handleMouseDown}
          >
            <div 
              className="bg-[#009995] h-[6px] rounded-[3px] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div 
            className="[grid-area:1_/_1] flex items-center ml-0 mt-0 relative cursor-pointer"
            style={{ left: `calc(${progressPercent}% - 6px)` }}
            onMouseDown={handleMouseDown}
          >
            <div className="bg-[#009995] rounded-[6px] shrink-0 size-[12px]" />
          </div>
        </div>
        <p className="font-tiktok-text font-normal leading-[20px] relative shrink-0 text-[#121212] text-[12px] text-nowrap">
          {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
        </p>
      </div>
    </div>
  );
}

function PreviewCard() {
  const [placement1, setPlacement1] = useState('4 videos selected');
  const [placement2, setPlacement2] = useState('In feed');
  const [selectedVideoIds, setSelectedVideoIds] = useState([1, 2, 3, 4]);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Get selected images based on selected video IDs
  const selectedImages = selectedVideoIds.map(id => {
    const video = videoOptions.find(v => v.id === id);
    return video ? { img: video.image, title: video.name } : null;
  }).filter(Boolean);

  const handleVideoScrub = (scrubProgress) => {
    setProgress(scrubProgress);
  };

  return (
    <div className="bg-white flex flex-col gap-3 items-start overflow-x-clip overflow-y-auto p-4 relative rounded-md shrink-0 w-full">
      {/* Header with tags and pagination */}
      <div className="flex gap-3 items-start relative shrink-0 w-full">
        <div className="basis-0 flex gap-3 grow items-center min-h-px min-w-px overflow-clip relative shrink-0">
          <span className="bg-[#e8fbf9] px-2 py-1 rounded text-xs font-tiktok-text font-medium text-[#009995]">
            {currentPage === 1 ? 'Multi-show' : 'Catalog video'}
          </span>
          <span className="bg-[#e8fbf9] px-2 py-1 rounded text-xs font-tiktok-text font-medium text-[#009995]">Text 1</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-2 py-1 text-xs font-tiktok-text text-[#6d6e70] hover:bg-[#f8f8f9] rounded"
            disabled={currentPage === 1}
          >
            ‹
          </button>
          <span className="text-xs font-tiktok-text text-[#6d6e70]">{currentPage}/{totalPages}</span>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="px-2 py-1 text-xs font-tiktok-text text-[#6d6e70] hover:bg-[#f8f8f9] rounded"
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px relative shrink-0 w-full">
        <img alt="" className="block max-w-none size-full" src={line8} />
      </div>

      {/* Placement section */}
      <div className="flex items-start relative shrink-0 w-full">
        <div className="flex items-start relative shrink-0">
          <div className="flex flex-col gap-1 items-start relative shrink-0">
            <div className="relative rounded-lg shrink-0 size-8">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-lg size-full" src={frame2036083207} />
            </div>
            <div className="bg-[#121212] h-1 rounded shrink-0 w-8" />
          </div>
        </div>
        <div className="basis-0 flex gap-3 grow items-start justify-end min-h-px min-w-px pl-[83px] pr-0 py-0 relative shrink-0">
          <div className="bg-[#e3e3e3] h-8 shrink-0 w-px" />
          <button className="bg-[#f2f2f2] overflow-clip relative rounded shrink-0 size-8 flex items-center justify-center hover:bg-[#ececed]">
            <div className="absolute inset-[26.92%] overflow-clip">
              <img alt="" className="block max-w-none size-full" src={fullscreen} />
            </div>
          </button>
        </div>
      </div>

      {/* Select dropdowns */}
      <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
        {currentPage === 1 && (
          <VideoSelectPopover
            value={placement1}
            onChange={(e) => setPlacement1(e.target.value)}
            onSelectionChange={(ids) => setSelectedVideoIds(ids)}
            className="w-full"
          />
        )}
        <Select
          value={placement2}
          onChange={(e) => setPlacement2(e.target.value)}
          className="w-full pointer-events-none"
        >
          <option value="In feed">In feed</option>
        </Select>
      </div>

      {/* Divider */}
      <div className="h-px relative shrink-0 w-full">
        <img alt="" className="block max-w-none size-full" src={line8} />
      </div>

      {/* TikTok Preview Component */}
      <div className="w-full flex justify-center" style={{ height: '554px' }}>
        <div className="w-[256px] h-full">
          <TtPreview 
            selectedImages={selectedImages} 
            onProgressChange={setProgress}
            progress={progress}
            onProgressScrub={setProgress}
            currentPage={currentPage}
          />
        </div>
      </div>

      {/* Play progress bar */}
      <PlayProgressBar progress={progress} onProgressChange={setProgress} />

      {/* Footer text */}
      <p className="font-tiktok-display leading-5 relative shrink-0 text-[#6d6e71] text-xs w-full">
        Since ad variations are automatically generated, your generated ad content may be slightly different than the preview.
      </p>
    </div>
  );
}

export default PreviewCard;
