import { useEffect,useLayoutEffect, useState, useRef,useMemo,useCallback,memo } from 'react';
import { gsap } from 'gsap';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from 'motion/react';
import "./ReactBits.css";

/* ---------------------------------------------------------
   ShinyText
---------------------------------------------------------*/
const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
    return (
        <div
            className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
            style={{ animationDuration: `${speed}s` }}
        >
            {text}
        </div>
    );
};

/* ---------------------------------------------------------
   GradientText
---------------------------------------------------------*/
const GradientText = ({
                          children,
                          className = '',
                          colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
                          animationSpeed = 8,
                          showBorder = false
                      }) => {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        animationDuration: `${animationSpeed}s`
    };

    return (
        <div className={`animated-gradient-text ${className}`}>
            {showBorder && (
                <div className="gradient-overlay" style={gradientStyle}></div>
            )}
            <div className="text-content" style={gradientStyle}>
                {children}
            </div>
        </div>
    );
};

/* ---------------------------------------------------------
   StarBorder
---------------------------------------------------------*/
const StarBorder = ({
                        as: Component = 'button',
                        className = '',
                        color = 'white',
                        speed = '6s',
                        thickness = 1,
                        children,
                        style = {},
                        ...rest
                    }) => {
    return (
        <Component
            className={`star-border-container ${className}`}
            style={{
                padding: `${thickness}px 0`,
                ...style
            }}
            {...rest}
        >
            <div
                className="border-gradient-bottom"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed
                }}
            />
            <div
                className="border-gradient-top"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed
                }}
            />
            <div className="inner-content">{children}</div>
        </Component>
    );
};

/* ---------------------------------------------------------
   DecryptedText
---------------------------------------------------------*/

const srStyles = {
    wrapper: {
        display: 'inline-block',
        whiteSpace: 'pre-wrap'
    },
    srOnly: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0
    }
};

const DecryptedText = ({
                           text,
                           speed = 50,
                           maxIterations = 10,
                           sequential = false,
                           revealDirection = 'start',
                           useOriginalCharsOnly = false,
                           characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
                           className = '',
                           parentClassName = '',
                           encryptedClassName = '',
                           animateOn = 'hover',
                           ...props
                       }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState(new Set());
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        let interval;
        let currentIteration = 0;

        const	getNextIndex = (revealedSet) => {
            const textLength = text.length;
            switch (revealDirection) {
                case 'start':
                    return revealedSet.size;
                case 'end':
                    return textLength - 1 - revealedSet.size;
                case 'center': {
                    const middle = Math.floor(textLength / 2);
                    const offset = Math.floor(revealedSet.size / 2);
                    const nextIndex =
                        revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

                    if (
                        nextIndex >= 0 &&
                        nextIndex < textLength &&
                        !revealedSet.has(nextIndex)
                    ) {
                        return nextIndex;
                    }

                    for (let i = 0; i < textLength; i++) {
                        if (!revealedSet.has(i)) return i;
                    }
                    return 0;
                }
                default:
                    return revealedSet.size;
            }
        };

        const availableChars = useOriginalCharsOnly
            ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
            : characters.split('');

        const shuffleText = (originalText, currentRevealed) => {
            if (useOriginalCharsOnly) {
                const positions = originalText.split('').map((char, i) => ({
                    char,
                    isSpace: char === ' ',
                    index: i,
                    isRevealed: currentRevealed.has(i)
                }));

                const nonSpaceChars = positions
                    .filter((p) => !p.isSpace && !p.isRevealed)
                    .map((p) => p.char);

                for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [nonSpaceChars[i], nonSpaceChars[j]] = [
                        nonSpaceChars[j],
                        nonSpaceChars[i]
                    ];
                }

                let charIndex = 0;
                return positions
                    .map((p) => {
                        if (p.isSpace) return ' ';
                        if (p.isRevealed) return originalText[p.index];
                        return nonSpaceChars[charIndex++];
                    })
                    .join('');
            } else {
                return originalText
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (currentRevealed.has(i)) return originalText[i];
                        return availableChars[Math.floor(Math.random() * availableChars.length)];
                    })
                    .join('');
            }
        };

        if (isHovering) {
            setIsScrambling(true);
            interval = setInterval(() => {
                setRevealedIndices((prevRevealed) => {
                    if (sequential) {
                        if (prevRevealed.size < text.length) {
                            const nextIndex = getNextIndex(prevRevealed);
                            const newRevealed = new Set(prevRevealed);
                            newRevealed.add(nextIndex);
                            setDisplayText(shuffleText(text, newRevealed));
                            return newRevealed;
                        } else {
                            clearInterval(interval);
                            setIsScrambling(false);
                            return prevRevealed;
                        }
                    } else {
                        setDisplayText(shuffleText(text, prevRevealed));
                        currentIteration++;
                        if (currentIteration >= maxIterations) {
                            clearInterval(interval);
                            setIsScrambling(false);
                            setDisplayText(text);
                        }
                        return prevRevealed;
                    }
                });
            }, speed);
        } else {
            setDisplayText(text);
            setRevealedIndices(new Set());
            setIsScrambling(false);
        }

        return () => interval && clearInterval(interval);
    }, [
        isHovering,
        text,
        speed,
        maxIterations,
        sequential,
        revealDirection,
        characters,
        useOriginalCharsOnly
    ]);

    useEffect(() => {
        if (animateOn !== 'view' && animateOn !== 'both') return;

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsHovering(true);
                    setHasAnimated(true);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1
        });

        const currentRef = containerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => currentRef && observer.unobserve(currentRef);
    }, [animateOn, hasAnimated]);

    const hoverProps =
        animateOn === 'hover' || animateOn === 'both'
            ? {
                onMouseEnter: () => setIsHovering(true),
                onMouseLeave: () => setIsHovering(false)
            }
            : {};

    return (
        <motion.span
            className={parentClassName}
            ref={containerRef}
            style={srStyles.wrapper}
            {...hoverProps}
            {...props}
        >
            <span style={srStyles.srOnly}>{displayText}</span>

            <span aria-hidden="true">
                {displayText.split('').map((char, index) => {
                    const isRevealed =
                        revealedIndices.has(index) || !isScrambling || !isHovering;

                    return (
                        <span
                            key={index}
                            className={isRevealed ? className : encryptedClassName}
                        >
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
};

/* ---------------------------------------------------------
   Blur Text
---------------------------------------------------------*/

const buildKeyframes = (from, steps) => {
    const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

    const keyframes = {};
    keys.forEach(k => {
        keyframes[k] = [from[k], ...steps.map(s => s[k])];
    });
    return keyframes;
};

const BlurText = ({
                      text = '',
                      delay = 200,
                      className = '',
                      animateBy = 'words',
                      direction = 'top',
                      threshold = 0.1,
                      rootMargin = '0px',
                      animationFrom,
                      animationTo,
                      easing = t => t,
                      onAnimationComplete,
                      stepDuration = 0.35
                  }) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () =>
            direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
        [direction]
    );

    const defaultTo = useMemo(
        () => [
            {
                filter: 'blur(5px)',
                opacity: 0.5,
                y: direction === 'top' ? 5 : -5
            },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
        ],
        [direction]
    );

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;

    const stepCount = toSnapshots.length + 1;
    const totalDuration = stepDuration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

    return (
        <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {elements.map((segment, index) => {
                const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

                const spanTransition = {
                    duration: totalDuration,
                    times,
                    delay: (index * delay) / 1000
                };
                spanTransition.ease = easing;

                return (
                    <motion.span
                        className="inline-block will-change-[transform,filter,opacity]"
                        key={index}
                        initial={fromSnapshot}
                        animate={inView ? animateKeyframes : fromSnapshot}
                        transition={spanTransition}
                        onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
                    >
                        {segment === ' ' ? '\u00A0' : segment}
                        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                    </motion.span>
                );
            })}
        </p>
    );
};

/* ---------------------------------------------------------
Decay Card
---------------------------------------------------------*/

const DecayCard = ({ width = 300, height = 400, image = 'https://picsum.photos/300/400?grayscale', children }) => {
    const svgRef = useRef(null);
    const displacementMapRef = useRef(null);
    const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const cachedCursor = useRef({ ...cursor.current });
    const winsize = useRef({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const lerp = (a, b, n) => (1 - n) * a + n * b;

        const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

        const distance = (x1, x2, y1, y2) => {
            const a = x1 - x2;
            const b = y1 - y2;
            return Math.hypot(a, b);
        };

        const handleResize = () => {
            winsize.current = { width: window.innerWidth, height: window.innerHeight };
        };

        const handleMouseMove = ev => {
            cursor.current = { x: ev.clientX, y: ev.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        const imgValues = {
            imgTransforms: { x: 0, y: 0, rz: 0 },
            displacementScale: 0
        };

        const render = () => {
            let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);
            let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);
            let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);

            const bound = 50;

            if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;
            if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;
            if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;
            if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;

            imgValues.imgTransforms.x = targetX;
            imgValues.imgTransforms.y = targetY;
            imgValues.imgTransforms.rz = targetRz;

            if (svgRef.current) {
                gsap.set(svgRef.current, {
                    x: imgValues.imgTransforms.x,
                    y: imgValues.imgTransforms.y,
                    rotateZ: imgValues.imgTransforms.rz
                });
            }

            const cursorTravelledDistance = distance(
                cachedCursor.current.x,
                cursor.current.x,
                cachedCursor.current.y,
                cursor.current.y
            );
            imgValues.displacementScale = lerp(
                imgValues.displacementScale,
                map(cursorTravelledDistance, 0, 200, 0, 400),
                0.06
            );

            if (displacementMapRef.current) {
                gsap.set(displacementMapRef.current, { attr: { scale: imgValues.displacementScale } });
            }

            cachedCursor.current = { ...cursor.current };

            requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="content" style={{ width: `${width}px`, height: `${height}px` }} ref={svgRef}>
            <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="svg">
                <filter id="imgFilter">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.015"
                        numOctaves="5"
                        seed="4"
                        stitchTiles="stitch"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        result="turbulence1"
                    />
                    <feDisplacementMap
                        ref={displacementMapRef}
                        in="SourceGraphic"
                        in2="turbulence1"
                        scale="0"
                        xChannelSelector="R"
                        yChannelSelector="B"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        result="displacementMap3"
                    />
                </filter>
                <g>
                    <image
                        href={image}
                        x="0"
                        y="0"
                        width="600"
                        height="750"
                        filter="url(#imgFilter)"
                        preserveAspectRatio="xMidYMid slice"
                    />
                </g>
            </svg>
            <div className="card-text">{children}</div>
        </div>
    );
};

/* ---------------------------------------------------------
  Scroll Velocity
---------------------------------------------------------*/

function useElementWidth(ref) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [ref]);

    return width;
}

 const ScrollVelocity = ({
                                   scrollContainerRef,
                                   texts = [],
                                   velocity = 100,
                                   className = '',
                                   damping = 50,
                                   stiffness = 400,
                                   numCopies = 6,
                                   velocityMapping = { input: [0, 1000], output: [0, 5] },
                                   parallaxClassName = 'parallax',
                                   scrollerClassName = 'scroller',
                                   parallaxStyle,
                                   scrollerStyle
                               }) => {
    function VelocityText({
                              children,
                              baseVelocity = velocity,
                              scrollContainerRef,
                              className = '',
                              damping,
                              stiffness,
                              numCopies,
                              velocityMapping,
                              parallaxClassName,
                              scrollerClassName,
                              parallaxStyle,
                              scrollerStyle
                          }) {
        const baseX = useMotionValue(0);
        const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
        const { scrollY } = useScroll(scrollOptions);
        const scrollVelocity = useVelocity(scrollY);
        const smoothVelocity = useSpring(scrollVelocity, {
            damping: damping ?? 50,
            stiffness: stiffness ?? 400
        });
        const velocityFactor = useTransform(
            smoothVelocity,
            velocityMapping?.input || [0, 1000],
            velocityMapping?.output || [0, 5],
            { clamp: false }
        );

        const copyRef = useRef(null);
        const copyWidth = useElementWidth(copyRef);

        function wrap(min, max, v) {
            const range = max - min;
            const mod = (((v - min) % range) + range) % range;
            return mod + min;
        }

        const x = useTransform(baseX, v => {
            if (copyWidth === 0) return '0px';
            return `${wrap(-copyWidth, 0, v)}px`;
        });

        const directionFactor = useRef(1);
        useAnimationFrame((t, delta) => {
            let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

            if (velocityFactor.get() < 0) {
                directionFactor.current = -1;
            } else if (velocityFactor.get() > 0) {
                directionFactor.current = 1;
            }

            moveBy += directionFactor.current * moveBy * velocityFactor.get();
            baseX.set(baseX.get() + moveBy);
        });

        const spans = [];
        for (let i = 0; i < numCopies; i++) {
            spans.push(
                <span className={className} key={i} ref={i === 0 ? copyRef : null}>
          {children}
        </span>
            );
        }

        return (
            <div className={parallaxClassName} style={parallaxStyle}>
                <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
                    {spans}
                </motion.div>
            </div>
        );
    }

    return (
        <section>
            {texts.map((text, index) => (
                <VelocityText
                    key={index}
                    className={className}
                    baseVelocity={index % 2 !== 0 ? -velocity : velocity}
                    scrollContainerRef={scrollContainerRef}
                    damping={damping}
                    stiffness={stiffness}
                    numCopies={numCopies}
                    velocityMapping={velocityMapping}
                    parallaxClassName={parallaxClassName}
                    scrollerClassName={scrollerClassName}
                    parallaxStyle={parallaxStyle}
                    scrollerStyle={scrollerStyle}
                >
                    {text}&nbsp;
                </VelocityText>
            ))}
        </section>
    );
};

/* ---------------------------------------------------------
Logo Loop
---------------------------------------------------------*/


const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback, elements, dependencies) => {
    useEffect(() => {
        if (!window.ResizeObserver) {
            const handleResize = () => callback();
            window.addEventListener('resize', handleResize);
            callback();
            return () => window.removeEventListener('resize', handleResize);
        }
        const observers = elements.map(ref => {
            if (!ref.current) return null;
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return observer;
        });
        callback();
        return () => {
            observers.forEach(observer => observer?.disconnect());
        };
    }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? [];
        if (images.length === 0) {
            onLoad();
            return;
        }
        let remainingImages = images.length;
        const handleImageLoad = () => {
            remainingImages -= 1;
            if (remainingImages === 0) onLoad();
        };
        images.forEach(img => {
            const htmlImg = img;
            if (htmlImg.complete) {
                handleImageLoad();
            } else {
                htmlImg.addEventListener('load', handleImageLoad, { once: true });
                htmlImg.addEventListener('error', handleImageLoad, { once: true });
            }
        });
        return () => {
            images.forEach(img => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
    }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
    const rafRef = useRef(null);
    const lastTimestampRef = useRef(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const seqSize = isVertical ? seqHeight : seqWidth;

        if (seqSize > 0) {
            offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
            const transformValue = isVertical
                ? `translate3d(0, ${-offsetRef.current}px, 0)`
                : `translate3d(${-offsetRef.current}px, 0, 0)`;
            track.style.transform = transformValue;
        }

        const animate = timestamp => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            if (seqSize > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;

                const transformValue = isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
                track.style.transform = transformValue;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            lastTimestampRef.current = null;
        };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

 const LogoLoop = memo(
    ({
         logos,
         speed = 120,
         direction = 'left',
         width = '100%',
         logoHeight = 28,
         gap = 32,
         pauseOnHover,
         hoverSpeed,
         fadeOut = false,
         fadeOutColor,
         scaleOnHover = false,
         renderItem,
         ariaLabel = 'Partner logos',
         className,
         style
     }) => {
        const containerRef = useRef(null);
        const trackRef = useRef(null);
        const seqRef = useRef(null);

        const [seqWidth, setSeqWidth] = useState(0);
        const [seqHeight, setSeqHeight] = useState(0);
        const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
        const [isHovered, setIsHovered] = useState(false);

        const effectiveHoverSpeed = useMemo(() => {
            if (hoverSpeed !== undefined) return hoverSpeed;
            if (pauseOnHover === true) return 0;
            if (pauseOnHover === false) return undefined;
            return 0;
        }, [hoverSpeed, pauseOnHover]);

        const isVertical = direction === 'up' || direction === 'down';

        const targetVelocity = useMemo(() => {
            const magnitude = Math.abs(speed);
            let directionMultiplier;
            if (isVertical) {
                directionMultiplier = direction === 'up' ? 1 : -1;
            } else {
                directionMultiplier = direction === 'left' ? 1 : -1;
            }
            const speedMultiplier = speed < 0 ? -1 : 1;
            return magnitude * directionMultiplier * speedMultiplier;
        }, [speed, direction, isVertical]);

        const updateDimensions = useCallback(() => {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const sequenceRect = seqRef.current?.getBoundingClientRect?.();
            const sequenceWidth = sequenceRect?.width ?? 0;
            const sequenceHeight = sequenceRect?.height ?? 0;
            if (isVertical) {
                const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
                if (containerRef.current && parentHeight > 0) {
                    const targetHeight = Math.ceil(parentHeight);
                    if (containerRef.current.style.height !== `${targetHeight}px`)
                        containerRef.current.style.height = `${targetHeight}px`;
                }
                if (sequenceHeight > 0) {
                    setSeqHeight(Math.ceil(sequenceHeight));
                    const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
                    const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
                    setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
                }
            } else if (sequenceWidth > 0) {
                setSeqWidth(Math.ceil(sequenceWidth));
                const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
                setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
            }
        }, [isVertical]);

        useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

        useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

        useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

        const cssVariables = useMemo(
            () => ({
                '--logoloop-gap': `${gap}px`,
                '--logoloop-logoHeight': `${logoHeight}px`,
                ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
            }),
            [gap, logoHeight, fadeOutColor]
        );

        const rootClassName = useMemo(
            () =>
                [
                    'logoloop',
                    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
                    fadeOut && 'logoloop--fade',
                    scaleOnHover && 'logoloop--scale-hover',
                    className
                ]
                    .filter(Boolean)
                    .join(' '),
            [isVertical, fadeOut, scaleOnHover, className]
        );

        const handleMouseEnter = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(true);
        }, [effectiveHoverSpeed]);
        const handleMouseLeave = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(false);
        }, [effectiveHoverSpeed]);

        const renderLogoItem = useCallback(
            (item, key) => {
                if (renderItem) {
                    return (
                        <li className="logoloop__item" key={key} role="listitem">
                            {renderItem(item, key)}
                        </li>
                    );
                }
                const isNodeItem = 'node' in item;
                const content = isNodeItem ? (
                    <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
                ) : (
                    <img
                        src={item.src}
                        srcSet={item.srcSet}
                        sizes={item.sizes}
                        width={item.width}
                        height={item.height}
                        alt={item.alt ?? ''}
                        title={item.title}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                    />
                );
                const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
                const itemContent = item.href ? (
                    <a
                        className="logoloop__link"
                        href={item.href}
                        aria-label={itemAriaLabel || 'logo link'}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {content}
                    </a>
                ) : (
                    content
                );
                return (
                    <li className="logoloop__item" key={key} role="listitem">
                        {itemContent}
                    </li>
                );
            },
            [renderItem]
        );

        const logoLists = useMemo(
            () =>
                Array.from({ length: copyCount }, (_, copyIndex) => (
                    <ul
                        className="logoloop__list"
                        key={`copy-${copyIndex}`}
                        role="list"
                        aria-hidden={copyIndex > 0}
                        ref={copyIndex === 0 ? seqRef : undefined}
                    >
                        {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
                    </ul>
                )),
            [copyCount, logos, renderLogoItem]
        );

        const containerStyle = useMemo(
            () => ({
                width: isVertical
                    ? toCssLength(width) === '100%'
                        ? undefined
                        : toCssLength(width)
                    : (toCssLength(width) ?? '100%'),
                ...cssVariables,
                ...style
            }),
            [width, cssVariables, style, isVertical]
        );

        return (
            <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
                <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {logoLists}
                </div>
            </div>
        );
    }
);

LogoLoop.displayName = 'LogoLoop';


/* ---------------------------------------------------------
   EXPORT ALL COMPONENTS FOR REACTBITS
---------------------------------------------------------*/
export { ShinyText, GradientText, StarBorder, DecryptedText, BlurText,DecayCard,ScrollVelocity,LogoLoop };