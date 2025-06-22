'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

const LazyImage = React.forwardRef<HTMLDivElement, LazyImageProps>(({
  src,
  alt,
  className = '',
  placeholder,
  width,
  height,
  objectFit = 'cover',
  onLoad,
  onError,
  priority = false,
}, ref) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    const currentElement = ref ? (ref as React.RefObject<HTMLDivElement>).current : imgRef.current;
    if (currentElement) {
      observerRef.current.observe(currentElement);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, ref]);

  useEffect(() => {
    if (!isInView) return;

    const img = document.createElement('img');
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setIsError(true);
      onError?.();
    };
    
    img.src = src;
  }, [isInView, src, onLoad, onError]);

  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || 'auto',
    position: 'relative',
    overflow: 'hidden',
  };

  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <div ref={ref || imgRef} style={containerStyle} className={className}>
      <div style={placeholderStyle}>
        {isError ? (
          <div className="text-gray-500 text-center p-4">
            <svg
              className="w-8 h-8 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.081 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-sm">Failed to load</span>
          </div>
        ) : placeholder ? (
          <Image
            src={placeholder}
            alt=""
            fill
            style={{ objectFit }}
            className="blur-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="image-placeholder w-full h-full">
            <div className="flex items-center justify-center w-full h-full">
              <svg
                className="w-8 h-8 text-gray-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {imageSrc && width && height && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 1 : 0,
          }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      )}

      {imageSrc && (!width || !height) && (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{
            objectFit,
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 1 : 0,
          }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;